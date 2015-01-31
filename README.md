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

client_id: `AndroidV1`

client_id: `abc123`

### Web Client Info

client_id: `WebV1`

client_secret: `abc123`

### Sample User

Username: `bob`

Password: `simplepassword`

## API Requests

To test these requests, I'm using [httpie](https://github.com/jakubroztocil/httpie) which I highly recommend. It is a very convenient wrapper around cURL in the unix terminal.

### Create user
`http POST http://104.131.185.217:3000/api/register client_id=AndroidV1 client_secret=abc123 username=bobby password=simplepassword1`

```
{
    "status": "Registration Successful"
}
```

### User login
`http POST http://104.131.185.217:3000/oauth/token grant_type=password client_id=mobileV1 client_secret=abc123456 username=bobby password=simplepassword1`

### Refresh token
`http POST http://104.131.185.217:3000/oauth/token grant_type=refresh_token client_id=mobileV1 client_secret=abc123456 refresh_token=TOKEN`

### Generate sudoku grid
http http://104.131.185.217:3000/sudoku/generate Authorization:'Bearer TOKEN'

The requests will be updated as the project goes on. Don't hesitate to bug me on FB if you have any questions.
