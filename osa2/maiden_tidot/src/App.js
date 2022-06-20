import React, { useEffect, useState } from "react"
import Countries from './components/Countries'

function App() {
  const [search, setSearch] = useState('')
  const searchHandleNoteChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }


  return (
    <div>
      Find countries {' '}
      <input 
      value={search}
      onChange={searchHandleNoteChange}/>
      <Countries search={search} setSearch={setSearch}/>
    </div>
  );
}

export default App;
