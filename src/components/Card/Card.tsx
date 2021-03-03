import React from 'react';
import './card.css';

type Props = {
  isFlipped: boolean,
  isSolved: boolean,
  isDisabled: boolean,
  handleClick: Function,
  id: number,
  imgTitle: string,
};

const Card: React.FC<Props> = ({
  // eslint-disable-next-line react/prop-types
  isFlipped, isSolved, isDisabled, handleClick, id, imgTitle,
}) => (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    className={`card ${isFlipped ? 'flipped' : ''} ${isSolved || isDisabled ? 'disabled' : ''}`}
    onClick={() => (isDisabled ? null : handleClick(id))}
  >
    <div className="card__inner">
      <img
        src={isFlipped || isSolved ? `/img/${imgTitle}.jpg` : '/img/pea.jpg'}
        alt="matching game img"
        className={isFlipped ? 'front' : 'back'}
      />
    </div>
  </div>
);

export default Card;
