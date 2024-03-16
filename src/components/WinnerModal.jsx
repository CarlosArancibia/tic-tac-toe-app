import { Square } from './Square';

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return;

  const onResetGame = () => {
    resetGame();
  };

  return (
    <section className="winner">
      <div className="winner__content">
        <header>
          <h2>{winner === false ? 'Empate' : 'Ganó:'}</h2>
        </header>
        {winner && <Square>{winner}</Square>}
        <footer>
          <button className="winner__button" onClick={onResetGame}>
            Start again
          </button>
        </footer>
      </div>
    </section>
  );
};
