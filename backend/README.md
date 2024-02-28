```
  _____                     _       _           _         ____            _                 
 | ____|__ _ ___ _   _     / \   __| |_ __ ___ (_)_ __   / ___| _   _ ___| |_ ___ _ __ ___  
 |  _| / _` / __| | | |   / _ \ / _` | '_ ` _ \| | '_ \  \___ \| | | / __| __/ _ \ '_ ` _ \ 
 | |__| (_| \__ \ |_| |  / ___ \ (_| | | | | | | | | | |  ___) | |_| \__ \ ||  __/ | | | | |
 |_____\__,_|___/\__, | /_/   \_\__,_|_| |_| |_|_|_| |_| |____/ \__, |___/\__\___|_| |_| |_|
                 |___/                                          |___/                       
```

# easyadmin-core
Easy Admin System - CMS focused on easy use - Backend core with RESTful API

* **Easy Admin System v4** - *CMS focused on easy use*
* Version: __4.0__
* Backend core with RESTful API using Node.js, NestJS, TypeScript, MySQL, TypeORM
* Author & Maintainer: Jan Elznic – [Homepage](https://janelznic.cz) – [Github](https://github.com/janelznic) – [GitLab](https://gitlab.elznic.net/janelznic) – [LinkedIn](https://linkedin.com/in/janelznic/)


## Table of Contents
- [easyadmin-core](#easyadmin-core)
  - [Table of Contents](#table-of-contents)
  - [Related repositories](#related-repositories)
  - [Documentation](#documentation)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Start](#start)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Run in Docker container](#run-in-docker-container)
    - [NPM Scripts](#npm-scripts)
    - [Requests](#requests)
      - [Request example using HTTP bareer token authentication](#request-example-using-http-bareer-token-authentication)
  - [Development](#development)
    - [Recommendations](#recommendations)
    - [Contributing](#contributing)
      - [Git Branches](#git-branches)
    - [Development Environment](#development-environment)
    - [API](#api)
      - [OpenAPI](#openapi)
      - [Swagger](#swagger)
  - [License](#license)


## Related repositories
* [Docker compose skeleton](https://github.com/easyadmin-system/easyadmin-system) - (easyadmin-system)
* [Backend API in Node.js](https://github.com/easyadmin-system/easyadmin-core) - (easyadmin-core) **(this repository)**
* [Frontend in Angular](https://github.com/easyadmin-system/easyadmin-frontend) - (easyadmin-frontend)


## Documentation
- [Swagger](#Swagger)


## Features
- REST API
- Modulable (module, controller, service, provider, entity model, DTo)
- [TypeScript](https://www.typescriptlang.org/) as Language
- [Node.js](https://nodejs.org/)
- Framework: [NestJS](https://nestjs.com/)
- Compatible with most SQL databases like [MySQL 8.0](https://dev.mysql.com/doc/refman/8.0/en/introduction.html), [PostgreSQL](https://www.postgresql.org/) and others
- [TypeORM](https://typeorm.io/) (object-relational mapping)
- [DotEnv](https://www.npmjs.com/package/dotenv) file for loading environment configuration
- [HTTP Bearer authentication](https://docs.nestjs.com/techniques/authentication) strategy authenticates users using a bearer token
- Linting and formatting code using [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/) for maintain consistent coding style
- [Jest](https://jestjs.io/) unit tests framework
- Using the last ECMAScript 8 (2017) features as `async-await`
- [Swagger UI](https://swagger.io/) for API documentation preview and requests testing
- [Docker](https://www.docker.com/) container with `Dockerfile`

## Getting Started

### Start
1. Start HTTP server with `npm start`
2. Go to: `http://localhost:3000/`


### Prerequisites

* You need to install [MySQL server](https://dev.mysql.com/doc/refman/8.0/en/installing.html) either on your local machine.
* Create manually a new database (preferably with charset `utf8mb4` and collation `utf8mb4_unicode_ci`).


### Installation

1. Clone git repository:

   `git clone git@github.com:easyadmin-system/easyadmin-core.git`


2. Go to repository directory *easyadmin-core*:

   `cd easyadmin-core`


3. Prepare config file and import MySQL database files

   `npm run prepare`


4. Install all the module dependencies:

   `npm install` or `npm i`


5. Install wizard:

   `cd bin && ./install.sh`


### Run in Docker container

1. Copy and edit environment configuration `.env` file:

   `cp .env-example .env`


2. Build container by `Dockerfile`:

   `docker build -t easyadmin-core . --target development`


3. Run container on port `3000`:

   `docker run -p 0.0.0.0:3000:3000 easyadmin-core`


### NPM Scripts
- `backup:db` - Backup database structure and data into the file
- `build` - Transpile TypeScript and build the application
- `dev` - Run the development server without transpilation
- `format` - Prettier code formatter
- `install` - Install node package dependencies
- `lint` - Lint your TS code
- `prepare` - Prepare config file and import MySQL database files
- `reinstall` - Reinstall
- `start` - Run the application in development mode
- `start:prod` - Run the transpiled application in production mode
- `structure` - List contents of directories in tree-like format
- `test` - Run unit tests
- `test:e2e` - Run end2end tests
- `test:cov` - Test coverage
- `test:watch` - Watch all files and run unit tests when changes occured
- `uninstall` - Uninstall (only node_modules, not MySQL DB)


### Requests
Requests authentication is performed using [HTTP bareer token](https://tools.ietf.org/html/rfc6750) in headers. The component temporarily retrieves a list of tokens from a constant provided by the `SessionModule`.

#### Request example using HTTP bareer token authentication
```bash
curl --header "Authorization: Bearer Ynzyo9YNn1OAQ19rak90hXCIQh3Mj12Q" http://localhost:3000/users/
```


## Development

### Recommendations
* **.editorconfig** plug-in compatible editor ([http://editorconfig.org](http://editorconfig.org))

### Contributing
Please use `npm run lint` command before every commit and fix all your errors and warnings!


#### Git Branches
* __master__ - Production, __always stable__
* __test__ - Test (to be merged with *develop* branch), RC versions only
* __develop__ - Development branch (always make feature branches from this)
* __hotfix/*__ - Hotfixes (to be merged with *develop* and *test* branch)
* __feature/*__ - Feature branches (to be merged with *develop* branch only)

__IMPORTANT NOTE:__ Always make pull requests only from your feature branch to *develop* branch, ***NOT*** to *master* branch!


### Development Environment
You can use built-in development server that will monitor for any changes in your source and automatically restart your server with monitoring for any changes in source code.

1. Start development server with `npm run dev`
2. Go to: `http://localhost:3000`


### API

#### OpenAPI
* OpenAPI specification and schema is available in `openapi.yaml` file in repository root (this file is auto-generated!)
* You can download OpenAPI JSON schema from `http://localhost:3000/api-json/` or YAML schema from `http://localhost:3000/api-yaml/`

#### Swagger
* [Swagger UI](https://swagger.io/) is available on `http://localhost:3000/swagger/`
* How to authenticate:
![How to authenticate](https://docs.nestjs.com/assets/swagger-auth.gif "How to authenticate")


## License

MIT © Jan Elznic – [Homepage](https://janelznic.cz) – [Github](https://github.com/janelznic) – [GitLab](https://gitlab.elznic.net/janelznic) – [LinkedIn](https://linkedin.com/in/janelznic/)
