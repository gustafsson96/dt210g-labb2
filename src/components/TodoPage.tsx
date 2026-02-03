import { useState, useEffect } from "react";
import type { TodoInterface } from "../interfaces/TodoInterface";
import TodoList from "../components/TodoList";
import TodoForm from "./TodoForm";
import { PacmanLoader } from "react-spinners";
import "./TodoPage.css"

function TodoPage() {
    // State for todos fetched from backend
    const [todos, setTodos] = useState<TodoInterface[]>([]);

    // State for error messages
    const [error, setError] = useState<string | null>(null);

    // State for loading
    const [loading, setLoading] = useState<boolean>(false);

    // Global message state
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Fetch todos when component is rendered
    useEffect(() => {
        fetchTodos();
    }, []);

    // Get todos from backend
    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("http://localhost:3000/todos");
            if (res.ok) {
                const data = await res.json();
                setTodos(data);
            }
        } catch (err) {
            setError("Gick ej att hämta todos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="todo-page">
            <h1>Todo-lista</h1>
            <div className="msg-container">
                {message && message.text && (
                    <p className={message.type === "success" ? "success-message" : "error-message"}>
                        {message.text}
                    </p>
                )}
            </div>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <PacmanLoader />
            ) : (
                <div className="todo-page-layout">
                    <TodoList todos={todos} fetchTodos={fetchTodos} setMessage={setMessage} />
                    <TodoForm fetchTodos={fetchTodos} setMessage={setMessage} />
                </div>
            )}
        </main>
    )
}

export default TodoPage;
