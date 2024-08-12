import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App/providers/contextProvider';
import { getOneNote } from '../../Entities/Notes/api/noteApi';
import TextBlock from '../../Entities/Texts/ui/TextBlock';
import Spinner from '../../Shared/LoadingSpinner/Spinner';
import AddNewText from '../../Entities/Texts/ui/AddNewText';

function OneNotePage(): JSX.Element {
  const { id } = useParams();

  const { oneNote, setOneNote, loading, setLoading, state, dispatch } =
    useContext(AppContext);

  useEffect(() => {
    getOneNote(Number(id))
      .then((data) => {
        // setOneNote(data);
        dispatch({ type: 'getOne', payload: data });
        setLoading(false);
      })
      .catch(console.log);
    return setLoading(true);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <h5 className="text-center h1">Название: {state.oneNote.title}</h5>
      <p className="text-center h4">Описание: {state.oneNote.description}</p>

      {state.oneNote.Texts.map((text) => (
        <TextBlock key={text.id} text={text} />
      ))}

      <AddNewText/>

    
    </div>
  );
}

export default OneNotePage;
