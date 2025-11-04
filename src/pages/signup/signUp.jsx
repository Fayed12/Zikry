// react router
import { NavLink } from "react-router";
import { useNavigate } from "react-router";

// react icons
import { TbArrowBackUpDouble } from "react-icons/tb";

// react hook form
import { useForm } from "react-hook-form";

// toast
import toast from "react-hot-toast";

// react
import { useEffect, useState } from "react";

// local
import styles from "./signup.module.css";
import { supabase } from "../../supabaseClient";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const [latestUsers, setLatestUsers] = useState([]);

  // handle submit data
async function submit(data) {
  const existingUser = latestUsers.find((user) => user.email === data.email);

  if (existingUser) {
    toast.error("This user already exists, try another email");
    return;
  }

  const loadingToast = toast.loading("Creating account...");

  try {
    const { error } = await supabase.from("users").insert([
      {
        name: data.name,
        userName: data.userName,
        email: data.email,
        role: "user",
        password: data.password,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("Something went wrong", { id: loadingToast });
      return;
    }

    toast.success("Sign up successfully", { id: loadingToast });
    reset();
    navigate("/login", { replace: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error("Unexpected error occurred", { id: loadingToast });
  }
}


  // fetch all users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
          console.error(error);
        }
        setLatestUsers(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join us to explore more supplications</p>

        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              {...register("name", {
                required: "Name required*",
                pattern: {
                  value: /^[A-Za-z]+ [A-Za-z]+$/,
                  message: "Name must consist of two words*",
                },
              })}
              placeholder="Full Name"
              className={styles.input}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
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

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="userName"
              {...register("userName", {
                required: "Username required*",
                pattern: {
                  value: /^[A-Za-z0-9_]{3,}$/,
                  message: "Enter one word, minimum 3 char*",
                },
              })}
              placeholder="Username"
              className={styles.input}
            />
            {errors.userName && (
              <p className="error-message">{errors.userName.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: "Password required*",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Min 8 chars, include upper, lower, number & symbol*",
                },
              })}
              placeholder="Password"
              className={styles.input}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password required*",
                validate: (value) => {
                  const pw = getValues("password");
                  return value === pw || "Passwords do not match*";
                },
              })}
              placeholder="Confirm Password"
              className={styles.input}
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>
        </form>

        <div className={styles.links}>
          <p className={styles.loginText}>
            Already have an account?{" "}
            <NavLink to="/login" replace={true} className={styles.loginLink}>
              Login
            </NavLink>
          </p>
        </div>
        <div className={styles.back}>
          <NavLink to={"/home"} replace={true} title=" back to home">
            <TbArrowBackUpDouble />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
