import React, { useState, useEffect } from "react";
import facade from "./apiFacade";



export default function BreedDetails(){

    const init = {breed:"", info:"" ,wikipedia:"", imageUrl:"", facts:""}
    const [details, setDetails] = useState(init)
  
    useEffect(() =>{
        
        var breed = window.location.pathname;
        breed = breed.slice(10)

        facade.fetchBreedDetails(breed).then((data) => {
        setDetails(data)

        })

    },[])

    var breed = details.breed
    var breedUppercased =  details.breed.charAt(0).toUpperCase() + breed.slice(1);
     

    return (
        <div className="breedDetails">
        <button  onClick={() => {window.history.back()}}> {"< "}Go Back</button>
            <div className="breedDetailsbox">
            <h2>{breedUppercased}</h2>
        <img src={details.imageUrl}></img>
        <p>{details.info}</p>
        <a href={details.wikipedia}>Read more on wikipedia</a>
            </div>
      <div className="factbox"> 
        <h3>Fun fact</h3>
          <p>{details.facts}</p>
        </div>
       
        
        </div>


    )
}
