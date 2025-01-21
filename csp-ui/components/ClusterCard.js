const ClusterCard = ({ cluster }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="font-bold text-xl">{cluster.name}</h2>
        <p>{cluster.details}</p> {/* Update this with appropriate data */}
        <a href={cluster.link} target="_blank" className="text-blue-500 mt-2 block">View More</a>
      </div>
    );
  };
  
  export default ClusterCard;
  