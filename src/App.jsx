/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import createCardsArray from './utils/createCardsArray';
import Footer from './components/Footer/Footer';
import Settings from './components/Settings/Settings';

function App() {
  const [cardsArray, setCardsArray] = useState([]);
  const [flippedPair, setFlippedPair] = useState([]);
  const [solvedArray, setSolvedArray] = useState([]);
  const [isBoardDisabled, setIsBoardDisabled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSecondBackStyle, setIsSecondBackStyle] = useState(false);
  const [isSecondDeck, setIsSecondDeck] = useState(false);
  const [isDelay2s, setIsDelay2s] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const delayTime = isDelay2s ? 2000 : 1000;

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
    setCardsArray(createCardsArray(isSecondDeck ? 1 : 0));
    setSolvedArray([]);
    resetFlippedAndDisabledState();
  };

  useEffect(() => {
    newGame();
  }, [isSecondDeck]);

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

  const changeDeck = (isDeck2) => {
    setIsSecondDeck(isDeck2);
  };

  const changeDelay = (isDelay2Sec) => {
    setIsDelay2s(isDelay2Sec);
  };

  return (
    <div className="App">
      {isSettingsOpen ? (
        <Settings
          changeBackStyle={changeBackStyle}
          isBackStyle2={isSecondBackStyle}
          changeDeck={changeDeck}
          isSecondDeck={isSecondDeck}
          changeDelay={changeDelay}
          isDelay2s={isDelay2s}
          toggleSettings={toggleSettings}
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
