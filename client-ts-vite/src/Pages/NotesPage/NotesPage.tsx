import React, { useEffect, useState } from 'react';
import { Note } from '../../Entities/Notes/type/NoteType';
import { getAllNotes } from '../../Entities/Notes/api/noteApi';

function NotesPage(): JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getAllNotes()
      .then((data) => setNotes(data))
      .catch(console.log);
    
  }, []);

  console.log(notes);
  
  return <div>NotesPage</div>;
}

export default NotesPage;
