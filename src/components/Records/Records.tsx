import React from 'react';

type Props = {
  records: Array<number>,
  toggleRecords: Function,
};

// eslint-disable-next-line react/prop-types
const Records: React.FC<Props> = ({ records, toggleRecords }) => {
  const handleClick = () => toggleRecords();
  const last10Records = [...records].reverse().slice(0, 10);
  const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="game_info__wrapper">
      <h3>
        Last 10 Records
      </h3>
      {
        last10Records.length && (
        <ol>
          {last10Records.map((rec, i) => (
            <li key={indexes[i]}>Moves: {rec}</li>
          ))}
        </ol>
        )
      }
      {
        !last10Records.length && <p>No records yet.</p>
      }
      <button type="button" onClick={handleClick}>
        Back
      </button>
    </div>
  );
};

export default Records;
