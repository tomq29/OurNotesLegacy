import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App/providers/contextProvider';
import { getOneNote } from '../../Entities/Notes/api/noteApi';

function OneNotePage(): JSX.Element {
  const { id } = useParams();

  const { notes, oneNote, setOneNote, loading, setLoading } =
    useContext(AppContext);

  // if (id) {
  //   const [note] = notes.filter((el) => el.id === +id);
  //   setOneNote(note);
  // }

  useEffect(() => {

    
    getOneNote(Number(id))
      .then((data) => {
        
        setOneNote(data);
        console.log(oneNote);
        
        setLoading(false);
        
      })
      .catch(console.log);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <>
        <h5 className="card-title">{oneNote.title}</h5>
        <p className="card-text">{oneNote.description}</p>

        {/* <div contentEditable> Измени меня</div> */}
        {/* <div contentEditable> Измени меня2</div> */}
      </>
    </div>
  );
}

export default OneNotePage;
