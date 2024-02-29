# todo-list Docker compose skeleton

* Docker compose skeleton using Docker containers with Node.js / NestJS API, React Frontend, MySQL & phpMyAdmin
* Author & Maintainer: Jan Elznic – [Homepage](https://janelznic.cz) – [Github](https://github.com/janelznic) – [GitLab](https://gitlab.elznic.net/janelznic) – [LinkedIn](https://linkedin.com/in/janelznic/)


## Getting Started

### Prerequisites

* You need to install:
  * [Docker](https://docs.docker.com/get-docker/) on your local machine. **<span style="color:red">(required)</span>**
  * [MySQL server](https://dev.mysql.com/doc/refman/8.0/en/installing.html) on your local machine. _(optional)_
  * Create manually a new database (preferably with charset `utf8mb4` and collation `utf8mb4_unicode_ci`). _(optional)_



### Quick run
You can install and run the application in Docker just simply with run `sh run.sh` script!



### Installation

1. Clone git repository:

   `git clone git clone git@github.com:janelznic/todo-list.git`


2. Build:

   `docker-compose build`


### Run containers

1. Run all containers:

   `docker-compose up`


2. Open your internet browser and go to:

   `http://localhost:4200`


## Structure

### Services
| Service    | Subfolder          | Description             | Port | Notes               |
|------------|--------------------|-------------------------|------|---------------------|
| api        | backend            | Backend with REST API   | 3000 | Running service     |
| frontend   | frontend           | Frontend                | 4200 | Running HTTP server |
| mysql      | -                  | MySQL database instance | 3306 | Running service     |
| mysql_init | -                  | MySQL initialization    | -    | Terminated shortly  |
| phpmyadmin | -                  | phpMyAdmin tool         |      | Running service     |


### Recommendations
* **.editorconfig** plug-in compatible editor ([http://editorconfig.org](http://editorconfig.org))

### Git Branches
* __master__ - Production, __always stable__
* __test__ - Test (to be merged with *develop* branch), RC versions only
* __develop__ - Development branch (always make feature branches from this)
* __hotfix/*__ - Hotfixes (to be merged with *develop* and *test* branch)
* __feature/*__ - Feature branches (to be merged with *develop* branch only)

__IMPORTANT NOTE:__ Always make pull requests only from your feature branch to *develop* branch, ***NOT*** to *master* branch!


## License

MIT © Jan Elznic – [Homepage](https://janelznic.cz) – [Github](https://github.com/janelznic) – [GitLab](https://gitlab.elznic.net/janelznic) – [LinkedIn](https://linkedin.com/in/janelznic/)
