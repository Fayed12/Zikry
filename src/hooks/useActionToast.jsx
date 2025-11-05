// toast
import { useEffect } from "react";

// toast
import toast from "react-hot-toast";

// redux
import { useDispatch } from "react-redux";

export const useUpdateToast = (loading, done, error, resetAction) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      toast.loading("جاري التحميل ...", { id: "home-toast" });
    }

    if (done) {
      toast.success("تم بنجاح", { id: "home-toast" });
      dispatch(resetAction());
    }

    if (error) {
      toast.error(`Error: ${error}`, { id: "home-toast" });
      dispatch(resetAction());
    }
  }, [loading, done, error, dispatch, resetAction]);
};
