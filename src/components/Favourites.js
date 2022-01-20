// Stores saved pictures of the day in a list working with Firebase

import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import firebase from "./firebase";
import FavsDetails from "./FavsDetails";
import "../stylesheets/Favourites.css"

function Favourites() {
    // Holds the description open state
    const [favouritesOpen, setFavouritesOpen] = useState(false);
    // Holds the items in the favourites
    const [items, setItems] = useState([]);
    // holds the number of items in the favourites
    const [favouritesNumber, setFavouritesNumber] = useState(0);
    // Holds the "extra details" state for the favourites list
    const [favDetailsOpen, setfavDetailsOpen] = useState(false);
    // Holds the state for the selected favourites item that you want the extra details on
    const [favDesc, setFavDesc] = useState("");
    const [favImage, setFavImage] = useState("");
    const [favTitle, setFavTitle] = useState("");
    const [favDate, setFavDate] = useState("");

    // useEffect so that each time an item is added to the favourites list, the "favourites bubble" is updated
    useEffect(() => {
        setFavouritesNumber(items.length);
    }, [items])

    // Opens and closes the favourites based on click
    const handleFavourites = () => {
        setFavouritesOpen(!favouritesOpen);
    }

    // Pulling the data of saved favourites from Firebase
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

        // using the Firebase method remove(), we remove the node specific to the item ID
        remove(dbRef)
    }

    // Shows extra details for items stored in the favourites list
    const detailButton = (e) => {
        setFavImage(e.currentTarget.parentElement.parentElement.children[0].firstChild.src)
        setFavTitle(e.currentTarget.parentElement.children[0].innerText)
        setFavDate(e.currentTarget.parentElement.children[1].innerText)
        setFavDesc(e.currentTarget.parentElement.children[2].innerText)
        setfavDetailsOpen(!favDetailsOpen);
    }


    // Closes the favourites list
    const toggleFavClose = () => {
        setfavDetailsOpen(!favDetailsOpen);
    }

    return (
        <>
            {favouritesOpen ?
                <>
                    {/* Blocker in case users don't want to x out of the window */}
                    <div className="blocker" onClick={handleFavourites}></div>
                    <div className="favourites">
                        <h2 className="yourFavourites">Here are your favourites:</h2>
                        {/* hides absolutely positioned close button when favourites details are open */}
                        {!favDetailsOpen ?
                            <button className="closeButton" onClick={handleFavourites} aria-label="closePopupWindow">X</button>
                            : null
                        }
                        <ul className="favouritesList">
                            {items.length === 0
                                ? <h2 className="yourFavourites emptyFavourites"> Your favourites list is empty!</h2>
                                : items.map((item) => {
                                    return (
                                        <>
                                            <li key={item.key} className="favouritesItem">
                                                <div className="favouritesImage">
                                                    <img src={item.name.image} alt={item.name.title} />
                                                </div>

                                                <div className="favouritesInfo">
                                                    <p className="favouritesTitle">{item.name.title}</p>
                                                    <p className="favouritesDate">{item.name.date}</p>
                                                    <p className="descNull">{item.name.desc}</p>
                                                    <button className="favDetails"
                                                        onClick={detailButton}
                                                        // Making the containers tabbable for accessibility
                                                        tabIndex={0}
                                                        // Making it so that the results containers can be selected using the enter key
                                                        onKeyUp={(e) => { if (e.key === 'Enter') detailButton(e) }}
                                                    >More Details
                                                    </button>
                                                    <button
                                                        className="favouritesRemove remove1"
                                                        onClick={() => handleRemoveItem(item.key)}
                                                        aria-label="Remove this item from favourite"
                                                    >Remove
                                                    </button>
                                                </div>{/* /favouritesInfo */}

                                            {/* Secondary remove button that's displayed depending on screen size */}
                                                <button
                                                    className="favouritesRemove remove2"
                                                    onClick={() => handleRemoveItem(item.key)}
                                                    aria-label="Remove this item from favourite"
                                                >
                                                    Remove
                                                </button>
                                            </li> {/* </favouritesItem> */}

                                            {/* if descOpen is true, show the expanded info */}
                                            {favDetailsOpen ?
                                                <FavsDetails
                                                    image={favImage}
                                                    title={favTitle}
                                                    desc={favDesc}
                                                    date={favDate}
                                                    handleClose={toggleFavClose}
                                                />
                                                : null // basically show nothing if it isn't clicked
                                            }
                                        </>
                                    )
                                })}
                        </ul> {/* /favouritesList */}
                    </div> {/* /favourites  */}

                </>
                :
                <div className="closedFavourites"
                    onClick={handleFavourites}
                >
                    <p className="favouritesHeart">♥&#xFE0E;</p>
                    {items.length > 0
                        ? <div className="favouritesNumberBubble">
                            <p className="favouritesNumber">{favouritesNumber}</p>
                        </div>
                        : null
                    }
                    {/* Favourites triangle that is on the top right of the screen*/}
                    <div className="favouritesTriangle"
                        tabIndex={0}
                        onKeyUp={(e) => { if (e.key === 'Enter') handleFavourites(e) }}
                    ></div>
                </div> // /closedFavourites
            }
        </>
    )

}

export default Favourites