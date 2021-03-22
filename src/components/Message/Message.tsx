import React from 'react';
import PropTypes from 'prop-types';
import './message.css';

type Props = {
  moves: number,
};

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

Message.propTypes = {
  moves: PropTypes.number.isRequired,
};

export default Message;
