import { useState } from "react";
import styles from "./Signup.module.css"

const Signup = () => {
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
          Sign up
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
          <div >
            <input
              type="password"
              placeholder="Confirm Password"
                          value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formLink} >
         
          </div>

          <div className={styles.field} >
            <button className="">
              Sign up
            </button>
          </div>
        </form>

        <div className={styles.formLink} >
          <span >
            Already have an account?{" "}
            <a href="#" >
              Login
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
              Sign up with Facebook
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
              Sign up with Google
            </span>
          </a>
        </div>
      </div>
    </section></div>
  );
};

export default Signup;
