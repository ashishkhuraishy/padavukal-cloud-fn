const functions = require('firebase-functions');

const fetch = require('node-fetch');

exports.CreateUser = functions.auth.user().onCreate((user) => {
    var data = JSON.stringify({first_name: user.displayName, uid: user.uid});
    console.log(user.uid);
    console.log(user.displayName);
    
    fetch('http://52.66.141.181/api/profile/name', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
            'Authorization':  user.uid
        },
    })
    .then((res) => {
        console.log("Sucess")
        console.log(res);
        return res ;
        }) // expecting a json response
        .catch((json) => {
            console.log("Failed")
            console.log(json);
            return json;
        })


    return user
});