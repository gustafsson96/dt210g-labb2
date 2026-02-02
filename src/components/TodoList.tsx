import TodoItem from './TodoItem';
import type { TodoInterface } from '../interfaces/TodoInterface';

interface Props {
    todos: TodoInterface[];
    onDelete: (id: number) => void;
}

function TodoList({ todos, onDelete }: Props) {
    return (
        <>
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
                ))}
            </ul>
        </>
    )
}

export default TodoList;