import React from "react";
import Person from './Person'
import personsMethods from '../services/persons'
import db from '../db'

const AllPersons = ({persons, filter, setPersons, setSuccessMessage}) => {

  const deletePerson = (personName) => {
    console.log(personName)
    if (window.confirm(`Delete ${personName} ?`)) {
      
      const personID = persons.filter(each => each.name === personName).map(one => one.id)

      console.log(persons)
      console.log(personID)
      personsMethods.deletee(personID).then(() => {
        console.log(persons.filter(each => each.name !== personName))
        setPersons(persons.filter(each => each.name !== personName))
      })

      setSuccessMessage(`Removed ${personName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);
    } else console.log("cancelled")
  }

  return (
    persons.filter(each => 
                   each.name.toLocaleLowerCase()
                            .includes(filter.toLowerCase()))
           .map(filtered =>
              <Person 
                key={filtered.name} 
                name={filtered.name} 
                number={filtered.number}
                deletePerson={deletePerson}
                />
               )
  )
}

export default AllPersons