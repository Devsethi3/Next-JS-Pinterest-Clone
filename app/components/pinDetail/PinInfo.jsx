"use client";
import { useRouter } from "next/navigation";
import UserTag from "../userTag/UserTag";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import app from "@/firebaseConfig";
import { useState } from "react";
import { useSession } from "next-auth/react";

const PinInfo = ({ pinDetail, postId }) => {
  const user = {
    name: pinDetail.userName,
    email: pinDetail.email,
    image: pinDetail.userImage,
  };

  const router = useRouter();
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteDoc(doc(db, "pinterest-post", pinDetail.id));
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      setDeleting(false);
    }
  };

  return (
    <>
      <h2 className="text-[30px] font-bold mb-10">{pinDetail.title}</h2>
      <UserTag user={user} />
      <h2 className="mt-10">{pinDetail.desc}</h2>
      <button
        className="p-2 pin-button bg-[#e9e9e9] px-5 text
      mt-10 rounded-full hover:scale-105 transition-all"
        onClick={() => window.open(pinDetail.link)}
      >
        Open Url
      </button>
      {session?.user.email == pinDetail.email ? (
        <div className="mt-10 pt-8 flex items-center justify-end gap-5 border-t-2">
          <button
            className="flex pin-button delete-button items-center gap-2 text-white py-2 px-5 rounded-full bg-[#ff6a6a] shadow-[0_1rem_30px_#ff6a6a37]"
            onClick={handleDelete}
            disabled={deleting}
          >
            <FaTrashAlt className="text-sm" />
            <span className="font-medium">Delete Post</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default PinInfo;
