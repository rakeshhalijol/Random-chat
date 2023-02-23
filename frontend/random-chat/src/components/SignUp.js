import React, { useState } from "react";
import styles from "@/styles/SignUp.module.css";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [confirmPassword, setConfirmPassword] = useState("");
  const submitData = () => {
    if (password === confirmPassword) {
      const url = "http://localhost:8000/random-chat/signin";
      const bodyData = JSON.stringify({
        name: username,
        email: email,
        phonenumber: phonenumber,
        password: password,
      });
      fetch(url, {
        method: "POST",
        body: bodyData,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status === "OK") {
            router.push("/Login");
          }
        });
    }
    setUsername("");
    setEmail("");
    setPhonenumber("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Head>
        <title>Random-chat-Signup</title>
      </Head>
      <div className={styles.body}>
        <div className={styles.container}>
          <h2>Signup</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputs}
            type="text"
            placeholder="Username"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputs}
            type="text"
            placeholder="E-Mail"
          />
          <input
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            className={styles.inputs}
            type="text"
            placeholder="Phone Number"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={styles.inputs}
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className={styles.inputs}
            type="password"
            placeholder="Confirm Password"
          />
          <Link href="Login">
            <button onClick={submitData} className={styles.submit}>
              Submit
            </button>
          </Link>
          <div className={styles.AlreadyBlock}>
            <p>Already have an account?</p>
            <Link className={styles.links} href="Login">
              Login.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
