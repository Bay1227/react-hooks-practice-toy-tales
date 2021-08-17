import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, handleDelete, handleClickLikes}) {
  console.log({toys})
  return (
    <div id="toy-collection">
      {toys.map((toy) => 
      <ToyCard 
      toy={toy} 
      image={toy} 
      key={toy.id}
      handleDelete={handleDelete}
      handleClickLikes={handleClickLikes}
       />)}
    </div>
  );
}

export default ToyContainer;
