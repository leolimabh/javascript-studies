import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Square = ({ value, onClick }) => (
  <button className='square' onClick={onClick}>
    {value}
  </button>
)

const Board = ({ squares, onClick }) => {
  const renderSquare = i => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />
  }

  return (
    <div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

const Game = () => {
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    nextPlayer: 'X',
    winner: null,
    step: 0,
  })

  const handleClick = i => {
    const history = state.history.slice(0, state.step + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (state.winner || squares[i]) return

    squares[i] = state.nextPlayer

    setState({
      history: history.concat([{ squares: squares }]),
      nextPlayer: calculateNextPlayer(history.length),
      winner: calculateWinner(squares),
      step: history.length,
    })
  }

  const jumpTo = step => {
    setState({
      step: step,
      nextPlayer: calculateNextPlayer(step),
    })
  }

  const calculateNextPlayer = step => (step % 2 === 0 ? 'X' : '0')

  const moves = state.history.map((move, step) => {
    console.log('moves', step, move)
    const desc = move ? 'Go to move #' + step : 'Go to game start'
    return (
      <li key={step}>
        <button onClick={() => jumpTo(step)}>{desc}</button>
      </li>
    )
  })

  const status = state.winner
    ? `Winner is ${state.winner}`
    : `Next player: ${state.nextPlayer}`

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          squares={state.history[state.step].squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

ReactDOM.render(<Game />, document.getElementById('root'))

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
