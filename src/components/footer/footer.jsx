// local 
import style from "./footer.module.css"

function Footer() {
    return (
      <>
        <div className={style.footerContent}>
          &copy; all right reserved 2025, by
          <a href="https://github.com/Fayed12" target="blank" className={style.name}>
            mohamed fayed
          </a>
        </div>
      </>
    );
}

export default Footer;