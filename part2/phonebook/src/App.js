import { useState, useEffect } from 'react'
import './index.css'

import personServices from './services/persons'

import ContactList from './components/ContactList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personServices.getAll().then(res => setPersons(res))
  }, [])

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const showMessage = (isErr, msg) => {
    // Notification
    setMessage(msg)
    setIsError(isErr)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addContact = (e) => {
    e.preventDefault()

    const newPersonContact = { name: newName, number: newNumber }
    // Check duplicated name
    const duplicatedNames = persons.filter(p => p.name === newPersonContact.name)

    if (duplicatedNames.length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const duplicatedContact = duplicatedNames[0]
        duplicatedContact.number = newPersonContact.number

        personServices.updateNumber(duplicatedContact).then(res => {
          // Update list
          const newPersonList = persons.map(p => p.name !== newName ? p : res)
          setPersons(newPersonList)
          setNewName('')
          setNewNumber('')

          // Notification
          showMessage(false, `Changed number to contact '${newName}'`)
        })
      }
    } else {
      personServices.create(newPersonContact).then(res => {
        // Update list
        setPersons(persons.concat(res))
        setNewName('')
        setNewNumber('')

        // Notification
        showMessage(false, `Added contact '${newName}'`)
      }).catch(error => {
        showMessage(true, error.response.data.error)
      })
    }
  }

  const handleFilterChange = (e) => {
    setFilterWord(e.target.value)
  }

  const deletePerson = (person) => {
    if (window.confirm("Do you really want to delete " + person.name + "?")) {
      personServices.deletePerson(person).then(res => {
        // Update list
        const newPersonList = persons.filter(p => p.id !== person.id)
        setPersons(newPersonList)
      }).catch(error => {
        // Notification
        showMessage(true, `'${person.name}' was already removed from server`)
        // Update list
        const newPersonList = persons.filter(p => p.id !== person.id)
        setPersons(newPersonList)
      })
    }
  }

  const filteredList = persons.filter(p => p.name.toLowerCase().includes(filterWord.toLowerCase()))

  return (
    <div>
      <h1>Phonebook- Deployment</h1>

      <Notification message={message} isError={isError} />

      <Filter
        handleFilterChange={handleFilterChange}
        filterWord={filterWord} />

      <h3>Add a new</h3>
      <Form
        addContact={addContact}
        handleChange={handleChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber} />

      <h3>Numbers</h3>
      <ContactList filteredList={filteredList} deletePerson={deletePerson} />
    </div>
  )
}

export default App