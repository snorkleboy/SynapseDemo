class Api::SynapseSuperController < ApplicationController
    def synapse_init
    # https://docs.synapsepay.com/docs/api-initialization
    args = {
      # synapse client_id
      client_id:        ENV.fetch('CLIENT_ID'),
      # synapse client_secret
      client_secret:    ENV.fetch('CLIENT_SECRET'),
      # a hashed value, either unique to user or static for app
      fingerprint:      ENV.fetch('FINGERPRINT'),
      # the user's IP
      ip_address:       '127.0.0.1',
      # (optional) requests go to sandbox endpoints if true
      development_mode: true,
      # (optional) if true logs requests to stdout
      logging:          true
    } 
    @Synapse_Client = SynapsePayRest::Client.new(args)
  end

  def synapse_get_users
    args = {
      client:   @Synapse_Client,
      # (optional) uses API default unless specified
      page:     1,
      # (optional) uses API default of 20 unless specified, larger values take longer
      per_page: 50,
      # (optional) filters by name/email match
      query:    nil
    }
    users = SynapsePayRest::User.all(args)    
  end
end
