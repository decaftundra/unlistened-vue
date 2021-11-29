rundb:
	docker run --name mongodb -d -p 27017:27017 mongo

server:
	npm run devStart

frontend:
	cd web && npm run serve
