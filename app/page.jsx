"use client";
import app from "@/firebaseConfig";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import PinList from "./components/Pins/PinList";

const Page = () => {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState([]);
  const [dataIdArray, setDataIdArray] = useState([]);

  useEffect(() => {
    getAllPins();
  }, []);

  const getAllPins = async () => {
    try {
      const q = query(collection(db, "pinterest-post"));
      const querySnapshot = await getDocs(q);
      const pinsData = querySnapshot.docs.map((doc) => doc.data());
      setListOfPins(pinsData);

      // Constructing userId array with unique values
      const dataIds = querySnapshot.docs.map((doc) => doc.id);
      const uniqueUserIds = [...new Set(dataIds)]; // Using Set to ensure uniqueness
      setDataIdArray(uniqueUserIds);
    } catch (error) {
      console.error("Error fetching user pins:", error);
    }
  };

  return (
    <>
      <div>
        <PinList dataIdArray={dataIdArray} listOfPins={listOfPins} />
      </div>
    </>
  );
};

export default Page;
