import { useState } from 'react'
import _ from 'lodash'

const Person = (props) => {
  const { person } = props
  return (
    <p>{person.name} {person.phoneNumber}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()

    const newPersonContact = { name: newName, phoneNumber: newNumber }
    // Check duplicated name
    const dublicatedNames = persons.filter(p => _.isEqual(newPersonContact, p))

    if (dublicatedNames.length <= 0) {
      setPersons(persons.concat(newPersonContact))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>name: <input onChange={handleChange} value={newName} /></div>
        <div>number: <input onChange={handleNumberChange} value={newNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person person={person} key={person.name} />)}
      </ul>
    </div>
  )
}

export default App