import React, { useState, useEffect } from "react";
import facade from "./apiFacade";



export default function UserDogs(){

    const [dogs, setDogs] = useState([])

    useEffect(() => {

        facade.fetchUserDogs().then((data) =>{
            setDogs(data)
        })
    
    
    },[])

    return (
        <div>
            {dogs.map((dog) => {

                return(
                    <p>{dog.name}</p>

                )


            })}
        </div>

    )

}
