
import { useState } from "react";
import "../stylesheets/SideNav.css"



function SideNav(props) {

  const [input, setInput] = useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.handleLoading(false);
    if (props.count === input ) {
      props.handleCount(10);
    } else if (input <= 100 && input > 0) {
      props.handleCount(input);
    } else {
      alert("Please put in a value between 0 and 100")
    }
  }

  return (
    <section className="sideNav">
      <div className="navWrapper">
        <form
          action="submit"
          className="countForm"
          onSubmit={handleSubmit}
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
          <button
            type="submit"
            className="submit btn-slide"
          >Submit</button>
        </form>
        <h3 className="descriptionExplain">Click on results for details + save to favourites</h3>
        <a href="https://github.com/HugoArriojas/spacestagram">
            Repository <i className="fab fa-github"></i>
        </a>
      </div> {/* end of sidenav Wrapper */}
    </section>
  );
}

export default SideNav;