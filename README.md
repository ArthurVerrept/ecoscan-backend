## Description

Netscapes backend repo


## Setup
Before running the api, there are a few things we need to download:
1. [Node v12+](https://nodejs.org/en/)
2. [Homebrew](https://brew.sh/)
3. [pgAdmin](https://www.pgadmin.org/download/)
### 1. Install & Run Postgresql:
Check you don't already have postgres installed:
```bash
$ postgres -V
```

If you <u>do not</u> have postgres, use homebrew to download it:
```bash
$ brew install postgresql
```
Once it is downloaded, go ahead and run it:
```bash
$ brew services start postgresql
```
### 2. Find Your User:
Firstly enter the postgres db command line by running:
```bash
$ psql postgres
```
Find your user by running:
```bash
$ postgres=# \du
```
This should say return a table with your role name on the left.

### 3. Install pgAdmin and Create Database
- Open pgAdmin (if this is tour first time it will prompt you to create a master password, make this whatever you want)
- Create a new server by right clicking on servers
- In "General" set the name as <b>netscapes-api</b>
- Under "Connection" set the Hostname as <b>localhost</b>
- Set the Username as <b>The role name you found in step 2</b>
- Leave/ set the port as <b>5432</b>

### 3. Tooling Install
[<u>Nestjs cli:</u>](https://docs.nestjs.com/cli/overview)
```bash
$ npm install -g @nestjs/cli
```

[<u>Typeorm cli:</u>](https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md#installing-cli)
```bash
$ npm i -g typeorm
```

[<u>Ts-node:</u>](https://github.com/TypeStrong/ts-node)
```bash
$ npm install -g ts-node
```

### 4. Setup Environment Variables
Finally we can open the actual project!
- Find the <i>".env-example"</i> file in the root of the project, and rename it to <i>".env"</i>.
- Open it and replace <b>username</b> to be your user from step 2

### 5. Install packages
Using npm install the packages required:
```bash
$ npm i
```

### 6. Run Database Migrations
Finally all that's left to do is load the tables:
```bash
$ npm run migration:run
```

## Running the API
Run api:
```bash
$ npm run start:dev
```


