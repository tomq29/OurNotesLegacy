import React, { Dispatch, useContext, useState } from 'react';
import { Note, NoteID } from '../type/NoteType';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../App/providers/contextProvider';
import axiosInstance from '../../../../services/axiosInstace';

type NoteCardProps = {
  key: NoteID;
  note: Note;
};

function NoteCard({ note }: NoteCardProps): JSX.Element {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [normalMode, setNormalMode] = useState<boolean>(true);

  const { setNotes, dispatch } = useContext(AppContext);

  const [newNote, setNewNote] = useState<Note>({
    id: note.id,
    description: note.description,
    title: note.title,
    folderID: note.folderID,
    userID: note.userID,
  });

  const navigate = useNavigate();

  async function editNote() {
    try {
      const { data } = await axiosInstance.put(
        `/notes/note/${note.id}`,
        newNote
      );

      if (data) {
        dispatch({ type: 'update', payload: newNote });

        // setNotes((prev) =>
        //   prev.map((prevNote) => {
        //     if (prevNote.id === note.id) {
        //       return { ...prevNote, ...newNote };
        //     } else {
        //       return prevNote;
        //     }
        //   })
        // );
      }

      setEditMode((prev) => !prev);
      setNormalMode((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteNote() {
    try {
      const { data } = await axiosInstance.delete(`/notes/note/${note.id}`);

      if (data) {
        dispatch({ type: 'delete', payload: note.id });
        // setNotes((prev) => prev.filter((prevNote) => prevNote.id !== note.id));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card m-3">
      <div className="card-body">
        {(normalMode || deleteMode) && (
          <>
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
          </>
        )}

        {editMode && (
          <>
            <input
              className="card-title h6 form-control"
              type="text"
              defaultValue={note.title}
              onChange={({ target }) =>
                setNewNote((prev) => ({ ...prev, title: target.value }))
              }
            />

            <p className="card-text"></p>
            <textarea
              className="card-text form-control p "
              defaultValue={note.description}
              rows={3}
              onChange={({ target }) =>
                setNewNote((prev) => ({ ...prev, description: target.value }))
              }
            />
          </>
        )}

        <p className="card-text">
          <small className="text-body-secondary">Last updated 3 mins ago</small>
        </p>

        {normalMode && (
          <>
            <button
              className="btn btn-primary round m-1"
              onClick={() => {
                navigate(`/note/${note.id}`);
              }}
            >
              Перейти
            </button>

            <button
              className="btn btn-secondary round m-1"
              onClick={() => {
                setEditMode((prev) => !prev);
                setNormalMode((prev) => !prev);
              }}
            >
              Изменить
            </button>

            <button
              className="btn btn-danger round m-1"
              onClick={() => {
                setDeleteMode((prev) => !prev);
                setNormalMode((prev) => !prev);
              }}
            >
              Удалить
            </button>
          </>
        )}

        {editMode && (
          <>
            <button className="btn btn-success round m-1" onClick={editNote}>
              Изменить
            </button>

            <button
              className="btn btn-secondary round m-1"
              onClick={() => {
                setEditMode((prev) => !prev);
                setNormalMode((prev) => !prev);
              }}
            >
              Отменить
            </button>
          </>
        )}

        {deleteMode && (
          <>
            <button className="btn btn-danger round m-1" onClick={deleteNote}>
              Удалить
            </button>

            <button
              className="btn btn-secondary round m-1"
              onClick={() => {
                setDeleteMode((prev) => !prev);
                setNormalMode((prev) => !prev);
              }}
            >
              Отменить
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NoteCard;
