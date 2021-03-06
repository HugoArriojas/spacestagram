// Footer bar at the bottom of the screen with links to creator's portfolio, git, and linkedin

import initials from "../assets/initials.png"
import "../stylesheets/CreditSocials.css"

function CreditSocials() {

    return (
        <section className="creditSocials">
        <div className="socials">

          <a href="http://www.hugoa.dev">
            <img src={initials} alt="Website creator's initials, HA" className="initials" />
          </a>

          <a href="https://github.com/HugoArriojas/">
            <i className="fab fa-github"></i>
          </a>

          <a href="https://www.linkedin.com/in/hugo-arriojas-53613120a">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </section>
    )
}

export default CreditSocials;


