.PHONY: test seed setup_db migrate clean build start stop restart logs

# Run tests
# Usage: make test
# Description: Runs the test suite using RSpec inside the Docker container.
test:
	docker compose run --rm web bundle exec rspec

# Seed the database
# Usage: make seed
# Description: Seeds the database with initial data inside the Docker container.
seed:
	docker compose run --rm web bundle exec rake db:seed

# Setup the database
# Usage: make setup_db
# Description: Sets up the database by running setup, migrate, and seed tasks inside the Docker container.
setup_db:
	docker compose run --rm web ./bin/rake db:setup
	docker compose run --rm web ./bin/rake db:migrate
	docker compose run --rm web ./bin/rake db:seed

# Migrate the database
# Usage: make migrate
# Description: Migrates the database to the latest version inside the Docker container.
migrate:
	docker compose run --rm web ./bin/rake db:migrate

# Clean up Docker environment
# Usage: make clean
# Description: Stops and removes all Docker containers, networks, and volumes.
clean:
	docker compose down -v

# Build Docker containers
# Usage: make build
# Description: Builds the Docker containers for the application.
build:
	docker compose build

# Start Docker containers
# Usage: make start
# Description: Starts the Docker containers in detached mode.
start:
	docker compose up -d

# Stop Docker containers
# Usage: make stop
# Description: Stops the running Docker containers.
stop:
	docker compose down

# Restart Docker containers
# Usage: make restart
# Description: Restarts the Docker containers.
restart: stop start

# View Docker logs
# Usage: make logs
# Description: Displays the logs from the Docker containers.
logs:
	docker compose logs -f
