import Image from "next/image";
import Link from "next/link";

const PinItem = ({ pin, dataId }) => {
  return (
    <Link href={`/pin/${dataId}`}>
      <div className="p-4 cursor-pointer rounded-md">
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
    </Link>
  );
};

export default PinItem;
