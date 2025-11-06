// react router
import { NavLink, useNavigate } from "react-router";

// react icons
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";

// react
import { useEffect, useRef, useState } from "react";

// toast
import toast from "react-hot-toast";

// local
import style from "./navBar.module.css";
import { ConfirmDialog } from "../sweetAlert";

function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false)
  const menu = useRef();
  const navigate = useNavigate()

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

  // function handle logout
  async function handleLogout() {
    const confirmAdd = await ConfirmDialog({
          title: "هل تريد تسجيل الخروج ؟",
          text: "سيتم تحديث حالته في قاعدة البيانات.",
          confirmText: "نعم",
          cancelText: "إلغاء",
    });
    const loggedLocalStorage = localStorage.getItem("loginStatus"); 
    const loggedSessionStorage = sessionStorage.getItem("loginStatus");
    if (confirmAdd) {
      if (loggedLocalStorage  && loggedLocalStorage == "true") {
        toast.loading("جاري التحميل .....", { id: "toast" })
        setTimeout(() => {
          localStorage.removeItem("loginStatus", false);
          localStorage.removeItem("user", {});
          toast.success("تم تسجيل الخروج", { id: "toast" });
        }, 1500);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }else if (loggedSessionStorage && loggedSessionStorage == "true") {
        toast.loading("جاري التحميل .....", { id: "toast" });
        setTimeout(() => {
         sessionStorage.removeItem("loginStatus", false);
         sessionStorage.removeItem("user", JSON.stringify({}));
          toast.success("تم تسجيل الخروج", { id: "toast" });
        }, 1500);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } else {
      toast.error("تم الغاء العمليه", { id: "toast" });
    }
  }

  // get user and check in logged or not
  useEffect(() => {
    const loggedStatus =
      localStorage.getItem("loginStatus") ||
      sessionStorage.getItem("loginStatus");
    
    if (loggedStatus === "true" || loggedStatus === true) {
      setIsLogged(true)
    }
  },[])

  return (
    <>
      <div className={` ${openMenu ? style.NavOverlay : undefined}`}></div>
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
            {isLogged ? (
              <button type="button" title="تسجيل الخروج" className={style.logoutBtn} onClick={()=>handleLogout()}>
                  logout
              </button>
            ) : (
              <button type="button" title="تسجيل الدخول" className={style.btn}>
                <NavLink to={"/signUp"} replace={true}>
                  Sign Up
                </NavLink>
              </button>
            )}
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
