import React, { useState, useEffect } from "react";
import facade from "./apiFacade";


export default function AdminPage(){

    const [searchCount, setSearchCount] = useState()
    const [allSearches, setAllSearches] = useState([{"breed":"", "count":""}])


    useEffect(() => {

        facade.fetchAllSearchcount().then((data) => {

            setSearchCount(data.searches)

        })
        facade.fetchAllSearches().then((data) => {
          
            orderByTopSearch(data)
            setAllSearches(data)
           
            
        })

    },[])

    const orderByTopSearch = (data) => {
        data.sort((a,b ) => {
            return b.count - a.count
        })
    }


    return (
    
       
        <div className="adminpage">
        <h1 className="adminH">Admin page</h1>
            <div className="adminTotal">
            <h1 className="searchheader">Total searches</h1>
            <h1>{searchCount}</h1>
            </div>
         <div className="adminTop">
         <h1 className="searchheader">Top searched breed</h1>
         <h1>{allSearches[0].breed}</h1> 
         <h1>{allSearches[0].count} times</h1> 
         </div >
         <div className="adminTop">
         <h1 className="searchheaderRed">Least searched breed</h1>
         <h1>{allSearches[allSearches.length - 1].breed}</h1> 
         <h1>{allSearches[allSearches.length - 1].count} times</h1> 
         </div >
 
          <h1 className="adminBreedH">All breeds</h1>
            {
                allSearches.map((item) => {
                    return (
                        <div key={item.breed} className="adminBreed">
                        <h2>{item.breed} : {item.count} times</h2>
                        </div>
                    )
                })
            }
        
  
        </div>
        

    )
}