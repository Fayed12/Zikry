// react
import { useRef, useEffect } from "react";

// react hook form
import { useForm } from "react-hook-form";

// emailJs
import emailJs from "@emailjs/browser";

// toast
import toast from "react-hot-toast";

// local
import styles from "./contact.module.css";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();
  const form = useRef();

  // handle submit message
  function submit() {
    toast.loading("جاري الارسال", { id: "contact-toast" });
    setTimeout(() => {
      emailJs
        .sendForm(
          "service_4f0ulir",
          "template_9tqatcr",
          form.current,
          "gUIIilNZ0XS0cBOeU"
        )
        .then(
          () => {
            toast.success(" تم إرسال الرسالة بنجاح!", {
              id: "contact-toast",
            });
            reset();
          },
          (error) => {
            toast.error(" فشل في الإرسال، حاول مرة أخرى.", {
              id: "contact-toast",
            });
            console.error(error);
          }
        );
    }, 1500);
  }

//   focus to input in mount
    useEffect(() => {
      setFocus("username");
    }, [setFocus]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>تواصل معنا</h1>
          <p className={styles.subtitle}>
            نحن هنا للاستماع إليك — اكتب رسالتك وسنرد عليك قريباً
          </p>
        </header>

        <form
          className={styles.form}
          ref={form}
          onSubmit={handleSubmit(submit)}
        >
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>الاسم</label>
              <input
                className={styles.input}
                type="text"
                {...register("username", {
                  required: "الاسم مطلوب",
                  minLength: {
                    value: 3,
                    message: "الاسم يجب أن يكون 3 أحرف على الأقل",
                  },
                })}
                placeholder="اسمك الكامل"
              />
              {errors.username && (
                <p className={styles.error}>{errors.username.message}</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>الهاتف</label>
              <input
                className={styles.input}
                type="tel"
                placeholder="مثال: 0100xxxxxxx"
                {...register("phone", {
                  required: "الرقم مطلوب",
                  pattern: {
                    value: /^01[0-2,5]{1}[0-9]{8}$/,
                    message: "اكتب رقم صحيح من فضلك",
                  },
                })}
              />
              {errors.phone && (
                <p className={styles.error}>{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>البريد الإلكتروني</label>
            <input
              className={styles.input}
              type="email"
              placeholder="example@gmail.com"
              {...register("userEmail", {
                required: "الإيميل مطلوب",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "يُسمح فقط بإيميلات جوجل جيميل",
                },
              })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>الرسالة</label>
            <textarea
              className={styles.textarea}
              placeholder="اكتب رسالتك هنا..."
              {...register("message", {
                required: "الرسالة مطلوبة",
                minLength: { value: 10, message: "الرسالة قصيرة جدًا" },
              })}
            ></textarea>
            {errors.message && (
              <p className={styles.error}>{errors.message.message}</p>
            )}
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.sendBtn}>
              إرسال
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => reset()}
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
