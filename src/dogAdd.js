import React, { useState, useEffect } from "react";
import facade from "./apiFacade";



export default function DogForm(){

    const init = {name: "", dateOfBirth:"", info:"", breed : {breed:"", info:""}}
    const [dogInfo, setDogInfo] = useState(init)
    const [isAdded, setIsAdded] = useState()

    const performAddDog = (evt) => {
        evt.preventDefault();
       facade.addDog(dogInfo).then((res) => {

        setIsAdded(res)
       })

      };

    const onChange = (evt) => {
        setDogInfo({
          ...dogInfo,
          [evt.target.id]: evt.target.value,
        });
      };

      useEffect(() =>{
        setIsAdded(false)
      },[])

    return(
        <div>
         <h1>Dog form</h1>

         <form onChange={onChange}>
        <input placeholder="Name" id="name" />
        <input placeholder="Date Of Birth" id="dateOfBirth" />
        <input placeholder="info" id="info" />
        <button onClick={performAddDog}>Add dog</button>
      </form>
      {isAdded && (<h2>New dog was added: {isAdded.msg}</h2>)}
        </div>
    ) 
 }