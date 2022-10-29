function searchfocus(e){
    e.value = "";
}

setInterval(function(){
var date = new Date()
let hh=padZero(date.getHours())
let mm = padZero(date.getMinutes())
// let ss = padZero(date.getSeconds())
timeBox1.innerText=hh+":"+mm
},100)
var searchBtn=document.querySelector('.search-btn')
var style1 = document.createElement('style')
var timeBox=document.querySelector('.timebox')

function searchBoxOnfocus(){
    var searchBox=document.querySelector('.search-box')
    style1.innerHTML=".background::before{filter: blur(4px); transform: scale(1.08);}"
    document.head.appendChild(style1);
    searchBox.style.width='440px'
};
function searchBoxOnblur(){
    var searchBox=document.querySelector('.search-box')
    document.head.removeChild(style1)
    searchBox.style.width=''
}
function padZero(n){
    return n>9?n:'0'+n
}
function login(e){
  
}
