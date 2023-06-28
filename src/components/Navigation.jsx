import { Link } from "react-router-dom";

export function Navigation() {
  return (    
  <nav className="navbar pl-5 pr-5 is-link" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></img>
      </a>

      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <a className="navbar-item" href="/entitytypes">
          Entity Types
        </a>

        <a className="navbar-item" href="/entities">
          Entities
        </a>

        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            Más
          </a>

          <div className="navbar-dropdown">
            <a className="navbar-item">
              DB Graph
            </a>
            <a className="navbar-item">
              DB Graph
            </a>
            <a className="navbar-item">
              DB Graph
            </a>
            <hr className="navbar-divider"></hr>
            <a className="navbar-item">
              DB Graph
            </a>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a className="button is-primary">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
}
