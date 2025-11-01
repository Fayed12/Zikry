import { ConfirmDialog } from "../components/sweetAlert";
import toast from "react-hot-toast";
import { updateData } from "../redux/dataSlice";

async function addToFavorite(prayerId, data, dispatch) {
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

export default addToFavorite