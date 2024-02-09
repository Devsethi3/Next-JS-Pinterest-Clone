"use client";
import app from "@/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import UserInfo from "../components/userInfo/UserInfo";
import PinList from "../components/Pins/PinList";
import { useSession } from "next-auth/react";

const ProfilePage = ({ params }) => {
  const db = getFirestore(app);

  const [userInfo, setUserInfo] = useState();
  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    if (params) {
      getUserInfo(params.userId.replace("%40", "@"));
    }
  }, [params]);

  const getUserInfo = async (email) => {
    const docRef = doc(db, "users", params.userId.replace("%40", "@"));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
    } else {
      console.log("No Such document");
    }
  };

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      getUserPins();
    }
  }, [session]);

  const getUserPins = async () => {
    try {
      const q = query(
        collection(db, "pinterest-post"),
        where("email", "==", session?.user?.email)
      );
      const querySnapshot = await getDocs(q);
      const pinsData = querySnapshot.docs.map((doc) => doc.data());
      setListOfPins(pinsData);
    } catch (error) {
      console.error("Error fetching user pins:", error);
    }
  };

  return (
    <>
      {userInfo ? (
        <div>
          <UserInfo userInfo={userInfo} />
          <PinList listOfPins={listOfPins} />
        </div>
      ) : null}
    </>
  );
};

export default ProfilePage;
