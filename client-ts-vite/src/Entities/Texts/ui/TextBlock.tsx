import React from 'react';
import { Text } from '../type/TextType';

const getBackgroundColor = (userId: number): string => {
  switch (userId) {
    case 1:
      return '#FFCCCC'; // Light Red
    case 2:
      return '#CCFFCC'; // Light Green
    case 3:
      return '#CCCCFF'; // Light Blue
    default:
      return '#FFFFFF'; // Default White
  }
};

const getName = (userId: number): string => {
  switch (userId) {
    case 1:
      return 'Tom';
    case 2:
      return 'Marie';
    case 3:
      return 'Admin';
    default:
      return '#FFFFFF'; // Default White
  }
};

function TextBlock({ text }: { text: Text }): JSX.Element {
  const backgroundColor = getBackgroundColor(text.userID);
  const name = getName(text.userID);

  return (
    <div className="m-3" style={{ background: backgroundColor, padding: '1%' }}>
      <div contentEditable>{text.body}</div>
      <div className="text-end">
        <small>Written by: {name}</small>
      </div>
    </div>
  );
}

export default TextBlock;
