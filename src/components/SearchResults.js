// Component to render the items on the page
import ExtraDetails from "./ExtraDetails";
import { useState } from 'react';
import "../stylesheets/SearchResults.css"

function SearchResults(props) {

    // Holds the description open state
    const [descOpen, setDescOpen] = useState(false);
    const [liked, setLiked] = useState(false);

    // holds the selected item image
    const [itemImg, setItemImg] = useState("")
    // holds the selected item title
    const [itemTitle, setItemTitle] = useState("")
    // holds the selected item price
    const [itemDate, setItemDate] = useState("")


    const toggleLike = () => {
        setLiked(!liked);
    }

    // Toggles the descOpen from true to false or vice versa every time the button is clicked
    const toggleShowDesc = (item) => {
        setDescOpen(!descOpen);
        if (descOpen === false) {
            setItemImg(item.url)
            setItemTitle(item.title)
            setItemDate(item.date)
        }
    }



    //  // Handle Add To Cart function
    // const handleAddToCart = () => {
    //     // create a reference to our database
    //     const database = getDatabase(firebase);
    //     const dbRef = ref(database);

    //     let cartItem = {
    //         title: itemTitle,
    //         image: itemImg,
    //         price: itemPrice
    //     }
    //     // push the value of the `selected item` state to the database
    //     push(dbRef, cartItem);

    //     // Each item added to the cart is added to the total
    //     props.handleCartTotal(cartItem);
    // }


    return (
        <>
            <div className="itemContainer"
                key={props.key}
                // Making the containers tabbable for accessibility
                tabIndex={0}
            >
                <div className="itemImage"
                    onClick={toggleShowDesc}
                    // Making it so that the results containers can be selected using the enter key
                    onKeyUp={(e) => { if (e.key === 'Enter') toggleShowDesc(e) }}
                >
                    <img src={props.image} alt={props.title} />
                </div>
                <div className="itemText"
                    onClick={toggleShowDesc}
                    // Making it so that the results containers can be selected using the enter key
                    onKeyUp={(e) => { if (e.key === 'Enter') toggleShowDesc(e) }}
                >
                    <p className="itemTitle">{props.date}</p>
                    <p className="itemTitle">{props.title}</p>
                </div>
                <button className={liked ? "clickedLikeButton":"likeButton"} onClick={toggleLike}>{liked? "Liked!" : "♥ LIKE"}</button>
            </div>

            {/* if descOpen is true, show the expanded info */}
            {descOpen ?
                <ExtraDetails
                    handleClose={toggleShowDesc}
                    // handleAddToCart={handleAddToCart}
                    image={props.hdImage}
                    title={props.title}
                    copyright={props.copyright}
                    description={props.description}
                />
                : null // basically show nothing if it isn't clicked
            }

        </>
    )
}

export default SearchResults;



