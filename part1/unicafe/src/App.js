import { useState } from 'react'

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

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>

      <h1>statistics</h1>

      <div style={{display: 'flex', flexDirection: 'row'}}>
        <p style={{marginRight: 10}}>good</p>
        <p>{good}</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <p style={{marginRight: 10}}>neutral</p>
        <p>{neutral}</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <p style={{marginRight: 10}}>bad</p>
        <p>{bad}</p>
      </div>


    </div>
  )
}

export default App