import React from 'react';

// user comes with
// :id,:logins([{email:,scope:)}]),:phone_numbers([]),:legal_names([]),:note,:is_business

export default function({user}){
    return (
        <section className='userDetail'>
            <h1>{user.legal_names[0]}</h1>
            { 
                user.legal_names.length > 1 ?
                    <label>Other Names:
                        <ul>
                            {
                                user.legal_names.slice(1).map(((name) => <li>{name}</li>))
                            }
                        </ul>
                    </label>
                :
                    null
            }
            <label> User ID: 
                <h2>{user.id}</h2>
            </label>
            
            <label>Emails: 
                <ul>
                    {
                        user.logins.map(((login) => <li>{login.email}</li>))
                    }
                </ul>
            </label>
            <label>Phone Numbers: 
                <ul>
                    {
                        user.phone_numbers.map((num) => <li>{num}</li>)
                    }
                </ul>
            </label>


            <h2>This is {user.is_business ? "" : "not"} a business</h2>
            <h2>Notes: {user.note ? user.note : "none"}</h2>
        </section>
    );
}