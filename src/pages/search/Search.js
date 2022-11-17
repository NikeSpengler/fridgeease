import React from 'react'

//styles
import "./Search.css"

const Search = (value, onChange) => {
  return (
    <div className='search'>
        <input type="text" placeholder='Sök...' value={value} onChange={onChange}/>
    </div>
  )
}

export default Search