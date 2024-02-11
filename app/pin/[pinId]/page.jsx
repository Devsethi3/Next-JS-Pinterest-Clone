"use client";
import React, { useEffect, useState } from "react";
import PinImage from "../../components/pinDetail/PinImage";
import PinInfo from "../../components/pinDetail/PinInfo";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import app from "@/firebaseConfig";

function PinDetail({ params }) {
  const router = useRouter();
  const db = getFirestore(app);
  const [postId, setPostId] = useState();

  const [pinDetail, setPinDetail] = useState([]);

  useEffect(() => {
    // Set postId state only once when the component mounts
    setPostId(params.pinId);

    // Fetch pin detail
    const getPinDetail = async () => {
      const docRef = doc(db, "pinterest-post", params.pinId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPinDetail(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getPinDetail(); // Fetch pin detail on component mount
  }, [params.pinId]); // Run this effect only when params.pinId changes

  return (
    <>
      {pinDetail ? (
        <div className=" bg-white md:p-12 rounded-2xl md:px-24 lg:px-36">
          <HiArrowSmallLeft
            className="text-5xl font-bold absolute left-[8%]
       cursor-pointer hover:bg-gray-200 back-button rounded-full p-2 "
            onClick={() => router.back()}
          />
          <div
            className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg
      rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 "
          >
            <PinImage pinDetail={pinDetail} />
            <div className="">
              <PinInfo pinDetail={pinDetail} postId={postId} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PinDetail;
