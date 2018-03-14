import React from 'react';

export default function({users, selectUser}){
    return(
        <section>
            <ul>
                {
                    users.map((user, i) => (
                        <li 
                            id={user.legal_name+i}
                            onClick={selectUser(user)}
                        >
                            {user.legal_names[0]} 
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}