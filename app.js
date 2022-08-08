var redirect_uri = "http://127.0.0.1:5500" //index.html file

var client_id = "aab25a14ef854598a110d3ba13516d86";
var client_secret = "f306af294bef4360a793d548c5971e42";
// var code = 'AQBfoDsOpysDOF0T79ZUaM3PS3lyeKKfEbNcnrafW8v4gc6wzZwnJcAW8uVjm82KOlRzri3mE1WbV5kWlfkML8o1ZvvjEj5tibaU70kajboNNnDVMR-IMocrXJFM45sPpE3ccvI3J-VKEb0uNb8AYVaxNSnZ98AWRTox0OH0QvjkdSV0jrWdlh4Zmfo';

const AUTHORIZE = "https://accounts.spotify.com/authorize" //the spotify authorize link
const TOKEN = "https://accounts.spotify.com/api/token";
const DEVICES = "https://api.spotify.com/v1/me/player/devices"

function onPageLoad(){
    localStorage.setItem("client_id",client_id);
    localStorage.setItem("client_secret",client_secret);
    if(window.location.search.length > 0){
        handleRedirect();
    }
    else{
        access_token = localStorage.getItem("access_token");
        if( access_token == null){
            //we don't have an access token so present token section
            document.getElementById("tokenSection").style.display = 'block';
        }
        else{
            //we have an access token so present device section
            document.getElementById("deviceSection").style.display ='block';
        }
    }
    
}
function handleRedirect(){
    code = getCode();
    fethAccessToken(code);
    window.history.pushState("","",redirect_uri); //remove param from url
}

function getCode(){
    let code = null;
    const queryString = window.location.search;
    if(queryString.length > 0){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code');
    }
    return code;
}


function fethAccessToken(code){
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body+= "&client_id=" + client_id;
    body+= "&client_decret=" + client_secret;
    callAuthorizationApi(body);
}
function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    const charCodes = new Uint8Array(codeUnits.buffer);
    let result = '';
    for (let i = 0; i < charCodes.byteLength; i++) {
      result += String.fromCharCode(charCodes[i]);
    }
    return result;
  }
function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST",TOKEN,true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var authorizationString = client_id + ":"+ client_secret;
    // authorizationString = toBinary(authorizationString);
    // console.log(toBinary(authorizationString));
    // var encoded_data = btoa(authorizationString);
    xhr.setRequestHeader('Authorization', 'Basic '+ btoa(authorizationString)); //////////////////////////////////////
    
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse; 
}

function handleAuthorizationResponse(){
    if(this.status == 200){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if(data.access_token != undefined){
            
            access_token = data.access_token
            console.log('access'+access_token);
            localStorage.setItem("acess_token",access_token);
             
        }
        if(data.refresh_token != undefined){
            refresh_token = data.refresh_token;
            console.log('refrsh'+refresh_token);
            localStorage.setItem("refresh_token",refresh_token);

        }
        onPageLoad();
    }
    else{
        console.log(this.responseText);
        alert(this.reponseText);
    }
}

function requestAuthorization(){

    localStorage.setItem("client_id",client_id);
    localStorage.setItem("client_secret",client_secret);
    let url = AUTHORIZE;
    url+= "?client_id=" + client_id;
    url+= "&response_type=code";
    url+= "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-read-playback-state user-modify-playback-state"
    window.location.href = url;
    // window.location.href = url; //Show SPotify's authorization screen
}

function refreshDevices(){
    callApi("GET",DEVICES,null,handleDevicesResponse);
}

function handleDevicesResponse(){
    console.log(this.status);
    if(this.status == 200){
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllitems("devices");
        data.devices.forEach(item=> addDevice(item));
    }
    else if(this.status == 401){
        
        //  refreshAccessToken();
    }
    else{
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function addDevice(item){
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("devices").appendChild(node);
}


function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" +refresh_token;
    body += "&client_id="+client_id;
    callAuthorizationApi(body);
}


function callApi(method,url,body,callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method,url,true);
    xhr.setRequestHeader('Content-Type','application/json');
    let access_token = localStorage.getItem("acess_token");
    console.log(access_token);
    xhr.setRequestHeader('Authorization','Bearer '+ access_token);
    xhr.send(body);
    xhr.onload = callback;
    
}

function removeAllItems(elementId){
    let node = document.getElementById(elementId);
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
}


//may have to refresh devices



//What I got after I agreed:
//http://127.0.0.1:5500/?code=AQDUFekIRpUN9-mqvGaHO8HtQBFWXxQKmgMMy1M09Rrs5lfnLhlsIsx7hVPN9jwABlnPFpXeoejCVWsFEBZVoxoVz8I59rT8zJXc9HwzGvny8F6ObuguWQLv78lugQnTv9aLDwC9-tOhQU-ZmxcbvDYnQtWab1EAQdbd96vtZIc5Dly83MM3jgE_PRI
// User profile name (maybe picture maybe follower), user playlists