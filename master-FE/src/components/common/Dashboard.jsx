/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Card from "./Card";

// eslint-disable-next-line react/prop-types, no-unused-vars
const Dashboard = ({ title, cardData }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={`p-8 min-h-[93.2vh] bg-gradient-to-r from-indigo-400 to-purple-500  transition-opacity duration-1000 ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-12 text-center tracking-wide">
          {title}
        </h1>
        <h4 className="text-2xl text-white mb-12 text-center">
          You can access following functionalities:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map((eachData, index) => (
            <Card
              key={index}
              title={eachData.title}
              description={eachData.description}
              icon={eachData.icon}
            />
          ))}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
