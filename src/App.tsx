/* eslint-disable padding-line-between-statements */
import React, { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'completed' | 'active'>('all');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleShow = async (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);

    setIsLoading(true);
    const user = await getUser(todo.userId);
    setSelectedUser(user);
    setIsLoading(false);
  };

  const handleClose = () => setSelectedTodo(null);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList todos={visibleTodos} onShow={handleShow} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          onClose={handleClose}
        />
      )}
    </>
  );
};
