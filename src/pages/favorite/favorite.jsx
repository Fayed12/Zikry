// redux
import { useSelector, useDispatch } from "react-redux";

// react router
import { NavLink } from "react-router";

// react
import { useEffect, useState } from "react";

// local
import styles from "./favorite.module.css";
import addToFavorite from "../../utils/addToFav";
import { fetchData, resetUpdateState } from "../../redux/dataSlice";
import { useUpdateToast } from "../../hooks/useActionToast";

const Favorite = () => {
  const { data, updateLoading, updateDone, updateError } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const [allFav, setAllFav] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  const [hasFetched, setHasFetched] = useState(false);
  useUpdateToast(updateLoading, updateDone, updateError, resetUpdateState);

  // function to remove form favorite
  function handleRemoveFromFav(id) {
    allFav.forEach((item) => {
      if (item.id === id) {
        addToFavorite(item.id, allFav, dispatch);
      }
    });
  }

  // fetch all data
  useEffect(() => {
    if (!hasFetched) {
      if (!data || data.length === 0) {
        if (loggedUser?.id) {
          dispatch(fetchData(loggedUser?.id));
          setHasFetched(true);
        }
      }
    }
  }, [data, dispatch, hasFetched, loggedUser]);

  useEffect(() => {
    if (data && data.length > 0) {
      const favData = data.filter((item) => {
        return item.is_fav === true;
      });
      setAllFav(favData);
    }
  }, [data]);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    const localUser = localStorage.getItem("user");

    const user = sessionUser
      ? JSON.parse(sessionUser)
      : localUser
      ? JSON.parse(localUser)
      : null;

    const hasUserData =
      user && typeof user === "object" && Object.keys(user).length > 0;

    if (hasUserData) {
      setLoggedUser(user);
    } else {
      setLoggedUser({});
    }
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>المفضلة</h1>
        <p className={styles.subtitle}>مجموعة الأدعية التي أضفتها للمفضلة</p>
      </header>

      {allFav && allFav.length > 0 ? (
        <section className={styles.grid}>
          {allFav.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardHead}>
                <h2 className={styles.cardTitle}>{item.type}</h2>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.cardText}>{item.text}</p>

                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>فضله</span>
                  <span className={styles.metaValue}>{item.virtue}</span>
                </div>
                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>الوقت</span>
                    <span className={styles.metaValue}>{item.time}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>العدد</span>
                    <span className={styles.metaValue}>{item.number}</span>
                  </div>
                </div>
              </div>

              <footer className={styles.cardFooter}>
                <button
                  className={styles.actionBtn}
                  onClick={() => handleRemoveFromFav(item.id)}
                >
                  إزالة
                </button>
                <button className={`${styles.actionBtn} ${styles.secondary}`}>
                  <NavLink to={"/supplications"} replace={true}>
                    كل الادعيه
                  </NavLink>
                </button>
              </footer>
            </article>
          ))}
        </section>
      ) : (
        <div className={styles.emptyContainer}>
          <div className={styles.empty}>
            <p>ابدا باضافة ادعيتك المفضله الان</p>
            <NavLink to={"/supplications"} replace={true}>
              كل الادعية
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;