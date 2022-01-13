import "../stylesheets/ExtraDetails.css"

function ExtraDetails(props) {

    const addedToCart = () => {
        props.handleAddToCart()
        props.handleClose()
    }

    return (
        <>
            {/* Blocker in case people don't want to x out of the window */}
            <div className="blocker" onClick={props.handleClose}></div>
            <div className="expandedItem">
                <button className="closeButton" onClick={props.handleClose} aria-label="closePopupWindow">X</button>
                <div className="expandedImgInfo">
                    <div className="expandedImage">
                        <img src={props.image}
                            alt={props.title}
                        />
                    </div>
                </div>
                <div className="expandedInfo expandedDesc">
                    <div className="itemInfoWrapper">
                        <p className="itemRating">{props.date}</p>
                        <h3 className="expandedTitle">{props.title}</h3>
                        <p className="itemDesc">{props.description}</p>
                        {/* <p className="copyright">
                        `Copyright holder: {props.copyright}`
                        </p> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExtraDetails