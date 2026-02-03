import TodoItem from './TodoItem';
import type { TodoInterface } from '../interfaces/TodoInterface';

// fetchTodos as Props from parent component
interface Props {
    todos: TodoInterface[];
    fetchTodos: () => void;
}

function TodoList({ todos, fetchTodos }: Props) {
    return (
        <>
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />
                ))}
            </ul>
        </>
    )
}

export default TodoList;