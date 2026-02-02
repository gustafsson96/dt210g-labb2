import { useState, useEffect } from "react";
import type { TodoInterface } from "../interfaces/TodoInterface";
import TodoList from "../components/TodoList";
import TodoForm from "./TodoForm";

function TodoPage() {
    // State for todos fetched from backend
    const [todos, setTodos] = useState<TodoInterface[]>([]);

    // State for error messages
    const [error, setError] = useState<String | null>(null);

    // Fetch todos when component is rendered
    useEffect(() => {
        fetchTodos();
    }, []);

    // Get todos from backend
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
            <TodoForm fetchTodos={fetchTodos} />
            <TodoList todos={todos} fetchTodos={fetchTodos}/>
        </main>
    )
}

export default TodoPage;
