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
                <form>
                    <label htmlFor="status">Ändra status:</label>
                    <select name="status" id="status" defaultValue={todo.status}>
                        <option value="ej påbörjad">ej påbörjad</option>
                        <option value="pågående">pågående</option>
                        <option value="avklarad">avklarad</option>
                    </select>
                </form>
            </li>
        </>
    )
}


export default TodoItem;