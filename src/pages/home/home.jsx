// react
import { useEffect, useState } from "react";

// react router
import { useNavigate } from "react-router";

// redux
import { useSelector, useDispatch } from "react-redux";
import { fetchData, resetUpdateState } from "../../redux/dataSlice";

// local
import styles from "./home.module.css";
import addToFavorite from "../../utils/addToFav";
import { useUpdateToast } from "../../hooks/useActionToast";

// react icons
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux data
  const { data, loading, error, updateLoading, updateDone, updateError } =
    useSelector((state) => state.data);

  // Local states
  const [prayer, setPrayer] = useState({});
  const [randomNum, setRandomNum] = useState(0);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  useUpdateToast(updateLoading, updateDone, updateError, resetUpdateState);

  /* --------------------------------------------------
   🧩 1. Get logged user + login status on mount
  -------------------------------------------------- */
  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    const localUser = localStorage.getItem("user");

    const user = sessionUser
      ? JSON.parse(sessionUser)
      : localUser
      ? JSON.parse(localUser)
      : null;

    const status =
      sessionStorage.getItem("loginStatus") ||
      localStorage.getItem("loginStatus");

    const hasUserData =
      user && typeof user === "object" && Object.keys(user).length > 0;

    if (hasUserData && status === "true") {
      setLoggedUser(user);
      setLoginStatus(true);
    }
  }, []);


  /* --------------------------------------------------
   🧩 2. Fetch data for this user
  -------------------------------------------------- */
  useEffect(() => {
    if (!data || data.length === 0) {
      if (loggedUser?.id) {
        dispatch(fetchData(loggedUser.id));
      }
    }
  }, [data, dispatch, loggedUser]);

  /* --------------------------------------------------
   🧩 3. Select random prayer
  -------------------------------------------------- */
  useEffect(() => {
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setRandomNum(randomIndex);
      setPrayer(data[randomIndex]);
    }
  }, [data]);

  /* --------------------------------------------------
   ⚙️ Functions
  -------------------------------------------------- */
  const tackRandomValue = () => {
    if (!data?.length) return;
    let newRandom;
    do {
      newRandom = Math.floor(Math.random() * data.length);
    } while (newRandom === randomNum);
    setRandomNum(newRandom);
    setPrayer(data[newRandom]);
  };

  const handleAddToFavorite = async (id) => {
    await addToFavorite(id, data, dispatch);
  };

  /* --------------------------------------------------
   🖥️ UI RENDER
  -------------------------------------------------- */

  // Not logged in
  if (!loginStatus || data.length == 0) {
    return (
      <div className={styles.supContainer}>
        <div className={styles.prayerBox}>
          <h1 className={styles.startMessage}>Welcome in Zikry</h1>
          <p className={styles.startSupMessage}>
            Start managing your supplications
          </p>
          <button
            className={styles.getStartButton}
            onClick={() => navigate("/login", { replace: true })}
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading)
    return (
      <div className={styles.container}>
        <div className={styles.loadingBox}>
          <h2 className={styles.boxHeader}>Loading...</h2>
        </div>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className={styles.container}>
        <div className={styles.prayerBox}>
          <h2 className={styles.boxHeader}>{error}</h2>
        </div>
      </div>
    );

  // No data state
  if (!data?.length)
    return (
      <div className={styles.container}>
        <div className={styles.prayerBox}>
          <h2 className={styles.boxHeader}>لا توجد أدعية بعد</h2>
          <button
            className={styles.getStartButton}
            onClick={() => navigate("/supplications", { replace: true })}
          >
            أضف الآن
          </button>
        </div>
      </div>
    );

  // Main content
  return (
    <div className={styles.container}>
      <div className={styles.prayerBox}>
        <h2 className={styles.boxHeader}>الدعاء العشوائي</h2>

        <div className={styles.prayerContent}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>نص الدعاء</h3>
            <p className={styles.prayerText}>{prayer?.text}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>الفضل من الذكر</h3>
            <p className={styles.virtueText}>{prayer?.virtue}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>وقت الذكر</h3>
            <p className={styles.timeText}>{prayer?.time}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>عدد الذكر</h3>
            <p className={styles.timeText}>{prayer?.number}</p>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${styles.favoriteBtn}`}
            onClick={() => handleAddToFavorite(prayer.id)}
            title="add or remove from favorite"
          >
            {prayer?.is_fav ? <MdFavorite /> : <MdFavoriteBorder />}
          </button>

          <button
            className={`${styles.button} ${styles.nextBtn}`}
            onClick={tackRandomValue}
            title="reload new prayer"
          >
            <TfiReload />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
