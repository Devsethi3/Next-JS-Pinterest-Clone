"use client";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import UploadImage from "../../components/uploadImage/UploadImage";
import UserTag from "../../components/userTag/UserTag";
import { useSession } from "next-auth/react";
import { useState } from "react";
import app from "@/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Form = () => {
  const storage = getStorage(app);
  const db = getFirestore(app);
  const router = useRouter();
  const postId = Date.now().toString();

  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [link, setLink] = useState();
  const [file, setFile] = useState();

  const onSave = () => {
    // Check if any required fields are empty or if a file has not been uploaded
    if (!title || !desc || !link || !file) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    setLoading(true);
    uploadFile();
  };

  const uploadFile = () => {
    const storageRef = ref(storage, "pinterest/" + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("File Uploaded");
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (url) => {
          console.log("Download url", url);
          const postData = {
            id: postId,
            title: title,
            desc: desc,
            link: link,
            image: url,
            userName: session.user.name,
            email: session.user.email,
            userImage: session.user.image,
          };
          await setDoc(doc(db, "pinterest-post", postId), postData).then(
            (response) => {
              setLoading(true);
              router.push("/" + session.user.email);
            }
          );
        });
      });
  };

  return (
    <div>
      <div className="bg-white p-14 rounded-2xl">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => onSave()}
            type="button"
            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 inline-flex items-center"
          >
            {loading ? (
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-10 items-center">
          <UploadImage setFile={(file) => setFile(file)} />
          <div className="">
            <div className="w-[100%]">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Add Your Title"
                className="text-2xl py-2 px-4 rounded-md outline-none font-semibold w-full border-2 border-gray-400 placeholder-gray-400"
              />
              <p className="text-sm text-gray-500 w-full">
                The First 40 character are what usually show up in feeds
              </p>
              <UserTag />
              <textarea
                rows="4"
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Tell Everyone what your pin is about"
                className="outline-none py-3 px-4 rounded-md w-full resize-none mt-8 pb-4 border-2 border-gray-400 placeholder-gray-400"
              ></textarea>
              <input
                onChange={(e) => setLink(e.target.value)}
                type="text"
                placeholder="Add a Destination Link"
                className="outline-none rounded-md w-full py-2 px-4 mt-12 border-2 border-gray-400 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
