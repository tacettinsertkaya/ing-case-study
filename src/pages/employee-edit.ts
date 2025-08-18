import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('employee-edit')
export class EmployeeEdit extends LitElement {
    render() {
        return html`
            <h1>Edit Employee</h1>
            <form>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                <button type="submit">Save</button>
            </form>
        `;
    }
}