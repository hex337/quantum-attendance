CIRCLE_BUILD_NUM=local
CIRCLE_BRANCH=local

.PHONY: test

default: test

compose: #: Bring up the app with all dependencies and run in the background
	docker-compose up -d

stop: #: Bring down the app and all dependencies
	docker-compose stop

kill: #: Kill the running containers and all their data
	docker-compose down --volumnes

test: #: Run rails and react tests
	#docker-compose run web rake test This seems to be missing deps, not sure why
	docker-compose run --workdir="/usr/src/quantum/client" web npm test

help: #: Show help topics
	@grep "#:" Makefile | sed "s/:.*#//g" | grep -v "@grep" | sort
