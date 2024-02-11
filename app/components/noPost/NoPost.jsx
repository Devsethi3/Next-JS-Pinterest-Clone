import { TbMoodSad } from "react-icons/tb";

const NoPost = ({ title }) => {
  return (
    <div className="grid mt-8 text-gray-800 place-items-center">
      <TbMoodSad className="text-8xl" />
      <h1 className="text-4xl font-bold text-center mt-5">No Post Found</h1>
    </div>
  );
};

export default NoPost;
