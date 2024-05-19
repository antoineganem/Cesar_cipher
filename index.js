
const readlineSync = require('readline-sync')
const fs = require('fs');
const path = require('path');

function cesarCipher(str,idx){
    let result = '';
    let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ';
    for(let letter of str){ 
        let index = alphabet.indexOf(letter); // indexOf es para encontrar el index de un caracter dentro de un string
        if(index !== -1){
            let newIndex = (index + idx) % alphabet.length;
            let newLetter = alphabet[newIndex];
            result += newLetter;
        }
    }
    return result;
}


function registerUser(){
    let userName = readlineSync.question('Enter your name: ');
    let password = readlineSync.question('Enter your password: ')

    let passwordCifrada = cesarCipher(password,7);

    console.log(passwordCifrada);
    addUser(userName,passwordCifrada);

}

function addUser(userName,passwordCifrada){
    const filePath = path.join(__dirname,'users.json');
    let users = [];
    fs.readFile(filePath,(err,data) => {

        if(err){
            users;
        } else {
            users = JSON.parse(data);
        }

        users.push({userName,passwordCifrada});
        fs.writeFile(filePath,JSON.stringify(users),(err) => {
            if(err){
                console.log("Error adding user");
            } else {
                console.log("Username added successful");
            }
        })
    })
}


function login() {
    let userName = readlineSync.question('Enter your name: ');
    let password = readlineSync.question('Enter your password: ');

    // cipher the password and check if it exist in the json file
    
    const filePath = path.join(__dirname,'users.json');

    fs.readFile(filePath,(err,data) => {
        if(err) {
            console.log('Error reading file');
        } else {
            for(let userNames of JSON.parse(data)){
                if(userName === userNames.userName &&
                    cesarCipher(password,7) === userNames.passwordCifrada) 
                {
                    console.log('Welcome',userName);
                    return;
                } else {
                    console.log('Wrong user or password');
                }
            }
        }
    })
}


registerUser();