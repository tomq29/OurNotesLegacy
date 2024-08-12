import React, { useContext, useEffect, useState } from 'react';

import { getAllNotes } from '../../Entities/Notes/api/noteApi';
import NoteCard from '../../Entities/Notes/ui/NoteCard';
import { AppContext } from '../../App/providers/contextProvider';

import AddNewCard from '../../Entities/Notes/ui/AddNewCard';
import Spinner from '../../Shared/LoadingSpinner/Spinner';

function NotesPage(): JSX.Element {

  const {
    notes,
    setNotes,
    addMode,
    setAddMode,
    loading,
    setLoading,
    state,
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    getAllNotes()
      .then((data) => {
        dispatch({type:'getAll', payload:data})
        // setNotes(data);
        setLoading(false);
      })
      .catch(console.log);


    return setLoading(true);
  }, []);

  if (loading) {
    return <Spinner />;
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
        {state.notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default NotesPage;
