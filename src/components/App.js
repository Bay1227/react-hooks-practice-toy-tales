import React, { useEffect, useState } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const toyAPI = "http://localhost:3001/toys"
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};


function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);
 

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy (toy){
    fetch(toyAPI, {
      method: "POST",
      body: JSON.stringify(toy),
      headers,
    })
    .then((res) => res.json())
    .then((json) => setToys([...toys, json]))
   }

   function deleteToy(id) {
     console.log('delete', id);
     fetch(`${toyAPI}/${id}`,{
       method: 'DELETE',
       headers
     }).then(() => setToys(toys.filter(toy => toy.id !== id) ) )
   }
 
   function incrementLikes(toy){
     fetch(`${toyAPI}/${toy.id}`,{
       method: "PATCH",
       headers,
       body: JSON.stringify({likes: toy.likes  + 1 }),
     })
     .then(() => setToys(toys.map((oldToy) => (oldToy.id !== toy.id ? oldToy : { ...oldToy, likes: oldToy.likes + 1}))
      )
     );
   }


  useEffect(() => {
    fetch(toyAPI) 
    .then((resp) => resp.json())
    .then(data => setToys(data))
  }, []);

  
  return (
    <>
      <Header />
      {showForm ? <ToyForm handleSubmit={addToy}  /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleDelete={deleteToy} handleClickLikes={incrementLikes} />
    </>
  );
}

export default App;

