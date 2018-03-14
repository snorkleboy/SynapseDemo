import React from 'react';
import ReactDOM from 'react-dom';

import * as UsersAPI from '../util/usersAPI'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            users:[],
            error:"no error",
            selectedUser:null
        };
    }
    componentDidMount(){
        UsersAPI.fetchAllUsers()
            .then((res)  => this.setState({users: res.users}))
            .catch((error) => this.setState({error}));
    }
    render() {
        console.log(this.state.users, typeof this.state.users)
        return (
            <div className="app">
                <h1> hello</h1>
                {this.state.users.map((user,i)=>{
                    return <h1 key={user.legal_names+ i}>{user.legal_names}</h1>
                })}
                {this.state.error}
            </div>
        );
    }
}

export default App;