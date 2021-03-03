import React from 'react';
import './card.css';

type Props = {
  isFlipped: boolean,
  isSolved: boolean,
  isDisabled: boolean,
  handleClick: Function,
  id: number,
  imgTitle: string,
  isSecondBackStyle: boolean,
};

const Card: React.FC<Props> = ({
  // eslint-disable-next-line react/prop-types
  isFlipped, isSolved, isDisabled, handleClick, id, imgTitle, isSecondBackStyle,
}) => {
  const backImg = isSecondBackStyle ? '/img/butterfly_back.jpg' : '/img/ladybug_back.jpg';

  return (
    // eslint-disable-next-line
    <div
      className={`card ${isFlipped ? 'flipped' : ''} ${isSolved || isDisabled ? 'disabled' : ''}`}
      onClick={() => (isDisabled ? null : handleClick(id))}
    >
      <div className="card__inner">
        <img
          src={isFlipped || isSolved ? `/img/${imgTitle}.jpg` : backImg}
          alt="matching game img"
          className={isFlipped ? 'front' : 'back'}
        />
      </div>
    </div>
  );
};

export default Card;
