"use client";
import app from "@/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import UserInfo from "../components/userInfo/UserInfo";

const ProfilePage = ({ params }) => {
  const db = getFirestore(app);

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    // console.log(params.userId.replace("%40", "@"));
    if (params) {
      getUserInfo(params.userId.replace("%40", "@"));
    }
  }, []);

  const getUserInfo = async (email) => {
    const docRef = doc(db, "users", params.userId.replace("%40", "@"));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
    } else {
      console.log("No Such document");
    }
  };

  return (
    <>
      <div>{userInfo ? <UserInfo userInfo={userInfo} /> : null}</div>
    </>
  );
};

export default ProfilePage;
