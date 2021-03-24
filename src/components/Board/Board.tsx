import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import './board.css';

type CardType = {
  id: number,
  imgTitle: string,
};

type Props = {
  cardsArray: Array<CardType>,
  flippedPair: Array<number>,
  solvedArray: Array<number>,
  isBoardDisabled: boolean,
  handleClick: Function,
  isSecondBackStyle: boolean,
};

const Board: React.FC<Props> = ({
  cardsArray, flippedPair, solvedArray, isBoardDisabled, handleClick, isSecondBackStyle,
}) => (
  <div className="board">
    {cardsArray.map((card: CardType) => (
      <Card
        id={card.id}
        key={card.id}
        isFlipped={flippedPair.includes(card.id)}
        isSolved={solvedArray.includes(card.id)}
        isDisabled={isBoardDisabled || solvedArray.includes(card.id)}
        imgTitle={card.imgTitle}
        handleClick={handleClick}
        isSecondBackStyle={isSecondBackStyle}
      />
    ))}
  </div>
);

Board.propTypes = {
  cardsArray: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    imgTitle: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  flippedPair: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  solvedArray: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  isBoardDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSecondBackStyle: PropTypes.bool.isRequired,
};

export default Board;
