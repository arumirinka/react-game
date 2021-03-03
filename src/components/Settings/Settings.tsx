import React from 'react';
import './settings.css';

type Props = {
  changeBackStyle: Function,
  isBackStyle2: boolean,
  changeDeck: Function,
  isSecondDeck: boolean,
  changeDelay: Function,
  isDelay2s: boolean,
  toggleSettings: React.MouseEventHandler<HTMLButtonElement> | undefined,
};

const Settings: React.FC<Props> = ({
  // eslint-disable-next-line react/prop-types
  changeBackStyle, isBackStyle2, changeDeck, isSecondDeck, changeDelay, isDelay2s, toggleSettings,
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
      <button type="button" className="settings__back-btn" onClick={toggleSettings}>
        Back
      </button>
    </div>
  );
};

export default Settings;
