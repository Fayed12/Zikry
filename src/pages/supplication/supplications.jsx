// react
import { useEffect, useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// react icons
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

// toast
import toast from "react-hot-toast";

// local
import styles from "./supplications.module.css";
import { fetchData, resetUpdateState } from "../../redux/dataSlice";
import addToFavorite from "../../utils/addToFav";
import { deleteData } from "../../redux/dataSlice";
import { ConfirmDialog } from "../../components/sweetAlert";
import { resetDeleteState } from "../../redux/dataSlice";
import NewSupplicationPopup from "../../components/newSupplicationPopup/newSupplicationPopup";

function Supplications() {
  const {
    data,
    loading,
    error,
    updateLoading,
    updateDone,
    updateError,
    deleteActions,
  } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [supplicationsValues, setSupplicationsValues] = useState([]);
  const [openPopup, setOpenPopup] = useState(false)

  // update value
  function handleUpdate(id) {
    console.log("Update clicked for id:", id);
  }

  // add to favorite
  async function handleAddToFavorite(id, data, dispatch) {
    await addToFavorite(id, data, dispatch);
  }

    useEffect(() => {
      if (updateLoading) {
        toast.loading("loading...", { id: "home-toast" });
      }

      if (updateDone) {
        toast.success("done successfully", { id: "home-toast" });
        dispatch(resetUpdateState());
      }

      if (updateError) {
        toast.error(`Error: ${updateError}`, { id: "home-toast" });
        dispatch(resetUpdateState());
      }
    }, [updateLoading, updateDone, updateError, dispatch]);

  // delete value
  async function handleDelete(prayerId) {
    for (const prayer of data) {
      if (prayer.id === prayerId) {
          const confirmAdd = await ConfirmDialog({
            title: "هل تريد حذف الدعاء؟",
            text: "سيتم تحديث حالته في قاعدة البيانات.",
            confirmText: "نعم",
            cancelText: "إلغاء",
          });

        if (confirmAdd) {
            dispatch(deleteData(prayerId));
            toast.success("تم الحذف بنجاح", { id: "home-toast" });
            const newData = data.filter((prayer) => {
              return prayer.id !== prayerId
            })
            setSupplicationsValues(newData);
          } else {
            toast.error("تم إلغاء العملية", { id: "home-toast" });
          }
      }
    }
  };

  // handel open popup
  function handelOpenPopup() {
    toast("من فضلك اكتب دعاء بصيغه جيده احتراماً لدينك", { id: "home-toast" });
    setTimeout(() => {
      setOpenPopup(true)
    }, 2000);
  }

useEffect(() => {
  if (deleteActions.loading) {
    toast.loading("جارٍ الحذف...", { id: "home-toast" });
  } else if (deleteActions.done) {
    toast.success("تم الحذف بنجاح", { id: "home-toast" });
    dispatch(resetDeleteState()); 
  } else if (deleteActions.error !== null) {
    toast.error(deleteActions.error, { id: "home-toast" });
    dispatch(resetDeleteState());
  } 
}, [deleteActions, dispatch]);


  // fetch data
  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchData());
    }
  }, [data, data.length, dispatch]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSupplicationsValues(data);
    }
  }, [data]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.addButton}
          onClick={() => handelOpenPopup()}
        >
          إضافة دعاء جديد +
        </button>
      </div>

      {error === null ? (
        !loading ? (
          data && data.length !== 0 ? (
            <div key={data.id} className={styles.cardsGrid}>
              {supplicationsValues.map((supplication) => (
                <div key={supplication.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{supplication.title}</h3>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.section}>
                      <div className={styles.sectionTitleContainer}>
                        <h4 className={styles.sectionTitle}> الدعاء</h4>
                      </div>
                      <p className={styles.sectionText}>{supplication.text}</p>
                    </div>

                    <div className={styles.section}>
                      <div className={styles.sectionTitleContainer}>
                        <h4 className={styles.sectionTitle}>فضله</h4>
                      </div>
                      <p className={styles.sectionText}>
                        {supplication.virtue}
                      </p>
                    </div>

                    <div className={styles.section}>
                      <div className={styles.sectionTitleContainer}>
                        <h4 className={styles.sectionTitle}>الوقت</h4>
                      </div>
                      <p className={styles.sectionText}>{supplication.time}</p>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    {!supplication.is_fav ? (
                      <button
                        className={`${styles.actionButton} ${styles.favoriteBtn}`}
                        onClick={() =>
                          handleAddToFavorite(supplication.id, data, dispatch)
                        }
                        title="add to favorite"
                      >
                        <MdFavoriteBorder />
                      </button>
                    ) : (
                      <button
                        className={`${styles.actionButton} ${styles.favoriteBtn}`}
                        onClick={() =>
                          handleAddToFavorite(supplication.id, data, dispatch)
                        }
                        title="remove from favorite"
                      >
                        <MdFavorite />
                      </button>
                    )}
                    <button
                      className={`${styles.actionButton} ${styles.updateBtn}`}
                      onClick={() => handleUpdate(supplication.id)}
                      title="edit"
                    >
                      <CiEdit />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteBtn}`}
                      onClick={() => handleDelete(supplication.id)}
                      title="delete"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.stateContainer}>
              <div className={styles.stateEmpty}>
                ابدأ بتنظيم ادعيتك وتخزينها في مكان واحد
              </div>
            </div>
          )
        ) : (
          <div className={styles.stateContainer}>
            <div className={styles.stateLoading}>جارٍ التحميل...</div>
          </div>
        )
      ) : (
          <div className={styles.stateContainer}>
            <div className={styles.stateError}>{error}</div>
          </div>
      )}
      {openPopup && (
        <NewSupplicationPopup
          funClose={setOpenPopup}
          setAllData={setSupplicationsValues}
          supplication={supplicationsValues}
        />
      )}
    </div>
  );
}

export default Supplications;
