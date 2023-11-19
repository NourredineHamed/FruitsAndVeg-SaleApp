import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Sending login request...");
  
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });
  
      console.log("Login request sent.", response);
  
      if (response.ok) {
        const contentType = response.headers.get("content-type");
  
        console.log("Response Content Type:", contentType);
  
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          const token = data.access_token;
          const userRole = data.role;
  
          console.log("Login successful. Data:", data);
  
          localStorage.setItem("token", token);
          localStorage.setItem("userRole", userRole);
  
          console.log("Login successful. Role:", userRole);
  
          if (userRole === "user") {
            navigate("/");
          } else if (userRole === "admin") {
            navigate("/productinterface");
          } else {
            console.error("Unknown user role:", userRole);
          }
        } else {
          console.error("Unexpected response content type:", contentType);
        }
      } else {
        const errorText = await response.text();
        console.error("Login failed:", errorText);
        throw new Error(`Login failed: ${errorText}`);
      }
    } catch (error) {
      console.error("Error during Login:", error.message);
    }
  };
  
  
  

  return (
    <div className={styles.bodySignup}>
      <section className={styles.container}>
        <div className={styles.forms}>
          <header className={styles.formHeader}>Log In</header>
          <form onSubmit={handleLogin}>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.formLink}>
              <a href="#" className={styles.formLink}>
                Forgot password?
              </a>
            </div>

            <div className={styles.field}>
              <button type="submit">Log In</button>
            </div>
          </form>

          <div className={styles.formLink}>
            <span>
              don't have an account? <a href="#">Sign Up</a>
            </span>
          </div>

          <div className={styles.containerbuttons}>
            <a href="#" className={styles.facebooklink}>
              <img
                src="/images/facebook-circle-svgrepo-com.svg"
                alt=""
                className={styles.facebookimage}
              />
              <span>Log In with Facebook</span>
            </a>
          </div>

          <div>
            <a href="#" className={styles.googlelink}>
              <img
                src="/images/google.png"
                alt=""
                className={styles.googleimage}
              />
              <span>Log in with Google</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
