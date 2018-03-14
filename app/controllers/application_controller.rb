class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def synapse_init_args()
    # https://docs.synapsepay.com/docs/api-initialization
    args = {
      # synapse client_id
      client_id:        'client_id_5p7x3zfEglJOGcR2beTCyNAKtLnVSFBXh6vdos4k',
      # synapse client_secret
      client_secret:    'client_secret_nP213c0wuyWIdKZRXmjHTDC0FxNBkvLoVYfi6glt',
      # a hashed value, either unique to user or static for app
      fingerprint:      'e83cf6ddcf778e37bfe3d48fc78a6502062fc1030449628c699ef3c4ffa6f9a2000b8acc3c4c0addd8013285bb52c89e5267b628ca02fa84a6d71fe186b7cd5d',
      # the user's IP
      ip_address:       '127.0.0.1',
      # (optional) requests go to sandbox endpoints if true
      development_mode: true,
      # (optional) if true logs requests to stdout
      logging:          true,
      # (optional) file path to write logs to
      log_to:           nil
    } 
    @Synapse_Client = SynapsePayRest::Client.new(args)
  end

  def synapse_
end
