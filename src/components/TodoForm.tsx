import { useState } from "react"
import type { FormInterface } from "../interfaces/FormInterface"

// fetchTodos as Props from parent component
interface Props {
    fetchTodos: () => void;
}

function TodoForm({ fetchTodos }: Props) {
    // State for form input values
    const [formData, setFormData] = useState<FormInterface>({ title: "", description: "", status: "ej påbörjad" });

    // State for error och success messages
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Function for form submission
    const submitForm = async (event: any) => {
        event.preventDefault();

        try {
            // POST request to backend API
            const res = await fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Kunde inte lägga till todo");

            // Show message if to do was added successfully
            setSuccess("Todo tillagd!");
            setError(null);
            setFormData({ title: "", description: "", status: "ej påbörjad" });

            // Refresh todo list in parent component
            fetchTodos();

        } catch (err) {
            // Show error message if todo was not added 
            setError("Kunde inte lägga till todo");
            setSuccess(null);
            console.error(err);
        }
    };

    return (

        <form onSubmit={submitForm}>
            <h2>Lägg till en ny sak</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <label htmlFor="title">Titel</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />

            <label htmlFor="description">Beskrivning</label>
            <textarea name="description" id="description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })}></textarea>

            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status} onChange={(event) => setFormData({ ...formData, status: event.target.value as 'ej påbörjad' | 'pågående' | 'avklarad' })}>
                <option value="ej påbörjad">ej påbörjad</option>
                <option value="pågående">pågående</option>
                <option value="avklarad">avklarad</option>
            </select>

            <input type="submit" value="Skicka" />
        </form>
    )
}

export default TodoForm