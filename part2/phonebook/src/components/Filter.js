const Filter = (props) => {
    const { handleFilterChange, filterWord } = props
    return (
        <div>filter show with: <input onChange={handleFilterChange} value={filterWord} /></div>
    )
}

export default Filter