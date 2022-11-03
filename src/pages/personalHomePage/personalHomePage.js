
// const sidebar=body.querySelector('nav')
// const toggle=body.querySelector('.toggle')
// // const searchBtn=body.querySelector('.search-box')
// const modeSwitch=body.querySelector('.toggle-switch')
// const modeText=body.querySelector('.mode-text')
// console.log(app._data.count)
var userInfoUrl = url+"/showUserInfo";
var myBlogUrl = url+"/showBlog_web";
var totalBlogUrl =url+"/totalBlog_ca_web"
var showBlog="";
var TotalBlogNum = -1;
var pageNum=1;
var pageSize = 5;
var totalPage = 10;
var pager = document.querySelector("#pager");


function btnBaGrColOver(e){
    e.style.backgroundColor="#7ec6ff";
}
function btnBarGrColorOut(e){
    e.style.backgroundColor="#2196F3";
}
function switchBlogToJson(e){
    for(var i = 0;i<e.length;i++){
        e[i].content = JSON.parse( e[i].content);

    }
    showBlog = e;
    console.log(showBlog)
}
var page1 = document.querySelector("#page1");
var page2 = document.querySelector("#page2");
var page3 = document.querySelector("#page3");
var page4 = document.querySelector("#page4");
var page5 = document.querySelector("#page5");
var page6 = document.querySelector("#page6");
var page7 = document.querySelector("#page7");
var leftEllipsis = document.querySelector("#morePageLeft");
var rightEllipsis = document.querySelector("#morepPageRight");
var lastpage="";

function pageBrowse(curPage){
    var curPageNum=parseInt(curPage.innerHTML);

    if(lastpage!=""&&curPage==lastpage){
        return;
    }
    /**
     * 假如选择的页数大于5，那么就左边显示省略号，并且隐藏左边第二个页面
     * 
     */
     page1.style.display="flex"
     page2.style.display="flex"
     page3.style.display="flex"
     page4.style.display="flex"
     page5.style.display="flex"
     page6.style.display="flex"
     rightEllipsis.style.display="flex";
     leftEllipsis.style.display= "flex";
     page7.style.display="flex"
        page2.innerHTML=curPageNum-2;
        page3.innerHTML=curPageNum-1;
        page4.innerHTML=curPageNum;
        page5.innerHTML=curPageNum+1;
        page6.innerHTML=curPageNum+2;
        page4.style.background="#E4E5DE";
    if(curPageNum<5){
        leftEllipsis.style.display= "none";
        switch(curPageNum){
            case 1:
                page1.style.display="none"
                page2.style.display="none"
                page3.style.display="none"
                break;
            case 2:
                page1.style.display="none"
                page2.style.display="none"
                break;
            case 3:
                page1.style.display="none"
                break;
            case 4:
                break;
        }
    }
    else {
        if(totalPage-curPageNum>=4){
            page4.style.background="#E4E5DE";
        }else{
            switch(curPageNum){
                case totalPage-3:
                    rightEllipsis.style.display="none";
                    break;
                case totalPage-2:
                    page6.style.display="none"
                    rightEllipsis.style.display="none";
                    break;
                case totalPage-1:
                    page6.style.display="none"
                    page5.style.display="none"
                    rightEllipsis.style.display="none";
                    break;
                case totalPage:
                    page7.style.display="none"
                    page5.style.display="none"
                    page6.style.display="none"
                    rightEllipsis.style.display="none";
                    break;


            }

        }

    }
}
window.onpageshow=function(){
    pageBrowse(page1);
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
    $.ajax({
        url:myBlogUrl,
        type:"GET",
        data:{
            userid:store.get("userinfo").id,
            ca:0,
            pageNum:pageNum,
            pageSize:pageSize,
        },
        async:false,
        error:function(){
            alert("服务器异常，请稍后再试");

        },
        success:function(data){
            switchBlogToJson(data);
            /**
             * 获取成功时获取用户的avatar，nickname,describe
             */
        }
    })
    // $.ajax({
    //     url:totalBlogUrl,
    //     type:"GET",
    //     data:{
    //         userid:store.get("userinfo").id,
    //         ca:0
    //     },
    //     async:false,
    //     error:function(){
    //         alert("服务器异常，请稍后再试");

    //     },
    //     success:function(data){
    //         TotalBlogNum=data;
    //        totalPage= Math.floor((TotalBlogNum+pageSize-1)/pageSize);
    //        page1.style.background="#E4E5DE"
    //        if(totalPage==0){
    //         pager.style.display="none";
    //        }else{
    //         pageBrowse(page1)
    //        }
    //         /**
    //          * 获取成功时获取用户的avatar，nickname,describe
    //          */
    //     }
    // })
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
/**
 * 
 * @param {*} obj 
 * @param {*} e
 * 这里主要用来实现鼠标放在个性签名上，展示个性签名的所有内容 
 */
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
function myBlog(ca){
    $.ajax({
        url:myBlogUrl,
        type:"GET",
        data:{
            userid:store.get("userinfo").id,
            ca:ca,
            pageNum,pageNum,
            pageSize,pageSize
        },
        async:false,
        error:function(){
            alert("服务器异常，请稍后再试");

        },
        success:function(data){
            switchBlogToJson(data);
            /**
             * 获取成功时获取用户的avatar，nickname,describe
             */
        }
    })
}
