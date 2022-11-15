
// const sidebar=body.querySelector('nav')
// const toggle=body.querySelector('.toggle')
// // const searchBtn=body.querySelector('.search-box')
// const modeSwitch=body.querySelector('.toggle-switch')
// const modeText=body.querySelector('.mode-text')
// console.log(app._data.count)


// const                popup = document.querySelector(".popup"),

//                 input = field.querySelector(".thecopyurl"),
//                 copy = field.querySelector(".copy");
var v = new Vue({
    el:"#blog",
    data:{
        blogs:[],
        choose:-1,   
    },
    methods:{
        chooseBlog(e){

            v.$data.choose = v.$data.blogs[e].id
        }
    }
})


var userInfoUrl = url+"/showUserInfo";
var myBlogUrl = url+"/showBlog_web";
var totalBlogUrl =url+"/totalBlog_ca_web";
var deleteBlogUrl =url+"/deleteBlog_web";
var TotalBlogNum = -1;
var initPageNum=1;
var pageSize = 5;
var totalPage =3;
var pager = document.querySelector("#pager");
var page1 = document.querySelector("#page1");
var page2 = document.querySelector("#page2");
var page3 = document.querySelector("#page3");
var page4 = document.querySelector("#page4");
var page5 = document.querySelector("#page5");
var page6 = document.querySelector("#page6");
var page7 = document.querySelector("#page7");
var leftEllipsis = document.querySelector("#morePageLeft");
var rightEllipsis = document.querySelector("#morepPageRight");
var lastpageNum=0;
var lastpage ="";
var selectColor="#E4E5DE"
var  curca = 0;
var flag = false;

// function showDeleteToast(){
//     popup.classList.toggle("show");
// }
function writeBlog(){

}
function setBlog(){

}
function sureToDelete(){
    $.ajax({
        url:deleteBlogUrl,
        type:"GET",
        data:{
            id:v.$data.choose,
        },
        async:true,
        error:function(){
            alert("服务器异常，请稍后再试");
        },
        success:function(data){
            console.log(data)
            location.reload() 

            /**
             * 获取成功时获取用户的avatar，nickname,describe
             */

        }
    })
}
            
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
    v.$data.blogs = e;
    console.log(v.$data.blogs)
}
/**
 * 
 * @param {组件} curPage 
 * @returns 
 * 
 */

window.onpageshow=function(){
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

// page7.innerHTML=totalPage;
    flag=true;
myBlog(curca,initPageNum,pageSize);
    

}
function pageLess(curPage){
    // var curPageNum=parseInt(curPage.innerHTML);
    curPage.style.background=selectColor;
    if(lastpage==""){
        lastpage=curPage;
        myBlog(curca,parseInt( curPage.innerHTML),pageSize);
    }
    else{
        if(lastpage==curPage)
        return;
         myBlog(curca,parseInt( curPage.innerHTML),pageSize);
        lastpage.style.background="";
        lastpage=curPage
    }
}
/**
 * 
 * @param {*} curPage 
 * @returns 
 * 这里传字符串
 */
