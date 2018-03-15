import React from 'react';

export default function({users, selectedUser, selectUser}){

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
    
    return(
        <section className="userList">
            <ul>
                {userLi}
            </ul>
        </section>
    )
}