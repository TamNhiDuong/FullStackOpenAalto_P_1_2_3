import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <td>{text + ' ' + value}</td>
)

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <>
      <h1>statistics</h1>

      {(good !== 0 || neutral !== 0 || bad !== 0) ?
        <table>
          <tbody>
            <tr><StatisticLine text="good" value={good} /></tr>
            <tr><StatisticLine text="neutral" value={neutral} /></tr>
            <tr><StatisticLine text="bad" value={bad} /></tr>
            <tr><StatisticLine text="all" value={total} /></tr>
            <tr><StatisticLine text="average" value={(good + neutral * 0 - bad) / total} /></tr>
            <tr><StatisticLine text="positive" value={good * 100 / (total) + ' %'} /></tr>
          </tbody>
        </table>
        : <p>No feedback given</p>
      }
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  const total = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addGood} text={'good'} />
      <Button handleClick={addNeutral} text={'neutral'} />
      <Button handleClick={addBad} text={'bad'} />

      <Statistics good={good} neutral={neutral} bad={bad} total={total} />


    </div>
  )
}

export default App