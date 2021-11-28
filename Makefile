rundb:
	docker run --name mongodb -d -p 27017:27017 mongo

authspotify: 
	open "http://localhost:3000"
	npm run auth

loadlastfm:
	npm run lastfmloader
