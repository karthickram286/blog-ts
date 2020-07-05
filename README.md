# blog-ts  [![Build Status](https://travis-ci.com/karthickram286/blog-ts.svg?branch=master)](https://travis-ci.com/karthickram286/blog-ts)

A Blogging application using Typescript

## Running the project
- clone the project
- Run `npm install` in the main folder to install server side dependencies
- `cd client` and then again run `npm install` to install client side dependencies
- Start postgres and do the following
  1. Execute the SQL statements in `migrations/migrate-db.sql` to create the required databases for dev and test
  2. Execute the SQL statements in `migrations/migrate-tables.sql` to create the required tables in both dev and test databases
  3. Open `config/config.json` file and change username and password for postgresql (The default user is `postgres` with no password)
  4. Set up the value for jwt private key by typing the following command in shell. `export JWT_PRIVATE_KEY={Put your jwt private key here}`
- Now, do any of the following
  1. `npm run server` - To start only the server
  2. `npm run client` - To start only the client
  3. `npm run dev` - To start both server and client
  4. `npm run integ-test` - To run the tests

## Issue Reporting
https://github.com/karthickram286/blog-ts/issues

## Contributing
- Run the project locally in Development mode
- Make changes
- Raise a PR
