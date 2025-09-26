// src/api/api.ts
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=20',
  ); // limit for demo

  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }

  return res.json();
}

export async function getUser(userId: number): Promise<User> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  return res.json();
}
