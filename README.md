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
4. If not using the Docker setup, run the `db/init.sql` file on your MariaDB server.

## Development

1. If using the Docker DB setup: `cd db/`, then `docker-compose up -d`
2. `cd ..`, then `npm run dev`

## Mock SMS
The mock SMS application is located in the `mock-sms/` directory. To setup:
1. `cd mock-sms`
2. `npm install`
3. Copy the DB config from this projects .env file into an .env file inside `mock-sms/`. Change DB_DATABASE variable to `mock-sms`.
4. Configure this projects .env to point to the right url and port for the mock service.
5. Run mock-sms/db/init.sql on your MariaDB instance to set up the required DB tables.
6. `npm run dev`

There are a few pre-set numbers onthe index page, however any number can be checked by simply appending it to the base url. E.g. to check 07546 123456 for mesages, navigate to: `http://localhost:3001/07546123456`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result
