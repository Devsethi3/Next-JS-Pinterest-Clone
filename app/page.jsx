"use client";
import app from "@/firebaseConfig";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import PinList from "./components/Pins/PinList";
import NoPost from "./components/noPost/NoPost";

const page = () => {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    getAllPins();
  }, []);

  const getAllPins = async () => {
    try {
      const q = query(collection(db, "pinterest-post"));
      const querySnapshot = await getDocs(q);
      const pinsData = querySnapshot.docs.map((doc) => doc.data());
      setListOfPins(pinsData);
      setLoading(false); // Set loading state to false when data is fetched
    } catch (error) {
      console.error("Error fetching user pins:", error);
      setError(error); // Set error state if an error occurs
    }
  };

  return (
    <>
      <div>
        {!loading && error && <p>Error: {error.message}</p>}
        {!loading && listOfPins.length === 0 && <NoPost title="Posts" />}
        {!loading && listOfPins.length > 0 && (
          <PinList listOfPins={listOfPins} />
        )}
      </div>
    </>
  );
};

export default page;
