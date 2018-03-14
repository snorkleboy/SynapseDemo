require 'dotenv'
Dotenv.load

# Load the Rails application.
require_relative 'application'
p ENV.fetch('CLIENT_ID')
# Initialize the Rails application.
Rails.application.initialize!
