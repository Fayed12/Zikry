// react
import { useState } from "react";

// local
import styles from "./rosary.module.css";

// react icons
import { IoRefreshOutline } from "react-icons/io5";
import { FaSave } from "react-icons/fa";

const Rosary = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleSave = () => {
    // Save functionality can be implemented here
    console.log("Progress saved:", count);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>المِسبَحة الإلكترونية</h1>
        <p className={styles.subtitle}>
          أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
        </p>
      </div>

      <div className={styles.counterSection}>
        <div className={styles.counterWrapper} onClick={handleIncrement}>
          <div className={styles.counter}>
            <span className={styles.count}>{count}</span>
          </div>
          <p className={styles.tapText}>انقر للتسبيح</p>
        </div>

        <div className={styles.controls}>
          <button
            className={`${styles.controlButton} ${styles.resetButton}`}
            onClick={handleReset}
            title="إعادة التعيين"
          >
            <IoRefreshOutline />
          </button>

          <button
            className={`${styles.controlButton} ${styles.saveButton}`}
            onClick={handleSave}
            title="حفظ التقدم"
          >
            <FaSave />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rosary;
