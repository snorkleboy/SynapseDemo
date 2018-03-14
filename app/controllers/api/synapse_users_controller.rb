class Api::SynapseUsersController < ApplicationController
    def index
        synapse_init
        users = synapse_get_users
        render json: {users: users.map{|users| users.legal_names}}
    end
end
