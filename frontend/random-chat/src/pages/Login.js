import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Login.module.css";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = () => {
    const url = "http://localhost:8000/random-chat/login";
    const bodyData = JSON.stringify({
      name: username,
      password: password,
    });
    fetch(url, {
      method: "PATCH",
      body: bodyData,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "OK") {
          router.push("/dashboard/" + username);
        }
      });
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <Head>
        <title>Random-chat-Signup</title>
      </Head>
      <div className={styles.body}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Login</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputs}
            type="text"
            placeholder="Username"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputs}
            type="password"
            placeholder="Password"
          />
          <Link className={styles.links} href="#">
            forgot password?
          </Link>

          <button onClick={login} className={styles.submit}>
            Submit
          </button>

          <div className={styles.AlreadyBlock}>
            <p>Don't have an account?</p>
            <Link className={styles.links} href="/">
              Signin.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
