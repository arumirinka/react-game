import React from 'react';
import PropTypes from 'prop-types';
import './settings.css';

type Props = {
  changeBackStyle: Function,
  isBackStyle2: boolean,
  changeDeck: Function,
  isSecondDeck: boolean,
  changeDelay: Function,
  isDelay2s: boolean,
  toggleSettings: React.MouseEventHandler<HTMLButtonElement> | undefined,
  toggleMusic: Function,
  isMusicOn: boolean,
  musicVolume: number,
  changeMusicVolume: Function,
  isSoundsOn: boolean,
  toggleSounds: Function,
  soundsVolume: number,
  changeSoundsVolume: Function,
};

const Settings: React.FC<Props> = ({
  changeBackStyle, isBackStyle2, changeDeck, isSecondDeck, changeDelay, isDelay2s, toggleSettings,
  toggleMusic, isMusicOn, musicVolume, changeMusicVolume, isSoundsOn, toggleSounds, soundsVolume,
  changeSoundsVolume,
}) => {
  const handleBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeBackStyle(e.target.checked);
  };

  const handleDeckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeDeck(e.target.checked);
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeDelay(e.target.checked);
  };

  const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleMusic(e.target.checked);
  };

  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeMusicVolume(Number(e.target.value) / 100);
  };

  const handleSoundsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleSounds(e.target.checked);
  };

  const handleSoundsVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSoundsVolume(Number(e.target.value) / 100);
  };

  return (
    <div className="settings__wrapper">
      <h3>Settings</h3>
      <div className="settings__item">
        <span>
          Back style 1&nbsp;
        </span>
        <label className="switch" htmlFor="back">
          <input
            type="checkbox"
            className="checkbox_input"
            id="back"
            onChange={handleBackChange}
            checked={isBackStyle2}
          />
          <span className="switch-slider" />
        </label>
        <span>
          &nbsp;Back style 2
        </span>
      </div>
      <div className="settings__item">
        <span>
          Deck 1&nbsp;
        </span>
        <label className="switch" htmlFor="front">
          <input
            type="checkbox"
            className="checkbox_input"
            id="front"
            onChange={handleDeckChange}
            checked={isSecondDeck}
          />
          <span className="switch-slider" />
        </label>
        <span>
          &nbsp;Deck 2
        </span>
      </div>
      <div className="settings__item">
        <span>
          1s delay&nbsp;
        </span>
        <label className="switch" htmlFor="delayTime">
          <input
            type="checkbox"
            className="checkbox_input"
            id="delayTime"
            onChange={handleDelayChange}
            checked={isDelay2s}
          />
          <span className="switch-slider" />
        </label>
        <span>
          &nbsp;2s delay
        </span>
      </div>
      <div className="settings__item">
        <span>
          Music off&nbsp;
        </span>
        <label className="switch" htmlFor="music">
          <input
            type="checkbox"
            className="checkbox_input"
            id="music"
            onChange={handleMusicChange}
            checked={isMusicOn}
          />
          <span className="switch-slider" />
        </label>
        <span>
          &nbsp;Music on
        </span>
      </div>
      <div className="settings__item">
        <input
          type="range"
          value={musicVolume * 100}
          id="music_volume"
          onChange={handleMusicVolumeChange}
        />
      </div>
      <div className="settings__item">
        <span>
          Sounds off&nbsp;
        </span>
        <label className="switch" htmlFor="sounds">
          <input
            type="checkbox"
            className="checkbox_input"
            id="sounds"
            onChange={handleSoundsChange}
            checked={isSoundsOn}
          />
          <span className="switch-slider" />
        </label>
        <span>
          &nbsp;Sounds on
        </span>
      </div>
      <div className="settings__item">
        <input
          type="range"
          value={soundsVolume * 100}
          id="sounds_volume"
          onChange={handleSoundsVolumeChange}
        />
      </div>
      <button type="button" className="settings__back-btn" onClick={toggleSettings}>
        Back
      </button>
    </div>
  );
};

Settings.propTypes = {
  changeBackStyle: PropTypes.func.isRequired,
  isBackStyle2: PropTypes.bool.isRequired,
  changeDeck: PropTypes.func.isRequired,
  isSecondDeck: PropTypes.bool.isRequired,
  changeDelay: PropTypes.func.isRequired,
  isDelay2s: PropTypes.bool.isRequired,
  toggleSettings: PropTypes.func.isRequired,
  toggleMusic: PropTypes.func.isRequired,
  isMusicOn: PropTypes.bool.isRequired,
  musicVolume: PropTypes.number.isRequired,
  changeMusicVolume: PropTypes.func.isRequired,
  isSoundsOn: PropTypes.bool.isRequired,
  toggleSounds: PropTypes.func.isRequired,
  soundsVolume: PropTypes.number.isRequired,
  changeSoundsVolume: PropTypes.func.isRequired,
};

export default Settings;
