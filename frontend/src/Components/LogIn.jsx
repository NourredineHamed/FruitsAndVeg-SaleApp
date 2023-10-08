import { useState } from "react";
import styles from "./Signup.module.css"
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
 
  };

  return (
    <div className={styles.bodySignup}>
    
    <section
      className={styles.container} 
    >
      <div className={styles.forms}>
        <header
          className={styles.formHeader}
        >
         Log In
        </header>
        <form onSubmit={handleLogin} >
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div >
            <input
              type="password"
              placeholder="Create Password"
           
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
         
          <div className={styles.formLink} >
            <a href="#" className={styles.formLink}>
              Forgot password?
            </a>
          </div>

          <div className={styles.field} >
            <button className="">
              Log In
            </button>
          </div>
        </form>

        <div className={styles.formLink} >
          <span >
            don't have an account?{" "}
            <a href="#" >
              Sign Up
            </a>
          </span>
        </div>

        

        <div className={styles.containerbuttons}>
          <a
            href="#"
            className={styles.facebooklink}
          >
            <img
              src="/images/facebook-circle-svgrepo-com.svg"
              alt=""
              className={styles.facebookimage}
            />
            <span >
              Log In with Facebook
            </span>
          </a>
        </div>

        <div >
          <a
            href="#"
            className={styles.googlelink}
          >
            <img
              src="/images/google.png"
              alt=""
              className={styles.googleimage}
            />
            <span >
              Log in with Google
            </span>
          </a>
        </div>
      </div>
    </section></div>
  );
};

export default Login;
