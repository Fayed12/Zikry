// react router
import { NavLink } from "react-router";

// local
import styles from "./login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Continue your spiritual journey</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
            />
          </div>

          <div className={styles.rememberForgot}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Remember me!</span>
            </label>
            {/* <NavLink to="/forgotPassword" replace={ true}  className={styles.forgotPassword}>
              Forgot Password?
            </NavLink> */}
            <a href="#" className={styles.forgotPassword}>
              forgot password?
            </a>
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
      </div>
    </div>
  );
};

export default Login;
