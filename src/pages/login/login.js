// var theurl = url;
// var loginurl = theurl+"/login_account";

var flag=true;
var usernameLegal=false;
var passwordLegal =false;
var repasequal = false; 
// let url="http://localhost:8080/coderhome";
//进行登录和注册框的切换
const mySwitch=()=>{
   if(flag){
       // 获取到滑动盒子的dom元素并修改它移动的位置
       $(".pre-box").css("transform","translateX(100%)")
       // 获取到滑动盒子的dom元素并修改它的背景颜色
       $(".pre-box").css("background-color","#c9e0ed")
    //    //修改图片的路径
    //    $(".the_max_img").attr("src","../../image/touer.png")
       
   }
   else {
       $(".pre-box").css("transform","translateX(0%)")
       $(".pre-box").css("background-color","#C6E2FF")
    //    $(".the_max_img").attr("src","../../image/touer.png")
   }
   flag=!flag
}
34,165,241
const bubleCreate=()=>{
    // 获取body元素
    const body = document.body
    // 创建泡泡元素
    const buble = document.createElement('span')
    // 设置泡泡半径
    let r = Math.random()*5 + 25 //半径大小为25~30
    // 设置泡泡的宽高
    buble.style.width=r+'px'
    buble.style.height=r+'px'
    // 设置泡泡的随机起点
    buble.style.left=Math.random()*innerWidth+'px'
    // 为body添加buble元素
    body.append(buble)
    // 4s清除一次泡泡
    setTimeout(()=>{
        buble.remove()
    },4000)
}
// 每200ms生成一个泡泡
setInterval(() => {
    bubleCreate()
}, 200);
//设置用户忘记密码时应该跳转的页面
forgetPassword=()=>{

}
//光标失去交点的提示，用来验证用户名密码，以及确认密码时有没有错误
judegeUsername=()=>{
    var username = $("#regusername").val();
    var usernameError = document.querySelector("#UformatError");
    // /^[\u4E00-\u9FA5a-zA-Z0-9_@.]{8,30}$/
    //正则表达式，包含特殊字符
    if (!username.match( /^[A-Za-z\d][\w]{7,20}$/)&&!username.match(/^[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}$/)) {
    usernameError.style.display = "block";
    usernameLegal = false;
    }
    else {
        usernameError.style.display = "none";
        usernameLegal = true;
    }
}
//展示密码的小眼睛
showPas=(e)=>{
    //首先获取传入对象的class属性
    var eyeClassname = $(e).attr("class");
   var inputClassName= eyeClassname.substring(0,eyeClassname.length-1);
//获取对应的input的class

    var input = document.querySelector("."+inputClassName);
    //获取眼睛状态(show | hide)


var eyes=document.querySelector("."+eyeClassname);
var currentState = eyes.src.slice(-8,-4);
    // attr("src","../../image/touer.png")
    if(currentState=="show"){
        // obj.src="./login_icons/hide.png";
        // $("."+eyeClassname).attr("src","./login_icons/hide.png")
        eyes.setAttribute("src","./login_icons/hide.png");

        //.attr("src","./login_icons/hide.png")
        // 
        // setAttribute
        input.type="text";
    }else{
        // obj.src="./login_icons/show.png";
        // $("."+eyeClassname).attr("src","./login_icons/show.png")
        //.attr("src","./login_icons/show.png")
        eyes.setAttribute("src","./login_icons/show.png");

        input.type="password";
    }

// if(!isShowRegpas){
//     show.style.src="./login_icons/hide.png"
// }
}
//判断注册密码的正确性
judgePassword=()=>{
    var password = $("#regpassword").val();
    var passwordError = document.querySelector("#pFormatError");
    var rePassword = $("#repassword").val();
    var rePasswordError = document.querySelector("#RPError");
    if(!password.match(/^(?=.[a-z])(?=.*\d)[\s\S]{8,20}$/)){
        passwordError.style.display = "block";
         passwordLegal =false;
    } else{
        passwordError.style.display = "none";
        passwordLegal =true;
    }
    if(rePassword!=''&&password!=''&&password!=rePassword){
        rePasswordError.style.display="block";
        repasequal = false;
    }
    else{
        rePasswordError.style.display = "none";
        repasequal = true;
    }

}
judgeRePassword=()=>{
    var password = $("#regpassword").val();
    var rePassword = $("#repassword").val();
    var rePasswordError = document.querySelector("#RPError");
    if(password!=""&&password!=rePassword){
        rePasswordError.style.display="block";
        repasequal = false;
    }
    else{
        rePasswordError.style.display = "none";
        repasequal = true;
    }
}
//注册方法
register=()=>{
var registerurl = url+"/register_account";
    var username = $("#regusername").val();
    var password=$("#regpassword").val();
    if(usernameLegal&&passwordLegal&repasequal){
        $.ajax({
                   url:registerurl,
                   type:"POST",
                   data:{
                       username:username,
                       password:password
                   },
                   error:function(){
                       alert("网络错误");
                   },
                   success: function(data){
                       alert("注册成功");
                   }
               })
    }else{
        alert("注册失败，请检查输入内容");
    }
}
//登录ajax
login=()=>{
    userid=10;
    var loginurl = url+"/login_account";
    console.log(userid);
// var username = $(".username1").val();
// var password=$("#regpassword").val();
//     if(usernameLegal&&passwordLegal&repasequal){
//         $.ajax({
//                 url:loginurl,
//                 type:"POST",
//                 data:{
//                     username:username,

//                 },
//                 error:function(){
//                     alert("请求失败");
//                 },
//                 success: function(data){
//                     alert("请求成功");
//                 }
//         })
//     }
}
