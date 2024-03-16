import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Square, WinnerModal } from './components';
import { checkEndGame, checkWinner } from './helpers';
import { TURNS } from './constants/constants';
import './App.css';

export const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.x);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    setTurn(turn === TURNS.x ? TURNS.o : TURNS.x);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
  };

  useEffect(() => {
    const newWinner = checkWinner(board);

    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(board)) {
      setWinner(false);
    }
  }, [board]);

  return (
    <main className="game">
      <h1>Tic Tac Toe</h1>

      <section className="board">
        {board.map((_, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Square>
        ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
};
