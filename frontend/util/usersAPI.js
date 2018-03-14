export const fetchAllUsers =  function(){
    const options = { 
        method: "GET"
    }
    return fetch('api/users', options)
    .then((res)=>{
        const json = res.json();
        if (res.ok === true){
            return json
        } else {
            return json.then((err)=> {throw err})
        }
        return res.json()
    })
}
