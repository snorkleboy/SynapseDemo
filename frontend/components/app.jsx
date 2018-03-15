import React from 'react';

import UserList from './userList';
import UserDetail from './userDetail';

import * as UsersAPI from '../util/usersAPI'

const _user={
    id:'',
    logins:[{email:''}],
    phone_numbers:[],
    legal_names:[],
    note:'',
    is_business:''
}
class App extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                users: [_user],
                error: null,
                selectedUser: _user,
                loading: true
            };
        }
        componentDidMount() {
            UsersAPI.fetchAllUsers()
                .then((res) => this.setState({
                    users: res.users,
                    selectedUser: res.users[0],
                    loading: false
                }))
                .catch((error) => this.setState({
                    error,
                    loading: false
                }));
        }
        handleUsernameClick(user) {
            const handler = function (e) {
                this.setState({
                    selectedUser: user
                })
            }
            return handler.bind(this);
        }
    render() {
        if (!this.state.loading){
            const error = this.state.error ?
                    <h2 className='error'>{this.state.error}</h2>
                :
                    null
            return (
                <main className="app">
                    <h1>My Users</h1>
                    {error}
                    <div className="row">
                        <UserList
                            users={this.state.users}
                            selectedUser={this.state.selectedUser}
                            selectUser={this.handleUsernameClick.bind(this)}
                        />
                        <UserDetail
                            user={this.state.selectedUser}
                        />
                    </div>
                </main>
            )
        } else {
            return (
                <div className="loader"></div>
            )
        }
    }
}

export default App;

