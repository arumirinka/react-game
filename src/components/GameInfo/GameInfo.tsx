import React from 'react';
import PropTypes from 'prop-types';
import './gameInfo.css';

type Props = {
  toggleGameInfo: React.MouseEventHandler<HTMLButtonElement>,
};

const GameInfo: React.FC<Props> = ({ toggleGameInfo }) => (
  <div className="game_info__wrapper">
    <h3>
      Hot Keys
    </h3>
    <p>
      n - start new game<br />
      m - mute music<br />
      j - mute sounds<br />
      s - open settings<br />
      f - enter fullscreen<br />
      Tab - next card<br />
      Shift+Tab - prev card<br />
      Enter - flip the card<br />
    </p>
    <button type="button" onClick={toggleGameInfo}>
      Back
    </button>
  </div>
);

GameInfo.propTypes = {
  toggleGameInfo: PropTypes.func.isRequired,
};

export default GameInfo;
