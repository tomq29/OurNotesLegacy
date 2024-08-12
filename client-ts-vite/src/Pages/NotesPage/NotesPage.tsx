import React, { useContext, useEffect, useState } from 'react';

import { getAllNotes } from '../../Entities/Notes/api/noteApi';
import NoteCard from '../../Entities/Notes/ui/NoteCard';
import { AppContext } from '../../App/providers/contextProvider';

import AddNewCard from '../../Entities/Notes/ui/AddNewCard';
import Spinner from '../../Shared/LoadingSpinner/Spinner';

function NotesPage(): JSX.Element {
  // const [addMode, setAddMode] = useState<boolean>(false);

  const { notes, setNotes, addMode, setAddMode, loading, setLoading } =
    useContext(AppContext);

  

  useEffect(() => {
    getAllNotes()
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  if (loading) {
    return <Spinner/>
  }
  return (
    <div>
      {addMode ? (
        <>
          <AddNewCard />
        </>
      ) : (
        <>
          <div style={{ width: '10%', margin: ' 0 auto' }}>
            <button
              onClick={() => setAddMode((prev) => !prev)}
              type="button"
              className="btn btn-outline-success"
            >
              Добавить новую заметку
            </button>
          </div>
        </>
      )}

      <div className="container d-flex flex-wrap">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default NotesPage;
