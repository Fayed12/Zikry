// react
import { useState, useRef, useEffect } from "react";

// toast
import toast from "react-hot-toast";

// redux
import { useSelector, useDispatch } from "react-redux";

// uuid
import { v4 as uuidV4 } from "uuid";

// local
import styles from "./newSupplication.module.css";
import { addNewValue, resetAddNewValue } from "../../redux/dataSlice";

const NewSupplicationPopup = ({ funClose }) => {
  const { addNewSuppActions } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [allNumber, setAllNumber] = useState("");
  const [text, setText] = useState("");
  const [virtue, setVirtue] = useState("");
  const [time, setTime] = useState("");
  const inputFocus = useRef();

  // function handel empty fields
  function checkEmpty() {
    if (!title) {
      toast.error("من فضلك اكتب العنوان", { id: "new-toast" });
      return true;
    } else if (!text) {
      toast.error("من فضلك اكتب نص الدعاء", { id: "new-toast" });
      return true;
    } else if (!virtue) {
      toast.error("من فضلك اكتب فضل الدعاء", { id: "new-toast" });
      return true;
    } else if (!time) {
      toast.error("من فضلك اكتب وقت الدعاء المحبب", { id: "new-toast" });
      return true;
    }
    return false;
  }

  // function add new supplication
  function handleAddNew() {
    if (checkEmpty()) return;
    const newId = uuidV4();

    const newSupp = {
      id: newId,
      allNumber,
      title,
      text,
      virtue,
      time,
      is_fav: false,
    };
    dispatch(addNewValue(newSupp));
    setText("");
    setAllNumber("")
    setTime("");
    setTitle("");
    setVirtue("");
    setTimeout(() => {
      funClose(false);
    }, 1500);
  }

  useEffect(() => {
    if (addNewSuppActions.loading) {
      toast.loading("جار الإضافة...", { id: "home-toast" });
    } else if (addNewSuppActions.done) {
      toast.success("تمت الإضافة بنجاح 🎉", { id: "home-toast" });
      dispatch(resetAddNewValue());
    } else if (addNewSuppActions.error) {
      toast.error(`حدث خطأ: ${addNewSuppActions.error}`, {
        id: "home-toast",
      });
      dispatch(resetAddNewValue());
    }
  }, [
    addNewSuppActions.done,
    addNewSuppActions.error,
    addNewSuppActions.loading,
    dispatch,
  ]);

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <div className={styles.title}>إضافة دعاء جديد</div>
        <div className={styles.formGroup}>
          <label className={styles.label}>العنوان</label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={inputFocus}
            placeholder="اكتب عنوان الدعاء"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>عدد التسابيح او الذكر</label>
          <input
            className={styles.input}
            type="number"
            value={allNumber}
            onChange={(e) => setAllNumber(e.target.value)}
            placeholder="عدد التسابيح"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>الدعاء</label>
          <textarea
            className={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="اكتب نص الدعاء"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>فضل الدعاء</label>
          <input
            className={styles.input}
            type="text"
            value={virtue}
            onChange={(e) => setVirtue(e.target.value)}
            placeholder="اكتب فضل الدعاء"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>الوقت</label>
          <input
            className={styles.input}
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="اكتب وقت الدعاء"
          />
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.addBtn} onClick={() => handleAddNew()}>
            إضافة
          </button>
          <button className={styles.cancelBtn} onClick={() => funClose(false)}>
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSupplicationPopup;
