workspace-up: workspace-down
	cd ./workspace && docker-compose up -d && docker-compose exec workspace bash
workspace-exec:
	cd ./workspace && docker-compose exec workspace bash
workspace-down:
	cd ./workspace && docker-compose down

heroku-web-build:
	docker build -t registry.heroku.com/cowsay-node/web -f ./heroku/web.dockerfile ../
heroku-web-up:
	docker run --rm -p 3000:3000 -e PORT=3000 registry.heroku.com/cowsay-node/web
heroku-web-publish:
	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock bb/heroku-cli bash -c "heroku container:login && docker push registry.heroku.com/cowsay-node/web && heroku container:release web -a cowsay-node"
