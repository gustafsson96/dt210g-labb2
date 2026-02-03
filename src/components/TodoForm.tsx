import { useState } from "react"
import type { FormInterface } from "../interfaces/FormInterface"
import type { FormValidationInterface } from "../interfaces/FormValidationInterface"
import "./TodoForm.css"

// fetchTodos as Props from parent component
interface Props {
    fetchTodos: () => void;
    setMessage: (msg: { type: "success" | "error"; text: string }) => void;
}

function TodoForm({ fetchTodos, setMessage }: Props) {
    // State for form input values
    const [formData, setFormData] = useState<FormInterface>({ title: "", description: "", status: "ej påbörjad" });

    // State for locsl error messages
    const [errors, setErrors] = useState<FormValidationInterface>({});

    // Show message and remove after 3sec
    const showMessage = (msg: { type: "success" | "error"; text: string }, duration = 3000) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage({ type: msg.type, text: "" });
        }, duration);
    }

    // Validate form input
    const validateForm = (data: FormInterface): FormValidationInterface => {
        const validationErrors: FormValidationInterface = {};

        // Title has to be at least 3 characters
        if (!data.title || data.title.trim().length < 3) {
            validationErrors.title = "Titel måste vara minst 3 tecken lång.";
        }
        // Description can be 200 characters max
        if (data.description.length > 200) {
            validationErrors.description = "Beskrivning får max vara 200 tecken.";
        }

        return validationErrors;
    };

    // Function for form submission
    const submitForm = async (event: any) => {
        event.preventDefault();

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            // POST request to backend API
            const res = await fetch("https://dt210g-labb2-backend.onrender.com/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Kunde inte lägga till todo");

          // Success
            showMessage({ type: "success", text: "Todo tillagd!" });
            setErrors({});
            setFormData({ title: "", description: "", status: "ej påbörjad" });

            fetchTodos();

        } catch (err) {
            // Show error message if todo was not added 
            showMessage({ type: "error", text: "Kunde inte lägga till todo" });
            console.error(err);
        }
    };

    return (
        <form className="todo-form" onSubmit={submitForm}>
            <h2>Lägg till en ny sak</h2>

            <label htmlFor="title">Titel</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}

            <label htmlFor="description">Beskrivning</label>
            <textarea name="description" id="description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })}></textarea>
            {errors.description && (
                <p style={{ color: "red" }}>{errors.description}</p>
            )}

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