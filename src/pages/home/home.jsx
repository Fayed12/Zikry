// import { useEffect } from "react";
// import { supabase } from "../../supabaseClient";
import styles from "./home.module.css"

// react icons
import { GrFavorite } from "react-icons/gr";
import { TfiReload } from "react-icons/tfi";

function Home() {

  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>مرحباً بك في موقع ذكرى</h1>
      
      <div className={styles.prayerBox}>
        <h2 className={styles.boxHeader}>الدعاء العشوائي</h2>
        
        <div className={styles.prayerContent}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>نص الدعاء</h3>
            <p className={styles.prayerText}>
              "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى، وَالْعَفَافَ وَالْغِنَى"
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>الفضل من الذكر</h3>
            <p className={styles.virtueText}>
              من قاله في الصباح والمساء كان من المستجاب دعائهم
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>وقت الذكر</h3>
            <p className={styles.timeText}>الصباح والمساء</p>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.favoriteBtn}`}>
            <GrFavorite/>
          </button>
          <button className={`${styles.button} ${styles.nextBtn}`}>
           <TfiReload/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home;