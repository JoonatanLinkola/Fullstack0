import React from 'react';
import { useState, useEffect } from 'react'
import personService from './services/persons'
// import Person from './components/Person'
import AllPersons from './components/AllPersons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
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
        console.log(response.data);
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'notes')
  console.log(persons);
  const addNumber = (event) => {
    event.preventDefault()
    console.log('"add" button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const person = persons.find(person=>person.name===nameObject.name)
    console.log(person)

    if (person){
      if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        console.log(nameObject);
        const thisID = person.id
        console.log(thisID)
        personService.update(thisID, {...nameObject, number: newNumber})
        .then((response) => {
          console.log(response.data);
          setPersons(persons.map(each => each.id !== thisID ? each : response.data))
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

          setSuccessMessage(`Added ${nameObject.name}`)
          setTimeout(() => {
          setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data) // is an object
          setErrorMessage(error.response.data.error) // takes the 'error' parameter from above object
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

        
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