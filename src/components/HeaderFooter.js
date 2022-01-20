// Header and footer component with the title of Spacestagram
import "../stylesheets/HeaderFooter.css"

const HeaderFooter = () => {
  return (
    <div className="header footer">
      <div className="titleText">
        <div className="title">
          <h1>Space</h1>
          <h1><span>stagram</span></h1>
        </div>
        <p className="subtitle">Brought to you by NASA's "Astronomy Photo of the Day" API</p>
      </div> {/* /titleText */}
      <div className="imageTriangle"></div>
    </div> // /header /footer 
  )
}

export default HeaderFooter;