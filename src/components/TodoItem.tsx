import { useState } from "react";
import type { TodoInterface } from "../interfaces/TodoInterface";

interface Props {
    todo: TodoInterface;
    onDelete: (id: number) => void;
}

function TodoItem({ todo, onDelete }: Props) {
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

    const deleteItem = async () => {
        try {
            const res = await fetch("http://localhost:3000/todos/" + todo.id, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Kunde inte radera todo");
            onDelete(todo.id);
        } catch (err) {
            setError("Kunde inte radera todo");
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
                <button onClick={deleteItem}>Radera</button>
                {error && <p>{error}</p>}
            </li>
        </>
    )
}


export default TodoItem;