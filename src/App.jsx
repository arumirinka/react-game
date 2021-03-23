import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import './App.css';
import Board from './components/Board/Board';
import createCardsArray from './utils/createCardsArray';
import Footer from './components/Footer/Footer';
import Settings from './components/Settings/Settings';
import Message from './components/Message/Message';
import GameInfo from './components/GameInfo/GameInfo';
import Records from './components/Records/Records';

function App() {
  let audioPath = '';
  const musicPath = '../../audio/music.mp3';

  const [cardsArray, setCardsArray] = useState([]);
  const [flippedPair, setFlippedPair] = useState([]);
  const [solvedArray, setSolvedArray] = useState(JSON.parse(localStorage.getItem('arumiMemorySolved')) || []);
  const [isBoardDisabled, setIsBoardDisabled] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGameInfoOpen, setIsGameInfoOpen] = useState(false);
  const [isSecondBackStyle, setIsSecondBackStyle] = useState(false);
  const [isSecondDeck, setIsSecondDeck] = useState('');
  const [isDelay2s, setIsDelay2s] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [isSoundsOn, setIsSoundsOn] = useState(true);
  const [soundsVolume, setSoundsVolume] = useState(0.7);
  const [records, setRecords] = useState([]);
  const [isRecordsOpen, setIsRecordsOpen] = useState(false);
  const [movesCounter, setMovesCounter] = useState(Number(localStorage.getItem('arumiMemoryMoves')) || 0);

  const [play, { stop }] = useSound(musicPath, { volume: musicVolume });

  useEffect(() => {
    if (isMusicOn) {
      play();
    } else {
      stop();
    }
  }, [isMusicOn]);

  const delayTime = isDelay2s ? 2000 : 1000;

  useEffect(() => {
    if (localStorage.getItem('arumiMemoryCards')) {
      setCardsArray(JSON.parse(localStorage.getItem('arumiMemoryCards')));
    } else {
      setCardsArray(createCardsArray());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('arumiMemoryCards', JSON.stringify(cardsArray));
  }, [cardsArray]);

  useEffect(() => {
    localStorage.setItem('arumiMemorySolved', JSON.stringify(solvedArray));
  }, [solvedArray]);

  useEffect(() => {
    localStorage.setItem('arumiMemoryMoves', movesCounter);
  }, [movesCounter]);

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
      setIsGameWon(true);
      setRecords([...records, movesCounter]);
      if (isSoundsOn) {
        audioPath = '../../audio/fanfare.mp3';
        const audio = new Audio(audioPath);
        audio.volume = soundsVolume;
        audio.play();
      }
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
    setMovesCounter(0);
    setIsGameWon(false);
    setCardsArray(createCardsArray(isSecondDeck ? 1 : 0));
    setSolvedArray([]);
    resetFlippedAndDisabledState();
  };

  useEffect(() => {
    if (isSecondDeck !== '') {
      newGame();
    }
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
      audioPath = '../../audio/flip.mp3';
      setMovesCounter((prev) => prev + 1);
    } else {
      if (isSameCardClicked(id)) {
        return;
      }
      setIsBoardDisabled(true);
      setFlippedPair([flippedPair[0], id]);
      setMovesCounter((prev) => prev + 1);
      if (isMatchingPair(id)) {
        audioPath = '../../audio/correct.mp3';
        setSolvedArray([...solvedArray, flippedPair[0], id]);
        resetFlippedAndDisabledState();
      } else {
        audioPath = '../../audio/wrong.mp3';
        setTimeout(resetFlippedAndDisabledState, delayTime);
      }
    }
    if (isSoundsOn) {
      const audio = new Audio(audioPath);
      audio.volume = soundsVolume;
      audio.play();
    }
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleGameInfo = () => {
    setIsGameInfoOpen(!isGameInfoOpen);
  };

  const toggleRecords = () => {
    setIsRecordsOpen(!isRecordsOpen);
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

  const toggleMusic = (isMusicOnChecked) => {
    setIsMusicOn(isMusicOnChecked);
  };

  const changeMusicVolume = (mVolume) => {
    setMusicVolume(mVolume);
  };

  const toggleSounds = (isSoundsOnChecked) => {
    setIsSoundsOn(isSoundsOnChecked);
  };

  const changeSoundsVolume = (sVolume) => {
    setSoundsVolume(sVolume);
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
      setIsMusicOn(false);
    }
    if (event.key === 'j' || event.key === 'J') {
      setIsSoundsOn(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  const isDarkOverlayOn = isSettingsOpen || isGameWon || isGameInfoOpen || isRecordsOpen;

  return (
    <div className="App">
      <div className="main__wrapper">
        {isSettingsOpen ? (
          <Settings
            changeBackStyle={changeBackStyle}
            isBackStyle2={isSecondBackStyle}
            changeDeck={changeDeck}
            isSecondDeck={isSecondDeck}
            changeDelay={changeDelay}
            isDelay2s={isDelay2s}
            toggleSettings={toggleSettings}
            isMusicOn={isMusicOn}
            toggleMusic={toggleMusic}
            musicVolume={musicVolume}
            changeMusicVolume={changeMusicVolume}
            isSoundsOn={isSoundsOn}
            toggleSounds={toggleSounds}
            soundsVolume={soundsVolume}
            changeSoundsVolume={changeSoundsVolume}
          />
        ) : null}
        {isGameWon ? (
          <Message moves={movesCounter} />
        ) : null}
        {isGameInfoOpen ? (
          <GameInfo toggleGameInfo={toggleGameInfo} />
        ) : null}
        {isRecordsOpen ? (
          <Records
            toggleRecords={toggleRecords}
            records={records}
          />
        ) : null}
        <div className={`${isDarkOverlayOn ? 'dark-overlay--enabled' : 'dark-overlay'}`}>
          <Board
            cardsArray={cardsArray}
            flippedPair={flippedPair}
            solvedArray={solvedArray}
            isBoardDisabled={isBoardDisabled}
            handleClick={handleClick}
            isSecondBackStyle={isSecondBackStyle}
          />
        </div>
        <div className="moves__wrapper">
          <span className="moves__span">
            Moves: {movesCounter}
          </span>
          <button
            type="button"
            onClick={toggleRecords}
            className={`${isRecordsOpen ? 'btn--active' : ''}`}
          >
            Last 10 records
          </button>
        </div>
        <div>
          <button type="button" onClick={newGame}>New game</button>
          <button
            type="button"
            onClick={toggleSettings}
            className={`${isSettingsOpen ? 'btn--active' : ''}`}
          >
            Settings
          </button>
          <button
            type="button"
            onClick={toggleGameInfo}
            className={`${isGameInfoOpen ? 'btn--active' : ''}`}
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
