import React, { useState, useEffect } from "react";
import facade from "./apiFacade";



export default function Breeds(){

    const [breeds, setBreeds] = useState([])

    useEffect(() => {

        facade.fetchBreeds().then((data) => {
                setBreeds(data)

        })

    },[])

    return (
        <div>
            {breeds.map((item) =>{

                return(
                    <div key={item.breed}>
                        <h3>{item.breed}</h3>
                    </div>
                )

            })}


        </div>

    )
}

