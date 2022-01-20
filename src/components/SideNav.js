// Component for the side Nav
import { useState } from "react";
import "../stylesheets/SideNav.css"



function SideNav(props) {
  // Holds the number put into the "how many images woudl you like"
  const [input, setInput] = useState()

  // Passes the inputted number to the API call in MainSection
  const handleSubmit = (event) => {
    event.preventDefault();
    // props.handleLoading(false);
    if (props.count === input) {
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
            How many images would you like? (0-100)
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
          > Submit
          </button>
        </form>

        <h3 className="descriptionExplain">Click on results for details + save to favourites</h3>

        <div className="repolink">
          <a href="https://github.com/HugoArriojas/spacestagram" className="repoLink">
            <i className="fab fa-github"></i> Repository
          </a>
        </div>

      </div> {/* /navWrapper */}
    </section>
  );
}

export default SideNav;