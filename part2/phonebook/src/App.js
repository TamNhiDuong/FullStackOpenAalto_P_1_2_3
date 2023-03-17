import { useState, useEffect } from 'react'
import './index.css'

import personServices from './services/persons'

const Person = (props) => {
  const { person, deletePerson } = props
  return (
    <>
      <p>{person.name} {person.number}</p>
      <button onClick={() => deletePerson(person)}>Delete</button>
    </>
  )
}

const Form = (props) => {
  const { addContact, handleChange, newName, handleNumberChange, newNumber } = props
  return (
    <form onSubmit={addContact}>
      <div>name: <input onChange={handleChange} value={newName} /></div>
      <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = (props) => {
  const { handleFilterChange, filterWord } = props
  return (
    <div>filter show with: <input onChange={handleFilterChange} value={filterWord} /></div>
  )
}

const ContactList = (props) => {
  const { filteredList, deletePerson } = props
  return (
    <ul>
      {filteredList.map(person => <Person person={person} key={person.id} deletePerson={deletePerson} />)}
    </ul>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personServices.getAll().then(res => setPersons(res))
  }, [])

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
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
          // Reload
          personServices.getAll().then(res => setPersons(res))
          setNewName('')
          setNewNumber('')

          // Notification
          setMessage(
            `Changed number to contact '${newName}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    } else {
      personServices.create(newPersonContact).then(res => {
        setPersons(persons.concat(res))
        setNewName('')
        setNewNumber('')

        // Notification
        setMessage(
          `Added contact '${newName}'`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const handleFilterChange = (e) => {
    setFilterWord(e.target.value)
  }

  const deletePerson = (person) => {
    if (window.confirm("Do you really want to delete " + person.name + "?")) {
      personServices.deletePerson(person).then(res => {
        // Reload
        personServices.getAll().then(res => setPersons(res))
      })
    }
  }

  const filteredList = persons.filter(p => p.name.toLowerCase().includes(filterWord.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message} />

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