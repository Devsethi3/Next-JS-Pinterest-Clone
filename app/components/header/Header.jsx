"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { FaSearch } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";
import app from "../../../firebaseConfig";
import { getFirestore } from "firebase/firestore";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    saveUserInfo();
  }, [session]);

  const db = getFirestore(app);

  const saveUserInfo = async () => {
    if (session?.user) {
      await setDoc(doc(db, "users", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image,
      });
    }
  };

  const toggle = () => {
    setIsOpen(!isOpen);
    setShowOverlay(!showOverlay);
  };

  const onCreateClick = () => {
    if (session) {
      router.push("/pin-builder");
      toggle();
    } else {
      signIn();
    }
  };

  const onFilterSearch = async (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value); // Update search term state

    const filterRef = collection(db, "pinterest-post");
    const snapshot = await getDocs(filterRef);
    const filterList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const filteredData = filterList.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setFilteredData(filteredData); // Update filtered data state
  };

  return (
    <div className="sticky header-top z-50 top-[1rem] left-0">
      <div className="flex header h-[5rem] items-center head-nav justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="logo"
            className="rounded-full p-2 hover:bg-gray-300"
          />
        </Link>
        <div
          className={`flex items-center nav-menu ${
            isOpen ? "show-menu" : "nav-menu"
          } gap-5`}
        >
          <Link
            href="/"
            className="px-5 nav-link py-2 bg-gray-900 hover:bg-black text-white rounded-full"
          >
            Home
          </Link>
          <button
            onClick={() => onCreateClick()}
            className="flex gap-2 nav-link-button px-5 py-2 items-center hover:bg-gray-100 rounded-full"
          >
            Create <IoMdAddCircleOutline className="text-xl text-gray-700" />
          </button>
          {session?.user ? (
            <div
              onClick={() => router.push("/" + session.user?.email)}
              className="flex cursor-pointer nav-profile items-center gap-2"
            >
              <Image
                src={session?.user.image || ""}
                width={60}
                height={60}
                alt="user"
                className="rounded-full user-img p-2 hover:bg-[#ffffff4c]"
              />
              <p className="font-medium text-white">{session.user.name}</p>
            </div>
          ) : null}
          <IoCloseCircleOutline
            onClick={toggle}
            className="text-5xl nav-close absolute top-[3%] text-white right-[3%] rounded-full cursor-pointer p-2 hover:bg-gray-800"
          />
        </div>
        {showOverlay && (
          <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
        )}
        <div className="relative search-bar w-[60%]">
          <input
            onChange={onFilterSearch}
            className="bg-gray-100 outline-none search-box w-full py-2 pl-12 pr-4 rounded-full"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
          <FaSearch className="absolute search-icon left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex profile-info items-center gap-4">
          <FaBell className="rounded-full icon text-4xl p-2 hover:bg-gray-300 cursor-pointer" />
          <IoChatbubbleEllipsesSharp className="rounded-full icon text-4xl p-2 cursor-pointer hover:bg-gray-300" />
          {session?.user ? (
            <div className="flex items-center">
              <Image
                onClick={() => router.push("/" + session.user?.email)}
                src={session?.user.image || ""}
                width={50}
                height={50}
                alt="user"
                className="rounded-full cursor-pointer p-2 hover:bg-gray-300"
              />
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-red-500 text-white py-2 px-6 rounded-full"
            >
              Login
            </button>
          )}
        </div>
        <HiOutlineMenu
          onClick={toggle}
          className="text-[2.5rem] nav-toggle rounded-full cursor-pointer p-2 hover:bg-gray-200"
        />
      </div>
    </div>
  );
};

export default Header;
