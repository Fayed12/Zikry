// react router
import { NavLink } from "react-router";

// local
import style from "./navBar.module.css"

function NavBar() {
    return (
      <>
        <div className={style.nav}>
          <div className={style.logo}>
            <img src="/logo.png" alt="logo" />
          </div>
          <div className={style.links}>
            <ul>
              <li>
                <NavLink to={"home"} replace={true}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"supplications"} replace={true}>
                  supplications
                </NavLink>
              </li>
              <li>
                <NavLink to={"favorite"} replace={true}>
                  Favorite
                </NavLink>
              </li>
              <li>
                <NavLink to={"contactUs"} replace={true}>
                  Contact Us
                </NavLink>
              </li>
              <li>
                <a href="#">signUp</a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
}

export default NavBar;