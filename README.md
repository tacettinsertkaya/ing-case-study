# Lit Employee App

A fully client-side Employee Management application built with **LitElement (JavaScript)** and **Vaadin Router**, persisting data in **localStorage**, with **i18n (en/tr)**, responsive UI (no CSS frameworks), and **unit tests**.

## Quick start
```bash
npm i
npm run dev
```
The dev server opens `index.html`. Ensure you have internet to load `lit` and `@vaadin/router` from CDN.

## Tests + Coverage
```bash
npm test
```
This uses @web/test-runner with coverage enabled.

## Routes
- `/` -> redirects to `/employees`
- `/employees` -> list page with search, toggle list/table, pagination, Edit/Delete
- `/employees/new` -> create new employee
- `/employees/:id/edit` -> edit employee (prompts before saving)

## i18n
Set `<html lang="en">` or `<html lang="tr">` in `index.html` or at runtime to switch language. Strings update reactively.

## Data persistence
LocalStorage key: `ing-case-study:employees`. Seed data is added on first load.

## Notes
- Email is unique across employees (also phone must be unique).
- Dates validated: Birth must be in past; Employment must be ≥ Birth and ≤ today.
```

