// src/components/sweetAlert.jsx
import Swal from "sweetalert2";

export async function ConfirmDialog({
  title = "هل أنت متأكد؟",
  text = "لن يمكنك التراجع بعد ذلك!",
  confirmText = "تأكيد",
  cancelText = "إلغاء",
}) {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    buttonsStyling: false,
    customClass: {
      popup: "custom-swal-popup",
      title: "custom-swal-title",
      htmlContainer: "custom-swal-text",
      confirmButton: "custom-swal-confirm",
      cancelButton: "custom-swal-cancel",
    },
  });

  return result.isConfirmed;
}
