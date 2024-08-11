import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App/providers/contextProvider';

function OneNotePage(): JSX.Element {
  const { id } = useParams();

  const { notes, oneNote, setOneNote } = useContext(AppContext);

  if (id) {
    const [note] = notes.filter((el) => el.id === +id);
    setOneNote(note);
  }


  

  return (
    <div>
      <>
        <h5 className="card-title">{oneNote.title}</h5>
        <p className="card-text">{oneNote.description}</p>

        <div contentEditable > Измени меня</div>
        <div contentEditable  > Измени меня2</div>


      </>
    </div>
  );
}

export default OneNotePage;
