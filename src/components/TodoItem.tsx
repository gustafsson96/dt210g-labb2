import { useState } from "react";
import type { TodoInterface } from "../interfaces/TodoInterface";
import "./TodoItem.css"

// fetchTodos as Props from parent component
interface Props {
    todo: TodoInterface;
    fetchTodos: () => void;
}

function TodoItem({ todo, fetchTodos }: Props) {
    // State for error messages
    const [error, setError] = useState<string | null>(null);

    const updateStatus = async (e: any) => {
        const newStatus = e.target.value;
        const newTodo = {
            ...todo,
            status: newStatus
        }
        // Update status of a todo
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
            fetchTodos();
        } catch (err) {
            setError("Kunde inte uppdatera status.");
        }
    }

    // Delete a todo
    const deleteItem = async () => {
        try {
            const res = await fetch("http://localhost:3000/todos/" + todo.id, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Kunde inte radera todo");
            fetchTodos();
        } catch (err) {
            setError("Kunde inte radera todo");
        }
    }

    return (
        <>
            <li className="todo-item">
                <div className="todo-item-header">
                    <h2>{todo.title}</h2>
                    <span className={`status status-${todo.status.replace(" ", "-")}`}>
                        {todo.status}
                    </span>
                </div>

                <p className="todo-description">{todo.description}</p>

                <div className="todo-actions">
                    <label htmlFor={`status-${todo.id}`}>Status</label>
                    <select
                        id={`status-${todo.id}`}
                        defaultValue={todo.status}
                        onChange={updateStatus}
                    >
                        <option value="ej påbörjad">ej påbörjad</option>
                        <option value="pågående">pågående</option>
                        <option value="avklarad">avklarad</option>
                    </select>

                    <button onClick={deleteItem} className="delete-btn">
                        Radera
                    </button>
                </div>
                {error && <p className="error">{error}</p>}
            </li>
        </>
    )
}


export default TodoItem;