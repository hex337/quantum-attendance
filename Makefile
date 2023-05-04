.PHONY: test seed migrate up

test:
	docker compose run --rm web bundle exec rspec

seed:
	docker compose run --rm web bundle exec rake db:seed

migrate:
	docker compose run --rm web ./bin/rake db:migrate

up:
	docker compose up -d
