class Api::SynapseUsersController < Api::SynapseSuperController
    def index
        begin
            synapse_init
            @users = synapse_get_users
        rescue => exception
            p 'HEREHEREHEREREHERE', exception
            render json: exception, status: 500
        end     
    end
end


