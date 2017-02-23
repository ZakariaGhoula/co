require File.expand_path('../boot', __FILE__)

#require 'rails/all'
require "active_record/railtie"
require "action_mailer/railtie"

#require "#{RAILS.root}/lib/builder/article.rb"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

#config.time_zone = 'Paris'
#config.active_record.default_timezone = 'Paris'


module ApiParis
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
   # config.autoload_paths += Dir["#{Rails.root}/lib"]
    config.exceptions_app = self.routes
    config.time_zone = 'Paris'
    config.active_record.default_timezone = 'Paris'
    config.cache_store = :redis_store, 'redis://localhost:6379/0/cache', { expires_in: 90.minutes }

    config.middleware.delete Rack::Sendfile
    config.middleware.delete Rack::MethodOverride
    config.middleware.delete ActionDispatch::Cookies
    config.middleware.delete ActionDispatch::Session::CookieStore
    config.middleware.delete ActionDispatch::Flash

    config.middleware.insert_before 'Rack::Runtime', 'Rack::Cors' do
      allow do
        origins '*'
        resource '*',
                 headers: :any,
                 methods: [:get, :put, :post, :patch, :delete, :options]
      end
    end
  end
end
