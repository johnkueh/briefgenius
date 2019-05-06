import { useState } from 'react';

export const useErrorMessages = initialState => {
  const [messages, setMessages] = useState(initialState);
  const setError = error => {
    if (error) {
      setMessages({
        warning: error.graphQLErrors[0].extensions.exception.errors
      });
    } else {
      setMessages(initialState);
    }
  };
  return [messages, setError];
};

export default {
  useErrorMessages
};
