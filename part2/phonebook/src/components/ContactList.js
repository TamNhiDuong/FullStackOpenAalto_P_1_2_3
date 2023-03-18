const Person = (props) => {
    const { person, deletePerson } = props
    return (
      <>
        <p>{person.name} {person.number}</p>
        <button onClick={() => deletePerson(person)}>Delete</button>
      </>
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

export default ContactList
  