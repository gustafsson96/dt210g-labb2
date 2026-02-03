import TodoItem from './TodoItem';
import type { TodoInterface } from '../interfaces/TodoInterface';

// fetchTodos as Props from parent component
interface Props {
    todos: TodoInterface[];
    fetchTodos: () => void;
    setMessage: (msg: { type: "success" | "error"; text: string }) => void;
}

function TodoList({ todos, fetchTodos, setMessage }: Props) {
    return (
        <>
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} fetchTodos={fetchTodos} setMessage={setMessage}/>
                ))}
            </ul>
        </>
    )
}

export default TodoList;