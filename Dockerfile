FROM ruby:3.1-alpine

RUN apk update && \
    apk upgrade && \
    apk add --update --no-cache \
    build-base \
    openssh-client \
    nodejs \
    postgresql \
    postgresql-dev \
    postgresql-client
#RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /app

WORKDIR /app

COPY Gemfile* /app/

RUN gem install bundler && bundle install

COPY . /app

EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
