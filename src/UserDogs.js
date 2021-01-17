import React, { useState, useEffect } from "react";
import facade from "./apiFacade";



export default function UserDogs(){

    const [dogs, setDogs] = useState([])
    const [dogToEdit, setDogToEdit] = useState()
    const [dogInfo, setDogInfo] = useState()
    const [update, setUpdate] = useState(false)

    useEffect(() => {

        facade.fetchUserDogs().then((data) =>{
            setDogs(data)
    
        })
    
    
    },[update])


    const performDeleteDog = (evt) => {
        evt.preventDefault();
       facade.deleteDog(dogInfo.id).then((res) => {
        setUpdate(!update)
       })

      };

    const performEditDog = (evt) => {
        evt.preventDefault();
       facade.editDog(dogInfo).then((res) => {
        setUpdate(!update)
        setDogToEdit()
       })

      };

      const onChange = (evt) => {
        setDogInfo({
          ...dogInfo,
          [evt.target.id]: evt.target.value,
        });
      };

      const editDog = (dog, index) =>{
        setDogInfo({name: dog.name, dateOfBirth: dog.dateOfBirth, info: dog.Info, breed : dog.breed, id: dog.id});
        setDogToEdit(index); 
       
        window.scrollTo(0,document.body.scrollHeight);
      }

    return (
        <div>
            <h1 className="mydogsH">My dogs</h1>
            <table>
                
            <tr>
      
                <th>Name</th>
                <th>Breed</th>
                <th>Date of Birth</th>
                <th>Info</th>
                <th></th>
                
            </tr>

            {dogs.map((dog, index) => {

                return(
                    
                <tr key={index}>
                <td>{dog.name}</td>
                <td>{dog.breed}</td>
                <td>{dog.dateOfBirth}</td>
                <td>{dog.Info}</td>
                <td><button onClick={() => editDog(dog, index)}>Edit</button>
                <button onClick={performDeleteDog} onMouseEnter={() => setDogInfo({...dogInfo, id : dog.id})}>Delete</button></td>
                </tr>
               
                 )
            })}
            </table>

            { dogToEdit &&
           
            <form className="dogForm" onChange={onChange} >
                 <h2>Edit dog</h2>
                 <h3>Name:</h3>
                 <h3>dateOfBirth:</h3>
                 <h3>Info:</h3>
                 <h3>Breed:</h3>
        <input placeholder={dogs[dogToEdit].name} id="name" />
        <input placeholder={dogs[dogToEdit].dateOfBirth} id="dateOfBirth" />
        <input placeholder={dogs[dogToEdit].Info} id="info" />
        <input placeholder={dogs[dogToEdit].breed} id="breed" />
          <input placeholder={dogs[dogToEdit].breed} id="breed" />
          
        <button onClick={performEditDog} >Edit dog</button>
             </form>
}

            
        </div>

    )

}
