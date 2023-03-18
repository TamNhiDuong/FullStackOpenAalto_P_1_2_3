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
export default Form