function pageLot(curPage){
var curPageNum=parseInt( curPage);
    if(curPageNum==lastpageNum){
        return;
    }else{
         myBlog(curca,curPageNum,pageSize);
        lastpageNum=curPageNum;
    }
    page1.style.display="flex"
    page2.style.display="flex"
    page3.style.display="flex"
    page4.style.display="flex"
    page5.style.display="flex"
    page6.style.display="flex"
    page7.style.display="flex"
    rightEllipsis.style.display="flex";
    leftEllipsis.style.display= "flex";
    page2.innerHTML=curPageNum-2;
    page3.innerHTML=curPageNum-1;
    page4.innerHTML=curPageNum;
    page5.innerHTML=curPageNum+1;
    page6.innerHTML=curPageNum+2;
    page4.style.background=selectColor;
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

    if(totalPage-curPageNum>=4){
        page4.style.background=selectColor;
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

function pageBrowse(curPage){

    if(totalPage>5){
        pageLot(curPage.innerHTML);
    }
    else{
        pageLess(curPage)
    }
    /**
     * 假如选择的页数大于5，那么就左边显示省略号，并且隐藏左边第二个页面
     * 
     */
}
function toPage(){
    var page= document.querySelector("#pageValue");
   if( !isNaN(parseInt(page.value)) && isFinite(page.value)){
    if(parseInt( page.value)>totalPage)
   page.value=totalPage;
   if(parseInt( page.value)<1)
   page.value=1;

    if(totalPage>5){
        pageLot(page.value);
    }

    else{
        var temp=document.querySelector("#page"+ page.value)
        pageLess(temp);
    }
    page.value="";
   }else{
    page.value="";
    return;
   }
}
function toLastPage(){
    if(totalPage>5){
        if(lastpageNum>1){
            myBlog(curca,lastpageNum-1,pageSize);
        }
        else
        return;
    }
    else{
        if(parseInt( lastpage.innerHTML)>1){
         var temp=   parseInt(lastpage.innerHTML)-1
            pageLess(document.querySelector("#page"+temp))
        }
        else{
            return;
        }
    }
}
function toNextPage(){

    if(totalPage>5){
        if(lastpageNum<totalPage){
            pageLot(lastpageNum+1);
        }

        else
        return;
    }
    else{
        if(parseInt( lastpage.innerHTML)<totalPage){
         var temp=   parseInt(lastpage.innerHTML)+1
            pageLess(document.querySelector("#page"+temp))
        }
        else{
            return;
        }
    }
}
const body=document.querySelector('body');
const sidebar=body.querySelector('nav');
const popup = document.querySelector(".popup")
field = popup.querySelector(".field")
function letDivCenter(divName){   
    var top = ($(window).height() - $(divName).height())/2;   
    var left = ($(window).width() - $(divName).width())/2;   
    var scrollTop = $(document).scrollTop();   
    var scrollLeft = $(document).scrollLeft();   
    $(divName).css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft } ).show();  
}  
function closeToast() {
        popup.classList .remove("show");
        jQuery('.shadow').hide();
    }
function showDeleteToast(){
  popup.classList .toggle("show");
  letDivCenter('.popup.show')
  addshadow();
}
function addshadow(){
    $(".shadow").css({'display':'block'});
    $('.addBox').show();
}
const modeText=document.querySelector('.mode-text')
function toggleswitch(){
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
function changeCa(ca){
    flag = true;
    curca=ca;
myBlog(ca,initPageNum,pageSize);

}
function pagerInit(){
    if(lastpage!=""){
        lastpage.style.background=""
    }
    if(lastpageNum!=0){
        page4.style.background=""
    }
    lastpageNum=1;
    page1.style.background=selectColor;
    if(totalPage==0){
        pager.style.display="none";
       }else{
        if(totalPage<5){
    lastpage=page1;
            page2.style.background="";
            page3.style.background="";
            page4.style.background="";
            page5.style.background="";
            page6.style.background="";
            page7.style.background="";
            page1.style.display="none"
            page2.style.display="none"
            page3.style.display="none"
            page4.style.display="none"
            page5.style.display="none"
            page6.style.display="none"
            page7.style.display="none"
            rightEllipsis.style.display="none";
            leftEllipsis.style.display= "none";
            switch(totalPage){
                case 1:
                    page1.style.display="flex"
                    break;
                case 2:
                    page1.style.display="flex"
                    page2.style.display="flex"
                    break;
                case 3:
                    page1.style.display="flex"
                    page2.style.display="flex"
                    page3.style.display="flex"
                    break;
                case 4:
                    page1.style.display="flex"
                    page2.style.display="flex"
                    page3.style.display="flex"
                    page4.style.display="flex"
                    break;
                case 5:
                    page1.style.display="flex"
                    page2.style.display="flex"
                    page3.style.display="flex"
                    page4.style.display="flex"
                    page5.style.display="flex"
                    break;
            }
 
        }


       }
}
function myBlog(ca,pageNum,pageSize){
    $.ajax({
        url:myBlogUrl,
        type:"GET",
        data:{
            userid:store.get("userinfo").id,
            ca:ca,
            pageNum:pageNum,
            pageSize:pageSize
        },
        error:function(){
            alert("服务器异常，请稍后再试");

        },
        success:function(data){
            switchBlogToJson(data);
            setBlog();
            /**
             * 获取成功时获取用户的avatar，nickname,describe
             */
        }
    })
    if(flag)
    $.ajax({
        url:totalBlogUrl,
        type:"GET",
        data:{
            userid:store.get("userinfo").id,
            ca:ca
        },
        async:false,
        error:function(){
            alert("服务器异常，请稍后再试");
            flag = false;
        },
        success:function(data){
            flag = false;
            TotalBlogNum=data;
           totalPage= Math.floor((TotalBlogNum+pageSize-1)/pageSize);
           page7.innerHTML=totalPage;

           pagerInit()

            /**
             * 获取成功时获取用户的avatar，nickname,describe
             */
        }

    })
    
}

