FROM ruby:3.2

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /app

WORKDIR /app

COPY Gemfile* /app/

RUN gem install bundler && bundle install --with=development

COPY . /app

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
