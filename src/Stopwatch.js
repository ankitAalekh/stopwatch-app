import React, { useState, useEffect, useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Stopwatch.css"

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [finalTime, setFinalTime] = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2)
    const minutes = `${Math.floor(time / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2)
    return `${getHours}:${getMinutes}:${getSeconds}`
  }

  const handleStartPause = () => {
    setIsRunning(!isRunning)
    if (isRunning) {
      setFinalTime(null)
    }
  }

  const handleStop = () => {
    setIsRunning(false)
    setFinalTime(elapsedTime)
    setElapsedTime(0)
  }

  const handleReset = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setFinalTime(null)
  }

  return (
    <div className="container mt-5">
      <div className="stopwatch p-4 bg-light rounded shadow">
        <h1 className="heading mb-4">Stopwatch</h1>
        <div className="time-display mb-4">{formatTime(elapsedTime)}</div>
        <button className="btn btn-success mr-2" onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="btn btn-danger mr-2" onClick={handleStop}>
          Stop
        </button>
        <button className="btn btn-warning" onClick={handleReset}>
          Reset
        </button>
        <div className="elapsed-time mt-4">{finalTime !== null ? `Elapsed Time: ${formatTime(finalTime)}` : "\u00A0"}</div>
      </div>
    </div>
  )
}

export default Stopwatch
