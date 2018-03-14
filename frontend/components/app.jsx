import React from 'react';

import UserList from './userList';
import UserDetail from './userDetail';

import * as UsersAPI from '../util/usersAPI'

const _user={
    id:'',
    logins:'',
    phone_numbers:'',
    legal_names:'',
    note:'',
    is_business:''
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            users:[],
            error:"no error",
            selectedUser: _user
        };
    }
    componentDidMount(){
        UsersAPI.fetchAllUsers()
            .then((res)  => this.setState({users: res.users}))
            .catch((error) => this.setState({error}));
    }
    handleUsernameClick(user){
        const handler = function(e){
            this.setState({selectedUser:user})
        }
        return handler.bind(this);
    }
    render() {
        console.log(this.state.error, this.state.users, typeof this.state.users)
        return (
            <main className="app">
                <UserList 
                    users={this.state.users} 
                    selectUser={this.handleUsernameClick.bind(this)}
                />
                <UserDetail 
                    user={this.state.selectedUser}
                />
            </main>
        );
    }
}

export default App;

