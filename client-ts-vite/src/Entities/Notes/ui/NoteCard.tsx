import { useContext, useState } from 'react';
import { Note, NoteID } from '../type/NoteType';
import { useNavigate } from 'react-router-dom';

import NoteApi from '../api/noteApi';
import { AppContext } from '../../../App/providers/context/contextProvider';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type NoteCardProps = {
  key: NoteID;
  note: Note;
};

const schema = yup
  .object({
    id: yup.number().required(),
    title: yup.string().required(),
    description: yup.string(),
    userID: yup.number().required(),
    folderID: yup.number().nullable(),
  })
  .required();

function NoteCard({ note }: NoteCardProps): JSX.Element {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [normalMode, setNormalMode] = useState<boolean>(true);

  const { dispatch } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      id: note.id,
      title: note.title,
      description: note.description,
      userID: note.userID,
      folderID: note.folderID,
    },
  });

  const navigate = useNavigate();

  async function editButtonHadler() {
    const isValidForm = await trigger();

    if (isValidForm) {
      handleSubmit(editNote)();
    }
  }

  async function editNote(editedNote: Note) {
    try {
      const data = await NoteApi.updateNote(editedNote);

      if (data) {
        dispatch({ type: 'update', payload: editedNote });
      }

      setEditMode((prev) => !prev);
      setNormalMode((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteNote() {
    try {
      const data = await NoteApi.deteleNote(note.id);

      if (data) {
        dispatch({ type: 'delete', payload: note.id });
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
              {...register('title')}
            />
            <p className="text-danger">{errors.title?.message}</p>
            <p className="card-text"></p>
            <textarea
              className="card-text form-control p "
              defaultValue={note.description}
              rows={3}
              {...register('description')}
            />
            <p className="text-danger">{errors.description?.message}</p>
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
            <button
              className="btn btn-success round m-1"
              onClick={editButtonHadler}
            >
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
