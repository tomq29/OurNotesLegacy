import React, { useEffect, useState } from 'react';
import { Note } from '../../Entities/Notes/type/NoteType';
import { getAllNotes } from '../../Entities/Notes/api/noteApi';
import NoteCard from '../../Entities/Notes/ui/NoteCard';

function NotesPage(): JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getAllNotes()
      .then((data) => setNotes(data))
      .catch(console.log);
    
  }, []);


  
  return <div>
    

    {notes.map(note => <NoteCard key={note.id}  note={note}  setNotes={setNotes}  />  )}
  </div>;
}

export default NotesPage;
