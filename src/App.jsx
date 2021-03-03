import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import createCardsArray from './utils/createCardsArray';
import Footer from './components/Footer/Footer';

const delayTime = 2000;

function App() {
  const [cardsArray, setCardsArray] = useState([]);
  const [flippedPair, setFlippedPair] = useState([]);
  const [solvedArray, setSolvedArray] = useState([]);
  const [isBoardDisabled, setIsBoardDisabled] = useState(false);

  useEffect(() => {
    setCardsArray(createCardsArray());
  }, []);

  const checkWin = () => {
    if (solvedArray.length && solvedArray.length === cardsArray.length) {
      console.log('you won');
    }
  };

  useEffect(() => {
    checkWin();
  }, [solvedArray]);

  const resetFlippedAndDisabledState = () => {
    setFlippedPair([]);
    setIsBoardDisabled(false);
  };

  const newGame = () => {
    setCardsArray(createCardsArray());
    setSolvedArray([]);
    resetFlippedAndDisabledState();
  };

  const isSameCardClicked = (id) => flippedPair[0] === id;

  const isMatchingPair = (id) => {
    const flippedCard = cardsArray.find((card) => card.id === flippedPair[0]);
    const clickedCard = cardsArray.find((card) => card.id === id);
    return flippedCard.imgTitle === clickedCard.imgTitle;
  };

  const handleClick = (id) => {
    if (!flippedPair.length) {
      setFlippedPair([id]);
    } else {
      if (isSameCardClicked(id)) {
        return;
      }
      setIsBoardDisabled(true);
      setFlippedPair([flippedPair[0], id]);
      if (isMatchingPair(id)) {
        setSolvedArray([...solvedArray, flippedPair[0], id]);
        resetFlippedAndDisabledState();
      } else {
        setTimeout(resetFlippedAndDisabledState, delayTime);
      }
    }
  };

  return (
    <div className="App">
      <Board
        cardsArray={cardsArray}
        flippedPair={flippedPair}
        solvedArray={solvedArray}
        isBoardDisabled={isBoardDisabled}
        handleClick={handleClick}
      />
      <div>
        <button type="button" onClick={newGame}>New game</button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
