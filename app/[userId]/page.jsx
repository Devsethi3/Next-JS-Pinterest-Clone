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
import NoPost from "../components/noPost/NoPost";

const ProfilePage = ({ params }) => {
  const db = getFirestore(app);

  const [userInfo, setUserInfo] = useState();
  const [listOfPins, setListOfPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user pins:", error);
      setError(error);
    }
  };

  return (
    <>
      {userInfo && <UserInfo userInfo={userInfo} />}
      {userInfo && listOfPins.length === 0 && <NoPost title="Pins" />}
      {userInfo && listOfPins.length > 0 && (
        <div>
          <PinList listOfPins={listOfPins} />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
