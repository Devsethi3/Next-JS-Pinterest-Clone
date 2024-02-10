import Image from "next/image";
import React from "react";

const PinImage = ({ pinDetail }) => {
  return (
    <div>
      <Image
        src={pinDetail.image}
        alt={pinDetail.title}
        width={400}
        height={400}
        className="rounded-2xl"
      />
    </div>
  );
};

export default PinImage;
