import { useState } from "react";
import type { TodoInterface } from "../interfaces/TodoInterface";

interface Props {
    todo: TodoInterface;
}

function TodoItem({ todo }: Props) {
    const [error, setError] = useState<string | null>(null);

    const updateStatus = async (e: any) => {
        const newStatus = e.target.value;
        const newTodo = {
            ...todo,
            status: newStatus
        }
        try {
            const res = await fetch("http://localhost:3000/todos/" + todo.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo)
            });
            if (!res.ok) throw new Error("Kunde inte uppdatera status.");
            setError(null);
        } catch (err) {
            setError("Kunde inte uppdatera status.");
        }
    }
    return (
        <>
            <li>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <p>Status: {todo.status}</p>
                <form>
                    <label htmlFor="status">Ändra status:</label>
                    <select name="status" id={`status-${todo.id}`} defaultValue={todo.status} onChange={updateStatus}>
                        <option value="ej påbörjad">ej påbörjad</option>
                        <option value="pågående">pågående</option>
                        <option value="avklarad">avklarad</option>
                    </select>
                </form>
                {error && <p>{error}</p>}
            </li>
        </>
    )
}


export default TodoItem;