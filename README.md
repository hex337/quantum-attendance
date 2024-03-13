# quantum-attendance
An attendance program for Quantum Martial Arts

## Setting up The Project

This project uses Docker for local development.

Run the following to get the project up and running:

```bash
docker compose build
docker compose up -d
make setup_db
```

You can check the logs by running `docker compose logs` or `docker compose logs -f` to attach to the logs and follow the output.

You should now be able to access the app on your local machine by going to [http://localhost:3000](http://localhost:3000).
