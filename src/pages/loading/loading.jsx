// local
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.page} aria-busy="true" aria-live="polite">
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.appName}>
            <div className={styles.logo}>
              <img src="/logo.png" alt="logo" />
            </div>
          </div>
        </div>

        <div className={styles.loaderWrap}>
          <div className={styles.dots}>
            <span />
            <span />
            <span />
          </div>
        </div>

        <p className={styles.hint}>جارٍ التحميل — استعد للهدوء والذكر</p>
      </div>
    </div>
  );
}
