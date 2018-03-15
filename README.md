# Synapse Code demo [-heroku-](https://synapsedemo.herokuapp.com/)
## Tim Kharshan
#### timkharshan@hotmail.com


### table of contents
- [thought process](though-process)
- [running locally](#running-locally)
- [backend](#backend)
- [frontend](#frontend)
- [running tests](#running-tests)
## thought process
The objective was to create a simple front end focused app around some of SynapseFi's fine API. Since the API doesn't allow for CORS requests I setup a simple back end which delivers a react app and has a single API route which uses SynapseFi's Ruby plug in to interact with the SynapseAPI. I Used a client ID and Secret from the Docs. 
I only hit the get/users options of the SynapseFI api, as operations like transactions or adding bank accounts would require a more complex back end. 

The Front end is a simple 3 component React App. A parent component fetches data on Mount and displays a loader until it has data to display. Then it displays a list of names in the User List component and details about specific users in the User Detail component.

Clicking on a user in the list will result in it being put in a selected field in the parent App component, which results in its details being displayed in the detail section. 

## running locally
 To run on a local machine:
 - clone the repository
 - bundle install
 - npm install
 - webpack
 - rails s
 - browse to localhost:3000
## backend
The back end is built using a quick Rails app and SynapseFi's Ruby plug in. I do not use a database in this App, but needed back end to make requests to SynapseFi's API. 

There are two routes, one is the root route which delivers a page with an element with an id for React to hook into.

the other route is /api/users which maps to synapse_users_controller#index. synapse_users_controller inherits from synapse_super_controller, where I would put the implementation of any calls to SynapseFI API. 


### synapse_users_controller
synapse_users_controller index method initializes a SynapseFi client and makes a request for all Users associated with the use client_id. If there is an error in the process it sends back a error message and a 500 status. 

```
def index
    begin
        synapse_init
        @users = synapse_get_users
    rescue => exception
        render json: exception, status: 500
    end     
end
```
### synapse_super_controller
the synapse_super_controller has two functions currently. One initializes a Synapse client,
```
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
```

the other uses the client to make a requests for users. This is mostly copy pasted from the Docs.

```
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
  ```
## frontend
all Front end files, including tests, are nested under the front end folder. 

the Front end is made of three simple react components and a function that fetches data from the back end.

The App component fetches data onMount, the UserList component displays the list of users, and the UserDetail component displays the details about the selected user. 

I did not use Redux because this is a small App that doesn't have complex state relationships between components other than the selected user.


### Fetch function
frontend/util has a usersAPI file which is where I would put my API call functions. 

It has the one to make a call to api/users. It uses the standard Fetch API, if the response if OK then it returns the json from the response, otherwise it assumes there is a json error message and throws an error with the json. 
 ```
 export const fetchAllUsers = function () {
     const options = {
         method: "GET"
     }
     return fetch('api/users', options)
         .then((res) => {
             const json = res.json();
             if (res.ok === true) {
                 return json
             } else {
                 return json.then((err) => {
                     throw err
                 })
             }
         })
 }
```
### App component
The App component fetches data on mount and displays a loader until it gets its data. 

It starts with state with a 'null' user and loading:true
```
this.state = {
                users: [_user],
                error: null,
                selectedUser: _user,
                loading: true
            };
```
#### didMount
On mount it fetches data. Once it receives the data it sets loading to false and depending on if the fetch was successful it will set an error or users in state and the first user set as selected. 


```
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
```
#### Render
In its render function, if its not loading it renders a div with a loader className, otherwise it renders the good bits. It passes the list of users,the selected user, and a selectUser function which takes in a user and returns a clickHandler
```
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
}
```
#### click handler
the selectUser function is assigned to the following function. Its purpose is to take in a user and return a click handler which calls setState with the user. This function will be used by the UserList component to give click handlers to list items. 
```
handleUsernameClick(user) {
    const handler = function (e) {
        this.setState({
            selectedUser: user
        })
    }
    return handler.bind(this);
}

```
### UserList component

the userList component is a presentational component which takes in a list of users, a user amongst which one is selected, and a function that assigns click handlers which will allow us to change which user is selected.

if there are users in the users list passed in, the component maps through the names to create LI's which it renders into a ul.

if the user currently being iterated over matches the selected user, it is given a selected class so that we can css it. Every entry is also assigned a click handler using the selectuser function. 

```
let userLi;
if (users && users.length>0){
    userLi = users.map((user, i) => (
        <li
            className={user.id === selectedUser.id ? "selected userlist-li" : 'userlist-li'}
            key={i.toString() + user.legal_names[0]}
            onClick={selectUser(user)}
        >
            {user.legal_names[0]}
        </li>
    ))
}
```

then the render is simply
```
return(
    <section className="userList">
        <ul>
            {userLi}
        </ul>
    </section>
)
``` 
### UserDetail component
The User Detail component is a simple presentational component which takes in a user and displays details of that user. This user is whatever user is in the selected property of the state of the App component, which is updated by clicking on names in the UserList component. 

first I get some list properties out of the user and map the to li's
```
const emails = user.logins.map(((login, i) => <li key={login.email}>{login.email}</li>))
const phoneNumbers = user.phone_numbers.map((num, i) => <li key={num}>{num}</li>)
```

which are rendered like
```
<label>Emails: 
    <ul>
        {emails}
    </ul>
</label>
```

if there is more than 1 legal name I decided to handle it differently with a extraNamesMaker function. Its purpose is to take in a list of names, and if there is more than one it makes an 'other names' component. 
```
function extraNamesMaker(userNames){
    if (userNames.length > 1) {
        extraNames = user.legal_names.slice(1).map(((name, i) => <li key={name}>{name}</li>))
        return (
            < label > Other Names:
                <ul>
                    {extraNames}
                </ul>
            </label >
        )
    } else {
        return null
    }
}
```

which is rendered like 
```
<h1>{user.legal_names[0]}</h1>
{extraNamesMaker(user.legal_names)}

```
## running tests
I wrote some quick front end tests for the components. to run the tests run npm run tests. They are written in jest using enzyme and fetchmock. 

The tests only do a simple snapshot test for the presentational components, and for the parent app it checks that it calls the fetch function on mount, that it displays a loader with state loading:true, and doesn't without. 
It also checks that with user data it renders the presentational components, passes down props, and that calling the click handlers it sends to the userList result in the user its called with being passed to the User detail Component. 
