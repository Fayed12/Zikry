// react
import { useEffect, useState, useRef } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// toast
import toast from "react-hot-toast";

// local
import styles from "./editSupplication.module.css";
import { resetUpdateState, updateData } from "../../redux/dataSlice";

const EditSupplication = ({ funClose, supplication }) => {
  const { updateLoading, updateDone, updateError } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
    const [newValue, setNewValue] = useState({
        text: supplication.text,
        allNumber:supplication.number ,
    virtue: supplication.virtue,
    time: supplication.time,
  });
    const inpField = useRef()

  // check inputs
  function handleCheckInputValue() {
    if (!newValue.text) {
      toast.error("من فضلك اكتب نص الدعاء", { id: "home-toast" });
      return true;
    } else if (!newValue.virtue) {
      toast.error("من فضلك اكتب فضل الدعاء", { id: "home-toast" });
      return true;
    } else if (!newValue.time) {
      toast.error("من فضلك اكتب وقت الدعاء", { id: "home-toast" });
      return true;
    }
    return false;
  }

  // handle save new value
  function handleSaveNewValue() {
    if (handleCheckInputValue()) return;
    dispatch(
      updateData({
        prayerId: supplication.id,
          updateValue: {
            number: newValue.allNumber,
          text: newValue.text,
          virtue: newValue.virtue,
          time: newValue.time,
        },
      })
    );
    setTimeout(() => {
      funClose(false);
    }, 1500);
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
    
    useEffect(() => {
        inpField.current.focus();
    },[])
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>تعديل الدعاء</h2>

        <div className={styles.formGroup}>
          <label className={styles.label}>نص الدعاء</label>
          <textarea
            className={styles.textarea}
            value={newValue?.text || ""}
            ref={inpField}
            onChange={(e) => setNewValue({ ...newValue, text: e.target.value })}
          />
        </div>
        <div className={styles.formCol}>
          <label className={styles.label}>الفضل</label>
          <textarea
            className={styles.textarea}
            value={newValue?.virtue || ""}
            onChange={(e) =>
              setNewValue({ ...newValue, virtue: e.target.value })
            }
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formCol}>
            <label className={styles.label}>عدد الذكر او التسابيح</label>
            <input
              className={styles.input}
              type="number"
              value={newValue?.allNumber || ""}
              onChange={(e) =>
                setNewValue({ ...newValue, allNumber: e.target.value })
              }
            />
          </div>

          <div className={styles.formCol}>
            <label className={styles.label}>الوقت</label>
            <input
              className={styles.input}
              type="text"
              value={newValue?.time || ""}
              onChange={(e) =>
                setNewValue({ ...newValue, time: e.target.value })
              }
            />
          </div>
        </div>

        <div className={styles.buttonRow}>
          <button
            type="button"
            className={styles.saveBtn}
            onClick={() => handleSaveNewValue()}
          >
            حفظ
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => funClose(false)}
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSupplication;
