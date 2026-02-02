import { useState, useEffect } from "react";
import type { TodoInterface } from "../interfaces/TodoInterface";
import TodoList from "../components/TodoList";
import TodoForm from "./TodoForm";

function TodoPage() {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await fetch("http://localhost:3000/todos");

            if (res.ok) {
                const data = await res.json();
                setTodos(data);
            }
        } catch (err) {
            setError("Gick ej att hämta todos.");
        }
    }
    return (
        <main>
            <h1>Todo-lista:</h1>
            {error && <p>{error}</p>}
            <TodoList todos={todos} onDelete={(id) => setTodos((prev) => prev.filter((todo) => todo.id !== id))}/>
        </main>
    )
}

export default TodoPage;
