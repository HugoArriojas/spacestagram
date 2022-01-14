import "../stylesheets/HeaderFooter.css"

const HeaderFooter = (props) => {
    return (
    <div className="header footer">
        <h1>Space<span>stagram</span></h1>
        <p className="subtitle">Brought to you by NASA's Astronomy Photo of the Day API</p>
        <div className="imageTriangle"></div>
      </div>
    )
}

export default HeaderFooter;