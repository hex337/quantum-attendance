require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module QuantumAttendance
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.0
    config.assets.compile = false
    
    Rails.application.config.action_view.default_enforce_utf8 = false
    Rails.application.config.action_dispatch.use_cookies_with_metadata = true
    Rails.application.config.active_job.return_false_on_aborted_enqueue = true
    Rails.application.config.active_record.collection_cache_versioning = true

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
