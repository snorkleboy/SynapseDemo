import React from 'react';



export default function({user}){
    const emails = user.logins.map(((login, i) => <li key={login.email}>{login.email}</li>))
    const phoneNumbers = user.phone_numbers.map((num, i) => <li key={num}>{num}</li>)
    return (
        <section className='userDetail'>
            <h1>{user.legal_names[0]}</h1>
                {extraNamesMaker(user.legal_names)}
            <label> User ID: 
                <h2>{user.id}</h2>
            </label>
            
            <label>Emails: 
                <ul>
                    {emails}
                </ul>
            </label>
            <label>Phone Numbers: 
                <ul>
                    {phoneNumbers}
                </ul>
            </label>


            <h2>This is {user.is_business ? "" : "not"} a business</h2>
            <h2>Notes: {user.note ? user.note : "none"}</h2>
        </section>
    );
}

function extraNamesMaker(userNames){
    if (userNames.length > 1) {
        extraNames = user.legal_names.slice(1).map(((name, i) => <li key={name}>{name}</li>))
        return (
            < label > Other Names:
                <ul>
                    {
                        extraNames
                    }
                </ul>
            </label >
        )
    } else {
        return null
    }
}