Local Postgres for development

Quick start:

1. Copy the example env file:

   cp .env.example .env
   # Edit .env and set a strong POSTGRES_PASSWORD

2. Start the database:

   docker compose up -d

3. Stop the database:

   docker compose down

Data files: the container stores data in the named volume `db_data` (defined in docker-compose.yml). To reset the DB, run `docker compose down -v`.

