import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import firebase from "./firebase";
import "../stylesheets/Favourites.css"
import FavsDetails from "./FavsDetails";

function Favourites(props) {
    // Holds the description open state
    const [favouritesOpen, setFavouritesOpen] = useState(false);
    // Holds the items in the favourites
    const [items, setItems] = useState([]);
    // holds the number of items in the favourites
    const [favouritesNumber, setFavouritesNumber] = useState(0);

    const [favDescOpen, setFavDescOpen] = useState(false);
    const [favTitle, setFavTitle] = useState("");
    const [favDate, setFavDate] = useState("");
    const [favDesc, setFavDesc] = useState("");
    const [favImage, setFavImage] = useState("");

    useEffect(() => {
        setFavouritesNumber(items.length);
    }, [items])


    // Opens and closes the favourites based on click
    const handleFavourites = () => {
        setFavouritesOpen(!favouritesOpen);
    }


    useEffect(() => {
        // var holds database details
        const database = getDatabase(firebase)
        // reference the database
        const dbRef = ref(database)
        // adding event listener to database
        onValue(dbRef, (response) => {
            // var to store the items
            const newState = [];
            // storing firebase response in data
            const data = response.val();
            // iterating through data to get each item name
            for (let key in data) {
                // push each item to an array 
                newState.push({ key: key, name: data[key] });
            }
            // updating component's state using the local array newState
            setItems(newState);
        })
    }, [])

    // this function takes an argument, which is the ID of the item we want to remove
    const handleRemoveItem = (itemId) => {
        // here we create a reference to the database 
        // this time though, instead of pointing at the whole database, we make our dbRef point to the specific node of the item we want to remove
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${itemId}`);
        console.log(itemId)

        // using the Firebase method remove(), we remove the node specific to the item ID
        remove(dbRef)
    }

    const toggleShowDesc = () => {
        setFavDescOpen(!favDescOpen);
        // setFavImage(item.currentTarget.children[0].firstChild.src)
        // setFavTitle(item.currentTarget.children[1].children[0].innerText)
        // setFavDesc(item.currentTarget.children[1].children[1].innerText)
    }

    return (
        <>
            {favouritesOpen ?
                <>
                    <div className="blocker" onClick={handleFavourites}></div>
                    <div className="favourites">
                        <h2 className="yourFavourites">Here are your favourites:</h2>
                        <button className="closeButton" onClick={handleFavourites} aria-label="closePopupWindow">X</button>
                        <ul className="favouritesList">
                            {items.length === 0
                                ? <h2 className="yourFavourites emptyFavourites"> Your list is empty!</h2>
                                : items.map((item) => {
                                    return (
                                        <>
                                            <li key={item.key}
                                                className="favouritesItem"
                                                // Making the containers tabbable for accessibility
                                                tabIndex={0}
                                                onClick={toggleShowDesc}
                                                // Making it so that the results containers can be selected using the enter key
                                                onKeyUp={(e) => { if (e.key === 'Enter') toggleShowDesc(e) }}
                                            >
                                                <div className="favouritesImage">
                                                    <img src={item.name.image} alt={item.name.title} />
                                                </div>
                                                <div className="favouritesInfo">
                                                    <p className="favouritesTitle">{item.name.title}</p>
                                                    <p className="favouritesDate">{item.name.date}</p>
                                                </div>
                                                <button className="favouritesRemove" onClick={() => handleRemoveItem(item.key)}> Remove </button>
                                                {/* if descOpen is true, show the expanded info */}
                                            </li>

                                            {favDescOpen ?
                                                <FavsDetails
                                                    image={item.name.image}
                                                    // image={favImage}
                                                    title={item.name.title}
                                                    // title={favTitle}
                                                    description={item.name.desc}
                                                    date={item.name.date}
                                                    // date={favDate}
                                                    handleClose={toggleShowDesc}
                                                />
                                                : null // basically show nothing if it isn't clicked
                                            }
                                        </>
                                    )
                                })}
                        </ul>
                    </div>

                </>
                :
                <div className="closedFavourites"
                    onClick={handleFavourites}
                >
                    {/* <i className="fas fa-shopping-cart cart"></i> */}
                    <p className="favouritesHeart">♥</p>
                    {items.length > 0
                        ? <div className="favouritesNumberBubble">
                            <p className="favouritesNumber">{favouritesNumber}</p>
                        </div>
                        : null
                    }
                    <div
                        className="favouritesTriangle"
                        tabIndex={0}
                        onKeyUp={(e) => { if (e.key === 'Enter') handleFavourites(e) }}
                    ></div>
                </div>
            }
        </>
    )

}

export default Favourites