import React from 'react';

export default function({user}){
    return (
        <section>
            <h1>{user.legal_names}</h1>
            <h1>{user.id}</h1>
        </section>
    );
}