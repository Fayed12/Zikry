// react router
import { NavLink } from "react-router";
import { useNavigate } from "react-router";

// react hook form
import { useForm } from "react-hook-form";

// react icons
import { TbArrowBackUpDouble } from "react-icons/tb";

// react
import { useEffect, useState } from "react";

// toast
import toast from "react-hot-toast";

// local
import styles from "./login.module.css";
import { supabase } from "../../supabaseClient";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  // check user
  function submit(data) {
    const correctUser = allUsers.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (correctUser) {
      toast.loading("loading....", { id: "login-toast" });
      setTimeout(() => {
        // eslint-disable-next-line no-unused-vars
        const { password, ...safeUser } = correctUser;

        toast.success("login successfully", { id: "login-toast" });
        sessionStorage.setItem("loginStatus", true);
        if (data.checkbox) {
          localStorage.setItem("user", JSON.stringify(safeUser));
        } else {
          sessionStorage.setItem("user", JSON.stringify(safeUser));
        }
      }, 1500);
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 2000);
    } else {
      toast.error("email or password is incorrect, try again", {
        id: "login-toast",
      });
    }
  }

  // fetch all users first
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
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Continue your spiritual journey</p>

        <form className={styles.form} onSubmit={handleSubmit(submit)}>
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
              type="password"
              name="password"
              {...register("password", {
                required: "Password required*",
              })}
              placeholder="Password"
              className={styles.input}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className={styles.rememberForgot}>
            <label className={styles.rememberMe}>
              <input type="checkbox" {...register("checkbox")} />
              <span>Remember me!</span>
            </label>
            <NavLink
              to="/forgotPassword"
              replace={true}
              className={styles.forgotPassword}
            >
              Forgot Password?
            </NavLink>
          </div>

          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>

        <div className={styles.signupSection}>
          <p className={styles.signupText}>
            Don't have an account?{" "}
            <NavLink to="/signUp" replace={true} className={styles.signupLink}>
              Sign Up
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

export default Login;
