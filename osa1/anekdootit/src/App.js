import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const [index, setIndex] = useState(0)
  const len = anecdotes.length
  const [votes, setVotes] = useState(Array(len).fill(0))

  function rng(max) { // a pseudorandom integer between 0 and 'max'
    return Math.floor(Math.random()*max)
  }
  function max(arr) { // finds the maximum value in an array
    return Math.max(...arr)
  }

  const anecdoteClick = () =>{
    setIndex(rng(len))
  }
  const voteClick = () => {
    votes[index] += 1
    setVotes(votes)
    setIndex(index)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[index]}</p>
      <p>has {votes[index]} votes.</p>
      <p>
        <Button text='vote' handleClick={voteClick} />
        <Button text='next anecdote' handleClick={anecdoteClick}/>
      </p>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[votes.indexOf(max(votes))]}</p>
      <p>has {max(votes)} votes.</p>
    </div>
  )
}

export default App