ls:
	docker ps -a
images:
	docker images
rmi:
	docker rmi ${ARG}
build:
	docker-compose build
up:
	docker-compose up -d
down:
	docker-compose down
exec:
	docker-compose exec carpenter-fe sh
logs:
	docker logs react
test:
	docker-compose run --rm carpenter-fe sh -c "npm test -- --coverage"
runbuild:
	docker-compose run --rm carpenter-fe sh -c "npm run build"