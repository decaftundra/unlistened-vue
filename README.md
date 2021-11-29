# Unlistened 

By Julien Beghain

## Components

### Backend server

A Nodejs express server with `spotify-web-api-node`.

### Frontend

A Vuejs server and client

### Database

Mongo DB database

## How to run

### Requirements

- Have docker running locally (for Mongo DB)
- Have a Spotify premium account

### Prepare project

Node js project so dependencies (node modules) need to be downloaded

In the project root directory:

```
$ npm install
```

Then in the `web` directory

```
$ cd web/
$ npm install
```

### Run components

#### Mongo DB

```
$ docker run --name mongodb -d -p 27017:27017 mongo
```

#### Run backend server

```
$ npm run devStart
```

#### Run frontend

```
$ cd web/
$ npm run serve
```