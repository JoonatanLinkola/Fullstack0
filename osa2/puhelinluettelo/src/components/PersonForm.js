import React from "react";

const PersonForm = ({addNumber, newName, nameHandleNoteChange, newNumber, numberHandleNoteChange}) => {
  
  return (
    <form onSubmit={addNumber}>
      <div>
        name: 
        <input 
          value={newName} 
          onChange={nameHandleNoteChange} />
      </div>
      <div>
        number: 
        <input 
          value={newNumber} 
          onChange={numberHandleNoteChange} />
        </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm