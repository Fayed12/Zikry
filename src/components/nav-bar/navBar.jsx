// react router
import { NavLink } from "react-router";

// react icons
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";

// react
import { useEffect, useRef, useState } from "react";

// local
import style from "./navBar.module.css";

function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const menu = useRef();

  // handle close if enter any place
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menu.current && !menu.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <>
      <div className={` ${openMenu ? style.NavOverlay :undefined}`}></div>
      <div className={style.nav}>
        <div className={style.logo}>
          <img src="/logo.png" alt="logo" />
        </div>
        <div
          ref={menu}
          className={`${style.links} ${openMenu ? style.openLinks : undefined}`}
        >
          <ul>
            <li>
              <NavLink to={"home"} replace={true}>
                الرئيسية
              </NavLink>
            </li>
            <li>
              <NavLink to={"about"} replace={true}>
                نبذه عنا
              </NavLink>
            </li>
            <li>
              <NavLink to={"supplications"} replace={true}>
                أدعيتي
              </NavLink>
            </li>
            <li>
              <NavLink to={"rosary"} replace={true}>
                السبحه
              </NavLink>
            </li>
            <li>
              <NavLink to={"favorite"} replace={true}>
                المفضلة
              </NavLink>
            </li>
            <li>
              <NavLink to={"contactUs"} replace={true}>
                تواصل معنا
              </NavLink>
            </li>
            <button type="button" title="تسجيل الدخول" className={style.btn}>
              <NavLink to={"/signUp"} replace={true}>
                Sign Up
              </NavLink>
            </button>
          </ul>
        </div>
        <div className={style.menuIcon}>
          {openMenu ? (
            <button type="button" onClick={() => setOpenMenu(false)}>
              <AiOutlineMenuUnfold />
            </button>
          ) : (
            <button type="button" onClick={() => setOpenMenu(true)}>
              <AiOutlineMenuFold />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
