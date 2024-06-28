/* eslint-disable react/prop-types */
const Card = ({ title, description, icon }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 flex flex-col items-center space-y-4 hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
      <div className="text-5xl text-white">{icon}</div>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-200">{description}</p>
      </div>
    </div>
  );
};

export default Card;