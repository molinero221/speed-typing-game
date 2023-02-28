import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const GAME_TIME = 5
  
  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(GAME_TIME)
  const [isGameOn, setIsGameOn] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [isDisabled, setIsDisabled] = useState(true)

  const inputElement = useRef(null)

  function handleChange(e) {
    setText(e.target.value)
  }

  function countWords(text) {
    const words = text.trim().split(" ")
    return words.filter(word => word !== "").length
  }

  function handleStart() {
    setIsGameOn(true)
    setTimeRemaining(GAME_TIME)
    setText("")
    setIsDisabled(false)
    inputElement.current.disabled = false
    inputElement.current.focus()

  }

  function endGame() {
    setWordCount(countWords(text))
    setIsGameOn(false)
    setIsDisabled(true)
  }

  useEffect(() => {
    if(isGameOn && timeRemaining) {
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000);
    }  else if (timeRemaining === 0) {
      endGame()
    }
  }, [timeRemaining, isGameOn])


  return (
    <main>
      <h1>How fast can you type?</h1>
      <textarea 
        name="textbox" 
        id="textBox" 
        cols="50" 
        rows="20"
        placeholder='type as fast as you can'
        value={text}
        onChange={handleChange}
        disabled={isDisabled}
        ref={inputElement}
        />
        <h3>Time Remaining: {timeRemaining} </h3>
        <button disabled={!isDisabled} onClick={handleStart}>Start</button>
        <h2>Word Count: {wordCount} </h2>
    </main>
  )
}

export default App
