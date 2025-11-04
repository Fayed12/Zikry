// react
import { useState } from "react";

// react router
import { NavLink } from "react-router";

// local
import styles from "./forgotPassword.module.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

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
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={styles.input}
                  required
                />
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
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="New Password"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => setStep(1)}
                >
                  Save
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
