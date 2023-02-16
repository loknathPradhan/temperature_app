import React, { useState } from 'react'
import {BsSearch} from "react-icons/bs"
import "./css/component.css"

export default function Search(props) {
    const [place, setPlace] = useState();
    function handleSubmit(e) {
        e.preventDefault();
        props.getPlace(place)
        setPlace("")
    }
  return (
    <div className='input'>
      
      <form onSubmit={handleSubmit}>
        <input type="text" 
               value={place}
               placeholder="Enter location"
               onChange={(e) => {
                setPlace(e.target.value)
               }}  
              className='inputfield'/>
        <button type='submit' className='btn'> <BsSearch/></button>
      </form>
    </div>
  )
}
