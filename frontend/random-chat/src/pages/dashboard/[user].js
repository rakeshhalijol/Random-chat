import { useRouter } from "next/router";
import React from "react";
import styles from "@/styles/Dashboard.module.css";
import Head from "next/head";
import Image from "next/image";
import FriendsList from "@/components/FriendsList";
const Dashboard = () => {
  const router = useRouter();
  console.log("data is", router.query.user);
  return (
    <>
      <Head>
        <title>{router.query.user}-Dashboard</title>
      </Head>
      <div className={styles.body}>
        <div className={styles.container}>
          <Image
            className={styles.profile}
            src="/default.png"
            alt="Couldn't load image"
            width={100}
            height={100}
          />
          <div className={styles.follow}>
            <h3>0</h3>
            <p>following</p>
          </div>
          <div className={styles.follow}>
            <h3>0</h3>
            <p>followers</p>
          </div>
        </div>
        <div className={styles.details}>
          <h2>{router.query.user}</h2>
        </div>
        <div>
          <button className={styles.followbtn}>Edit Profile</button>
          <button className={styles.followbtn}>Friends</button>
        </div>
        <FriendsList name={router.query.user} />
      </div>
    </>
  );
};

export default Dashboard;
