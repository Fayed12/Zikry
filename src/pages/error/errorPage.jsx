// local
import { NavLink } from "react-router";
import styles from "./errorPage.module.css";

function ErrorPage({
  message = "حدث خطأ ما",
  subtitle = "حاول إعادة التحميل أو العودة إلى الصفحة الرئيسية",
}) {
  return (
    <div className={styles.container}>
      <div className={styles.card} role="alert">
        <div className={styles.icon} aria-hidden>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#efccac"
              strokeWidth="2"
              fill="#fff3ea"
            />
            <path
              d="M12 7v6"
              stroke="#69421e"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16h.01"
              stroke="#69421e"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={styles.message}>{message}</h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.actions}>
          <button
            className={styles.primary}
            onClick={() => window.location.reload()}
          >
            إعادة تحميل
          </button>
          <NavLink to={"/home"} replace={true} className={styles.link}>
            العودة إلى الرئيسية
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
