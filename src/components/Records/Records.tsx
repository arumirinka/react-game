import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  records: Array<number>,
  toggleRecords: React.MouseEventHandler<HTMLButtonElement>,
};

const Records: React.FC<Props> = ({ records, toggleRecords }) => {
  const last10Records = [...records].reverse().slice(0, 10);
  const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="game_info__wrapper">
      <h3>
        Last 10 Records
      </h3>
      {
        last10Records.length ? (
          <ol>
            {last10Records.map((rec, i) => (
              <li key={indexes[i]}>Moves: {rec}</li>
            ))}
          </ol>
        ) : (
          <p>No records yet.</p>
        )
      }
      <button type="button" onClick={toggleRecords}>
        Back
      </button>
    </div>
  );
};

Records.propTypes = {
  records: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  toggleRecords: PropTypes.func.isRequired,
};

export default Records;
