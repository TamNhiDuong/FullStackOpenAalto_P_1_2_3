import { useState } from 'react'
import _ from 'lodash'

const Person = (props) => {
  const { person } = props
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Form = (props) => {
  const { addNote, handleChange, newName, handleNumberChange, newNumber } = props
  return (
    <form onSubmit={addNote}>
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
  const { filteredList } = props
  return (
    <ul>
      {filteredList.map(person => <Person person={person} key={person.name} />)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()

    const newPersonContact = { name: newName, number: newNumber }
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

  const handleFilterChange = (e) => {
    setFilterWord(e.target.value)
  }

  const filteredList = persons.filter(p => p.name.toLowerCase().includes(filterWord.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter
        handleFilterChange={handleFilterChange}
        filterWord={filterWord} />

      <h3>Add a new</h3>
      <Form
        addNote={addNote}
        handleChange={handleChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber} />

      <h3>Numbers</h3>
      <ContactList filteredList={filteredList} />
    </div>
  )
}

export default App