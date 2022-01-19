import "../stylesheets/ExtraDetails.css"

function ExtraDetails(props) {


    return (
        <>
            {/* Blocker in case people don't want to x out of the window */}
            <div className="blocker" onClick={props.handleClose}></div>
            <div className="expandedItem">
                <button className="closeButton favCloseButton" onClick={props.handleClose} aria-label="closePopupWindow">X</button>
                <div className="expandedImage">
                    <img src={props.image}
                        alt={props.title}
                    />
                </div>
                <div className="expandedInfo expandedDesc">
                    <div className="itemInfoWrapper">
                        <div className="expandedDate">
                            <p className="expandedDay">{props.date}</p>
                        </div>
                        <h3 className="expandedTitle">{props.title}</h3>
                        <p className="itemDesc">{props.desc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExtraDetails