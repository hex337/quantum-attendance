#!/bin/sh
set -e
bundle install
yarn
./bin/rake db:setup RAILS_ENV=development
./bin/rails server -b 0.0.0.0
