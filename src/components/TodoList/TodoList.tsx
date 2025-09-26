// src/components/TodoList/TodoList.tsx
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onShow: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onShow }) => {
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id} className="box">
          <p>
            <strong>{todo.title}</strong> – {todo.completed ? '✅' : '❌'}
          </p>
          <button
            className="button is-small is-info"
            onClick={() => onShow(todo)}
          >
            Show
          </button>
        </div>
      ))}
    </div>
  );
};
