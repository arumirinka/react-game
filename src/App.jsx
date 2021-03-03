/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import createCardsArray from './utils/createCardsArray';
import Footer from './components/Footer/Footer';
import Settings from './components/Settings/Settings';

const delayTime = 2000;

function App() {
  const [cardsArray, setCardsArray] = useState([]);
  const [flippedPair, setFlippedPair] = useState([]);
  const [solvedArray, setSolvedArray] = useState([]);
  const [isBoardDisabled, setIsBoardDisabled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSecondBackStyle, setIsSecondBackStyle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setCardsArray(createCardsArray());
  }, []);

  const toggleFullscreen = () => {
    if (isFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    toggleFullscreen();
  }, [isFullscreen]);

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

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleFullscreenClick = () => {
    setIsFullscreen(!isFullscreen);
  };

  const changeBackStyle = (backStyle) => {
    setIsSecondBackStyle(backStyle);
  };

  return (
    <div className="App">
      {isSettingsOpen ? (
        <Settings
          changeBackStyle={changeBackStyle}
          isSecondBackStyle={isSecondBackStyle}
        />
      ) : null}
      <div className={`${isSettingsOpen ? 'dark-overlay--enabled' : 'dark-overlay'}`}>
        <Board
          cardsArray={cardsArray}
          flippedPair={flippedPair}
          solvedArray={solvedArray}
          isBoardDisabled={isBoardDisabled}
          handleClick={handleClick}
          isSecondBackStyle={isSecondBackStyle}
        />
      </div>
      <div>
        <button type="button" onClick={newGame}>New game</button>
        <button type="button" onClick={toggleSettings}>Settings</button>
        <button type="button" onClick={handleFullscreenClick}>
          {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
