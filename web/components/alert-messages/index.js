import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../alert';

const AlertMessages = ({ messages }) => {
  if (messages) {
    return _.map(messages, (content, type) => <Alert key={type} type={type} messages={content} />);
  }

  return <></>;
};

export default AlertMessages;

AlertMessages.propTypes = {
  messages: PropTypes.object
};
