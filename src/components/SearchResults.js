// Component to render the items on the page
import ExtraDetails from "./ExtraDetails";
import { useState } from 'react';
import firebase from './firebase';
import { getDatabase, ref, push} from 'firebase/database';
import "../stylesheets/SearchResults.css"

function SearchResults(props) {

    // Holds the description open state
    const [descOpen, setDescOpen] = useState(false);
    const [liked, setLiked] = useState(false);

    // holds the selected item image
    const [itemImg, setItemImg] = useState("")
    // holds the selected item title
    const [itemTitle, setItemTitle] = useState("")
    // holds the selected item date
    const [itemDate, setItemDate] = useState("")
    // holds the selected item description
    const [itemDesc, setItemDesc] = useState("")


    const toggleLike = (e) => {
        // Allows like button to be clicked without opening description
        e.stopPropagation();
        setLiked(!liked);
    }

    // Toggles the descOpen from true to false or vice versa every time the button is clicked
    const toggleShowDesc = (item) => {
        setDescOpen(!descOpen);
        if (descOpen === false) {
            setItemImg(item.currentTarget.firstChild.firstChild.currentSrc)
            setItemTitle(item.currentTarget.firstChild.firstChild.attributes.alt.value)
            setItemDate(item.currentTarget.childNodes[1].childNodes[0].firstChild.nodeValue)
            setItemDesc(item.currentTarget.childNodes[1].childNodes[2].firstChild.nodeValue)
        }
    }



     // Handle Add To Favourites function
    const handleAddToFavourites = () => {
        // create a reference to our database
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        let favouritesItem = {
            title: itemTitle,
            image: itemImg,
            date: itemDate,
            desc: itemDesc
        }
        // push the value of the `selected item` state to the database
        push(dbRef, favouritesItem);

    }


    return (
        <>
            <div className="itemContainer"
                key={props.date}
                // Making the containers tabbable for accessibility
                tabIndex={0}
                onClick={toggleShowDesc}
                // Making it so that the results containers can be selected using the enter key
                onKeyUp={(e) => { if (e.key === 'Enter') toggleShowDesc(e) }}
            >
                <div className="itemImage">
                    <img src={props.image} alt={props.title} />
                </div>
                <div className="itemText">
                    <p className="itemDate">{props.date}</p>
                    <p className="itemTitle">{props.title}</p>
                    <p className="descNull">{props.description}</p>
                </div>
                <button className={liked ? "clickedLikeButton":"likeButton"} onClick={toggleLike}>{liked? "Liked!" : "LIKE"}</button>
            </div>

            {/* if descOpen is true, show the expanded info */}
            {descOpen ?
                <ExtraDetails
                    handleClose={toggleShowDesc}
                    handleAddToFavourites={handleAddToFavourites}
                    image={props.hdImage}
                    title={props.title}
                    description={props.description}
                />
                : null // basically show nothing if it isn't clicked
            }

        </>
    )
}

export default SearchResults;



