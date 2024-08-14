import React, { useContext, useState } from 'react';
import { Text } from '../type/TextType';
import { AppContext } from '../../../App/providers/context/contextProvider';


const getBackgroundColor = (userId: number): string => {
  switch (userId) {
    case 1:
      return '#FFCCCC';
    case 2:
      return '#CCFFCC';
    case 3:
      return '#CCCCFF';
    default:
      return '#FFFFFF';
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
      return '#FFFFFF';
  }
};


function TextBlock({ text }: { text: Text }): JSX.Element {
  const { currentUser } = useContext(AppContext);

  const [currentText, setCurrentText] = useState('');

  const backgroundColor = getBackgroundColor(text.userID);
  const name = getName(text.userID);

  function edit(event: React.FormEvent<HTMLFormElement>) {
    if (currentUser?.id === text.userID) {
      setCurrentText(event.target.innerText);
    }
  }

  return (
    <div
      className="m-3 rounded "
      style={{ background: backgroundColor, padding: '0.6%' }}
    >
      {/* <div contentEditable onInput={edit} style={{ padding: '1%' }}>
        {text.body}
      </div> */}



      <div style={{ padding: '1%' }}>
        {text.body}
      </div>

      <div className="text-end">
        <small>Written by: {name}</small>
      </div>
    </div>
  );
}

export default TextBlock;
