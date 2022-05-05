# Foodbank Information Management System
Final Year University Project at Aberystwyth University, by [James Bale](https://www.jamesbale.dev)

## Pre-requisites
- MariaDB (Version >10.6)(Docker-compose setup file provided)
- Node.js (>12.7.0) and NPM (>v8.5.0)
- Docker, if using the provided docker-compose file to run DB

## Setup
1. Clone Repo
2. `npm install`
3. Copy `template.env` to `.env` and populate with environment variables

## Development

1. If using the Docker DB setup: `cd db/` then `docker-compose up`
2. `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result
