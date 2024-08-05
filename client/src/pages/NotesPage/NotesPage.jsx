import React, { useEffect, useState } from 'react';
import NoteCard from '../../components/NoteCard/NoteCard';
import apiAxiosInstance from '../../../service/apiAxiosInstance';
import Folders from '../../components/Folders/Folders';

function NotesPage({ currentUser }) {
  const [notes, setNotes] = useState([]);

  async function getNotes() {
    try {
      const { data } = await apiAxiosInstance.get('/notes');
      setNotes(data);
    } catch ({ message }) {
      console.error({ message });
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div>NotesPage</div>

      <Folders />

      {currentUser ? (
        <div>
          {notes.map((note) => {
            return (
              <NoteCard
                key={note.id}
                note={note}
                currentUser={currentUser}
                getNotes={getNotes}
              />
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default NotesPage;
