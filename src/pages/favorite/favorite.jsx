// redux
import { useSelector,useDispatch } from "react-redux";

// react router
import { NavLink } from "react-router";

// toast
import toast from "react-hot-toast";

// react
import { useEffect, useState } from "react";

// local
import styles from "./favorite.module.css";
import addToFavorite from "../../utils/addToFav";
import { fetchData, resetUpdateState } from "../../redux/dataSlice";

const Favorite = () => {
      const {
        data,
        updateLoading,
        updateDone,
        updateError,
      } = useSelector((state) => state.data);
    const dispatch = useDispatch();
  const [allFav, setAllFav] = useState([])
    const [loggedUser, setLoggedUser] = useState({});
    
    // function to remove form favorite
    function handleRemoveFromFav(id) {
        allFav.forEach((item) => {
            if (item.id === id) {
                addToFavorite(item.id , allFav, dispatch)
            }
        })
    }

      useEffect(() => {
        if (updateLoading) {
          toast.loading("...جاري التحديث", { id: "home-toast" });
        }

        if (updateDone) {
          toast.success("تم التحديث بنجاح", { id: "home-toast" });
          dispatch(resetUpdateState());
        }

        if (updateError) {
          toast.error(`Error: ${updateError}`, { id: "home-toast" });
          dispatch(resetUpdateState());
        }
      }, [updateLoading, updateDone, updateError, dispatch]);
    
    // fetch all data
    useEffect(() => {
        if (!data || data.length === 0) {
            if (loggedUser && loggedUser.id) {
              dispatch(fetchData(loggedUser.id));
            }
        }
    }, [data, data.length, dispatch, loggedUser]);
    
    useEffect(() => {
        if (data && data.length > 0) {
            const favData = data.filter((item) => {
                return item.is_fav === true;
            })
            setAllFav(favData)
        }
    }, [data]);
  
    useEffect(() => {
      const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));
      if (user) {
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
    </div>
  );
};

export default Favorite;
