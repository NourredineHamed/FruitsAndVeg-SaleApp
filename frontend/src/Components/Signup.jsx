import { useState } from "react";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const navigate =useNavigate(); 
  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Sending signup request...");
  
      // Extract username from the email by splitting at '@'
      const username = email.split('@')[0];
  
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username, // Include the extracted username in the request
        }),
      });
  
      console.log("Signup request sent.");
  
      if (response.ok) {
        const contentType = response.headers.get("content-type");
  
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          const token = data.access_token;
          console.log("Signup successful. Token:", token);
          navigate("/"); // Redirect to the desired location
        } else {
          const token = await response.text();
          console.log("Signup successful. Token:", token);
          navigate("/"); // Redirect to the desired location
        }
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error during Signup:", error.message);
    }
  };
  

    
  
  

  return (
    <div className={styles.bodySignup}>
      <section className={styles.container}>
        <div className={styles.forms}>
          <header className={styles.formHeader}>Sign up</header>
          <form onSubmit={handleSignup}>
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
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <button type="submit">Sign up</button>
            </div>
          </form>

          <div className={styles.formLink}>
            <span>
              Already have an account? <a href="#">Login</a>
            </span>
          </div>

          <div className={styles.containerbuttons}>
            <a href="#" className={styles.facebooklink}>
              <img
                src="/images/facebook-circle-svgrepo-com.svg"
                alt=""
                className={styles.facebookimage}
              />
              <span>Sign up with Facebook</span>
            </a>
          </div>

          <div>
            <a href="#" className={styles.googlelink}>
              <img
                src="/images/google.png"
                alt=""
                className={styles.googleimage}
              />
              <span>Sign up with Google</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
