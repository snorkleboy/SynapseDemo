

export const fetchAllUsers =  function(){
    const options = { 
        method: "GET"
    }
    return fetch('api/users', options).then((res)=> res.json())
}
