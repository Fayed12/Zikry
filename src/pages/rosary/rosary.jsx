// react
import { useEffect, useState } from "react";

// react icons
import { IoRefreshOutline } from "react-icons/io5";
import { FaSave } from "react-icons/fa";

// toast
import toast from "react-hot-toast";

// local
import styles from "./rosary.module.css";
import { supabase } from "../../supabaseClient";

const Rosary = () => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState("");

  // handel increase value
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  // handle reset counter
  const handleReset = () => {
    setCount(0);
  };

  // handle save count to database
  async function handleSave() {
    toast.loading("جاري التحميل....", { id: "rosary-toast" });
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ rosary_count: count })
        .eq("id", userId)
        .select();
      if (error) {
        console.log(error);
        toast.error("حدث خطا ", { id: "rosary-toast" });
      }
      toast.success("تم الحفظ", { id: "rosary-toast" });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
    console.log("Progress saved:", count);
  }

  // fetch user id in mount
  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      setUserId(user.id);
    }
  }, []);

  // handel get user rosary count
  useEffect(() => {
    if (userId) {
      async function fetchUsers() {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId);
          if (error) {
            console.error(error);
          }
          let counter = data.at(0).rosary_count;
          setCount(counter);
        } catch (err) {
          console.log(err);
        }
      }
      fetchUsers();
    }
  }, [userId]);

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
