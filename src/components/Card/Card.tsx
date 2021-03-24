import React from 'react';
import PropTypes from 'prop-types';
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
  isFlipped, isSolved, isDisabled, handleClick, id, imgTitle, isSecondBackStyle,
}) => {
  const backImg: string = isSecondBackStyle ? '/img/butterfly_back.jpg' : '/img/ladybug_back.jpg';

  const isFlippedOrSolved: boolean = isFlipped || isSolved;
  const flippedStyle: string = isFlipped ? ' flipped' : '';
  const solvedStyle: string = isSolved ? ' solved' : '';
  const disabledStyle: string = isDisabled ? ' disabled' : '';
  const cardDivClassName: string = `card${flippedStyle}${solvedStyle}${disabledStyle}`;

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
    e: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (!isDisabled && e.key === 'Enter') {
      handleClick(id);
    }
  };

  return (
    <div
      className={cardDivClassName}
      onClick={() => (isDisabled ? null : handleClick(id))}
      onKeyDown={(e) => handleKeyDown(e)}
      role="button"
      tabIndex={0}
    >
      <div className="card__inner">
        <img
          src={isFlippedOrSolved ? `/img/${imgTitle}.jpg` : backImg}
          alt={isFlippedOrSolved ? imgTitle : 'matching game img'}
          className={isFlippedOrSolved ? 'front' : 'back'}
        />
      </div>
    </div>
  );
};

Card.propTypes = {
  isFlipped: PropTypes.bool.isRequired,
  isSolved: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  imgTitle: PropTypes.string.isRequired,
  isSecondBackStyle: PropTypes.bool.isRequired,
};

export default Card;
