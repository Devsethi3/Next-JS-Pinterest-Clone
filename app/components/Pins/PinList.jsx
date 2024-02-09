import PinItem from "../Pins/PinItem";

const PinList = ({ listOfPins }) => {

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {listOfPins.map((item, index) => (
        <div key={index}>
          <PinItem pin={item} />
        </div>
      ))}
    </div>
  );
};

export default PinList;
