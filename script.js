console.log('Start');
let temp;

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const switchModeButton=document.querySelector('#switch-modes');
const modeText=document.querySelector('#mode');
const modeIcon=document.querySelector('#mode-icon');
const inputField=document.querySelector('#search-data');
const clearField=document.querySelector('#search-clear');
const searchButton=document.querySelector('#search-button');
const userImage=document.querySelectorAll('.photo');
const userName=document.querySelector('#name');
const userDOB=document.querySelectorAll('.dob');
const userID=document.querySelector('#user-hashtag');
const userBio=document.querySelector('#user-bio');
const userRepo=document.querySelector('#repos');
const userFollowers=document.querySelector('#followers');
const userFollowings=document.querySelector('#followings');
const userLocation=document.querySelector('#location');
const userBlog=document.querySelector('#blog');
const userTwitter=document.querySelector('#twitter');
const userCompany=document.querySelector('#company');

//  Change Modes styling selectores
const changeWrapper=document.querySelector('#wrapper');

let current='dark';
toggleMode();
getUserInformation('m-afnan2018');
checkInput();

searchButton.addEventListener('click', searchUser);
switchModeButton.addEventListener('click', toggleMode);
clearField.addEventListener('click', clearInputField);
inputField.addEventListener('keyup', checkInput);

function searchUser(){
    let searchUsername=inputField.value;
    searchUsername=searchUsername.trim();
    if(searchUsername.indexOf(' ') != -1){
        showError();
    }
    else{
        getUserInformation(searchUsername);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showError(){
    inputField.value='No User found !!!';
    inputField.setAttribute('style', 'color:red');
    await sleep(1000);
    inputField.removeAttribute('style');
    inputField.value='';
    checkInput();
}

async function getUserInformation(user){
    let rawData=await fetch(`https://api.github.com/users/${user}`);
    let jsonData=await rawData.json();
    if(jsonData?.name){
        displayUserInformation(jsonData);
    }
    else{
        showError();
    }
}

function displayUserInformation(userData){
    temp=userData;
    for(key of userImage){
        key.setAttribute('src', userData?.avatar_url);
    }
    userName.innerText=userData?.name;
    userID.innerText=`@${userData?.login}`;
    userID.setAttribute('href', userData?.html_url);
    if(userData?.bio){
        userBio.innerText=userData?.bio;
    }
    else{
        userBio.innerText="This profile has no bio";
    }
    userRepo.innerText=userData.public_repos;
    userFollowers.innerText=userData.followers;
    userFollowings.innerText=userData.following;

    if(userData?.location){
        userLocation.innerText=userData?.location;
    }
    else{
        userLocation.innerText='Not Available';
    }
    if(userData?.blog){
        userBlog.innerText=userData.blog;
        userBlog.setAttribute('href', userData.blog);
    }
    else{
        userBlog.innerText='Not Available';
        userBlog.setAttribute('href', '#');
    }
    if(userData?.twitter_username){
        userTwitter.innerText=userData.twitter_username;
        userTwitter.setAttribute('href', `https://twitter.com/${userData.twitter_username}`);
    }
    else{
        userTwitter.innerText='Not Available';
        userTwitter.setAttribute('href','#');
    }
    if(userData?.company){
        userCompany.innerText=userData.company;
    }
    else{
        userCompany.innerText='Not Available';
    }

    //  Handle Date
    let createDate=(userData?.created_at);
    temp=createDate;
    let year=createDate.substr(0, 4);
    let mon=createDate.substr(5, 2);
    let date=createDate.substr(8, 2);
    mon=monthNames[parseInt(mon)-1];

    for(key of userDOB){
        key.innerText=`Joined ${date} ${mon} ${year}`;
    }
}

function toggleMode(){
    if(current==='light'){
        goToDark();
        current='dark';
    }
    else{
        goToLight();
        current='light';
    }
}

function goToDark(){
    document.querySelector('body').classList.add('dark');
    document.querySelector('body').classList.remove('light');
    modeText.innerText='light'
    modeIcon.setAttribute('src', 'assets/light_mode.svg');
}
function goToLight(){
    document.querySelector('body').classList.remove('dark');
    document.querySelector('body').classList.add('light');
    
    modeText.innerText='dark';
    modeIcon.setAttribute('src', 'assets/night_mode.svg');
}

function clearInputField(){
    inputField.value="";
    clearField.classList.add('input-inactive');
}

function checkInput(){
    if(inputField.value.length!=0){
        clearField.classList.remove('input-inactive');
    }
    else{
        clearField.classList.add('input-inactive');
    }
}