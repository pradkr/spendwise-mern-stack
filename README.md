# spendwise-mern-stack

## Key Features

## App

The app is pretty self explanatory, an expense tracker.

- Expense and Income tracker

  - Graphical representation of expense categories

- Responsive
- AuthContext for login/logout
- Router
- GlobalContext for transactions
- Backend
  - Express for APIs, API Auth, middleware, validators, routes, models, controllers, API versioning, JWT token

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/pradkr/spendwise-mern-stack

# Go into the repository
$ cd server

# Make a .env file and put following there, your mongodb URL, secret etc
#NODE_ENV=development
#PORT=5000
#REACT_APP_MONGODB_URL=mongodb+srv://<your-user-password>@test.1qgfrhh.mongodb.net/?retryWrites=true&w=majority
#SECRETCODE=yoursecret
#HOST=http://localhost
#HOST_BE=http://localhost

# Install dependencies
$ npm install

# Run the backend server(should say "Success: Connected to MongoDB host ac-***********.mongodb.net")
$ npm run start

# Run the app (in another terminal)
$ cd app

# Add proxy to your react app package.json, as last line
#    ]
#  },
  "proxy": "http://localhost:5000/"
#}

# Install dependencies
$ npm install

# Run the app (or for nodemon use npm run server)
$ npm run start

```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.
