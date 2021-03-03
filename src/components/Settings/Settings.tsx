import React from 'react';
import './settings.css';

type Props = {
  changeBackStyle: Function,
  isSecondBackStyle: boolean,
};

const Settings: React.FC<Props> = ({
  // eslint-disable-next-line react/prop-types
  changeBackStyle, isSecondBackStyle,
}) => {
  const handleBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeBackStyle(e.target.checked);
  };

  return (
    <div className="settings__wrapper">
      <h3>Settings</h3>
      <span>
        Back style 1&nbsp;
      </span>
      <label className="switch" htmlFor="back">
        <input
          type="checkbox"
          className="checkbox_input"
          id="back"
          onChange={handleBackChange}
          checked={isSecondBackStyle}
        />
        <span className="switch-slider" />
      </label>
      <span>
        &nbsp;Back style 2
      </span>
    </div>
  );
};

export default Settings;
