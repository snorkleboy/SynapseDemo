class Api::SynapseUsersController < Api::SynapseSuperController
    def index
        synapse_init
        @users = synapse_get_users
    end
end


