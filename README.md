# Foodbank Information Management System
Final Year University Project at Aberystwyth University

## Structure
`/components` - Re-usable React Components developed for use throughout website.

`/db` - Database setup files. Contains `docker-compose.yml` that can be used to spin up a MariaDB instance using Docker. Initialisation SQL found in `/db/sql`

`/documents` - Documents supporting the written report

`/hooks` - Custom React hooks written

`/lib` - Contains functions that interact with extenal services.

`/mock-sms` - Web application for mocking SMS messages

`/pages` - Page view files.

`/pages/api` - API endpoint handlers


## Pre-requisites
- MariaDB (Version >10.6) (Docker-compose setup file provided) https://mariadb.org/
- Node.js (>12.7.0) and NPM (>v8.5.0) https://nodejs.org/en/
- Docker, if using the provided docker-compose file to run database https://www.docker.com/

## Setup
1. Clone Repo
2. `npm install`
3. Copy `template.env` to `.env` and populate with environment variables
4. If not using the Docker setup, run the `db/init.sql` file on your MariaDB server to create required tables.

## Development
1. If using the Docker DB setup: `cd db/`, then `docker-compose up -d`
2. `cd ..`, then `npm run dev`

## Mock SMS
The mock SMS application is located in the `mock-sms/` directory. This is for testing the SMS system without having real mobile numbers to send to. In reality, the calls to this API should be replaced with a service like Twilio.

To setup:
1. `cd mock-sms`
2. `npm install`
3. Copy the DB config from this projects .env file into an .env file inside `mock-sms/`. Change DB_DATABASE variable to `mock-sms`.
4. Configure this projects .env to point to the right url and port for the mock service.
5. Run mock-sms/db/init.sql on your MariaDB instance to set up the required DB tables.
6. `npm run dev`

There are a few pre-set numbers o the index page, however any number can be checked by simply appending it to the base url. E.g. to check 07546 123456 for mesages, navigate to: `http://localhost:3001/07546123456`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result
