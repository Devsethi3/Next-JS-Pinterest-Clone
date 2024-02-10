import PinItem from "../Pins/PinItem";

const PinList = ({ listOfPins, dataIdArray }) => {
  return (
    <div className="columns-2 px-2 md:px-5 md:columns-3 lg:columns-4 xl:columns-5 mt-8 space-y-6 mx-auto">
      {listOfPins.map((item, index) => (
        <div key={index}>
          <PinItem dataIdArray={dataIdArray} pin={item} />
        </div>
      ))}
    </div>
  );
};

export default PinList;
