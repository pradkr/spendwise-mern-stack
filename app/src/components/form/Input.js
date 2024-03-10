import React from 'react'

const Input = ({type, id, name, onChange, placeholder }) => {
  return (
    <input type={type}  
           id={id} 
           name={name}      
           onChange={onChange}
           placeholder={placeholder}
    />
  )
} 
export default Input ;