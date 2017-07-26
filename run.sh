#!/bin/sh
# Used by docker image to run the development environment
set -e
bundle install
yarn install
./bin/rake db:setup RAILS_ENV=development
bundle exec puma -C config/puma.rb &
rm -rf public/webpack/development/*
cd client
bundle exec rake react_on_rails:locale
yarn run build:development
