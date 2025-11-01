// local 
import style from "./footer.module.css"

function Footer() {
    return ( 
        <>
        <div className={style.content}>
                &copy; all right reserved 2025, by <span className={style.name}>mohamed fayed</span>
              </div>
        </>
     );
}

export default Footer;