
// const sidebar=body.querySelector('nav')
// const toggle=body.querySelector('.toggle')
// // const searchBtn=body.querySelector('.search-box')
// const modeSwitch=body.querySelector('.toggle-switch')
// const modeText=body.querySelector('.mode-text')
console.log(app._data.count)
window.onpageshow=function(){
    var userInfoUrl = url+"/showUserInfo";
    $.ajax({
        url:userInfoUrl,
        type:"GET",
        data:{
            user_acid:store.get("user_acid"),
        },
        async:false,
        error:function(){
            alert("服务器异常，请稍后再试");
            document.querySelector('.avatar'). src="/image/defaultAvatar.png"
        },
        success:function(data){
            store.set('userinfo',data);
            console.log(data)
            /**
             * 获取成功时获取用户的avatar，nickname,describe
             */
            document.querySelector('.avatar').src=data.portiImage;
            document.querySelector('.nickname').innerHTML=data.name;
            document.querySelector('.describe').innerHTML=data.intro;

        }
    })
}
const body=document.querySelector('body');
const sidebar=body.querySelector('nav');
// const searchBtn=body.querySelector('.search-box')

const modeText=document.querySelector('.mode-text')
toggleswitch=()=>{
    sidebar.classList.toggle('close');
    var tapbar=document.querySelector('.tapBar');
    if(!sidebar.classList.contains('close')){
        tapbar.style.left='250px'
    }else{
        tapbar.style.left=''
    }
}
modelSwitch=()=>{
    body.classList.toggle('dark');
    if(body.classList.contains('dark')){
        modeText.innerText="Light mode"
    }else{
        modeText.innerText="Dark mode"
    }
}

// searchBtn.addEventListener('click',()=>{
//     sidebar.classList.remove('close')
// })
function overShow(obj,e) {
    var showDiv = document.getElementById('showDiv');
    var theEvent = window.event|| e;
    var theleft=theEvent.clientX;
    theleft=theleft>77?77:theleft;
    showDiv.style.left = theleft+"px";
    showDiv.style.top = theEvent.clientY+"px";
    showDiv.style.display = 'block';
    //alert(obj.innerHTML);
    showDiv.innerHTML = obj.innerHTML;
   }

   function outHide() {
    var showDiv = document.getElementById('showDiv');
    showDiv.style.display = 'none';
    showDiv.innerHTML = '';
   }
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