import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
// import Person from './components/Person'
import AllPersons from './components/AllPersons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import db from './db'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'notes')

  const addNumber = (event) => {
    event.preventDefault()
    console.log('"add" button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(each => each.name).includes(nameObject.name)) {
      if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const thisID = db.persons.filter(each => each.name === nameObject.name)
                                 .map(one => one.id)

        personService.update(thisID, {...nameObject, number: newNumber})
        .then((updated) => {
          setPersons(persons.map(each => each.id !== thisID ? each : updated))
          setNewName('')
          setNewNumber('')

          setSuccessMessage(`Modified ${nameObject.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000);
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${nameObject.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

        
      }
    } else {
      personService.create(nameObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })

        setSuccessMessage(`Added ${nameObject.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);
    }
  }

  const nameHandleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const numberHandleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filterHandleNoteChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className="success" message={successMessage} />
      <Notification className="error" message={errorMessage} />
      <Filter 
        addNumber={addNumber} 
        filterHandleNoteChange={filterHandleNoteChange}/>
      <h2>Add a new</h2>
      <PersonForm 
        addNumber={addNumber} 
        newName={newName} 
        nameHandleNoteChange={nameHandleNoteChange} 
        newNumber={newNumber} 
        numberHandleNoteChange={numberHandleNoteChange}/>
      <h2>Numbers</h2>
      <AllPersons 
        persons={persons} 
        filter={filter}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}/>
    </div>
  )

}

export default App