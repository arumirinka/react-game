import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import './App.css';
import Board from './components/Board/Board';
import createCardsArray from './utils/createCardsArray';
import Footer from './components/Footer/Footer';
import Settings from './components/Settings/Settings';
import EndGameMessage from './components/EndGameMessage/EndGameMessage';
import GameInfo from './components/GameInfo/GameInfo';
import Records from './components/Records/Records';

const savedSettings = JSON.parse(localStorage.getItem('arumiMemorySettings')) || null;

function App() {
  const [gameState, setGameState] = useState({
    cardsArray: [],
    flippedPair: [],
    solvedArray: JSON.parse(localStorage.getItem('arumiMemorySolved')) || [],
    isBoardDisabled: false,
    isGameWon: false,
  });

  const [settingsState, setSettingsState] = useState({
    isSecondBackStyle: savedSettings ? Boolean(savedSettings.isSecondBackStyle) : false,
    isSecondDeck: savedSettings ? Boolean(savedSettings.isSecondDeck) : false,
    isDelay2s: savedSettings ? Boolean(savedSettings.isDelay2s) : false,
    isMusicOn: savedSettings ? Boolean(savedSettings.isMusicOn) : false,
    musicVolume: savedSettings ? Number(savedSettings.musicVolume) || 0.5 : 0.5,
    isSoundsOn: savedSettings ? Boolean(savedSettings.isSoundsOn) : true,
    soundsVolume: savedSettings ? Number(savedSettings.soundsVolume) || 0.7 : 0.7,
  });

  const [modalsState, setModalsState] = useState({
    isSettingsOpen: false,
    isGameInfoOpen: false,
    isRecordsOpen: false,
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [records, setRecords] = useState(JSON.parse(localStorage.getItem('arumiMemoryRecords')) || []);
  const [movesCounter, setMovesCounter] = useState(Number(localStorage.getItem('arumiMemoryMoves')) || 0);

  const [play, { stop }] = useSound('../../audio/music.mp3', {
    volume: settingsState.musicVolume,
    loop: true,
  });

  const delayTime = settingsState.isDelay2s ? 2000 : 1000;

  useEffect(() => {
    if (settingsState.isMusicOn) {
      play();
    } else {
      stop();
    }
  }, [settingsState.isMusicOn]);

  useEffect(() => {
    if (localStorage.getItem('arumiMemoryCards')) {
      setGameState({ ...gameState, cardsArray: JSON.parse(localStorage.getItem('arumiMemoryCards')) });
    } else {
      setGameState({ ...gameState, cardsArray: createCardsArray() });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('arumiMemoryCards', JSON.stringify(gameState.cardsArray));
  }, [gameState.cardsArray]);

  useEffect(() => {
    localStorage.setItem('arumiMemorySolved', JSON.stringify(gameState.solvedArray));
  }, [gameState.solvedArray]);

  useEffect(() => {
    localStorage.setItem('arumiMemorySettings', JSON.stringify(settingsState));
  }, [settingsState]);

  useEffect(() => {
    localStorage.setItem('arumiMemoryMoves', movesCounter);
  }, [movesCounter]);

  useEffect(() => {
    localStorage.setItem('arumiMemoryRecords', JSON.stringify(records));
  }, [records]);

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
    if (gameState.solvedArray.length
      && gameState.solvedArray.length === gameState.cardsArray.length) {
      setGameState({ ...gameState, isGameWon: true });
      setRecords([...records, movesCounter]);
      if (settingsState.isSoundsOn) {
        const audioPath = '../../audio/fanfare.mp3';
        const audio = new Audio(audioPath);
        audio.volume = settingsState.soundsVolume;
        audio.play();
      }
    }
  };

  useEffect(() => {
    checkWin();
  }, [gameState.solvedArray]);

  const newGame = (deckNum) => {
    let deckNumber = 0;
    if (deckNum && deckNum === 'first') {
      deckNumber = 0;
    } else if (deckNum && deckNum === 'second') {
      deckNumber = 1;
    } else {
      deckNumber = settingsState.isSecondDeck ? 1 : 0;
    }
    setMovesCounter(0);
    setGameState({
      ...gameState,
      cardsArray: createCardsArray(deckNumber),
      solvedArray: [],
      flippedPair: [],
      isBoardDisabled: false,
      isGameWon: false,
    });
  };

  const isSameCardClicked = (id) => gameState.flippedPair[0] === id;

  const isMatchingPair = (id) => {
    const flippedCard = gameState.cardsArray.find((card) => card.id === gameState.flippedPair[0]);
    const clickedCard = gameState.cardsArray.find((card) => card.id === id);
    return flippedCard.imgTitle === clickedCard.imgTitle;
  };

  const resetFlippedAndDisabledState = () => {
    setGameState({ ...gameState, flippedPair: [], isBoardDisabled: false });
  };

  const handleClick = (id) => {
    let audioPath = '';
    if (!gameState.flippedPair.length) {
      setGameState({ ...gameState, flippedPair: [id] });
      audioPath = '../../audio/flip.mp3';
      setMovesCounter((prev) => prev + 1);
    } else {
      if (isSameCardClicked(id)) {
        return;
      }
      setGameState({
        ...gameState,
        flippedPair: [gameState.flippedPair[0], id],
        isBoardDisabled: true,
      });
      setMovesCounter((prev) => prev + 1);
      if (isMatchingPair(id)) {
        audioPath = '../../audio/correct.mp3';
        setGameState({
          ...gameState,
          solvedArray: [...gameState.solvedArray, gameState.flippedPair[0], id],
          flippedPair: [],
          isBoardDisabled: false,
        });
      } else {
        audioPath = '../../audio/wrong.mp3';
        setTimeout(resetFlippedAndDisabledState, delayTime);
      }
    }
    if (settingsState.isSoundsOn) {
      const audio = new Audio(audioPath);
      audio.volume = settingsState.soundsVolume;
      audio.play();
    }
  };

  const toggleSettings = () => {
    setModalsState({ ...modalsState, isSettingsOpen: !modalsState.isSettingsOpen });
  };

  const toggleGameInfo = () => {
    setModalsState({ ...modalsState, isGameInfoOpen: !modalsState.isGameInfoOpen });
  };

  const toggleRecords = () => {
    setModalsState({ ...modalsState, isRecordsOpen: !modalsState.isRecordsOpen });
  };

  const handleFullscreenClick = () => {
    setIsFullscreen(!isFullscreen);
  };

  const changeBackStyle = (backStyle) => {
    setSettingsState({ ...settingsState, isSecondBackStyle: backStyle });
  };

  const changeDeck = (isDeck2) => {
    setSettingsState({ ...settingsState, isSecondDeck: isDeck2 });
    newGame(isDeck2 ? 'second' : 'first');
  };

  const changeDelay = (isDelay2Sec) => {
    setSettingsState({ ...settingsState, isDelay2s: isDelay2Sec });
  };

  const toggleMusic = (isMusicOnChecked) => {
    setSettingsState({ ...settingsState, isMusicOn: isMusicOnChecked });
  };

  const changeMusicVolume = (mVolume) => {
    setSettingsState({ ...settingsState, musicVolume: mVolume });
  };

  const toggleSounds = (isSoundsOnChecked) => {
    setSettingsState({ ...settingsState, isSoundsOn: isSoundsOnChecked });
  };

  const changeSoundsVolume = (sVolume) => {
    setSettingsState({ ...settingsState, soundsVolume: sVolume });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'n' || event.key === 'N') {
      newGame();
    }
    if (event.key === 's' || event.key === 'S') {
      toggleSettings();
    }
    if (event.key === 'f' || event.key === 'F') {
      handleFullscreenClick();
    }
    if (event.key === 'm' || event.key === 'M') {
      setSettingsState({ ...settingsState, isMusicOn: false });
    }
    if (event.key === 'j' || event.key === 'J') {
      setSettingsState({ ...settingsState, isSoundsOn: false });
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  const isDarkOverlayOn = modalsState.isSettingsOpen || gameState.isGameWon
    || modalsState.isGameInfoOpen || modalsState.isRecordsOpen;

  return (
    <div className="App">
      <div className="main__wrapper">
        {modalsState.isSettingsOpen ? (
          <Settings
            changeBackStyle={changeBackStyle}
            isBackStyle2={settingsState.isSecondBackStyle}
            changeDeck={changeDeck}
            isSecondDeck={settingsState.isSecondDeck}
            changeDelay={changeDelay}
            isDelay2s={settingsState.isDelay2s}
            toggleSettings={toggleSettings}
            isMusicOn={settingsState.isMusicOn}
            toggleMusic={toggleMusic}
            musicVolume={settingsState.musicVolume}
            changeMusicVolume={changeMusicVolume}
            isSoundsOn={settingsState.isSoundsOn}
            toggleSounds={toggleSounds}
            soundsVolume={settingsState.soundsVolume}
            changeSoundsVolume={changeSoundsVolume}
          />
        ) : null}
        {gameState.isGameWon ? (
          <EndGameMessage moves={movesCounter} />
        ) : null}
        {modalsState.isGameInfoOpen ? (
          <GameInfo toggleGameInfo={toggleGameInfo} />
        ) : null}
        {modalsState.isRecordsOpen ? (
          <Records
            toggleRecords={toggleRecords}
            records={records}
          />
        ) : null}
        <div className={`${isDarkOverlayOn ? 'dark-overlay--enabled' : 'dark-overlay'}`}>
          <Board
            cardsArray={gameState.cardsArray}
            flippedPair={gameState.flippedPair}
            solvedArray={gameState.solvedArray}
            isBoardDisabled={gameState.isBoardDisabled}
            handleClick={handleClick}
            isSecondBackStyle={settingsState.isSecondBackStyle}
          />
        </div>
        <div className="moves__wrapper">
          <span className="moves__span">
            Moves: {movesCounter}
          </span>
          <button
            type="button"
            onClick={toggleRecords}
            className={`${modalsState.isRecordsOpen ? 'btn--active' : ''}`}
          >
            Last 10 records
          </button>
        </div>
        <div>
          <button type="button" onClick={newGame}>New game</button>
          <button
            type="button"
            onClick={toggleSettings}
            className={`${modalsState.isSettingsOpen ? 'btn--active' : ''}`}
          >
            Settings
          </button>
          <button
            type="button"
            onClick={toggleGameInfo}
            className={`${modalsState.isGameInfoOpen ? 'btn--active' : ''}`}
          >
            Hot keys
          </button>
          <button
            type="button"
            onClick={handleFullscreenClick}
            className={`${isFullscreen ? 'btn--active' : ''}`}
          >
            {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
