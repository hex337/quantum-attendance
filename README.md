# quantum-attendance
An attendance program for any type of martial arts dojo.

## Set up for local development (with Docker)

 1. Install Docker
 2. run `docker-compose up`

The first run might take a while due to dependencies being installed.
In case dependencies change and the docker image needs to be rebuilt, just use 
`docker-compose up --build`.

## Set up for local development (without Docker)

These set up instructions are written for a mac development environment, and should work similarly in any linux/unix dev environment.

### Homebrew setup

First, make sure you have [homebrew](https://brew.sh) installed. With that, you'll want to install the following packages:

```shell
brew install rbenv
brew install ruby-build
brew install yarn
brew install postgresql
brew install node
brew install heroku
```

### Downloading the source code

Navigate to the directory where you plan to work on this, and then clone this repo there.

```shell
cd ~/github/hex337
git clone https://github.com/hex337/quantum-attendance.git
cd quantum-attendance
```

Note, you are welcome to fork this into your own github repo, and work on PRs that way. I'm happy to teach you how to do this.

Once you've downloaded the source, you'll want to install the version of ruby along with all the gems you need.

```shell
rbenv install
```

Setting up the gems:

```shell
gem install bundler
bundle install
```

Setting up the javascript/node stuff for React

```shell
yarn
```

### Setting up the database

You'll want to make sure you have the postgres database running on your machine. When you installed it via homebrew, it should have told you how to have it running in the background. You can find that again if you missed it via `brew info postgresql`.

It should have you run something like this to get the DB up:

```shell
brew services start postgresql
```

Now you'll want to create and populate the database so that you can test things locally. Run the following commands:

```shell
./bin/rake db:setup RAILS_ENV=development
```

### Running the Server

Now that you have everything installed and the db running, you want to launch the server via:

```shell
foreman start -f Procfile.dev
```

You should then be able to navigate to [localhost:5000](http://localhost:5000) in your browser of choice and see the attendance app there.


## Testing

There are test suites for both the Rails app and the React frontend application.

### Frontend

We use [Jest](https://facebook.github.io/jest/) and [enzyme](http://airbnb.io/enzyme/) for testing our 
React components. Tests for a component can be found in the same directory as the component itself. Per 
convention, a `ComponentX.jsx` has its tests in `ComponentX.test.jsx`. 

To run the frontend tests, `cd` into the [client](./client) directory and execute `npm test`. That's it!