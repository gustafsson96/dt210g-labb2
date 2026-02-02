import TodoItem from './TodoItem';
import type { TodoInterface } from '../interfaces/TodoInterface';

interface Props {
    todos: TodoInterface[];
}

function TodoList({ todos }: Props) {
    return (
        <>
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </>
    )
}

export default TodoList;