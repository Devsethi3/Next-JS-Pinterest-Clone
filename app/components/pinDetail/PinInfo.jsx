"use client";
import { useRouter } from "next/navigation";
import UserTag from "../userTag/UserTag";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import app from "@/firebaseConfig";
import { useState } from "react";
import { useSession } from "next-auth/react";

const PinInfo = ({ pinDetail }) => {
  const user = {
    name: pinDetail.userName,
    email: pinDetail.email,
    image: pinDetail.userImage,
  };

  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      // Delete the document from Firestore
      await deleteDoc(doc(db, "pinterest-post", pinDetail.id));
      // Navigate to home page after deletion
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    router.push(`/edit-post/${pin.id}`);
  };

  return (
    <div>
      <h2 className="text-[30px] font-bold mb-10">{pinDetail.title}</h2>
      <UserTag user={user} />
      <h2 className="mt-10">{pinDetail.desc}</h2>
      <button
        className="p-2 bg-[#e9e9e9] px-5 text
      mt-10 rounded-full hover:scale-105 transition-all"
        onClick={() => window.open(pinDetail.link)}
      >
        Open Url
      </button>
      {session?.user.email == pinDetail.email ? (
        <div className="mt-10 pt-8 flex items-center justify-end gap-5 border-t-2">
          <button
            className="flex items-center gap-2 text-white py-2 px-5 rounded-full bg-[#ff6a6a] shadow-[0_1rem_30px_#ff6a6a37]"
            onClick={handleDelete}
            disabled={deleting}
          >
            <FaTrashAlt className="text-sm" />
            <span className="font-medium">Delete Post</span>
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 text-white py-2 px-5 rounded-full bg-[#11bd5e] shadow-[0_1rem_30px_#11bd5e37]"
          >
            <FaRegEdit className="" />
            <span className="font-medium">Edit Post</span>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default PinInfo;
