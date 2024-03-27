.PHONY: test seed

test:
	docker compose run --rm web bundle exec rspec

seed:
	docker compose run --rm web bundle exec rake db:seed

setup_db:
	docker compose run --rm web ./bin/rake db:setup
	docker compose run --rm web ./bin/rake db:migrate
	docker compose run --rm web ./bin/rake db:seed

migrate:
	docker compose run --rm web ./bin/rake db:migrate
