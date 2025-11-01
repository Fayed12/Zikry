// react
import { useEffect, useState } from "react";

// react router
import { useNavigate } from "react-router";

// redux
import { useSelector, useDispatch } from "react-redux";

// toast
import toast from "react-hot-toast";

// local
import styles from "./home.module.css";
import { fetchData, updateData } from "../../redux/dataSlice";
import { ConfirmDialog } from "../../components/sweetAlert";

// react icons
import { MdFavoriteBorder } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { MdFavorite } from "react-icons/md";

function Home() {
  const { data, loading, error, updateLoading, updateDone, updateError } =
    useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [prayer, setPrayer] = useState({});
  const [randomNum, setRandomNum] = useState(
    Math.floor(Math.random() * data.length)
  );

  // fetch data
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // fetch random prayer
  useEffect(() => {
    setPrayer(data.at(randomNum));
  }, [data, data.length, randomNum]);

  // random process
  function tackRandomValue() {
    if (!data || data.length === 0) return;

    let newRandom;
    do {
      newRandom = Math.floor(Math.random() * data.length);
    } while (newRandom === randomNum);

    setRandomNum(newRandom);
  }

  // function handle add to favorite
  async function addToFavorite(prayerId) {
    for (const prayer of data) {
      if (prayer.id === prayerId) {
        if (!prayer.is_fav) {
          const confirmAdd = await ConfirmDialog({
            title: "هل تريد الإضافة إلى المفضلة؟",
            text: "سيتم تحديث حالته في قاعدة البيانات.",
            confirmText: "نعم، أضف",
            cancelText: "إلغاء",
          });

          if (confirmAdd) {
            dispatch(
              updateData({
                prayerId,
                updateValue: { is_fav: !prayer.is_fav },
              })
            );
          } else {
            toast.error("تم إلغاء العملية", { id: "home-toast" });
          }
        } else {
          const confirmRemove = await ConfirmDialog({
            title: "هل تريد الحذف من المفضلة؟",
            text: "سيتم تحديث حالته في قاعدة البيانات.",
            confirmText: "نعم، احذف",
            cancelText: "إلغاء",
          });

          if (confirmRemove) {
            dispatch(
              updateData({
                prayerId,
                updateValue: { is_fav: !prayer.is_fav },
              })
            );
          } else {
            toast.error("تم إلغاء العملية", { id: "home-toast" });
          }
        }
      }
    }
  }

  useEffect(() => {
    if (updateLoading) {
      toast.loading("loading...", { id: "home-toast" });
    }

    if (updateDone) {
      toast.success("done successfully", { id: "home-toast" });
    }

    if (updateError) {
      toast.error(`Error: ${updateError}`, { id: "home-toast" });
    }
  }, [updateLoading, updateDone, updateError]);

  return (
    <>
      {error === null ? (
        !loading ? (
          data && data.length !== 0 ? (
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
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={`${styles.button} ${styles.favoriteBtn}`}
                    onClick={() => addToFavorite(prayer.id)}
                    title="add to fav"
                  >
                    {prayer?.is_fav ? <MdFavorite /> : <MdFavoriteBorder />}
                  </button>
                  <button
                    className={`${styles.button} ${styles.nextBtn}`}
                    onClick={() => tackRandomValue()}
                    title="reload new prayer"
                  >
                    <TfiReload />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.container}>
              <div className={styles.prayerBox}>
                <h2 className={styles.boxHeader}>{error}</h2>
                <div className={styles.startButton}>
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/supplications", { replace: true })
                    }
                    title="start new prayer"
                  >
                    get started
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className={styles.container}>
            <div className={styles.prayerBox}>
              <h2 className={styles.boxHeader}>loading......</h2>
            </div>
          </div>
        )
      ) : (
        <div className={styles.container}>
          <div className={styles.prayerBox}>
            <h2 className={styles.boxHeader}>{error}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
