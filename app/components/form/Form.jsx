"use client";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import UploadImage from "../../components/uploadImage/UploadImage";
import UserTag from "../../components/userTag/UserTag";
import { useSession } from "next-auth/react";
import { useState } from "react";
import app from "@/firebaseConfig";

const Form = () => {
  const storage = getStorage(app);

  const { data: session } = useSession();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [link, setLink] = useState();
  const [file, setFile] = useState();

  const onSave = () => {
    console.log("Title:", title, "Desc:", desc, "Link:", link, "File", file);
    uploadFile();
  };

  const uploadFile = () => {
    const storageRef = ref(storage, "pinterest/" + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("File Uploaded");
      })
      .then((res) => {
        getDownloadURL(storageRef).then((url) => {
          console.log("Download url", url);
        });
      });
  };

  return (
    <div>
      <div className="bg-white p-16 rounded-2xl">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => onSave()}
            className="px-5 py-2 items-center bg-red-500 text-white hover:bg-red-600 rounded-full"
          >
            Save
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
