import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import { Switch, Route, NavLink } from "react-router-dom";



export default function Breeds(){

    const [breeds, setBreeds] = useState([])

    useEffect(() => {

        facade.fetchAllSearches().then((data) => {
            console.log("dd")

        })

        facade.fetchBreeds().then((data) => {
                setBreeds(data)

        })

       

    },[])

    return (
        <>
           <h1 className="breedsTop">Dog breeds</h1>
        <div className="breeds">

 
            {breeds.map((item) =>{

                const breed = item.breed
               const breedUppercased =  breed.charAt(0).toUpperCase() + breed.slice(1);
                return(
                    <NavLink className="breedsbox" to={"/dogbreed/" + item.breed} >
                   
                    <div key={item.breed}>
                        <h3>{breedUppercased}</h3>
                    </div>
                  
                  </NavLink>
                )

            })}


        </div>
</>
    )
}

