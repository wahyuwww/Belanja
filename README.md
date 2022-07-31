<div  align="center">
<img src="https://lh3.googleusercontent.com/d/13oL_tdqAFzcRVAPIk0lWpAuGZQ1Dmj4d" width="300" height="auto">
 </div>
  <div align="center">
  <br />
  <br />
  <a href="https://github.com/dec0dOS/amazing-github-template/issues/new?assignees=&labels=bug&template=01_BUG_REPORT.md&title=bug%3A+">Report a Bug</a>
  ·
  <a href="https://github.com/dec0dOS/amazing-github-template/issues/new?assignees=&labels=enhancement&template=02_FEATURE_REQUEST.md&title=feat%3A+">Request a Feature</a>
  .
  <a href="https://github.com/dec0dOS/amazing-github-template/discussions">Ask a Question</a>
</div>


# Introduction
Belanja is a web-based marketplace application . This application allows users to sell their products and also buy existing products. This Blanja application was built using NodeJS and ExpressJS for the backend, and postgresql for the database.



[![Node.js](https://img.shields.io/badge/Node.js-v.16.14.0-green.svg?style=flat-square&logo=appveyor)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/Express.js-4.17.3-orange.svg?style=flat-square&logo=appveyor)](https://expressjs.com/en/starter/installing.html) [![PostgreSQL](https://img.shields.io/badge/postgresql-v14.2-blue?style=flat-square&logo=appveyor)](https://www.postgresql.org/) [![body-parser](https://img.shields.io/badge/body--parser-v1.19.2-red?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/body-parser) [![cors](https://img.shields.io/badge/cors-v2.8.5-success?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/cors) [![dotenv](https://img.shields.io/badge/dotenv-v16.0.0-blueviolet?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/dotenv) [![helmet](https://img.shields.io/badge/jsonwebtoken-v5.0.2-blue?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/helmet) [![pg](https://img.shields.io/badge/pg-v8.7.3-success?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/pg) [![xss-clean](https://img.shields.io/badge/xss--clean-v0.1.1-blue?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/xss-clean)

## Requirements

1. [Node Js](https://nodejs.org/en/download/)
2. [Express JS](https://expressjs.com/en/starter/installing.html)
3. [Postman](https://www.getpostman.com/)
4.  Web Server (ex. localhost)
5.  Code Editor (VS Code, Sublime, Atom, etc)

## Getting Started


<img src="https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png" width="200"/>


### Node.js

Node.js is a software that designed to develop web-based applications and is written in the syntax of the JavaScript programming language. JavaScript as a programming language that runs on the client / browser side only can be completed by Node.js. With Node.js, JavaScript can also act as a programming language that runs on the server side, such as PHP, Ruby, Perl, and so on. 

Node.js can run on Windows, Mac OS X and Linux operating systems without the need for program code changes. Node.js has its own HTTP server library that make it possible to run a web server without using a web server program such as Apache or Nginx.


<img src="https://expressjs.com/images/express-facebook-share.png" width="250"/>

### Express.js
Express.js is one of the most popular web frameworks for Node.js. The complete documentation and its use which is quite easy, can make us develop various products such as web applications or RESTful API.


## Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and PostgreSQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:4004/v1/blanja)
9. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Open **.env** file on code editor and copy the code below :

```
# app
SERVER_PORT=4000

# database
DB_HOST="Your_Host"
DB_USERNAME="Your_Username"
DB_PASSWORD="Your_Password"
DB_DATABASE ="Your_Table"
DB_PORT = "Your_port_DB"


# jwt
SECRET_KEY = "secret key you"

# cloudinary
CLOUDINARY_CLOUD_NAME = "cloud name"
CLOUDINARY_API_KEY = "api key "
CLOUDINARY_API_SECRET = "secret key"

# Gmail OAUTH
GMAIL_ADDRESS = "email address"
GMAIL_OAUTH_CLIENT_ID = "id cliet"
GMAIL_OAUTH_CLIENT_SECRET= "client secret"
GMAIL_OAUTH_REFRESH_TOKEN= "refsresh token oauth"
GMAIL_OAUTH_ACCESS_TOKEN= "acces token" 
GMAIL_OAUTH_TOKEN_EXPIRE= "token expire"

```


## API Reference

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Get all product

```http
  GET /products/AllProduct
```

#### Get filter product

```http
  GET /products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `search` | `string` | **Required**. Your API key |
| `limit` | `number` | **Required**. Your API key |
| `type` | `string` | **Required**. Your API key |
| `page` | `number` | **Required**. Your API key |

#### Get detail product

```http
  GET /products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `params` | `string` | **Required**. Your API key |

### Link Rest Api Dokumentasion Postman
```
[`Dokumentasi Postman`](https://documenter.getpostman.com/view/10953547/UzdzUm5K)
```

## Related Project

:rocket: [`Backend Blanja`](https://github.com/wahyuwww/Blanja-Backend)

:rocket: [`Frontend Blanja`](https://github.com/wahyuwww/Blanja-Frontend)

:rocket: [`Web Service`](https://belanjain-aja.herokuapp.com/v1)

:rocket: [`Demo Blanja`](https://react-belanja.vercel.app/)

## Contact
Wahyu Dwi Purwanto - [linkedin](https://www.linkedin.com/in/wahyu-dwi-purwanto/) - wahyu.aan2508@gmail.com

## License
Distributed under the [MIT](/LICENSE) License.

