import React from 'react';

// user comes with
// :id,:logins([{email:,scope:)}]),:phone_numbers([]),:legal_names([]),:note,:is_business

export default function({user}){
    return (
        <section className='userDetail'>
            <h1>{user.legal_names[0]}</h1>
            { 
                user.legal_names.length > 1 ?
                    <label>Other Names
                        <ul>
                            {
                                user.legal_names.slice(1).map(((name) => <li>{name}</li>))
                            }
                        </ul>
                    </label>
                :
                    null
            }
            <h1>{user.id}</h1>
            <label>Emails
                <ul>
                    {
                        user.logins.map(((login) => <li>{login.email}</li>))
                    }
                </ul>
            </label>
            <label> Phone Numbers
                <ul>
                    {
                        user.phone_numbers.map((num) => <li>{num}</li>)
                    }
                </ul>
            </label>


            <h1>This is {user.is_business ? "" : "not"} a business</h1>
            <h1>Note: {user.note ? user.note : "none"}</h1>
        </section>
    );
}