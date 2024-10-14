import React from 'react';

interface MessageProps {
  variant: string;
  children: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ variant, children }) => {
  return <div className={`alert alert-${variant}`}>{children}</div>;
};

export default Message;
