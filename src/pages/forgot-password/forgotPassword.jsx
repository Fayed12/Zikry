// react
import { useEffect, useState } from "react";

// react router
import { NavLink , useNavigate} from "react-router";

// react hook form
import { useForm } from "react-hook-form";

// local
import styles from "./forgotPassword.module.css";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm({ mode: "onChange" });
  const [step, setStep] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [correctUserId, setCorrectUserId] = useState("");
  const navigate = useNavigate()

  // check if email correct
  function handleCheckEmail(data) {
    const user = allUsers.find((user) => user.email === data.email);
    if (user) {
      toast.loading("loading......", { id: "forgot-toast" });
      setTimeout(() => {
        toast.success("email is correct", { id: "forgot-toast" })
        setCorrectUserId(user.id)
        reset()
      }, 1000);
      setTimeout(() => {
        setStep(2);
      }, 1500);
    } else {
      toast.error("email is incorrect, try again", { id: "forgot-toast" });
    }
  }

  // function handle change password
  async function handleChangePassword(newPassword) {
    if (newPassword.password) {
      toast.loading("loading....", { id: "forgot-toast" });
      try {
        const { error } = await supabase
          .from("users")
          .update({ password: newPassword.password.trim() })
          .eq("id", correctUserId)
          .select();
        toast.success("update successfully", { id: "forgot-toast" });
        reset();
        navigate("/login" , {replace: true})
        if (error) {
          console.log(error);
          toast.error("something wend wrong", { id: "forgot-toast" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // fetch all data first
  useEffect(() => {
    async function fetchUsers() {
          try {
            const { data, error } = await supabase.from("users").select("*");
            if (error) {
              console.error(error);
            }
            setAllUsers(data);
          } catch (err) {
            console.log(err);
          }
        }
        fetchUsers();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        {step === 1 && (
          <>
            <h1 className={styles.title}>Forgot Password</h1>
            <p className={styles.subtitle}>
              Enter your email to reset your password
            </p>
            <form
              className={styles.form}
              onSubmit={handleSubmit(handleCheckEmail)}
            >
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email required*",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: "Only Google Gmail is allowed*",
                    },
                  })}
                  placeholder="Email Address"
                  className={styles.input}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>
              <button type="submit" className={styles.submitButton}>
                Check Email
              </button>
            </form>
            <div className={styles.links}>
              <NavLink to="/login" replace={true} className={styles.backLink}>
                Back to Login
              </NavLink>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className={styles.title}>Change Password</h1>
            <p className={styles.subtitle}>Enter your new password below</p>
            <form
              className={styles.form}
              onSubmit={handleSubmit(handleChangePassword)}
            >
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password required*",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Min 8 chars, include upper, lower, number & symbol*",
                    },
                  })}
                  placeholder="New Password"
                  className={styles.input}
                />
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm Password required*",
                    validate: (value) => {
                      const pw = getValues("password");
                      return value === pw || "Passwords do not match*";
                    },
                  })}
                  placeholder="Confirm New Password"
                  className={styles.input}
                />
                {errors.confirmPassword && (
                  <p className="error-message">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.saveButton}>
                  Update
                </button>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;