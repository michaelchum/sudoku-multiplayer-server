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
make install
make
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

#### POST Create user
```
http POST http://104.131.185.217:3000/api/register client_id=AndroidV1 client_secret=abc123 username=bobby password=simplepassword1
```

```
{
    "status": "Registration Successful"
}
```

#### POST User login
```
http POST http://104.131.185.217:3000/oauth/token grant_type=password client_id=AndroidV1 client_secret=abc123 username=bobby password=simplepassword1
```

```
{
    "access_token": "ZSlVNeQ0rVwyZ0JIFMcm5mQPhcJb3XXho+FRFx/ok30=",
    "expires_in": 3600,
    "refresh_token": "YgwjnSkzeGFgs3B/ifpctdHg1fifpBp1Hn8ZU4fC3UM=",
    "token_type": "Bearer"
}
```

#### POST Refresh token
```
http POST http://104.131.185.217:3000/oauth/token grant_type=refresh_token client_id=AndroidV1 client_secret=abc123 refresh_token=TOKEN
```

```
{
    "access_token": "nZ175+UjVqol/W2Wz2HGzR4p+vG+Fh4G5JEYruU6Cy8=",
    "expires_in": 3600,
    "refresh_token": "FLnV7vzdkVAQh+6/xghuAYkPWhvyz7TmfkcYzgzy3KM=",
    "token_type": "Bearer"
}
```
Note that a new `access_token` <b>AND</b> `refresh_token` will be generated

#### GET Generate a sudoku grid with specified difficulty "easy", "medium" or "hard" with unique solution
```
http http://104.131.185.217:3000/sudoku/generate/easy
```

```
{
    "sudoku": [
        4,
        2,
        3,
        ...
        1,
        7,
        2
    ]
}
```

#### GET Generate a sudoku grid with specified difficulty "easy", "medium" or "hard" with unique solution
```
http http://104.131.185.217:3000/sudoku/generate-string/medium
```

```
{
    "sudoku": "8,6,0,9,0,0,0,4,3,9,0,0,2,0,3,8,6,1,0,4,3,0,6,1,9,7,0,0,0,9,1,5,0,4,3,0,0,0,7,4,3,0,0,8,0,4,3,2,6,8,9,1,0,7,0,1,0,0,9,6,3,0,4,0,9,6,0,0,4,7,1,8,0,0,0,7,1,8,5,0,0"
}
```

#### POST Solve a sudoku grid specified as a string
```
http POST http://104.131.185.217:3000/sudoku/solve grid=8,6,0,9,0,0,0,4,3,9,0,0,2,0,3,8,6,1,0,4,3,0,6,1,9,7,0,0,0,9,1,5,0,4,3,0,0,0,7,4,3,0,0,8,0,4,3,2,6,8,9,1,0,7,0,1,0,0,9,6,3,0,4,0,9,6,0,0,4,7,1,8,0,0,0,7,1,8,5,0,0
```

```
{
    "sudoku": [
        8,
        6,
        1,
        ...
        2,
        1,
        2
    ]
}
```

#### POST Solve a sudoku grid specified as a string
```
http POST http://104.131.185.217:3000/sudoku/solve-string grid=8,6,0,9,0,0,0,4,3,9,0,0,2,0,3,8,6,1,0,4,3,0,6,1,9,7,0,0,0,9,1,5,0,4,3,0,0,0,7,4,3,0,0,8,0,4,3,2,6,8,9,1,0,7,0,1,0,0,9,6,3,0,4,0,9,6,0,0,4,7,1,8,0,0,0,7,1,8,5,0,0
```

```
{
    "sudoku": "8,6,1,9,7,5,2,4,3,9,7,5,2,4,3,8,6,1,2,4,3,8,6,1,9,7,5,6,8,9,1,5,7,4,3,2,1,5,7,4,3,2,6,8,9,4,3,2,6,8,9,1,5,7,7,1,8,5,9,6,3,2,4,5,9,6,3,2,4,7,1,8,3,2,4,7,1,8,5,9,6"
}
```

The requests will be updated as the project goes on. Don't hesitate to bug me on FB if you have any questions.
