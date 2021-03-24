import React from 'react';
import PropTypes from 'prop-types';
import './settings.css';

type SettingsState = {
  isSecondBackStyle: boolean,
  isSecondDeck: boolean,
  isDelay2s: boolean,
  isMusicOn: boolean,
  musicVolume: number,
  isSoundsOn: boolean,
  soundsVolume: number,
};

type Props = {
  changeBackStyle: React.ChangeEventHandler<HTMLInputElement>,
  changeDeck: Function,
  changeDelay: React.ChangeEventHandler<HTMLInputElement>,
  toggleSettings: React.MouseEventHandler<HTMLButtonElement> | undefined,
  toggleMusic: Function,
  changeMusicVolume: Function,
  toggleSounds: Function,
  changeSoundsVolume: Function,
  settingsState: SettingsState,
};

const Settings: React.FC<Props> = ({
  changeBackStyle, changeDeck, changeDelay, toggleSettings, toggleMusic, changeMusicVolume,
  toggleSounds, changeSoundsVolume, settingsState,
}) => {
  const handleDeckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeDeck(e.target.checked);
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
            onChange={changeBackStyle}
            checked={settingsState.isSecondBackStyle}
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
            checked={settingsState.isSecondDeck}
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
            onChange={changeDelay}
            checked={settingsState.isDelay2s}
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
            checked={settingsState.isMusicOn}
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
          value={settingsState.musicVolume * 100}
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
            checked={settingsState.isSoundsOn}
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
          value={settingsState.soundsVolume * 100}
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
  changeDeck: PropTypes.func.isRequired,
  changeDelay: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired,
  toggleMusic: PropTypes.func.isRequired,
  changeMusicVolume: PropTypes.func.isRequired,
  toggleSounds: PropTypes.func.isRequired,
  changeSoundsVolume: PropTypes.func.isRequired,
  settingsState: PropTypes.shape({
    isSecondBackStyle: PropTypes.bool.isRequired,
    isSecondDeck: PropTypes.bool.isRequired,
    isDelay2s: PropTypes.bool.isRequired,
    isMusicOn: PropTypes.bool.isRequired,
    musicVolume: PropTypes.number.isRequired,
    isSoundsOn: PropTypes.bool.isRequired,
    soundsVolume: PropTypes.number.isRequired,
  }).isRequired,
};

export default Settings;
