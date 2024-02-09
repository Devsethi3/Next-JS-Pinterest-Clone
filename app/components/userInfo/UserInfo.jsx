import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
const UserInfo = ({ userInfo }) => {
  console.log(userInfo);
  const router = useRouter();

  const { data: session } = useSession();

  const onLogoutClick = () => {
    signOut();
    router.push("/");
  };
  return (
    <>
      <div className="grid place-items-center mt-10">
        <Image
          className="rounded-full"
          src={userInfo.userImage}
          width={100}
          height={100}
          alt="userImage"
        />
        <h2 className="text-2xl pt-5 pb-1 font-semibold text-gray-800">
          {userInfo.userName}
        </h2>
        <p className="text-gray-600">{userInfo.email}</p>
        <div className="flex items-center gap-5 mt-8">
          <button className="flex gap-2 px-5 py-2 items-center bg-indigo-500 text-white hover:bg-indigo-600 rounded-full">
            <IoShareSocialSharp />
            Share
          </button>
          {session?.user.email == userInfo.email ? (
            <button
              onClick={() => onLogoutClick()}
              className="flex gap-2 px-5 py-2 items-center bg-red-500 text-white hover:bg-red-600 rounded-full"
            >
              <MdLogout />
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UserInfo;
