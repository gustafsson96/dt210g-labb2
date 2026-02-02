import type { TodoInterface } from "../interfaces/TodoInterface";

interface Props {
    todo: TodoInterface;
}

function TodoItem({ todo }: Props) {
  return (
    <>
      <li>
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <p>Status: {todo.status}</p>
      </li>
    </>
  )
}


export default TodoItem;