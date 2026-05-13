# Balingasag Public Library PHP/MySQL Backend

This backend is an empty MySQL-powered JSON API for the React frontend. It does not include demo records.

## 1. Create the Database

Import the schema in phpMyAdmin or MySQL CLI:

```bash
mysql -u root -p < backend/database/schema.sql
```

For XAMPP, you can open phpMyAdmin, create/import using `backend/database/schema.sql`, and keep the database name as:

```text
balingasag_library
```

## 2. Configure MySQL Credentials

Copy the example config:

```bash
copy backend\config.example.php backend\config.php
```

Edit `backend/config.php` if your MySQL username, password, host, or database name is different.

`backend/config.php` is ignored by Git so local passwords are not committed.

## 3. Run the PHP API

```bash
php -S localhost:8000 -t backend/public
```

The API root is:

```text
http://localhost:8000
```

## 4. Frontend API URL

The React app is prepared to call:

```text
http://localhost:8000/api
```

If you need a different URL, create a frontend `.env.local` file:

```text
VITE_API_BASE_URL=http://localhost:8000
```

## Resources

All resources start empty.

- `GET /api/books`
- `GET /api/books/{id}`
- `POST /api/books`
- `PUT /api/books/{id}`
- `DELETE /api/books/{id}`

The same pattern works for:

- `users`
- `transactions`
- `fines`
- `notifications`
- `reservations`

## Example Book Request

```json
{
  "title": "Sample Title",
  "author": "Author Name",
  "category": "Filipino Literature",
  "isbn": "978-000-000-000-0",
  "year": 2026,
  "available": 3,
  "total": 3,
  "description": "Book description"
}
```
