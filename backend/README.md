# Calioris Backend

This directory contains the FastAPI application for authentication and organization management.

## Development

Install dependencies and run the app:

```bash
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

The default database is a local SQLite file `app.db`. You can override the database URL using the `DATABASE_URL` environment variable (e.g. a PostgreSQL connection string).

### Endpoints

- `/signup` and `/login` for user accounts.
- `/assets` for managing IT assets.
- `/stock_items` for managing inventory stock levels.
