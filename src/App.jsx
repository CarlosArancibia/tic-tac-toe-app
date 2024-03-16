import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Square, WinnerModal } from './components';
import { checkEndGame, checkWinner } from './helpers';
import { TURNS } from './constants/constants';
import './App.css';

export const App = () => {
  const [board, setBoard] = useState(
    () => JSON.parse(localStorage.getItem('board')) ?? Array(9).fill(null)
  );
  const [turn, setTurn] = useState(() => localStorage.getItem('turn') ?? TURNS.x);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);

    localStorage.setItem('board', JSON.stringify(newBoard));
    localStorage.setItem('turn', newTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);

    localStorage.removeItem('board');
    localStorage.removeItem('turn');
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
