require 'json'
class Api::SynapseUsersController < ApplicationController
    def index
        synapse_init
        @users = synapse_get_users
        # users = users.map{|user| extract_info(user)}
        # p JSON.generate(users)
        # render text: JSON.generate(users),content_type: 'application/json'
    end
end


