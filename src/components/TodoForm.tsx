import { useState } from "react"
import type { FormInterface } from "../interfaces/FormInterface"
import type { FormValidationInterface } from "../interfaces/FormValidationInterface"
import "./TodoForm.css"

// fetchTodos as Props from parent component
interface Props {
    fetchTodos: () => void;
}

function TodoForm({ fetchTodos }: Props) {
    // State for form input values
    const [formData, setFormData] = useState<FormInterface>({ title: "", description: "", status: "ej påbörjad" });

    // State for error och success messages
    const [errors, setErrors] = useState<FormValidationInterface>({});
    const [success, setSuccess] = useState<string | null>(null);

    // Validate form input
    const validateForm = (data: FormInterface): FormValidationInterface => {
        const validationErrors: FormValidationInterface = {};

        // Title has to be at least 3 characters
        if (!data.title || data.title.trim().length < 3) {
            validationErrors.title = "Titel måste vara minst 3 tecken lång.";
        }
        // Description must be 3 - 200 characters
        if (!data.description || data.description.trim().length < 3) {
            validationErrors.description = "Beskrivning måste vara minst 3 tecken lång.";
        } else if (data.description.length > 200) {
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
            setSuccess(null);
            return;
        }

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
            setErrors({});
            setFormData({ title: "", description: "", status: "ej påbörjad" });

            // Refresh todo list in parent component
            fetchTodos();

        } catch (err) {
            // Show error message if todo was not added 
            setErrors({ title: "Kunde inte lägga till todo" });
            setSuccess(null);
            console.error(err);
        }
    };

    return (
        <form className="todo-form" onSubmit={submitForm}>
            <h2>Lägg till en ny sak</h2>
            {success && <p style={{ color: "green" }}>{success}</p>}
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