import React from 'react';
import './gameInfo.css';

type Props = {
  toggleGameInfo: Function,
};

// eslint-disable-next-line react/prop-types
const GameInfo: React.FC<Props> = ({ toggleGameInfo }) => {
  const handleClick = () => toggleGameInfo();

  return (
    <div className="game_info__wrapper">
      <h3>
        Hot keys
      </h3>
      <p>
        n - start new game<br />
        m - mute music<br />
        j - mute sounds<br />
        s - open settings<br />
        f - enter fullscreen<br />
      </p>
      <button type="button" onClick={handleClick}>
        Back
      </button>
    </div>
  );
};

export default GameInfo;
