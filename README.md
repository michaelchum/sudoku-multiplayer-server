# sudoku-multiplayer-server
Simple RESTful API built on Node.js with Express.js and MongoDB with Mongoose

Here's a very basic tutorial of what we're trying to build [Creating RESTful APIs With NodeJS and MongoDB](http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)

## Installation 
[Official tutorial on installing Node.js on Unix system](http://www.joyent.com/blog/installing-node-and-npm/)
There are far simpler tutorials if you perform a Google search (using a package manager), but this is the official one which tells you to manually compile the source.

Note that if you're on linux/Ubuntu, the `apt-get` package manager does have the latest version of Node.js and npm.

If you want to install the server on your own for whatever reason, install/run MongoDB and do:

```
git clone
npm install
node server.js
```

## Server

Our API server is hosted at `104.131.185.217:3000`. You can also use `hksn.ca:3000` when testing API requests. However you should use the raw IP address in your Android/Web client for performance. We'll maintain the backend server on this IP for the entire duration of the project.

## Clients

### Android Client Info

Client ID: `AndroidV1`

Client Secret: `abc123`

### Web Client Info

Client ID: `WebV1`

Client Secret: `abc123`

### Sample User

Username: `bob`

Password: `simplepassword`

## API Requests

http POST http://localhost:1337/oauth/token grant_type=password client_id=AndroidV1 client_secret=abc123 username=bob password=simplepassword

http POST http://localhost:1337/oauth/token grant_type=refresh_token client_id=mobileV1 client_secret=abc123456 refresh_token=TOKEN

http http://localhost:1337/sudoku/generate Authorization:'Bearer TOKEN'

The requests will be updated as the project goes on. Don't hesitate to bug me on FB if you have any questions.
