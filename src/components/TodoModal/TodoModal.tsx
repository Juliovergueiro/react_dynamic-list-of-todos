// src/components/TodoModal/TodoModal.tsx
import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  user: User | null;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, user, onClose }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content box">
        <button className="delete is-large" onClick={onClose}></button>

        <h2 className="title">{todo.title}</h2>
        <p>Status: {todo.completed ? 'Completed ✅' : 'Active ❌'}</p>

        {!user ? (
          <Loader />
        ) : (
          <div>
            <h3 className="subtitle">User Details</h3>
            <p>
              <strong>{user.name}</strong>
            </p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
};
