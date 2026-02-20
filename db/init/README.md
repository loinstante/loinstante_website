Place SQL initialization scripts in this folder. Files placed here will be executed by the official Postgres image on first container startup.

Examples:
- 01_create_extensions.sql
- 02_create_tables.sql

Note: This directory is mounted read-only into the container; make sure files are present before the first docker-compose up -d.

