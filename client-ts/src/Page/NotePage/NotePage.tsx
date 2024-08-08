import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../services/axiosInstace';
import { AxiosResponse } from 'axios';


function NotePage(): JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);

  type Note = {
    id: number;
    title: string;
    description: string;
    folderID: number;
    userID: number;
  };

  async function getNotes(): Promise<void> {
    try {
      const {data} = await axiosInstance.get('/notes');
      setNotes(data);
 
      
    } catch (error) {
      console.error(error);
    }
  }

useEffect(()=>{getNotes()},[])


  return <div>
    


{notes.map(note => {
  return <div>{note.title}</div>
})}

  </div>;
}

export default NotePage;
