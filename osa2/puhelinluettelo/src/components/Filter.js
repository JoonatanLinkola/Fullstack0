import React from "react";

const Filter = ({filter, filterHandleNoteChange}) => {
  return (
    <div>
      filter shown with: 
      <input 
        value={filter}
        onChange={filterHandleNoteChange}/>
    </div>
  )
}

export default Filter