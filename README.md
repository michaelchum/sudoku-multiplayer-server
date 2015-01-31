# sudoku-multiplayer-server
Simple RESTful API built on Node.js with Express.js and MongoDB with Mongoose

Here's a very basic tutorial of what we're trying to build [Creating RESTful APIs With NodeJS and MongoDB](http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)

### Installation 
[Official tutorial on installing Node.js on Unix system](http://www.joyent.com/blog/installing-node-and-npm/)
There are far simpler tutorials if you perform a Google search (using a package manager), but this is the official one which tells you to manually compile the source.

Note that if you're on linux/Ubuntu, the `apt-get` package manager does have the latest version of Node.js and npm.

### API

http POST http://localhost:1337/oauth/token grant_type=password client_id=AndroidV1 client_secret=abc123 username=bob password=simplepassword

http POST http://localhost:1337/oauth/token grant_type=refresh_token client_id=mobileV1 client_secret=abc123456 refresh_token=TOKEN

http http://localhost:1337/sudoku/generate Authorization:'Bearer TOKEN'