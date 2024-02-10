import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PinItem = ({ pin }) => {
  const router = useRouter();

  const user = {
    name: pin?.userName,
    image: pin?.userImage,
  };
  
  return (
    <div className="p-4 cursor-pointer rounded-md">
      <div onClick={() => router.push("/pin/" + pin.id)}>
        <div>
          <Image
            src={pin.image}
            width={500}
            height={500}
            alt="post"
            className="rounded-xl relative"
          />
          <h3 className="text-xl py-3 font-semibold">{pin.title}</h3>
          <div className="flex items-center gap-2">
            <Image
              src={pin.userImage}
              width={25}
              height={25}
              alt="userImage"
              className="rounded-full"
            />
            <div>
              <h4 className="text-gray-800 text-sm font-semibold">
                {pin.userName}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinItem;
