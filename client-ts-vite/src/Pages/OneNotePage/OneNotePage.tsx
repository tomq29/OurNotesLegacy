import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App/providers/contextProvider';
import { getOneNote } from '../../Entities/Notes/api/noteApi';
import TextBlock from '../../Entities/Texts/ui/TextBlock';

function OneNotePage(): JSX.Element {
  const { id } = useParams();

  const { oneNote, setOneNote, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    getOneNote(Number(id))
      .then((data) => {
        setOneNote(data);

        setLoading(false);
      })
      .catch(console.log);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h5 className="text-center h1">Название: {oneNote.title}</h5>
      <p className="text-center h4">Описание: {oneNote.description}</p>

      {oneNote.Texts.map((text) => (
        <TextBlock key={text.id} text={text} />
      ))}


      
    
    </div>
  );
}

export default OneNotePage;
