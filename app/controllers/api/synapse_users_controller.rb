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


def extract_info(user)
    return {
        logins:user.logins,
        phone_numbers:user.phone_numbers,
        legal_names:user.legal_names,
        permission:user.permission,
        note:user.note ,
        supp_id:user.supp_id ,
        is_business:user.is_business ,
        cip_tag:user.cip_tag ,
        flag:user.flag ,
        ips:user.ips,
        oauth_key:user.oauth_key,
        expires_in:user.expires_in,
        base_documents:user.base_documents
    }
end
