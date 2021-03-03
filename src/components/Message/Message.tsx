import React from 'react';
import './message.css';

type Props = {
  moves: number,
};

// eslint-disable-next-line react/prop-types
const Message: React.FC<Props> = ({ moves }) => (
  <div className="message__wrapper">
    <h3>
      Congratulations!
    </h3>
    <h3>
      You won in {moves} moves!
    </h3>
  </div>
);

export default Message;
