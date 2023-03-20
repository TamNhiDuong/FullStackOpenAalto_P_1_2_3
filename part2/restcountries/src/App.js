import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/all'

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital.map(cap => <span key={cap}>{cap}</span>)}</p>
      <p>Area: {country.area}</p>
      <div>
        <div style={{ fontWeight: '600' }}>Language:</div>
        {Object.keys(country.languages).map(k => <li key={k}>{country.languages[k]}</li>)}
      </div>
      <img src={country.flags.png} alt={country.flags.alt} />
    </>
  )
}

const Content = ({ data }) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (country !== null) {
      setCountry(null)
    }
  }, [data])

  const show = (country) => {
    setCountry(country)
  }

  if (data.length === 1) {
    const country = data[0]
    return (
      <Country country={country} />
    )
  } else if (data.length <= 10 && data.length > 1) {
    return (
      <>
        {data.map(country => <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => show(country)}>show</button>
        </li>)}
        {country !== null && <Country country={country} />}
      </>
    )
  }
  return <p>Too many matches, specify another filter</p>
}

function App() {
  const [searchKey, setSearchKey] = useState('')
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(res => {
      setData(res.data)
    })
    if (data.length > 0) {
      const matchedCountries = data.filter(country => {
        const name = country.name.common.toLowerCase()
        return name.includes(searchKey.toLowerCase())
      })
      setFilteredData(matchedCountries)
    }
  }, [searchKey])

  const onChangeSearchKey = (e) => {
    setSearchKey(e.target.value)
  }

  return (
    <div>
      Find country <input value={searchKey} onChange={onChangeSearchKey}></input>
      <Content data={filteredData} />
    </div>
  );
}

export default App;
