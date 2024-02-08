"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";

const UserTag = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div className="mt-8">
        {session ? (
          <div className="flex items-center gap-5">
            <Image
              src={session.user.image}
              width={40}
              height={40}
              alt="userImage"
              className="rounded-full"
            />
            <div>
              <h4>{session.user.name}</h4>
              <p className="mt-[-5px] text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserTag;
