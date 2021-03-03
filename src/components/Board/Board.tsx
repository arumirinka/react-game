/* eslint-disable react/prop-types */
import React from 'react';
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

export default Board;
