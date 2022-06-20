import React from "react";
import axios from 'axios'
import Weather from "./Weather";
import { useState, useEffect } from "react";
const apiUrl = "https://restcountries.com/v3.1/all"

const Country = ({name, setSearch}) => {
  return (
    <p>
      {name} {' '}
      <button onClick={()=>setSearch(name)}>
        show
      </button>
    </p>
  )
}
const CountryInfo = ({name, capital, area, lang, flag}) => {
  console.log(lang, typeof(lang))
  const languages = Object.values(lang)
  return (
    <div>
      <h2>{name}</h2>
      <div>capital: {capital}</div>
      <div>area: {area}</div>
      <h3>languages:</h3>
      <ul>
        {languages.map(each => (
          <li key={each}>{each}</li>
        ))}
      </ul>
      <img src={flag} width={200}/>
      <Weather capital={capital}/>
    </div>
  )
}
const Countries = ({ search, setSearch }) => {
  
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios.get(apiUrl).then(response => {
      setCountries(response.data)
    })
  }, [])
  const filtered = countries.filter(each =>
    each.name.common.toLowerCase().includes(search.toLowerCase()))

  if (filtered.length > 10) {
    return (<div>Too many countries, specify another filter</div>)
  }
  if (filtered.length === 1) {
    console.log(filtered)
    const joo = filtered[0]
    return (
      <CountryInfo 
        name={joo.name.common} 
        capital={joo.capital[0]}
        area={joo.area}
        lang={joo.languages}
        flag={joo.flags.svg}/>
    )
  }
  return (
    <div>
      {filtered.map(each => (
        <Country 
          key={each.name.common} 
          name={each.name.common}
          setSearch={setSearch}/>
        
      ))}
    </div>
  )
}

export default Countries