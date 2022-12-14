var redirect_uri = "https://infinite-coast-04831.herokuapp.com/"  || "http://127.0.0.1:5500"



var client_id = "aab25a14ef854598a110d3ba13516d86";
var client_secret = "f306af294bef4360a793d548c5971e42";

const AUTHORIZE = "https://accounts.spotify.com/authorize" //the spotify authorize link
const TOKEN = "https://accounts.spotify.com/api/token";
const USER = "https://api.spotify.com/v1/me"
const DEVICES = "https://api.spotify.com/v1/me/player/devices"
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists"
const SONGPLAYING = "https://api.spotify.com/v1/me/player/currently-playing"

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
        ApiCalls()
    }
    else{
        console.log(this.responseText);
        // alert(this.reponseText);
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
    url += "&scope=user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-recently-played"
    window.location.href = url;
}

function ApiCalls(){
    callApi("GET",DEVICES,null,handleDevicesResponse);
    callApi("GET",PLAYLISTS,null,handleDevicesResponse);
    callApi("GET",SONGPLAYING,null,handleDevicesResponse);
    callApi("GET",USER,null,handleDevicesResponse);
}

const nameEle = document.querySelector('.spotpro')
const playEle = document.querySelector('.playlist')
console.log(nameEle);
function handleDevicesResponse(){
    if(this.status == 200){
        var data = JSON.parse(this.responseText);
        console.log(data);
        if (data.display_name != undefined){
            nameEle.innerHTML = data.display_name;
                 }
         else if( data.items != undefined){
             for(var i = 0;i< data.items.length; i++){
                console.log(data.items[i].name);
            playEle.innerHTML += data.items[i].name + ',  '
             }
         }
 
        console.log(data);
    }
    else if(this.status == 401){
        
         refreshAccessToken();
    }
    else{
        console.log(this.responseText);
    }
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
