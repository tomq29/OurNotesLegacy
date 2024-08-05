import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiAxiosInstance from '../../../service/apiAxiosInstance';

function NoteCard({ note, getNotes, currentUser }) {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [newNote, setNewNote] = useState({
    title: note.title,
    description: note.description,
    userID: currentUser.id,
  });

  async function deleteNote() {
    try {
      const { data } = await apiAxiosInstance.delete(`/notes/note/${note.id}`);
      getNotes();
      console.log(data);
    } catch ({ message }) {
      console.error({ message });
    }
  }

  async function editNote() {
    try {
      const { data } = await apiAxiosInstance.put(
        `/notes/note/${note.id}`,
        newNote
      );

      console.log(data);
      setEditMode((prev) => !prev);
      getNotes();
    } catch ({ message }) {
      console.error({ message });
    }
  }

  return (
    <>
      <div className="card w-50 m-3">
        <div className="card-body">
          {editMode ? (
            <>
              <input
                className="card-title "
                type="text"
                defaultValue={note.title}
                onChange={({ target }) =>
                  setNewNote((prev) => ({ ...prev, title: target.value }))
                }
              />

              <p className="card-text"></p>
              <input
                className="card-text"
                type="text"
                defaultValue={note.description}
                onChange={({ target }) =>
                  setNewNote((prev) => ({ ...prev, title: target.value }))
                }
              />
            </>
          ) : (
            <>
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.description}</p>
            </>
          )}

          <p className="card-text">
            <small className="text-body-secondary">
              Last updated 3 mins ago
            </small>
          </p>

          {editMode ? (
            <>
              <button className="btn btn-success round m-1" onClick={editNote}>
                Изменить
              </button>

              <button
                className="btn btn-secondary round m-1"
                onClick={() => setEditMode((prev) => !prev)}
              >
                Отменить
              </button>
            </>
          ) : (
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
                onClick={() => setEditMode((prev) => !prev)}
              >
                Изменить
              </button>

              <button className="btn btn-danger round m-1" onClick={deleteNote}>
                Удалить
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NoteCard;
