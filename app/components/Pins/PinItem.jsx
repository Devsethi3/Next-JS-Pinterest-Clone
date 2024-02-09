import Image from "next/image";

const PinItem = ({ pin }) => {
  console.log(pin);
  return (
    <div className="bg-indigo-200 p-4 rounded-md">
      <Image
        src={pin.image}
        width={500}
        height={500}
        alt="post"
        className="rounded-md"
      />
      <h3>{pin.title}</h3>
      <div className="flex items-center gap-5">
        <Image
          src={pin.userImage}
          width={40}
          height={40}
          alt="userImage"
          className="rounded-full"
        />
        <div>
          <h4>{pin.userName}</h4>
          <p className="mt-[-5px] text-sm text-gray-500">{pin.email}</p>
        </div>
      </div>
    </div>
  );
};

export default PinItem;
