import React, { useContext, useState } from 'react';
import { Note, NoteID } from '../type/NoteType';
import { AppContext } from '../../../App/providers/contextProvider';
import axiosInstance from '../../../../services/axiosInstace';
import { AxiosResponse } from 'axios';

type CreateNote = Omit<Note, 'id' | 'folderID'>;

function AddNewCard(): JSX.Element {
  //use Omit

  const { setAddMode, setNotes, currentUser } = useContext(AppContext);

  const [newNote, setNewNote] = useState<CreateNote>({
    description: '',
    title: '',
    userID: currentUser?.id 
  });

  async function addNewNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const { data }: AxiosResponse<Note> = await axiosInstance.post(
        '/notes/',
        newNote
      );
      setNotes((prev) => [...prev, data]);
      setAddMode((prev) => !prev)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div style={{ width: '40%', margin: ' 0 auto' }}>
        <h4 className="text-center">Добавить новую заметку</h4>

        <form onSubmit={addNewNote}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Название
            </label>
            <input
              type="text"
              onChange={(event) =>
                setNewNote((prev) => ({ ...prev, title: event.target.value }))
              }
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Название"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Описание
            </label>
            <input
              type="text"
              onChange={(event) =>
                setNewNote((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="Описание"
            />
          </div>

          <button type="submit" className="btn btn-outline-success m-1">
            Добавить
          </button>

          <button
            onClick={() => setAddMode((prev) => !prev)}
            type="button"
            className="btn btn-outline-danger m-1"
          >
            Отменить
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNewCard;
