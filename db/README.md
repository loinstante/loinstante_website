Local Postgres for development

Quick start:

1. Copy the example env file:

   cp .env.example .env
   # Edit .env and set a strong POSTGRES_PASSWORD

2. Start the database:

   docker compose up -d

   On first startup, Postgres executes one canonical init file:
   `init/00_full_init.sql`
   This script creates/updates all required schema objects (users, sessions,
   metadata, and profile picture support).

3. Stop the database:

   docker compose down

Data files: the container stores data in the named volume `db_data` (defined in docker-compose.yml). To reset the DB, run `docker compose down -v`.

To apply the same full init script on an existing DB without reset:

docker compose exec db psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/00_full_init.sql

