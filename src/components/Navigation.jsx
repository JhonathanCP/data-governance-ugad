import { Link } from "react-router-dom";

export function Navigation() {
  return (    
  <nav class="navbar pl-5 pr-5" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></img>
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/entitytypes">
          Entity Types
        </a>

        <a class="navbar-item" href="/entities">
          Entities
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Más
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              DB Graph
            </a>
            <a class="navbar-item">
              DB Graph
            </a>
            <a class="navbar-item">
              DB Graph
            </a>
            <hr class="navbar-divider"></hr>
            <a class="navbar-item">
              DB Graph
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
}
