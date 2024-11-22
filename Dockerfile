FROM ruby:3.2

# Install dependencies
RUN apt-get update -qq && \
    apt-get install -y nodejs postgresql-client && \
    rm -rf /var/lib/apt/lists/*

# Set up the application directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock separately to leverage Docker cache
COPY Gemfile Gemfile.lock ./

# Install gems
RUN gem install bundler && \
    bundle install --with=development

# Copy the rest of the application code
COPY . .

# Set up the entrypoint
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Expose the port the app runs on
EXPOSE 3000

# Start the main process
CMD ["rails", "server", "-b", "0.0.0.0"]
