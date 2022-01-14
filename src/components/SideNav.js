
import { useState } from "react";
import "../stylesheets/SideNav.css"



function SideNav(props) {
  
  const [input, setInput] = useState("")
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (input <= 100 && input > 0) {
      props.handleCount(input);
      props.handleLoading()
    } else {
      alert("Please put in a value between 0 and 100")
    }
  }
  
  return (
    <section className="sideNav">
      <div className="navWrapper">
        <form 
          action="submit" 
          onSubmit={handleSubmit}
          className="countForm"
        >
          <label htmlFor="count">
          How many images would you like?
          (0-100)
          </label>
          <input
            type="text"
            name="count"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="countInput"
            maxLength={3}
            max={100}
            />
          <button type="submit"
          className="submit btn-slide">Submit</button>
        </form>
        <h3 className="descriptionExplain">Click on images for desciptions</h3>
      </div> {/* end of sidenav Wrapper */}
    </section>
  );
}

export default SideNav;