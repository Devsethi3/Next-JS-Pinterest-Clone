"use client"
import Image from "next/image";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../../../firebaseConfig";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
    const { data: session } = useSession();

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

    const onCreateClick = () => {
        if (session) {
            router.push("/pin-builder")
        } else {
            signIn()
        }
    }

    return (
        <div className="sticky top-[1rem] left-0">
            <div className="flex items-center justify-between">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        width={50}
                        height={50}
                        alt="logo"
                        className="rounded-full p-2 hover:bg-gray-300"
                    />
                </Link>
                <div className="flex items-center gap-5">
                    <Link
                        href="/"
                        className="px-5 py-2 bg-gray-900 hover:bg-black text-white rounded-full"
                    >
                        Home
                    </Link>
                    <button
                        onClick={() => onCreateClick()}
                        className="flex gap-2 px-5 py-2 items-center hover:bg-gray-100 rounded-full"
                    >
                        Create <IoMdAddCircleOutline className="" />
                    </button>
                </div>
                <div className="relative w-[60%]">
                    <input
                        className="bg-gray-100 outline-none w-full py-2 pl-12 pr-4 rounded-full"
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex items-center gap-2">
                    <FaBell className="rounded-full text-4xl p-2 hover:bg-gray-300 cursor-pointer" />
                    <IoChatbubbleEllipsesSharp className="rounded-full text-4xl p-2 cursor-pointer hover:bg-gray-300" />
                    {session?.user ? (
                        <div className="flex items-center">
                            <Image
                                onClick={() => router.push("/" + session.user?.email)}
                                src={session?.user.image}
                                width={50}
                                height={50}
                                alt="logo"
                                className="rounded-full cursor-pointer p-2 hover:bg-gray-300"
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className="bg-red-500 text-white py-2 px-6 rounded-full "
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
