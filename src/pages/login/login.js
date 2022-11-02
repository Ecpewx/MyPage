// var theurl = url;
// var loginurl = theurl+"/login_account";
store.set('user_acid', -1)
// var v=new Vue({
//     data(){
//         return{
//             count:1
//         }

//     }
// })
console.log(app._data.count)
app._data.count=10;
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
/**
 * 返回false没有找到对应的
 */
function username_check(UClassName){
    var username = $("."+UClassName).val();
    var checkNameUrl = url+"/username_check";
    var value;
    $.ajax({
        url:checkNameUrl,
        type:"GET",
        data:{
            username:username,
        },
        async:false,
        error:function(){
            alert("服务器异常，请稍后再试");
        },
        success:function(data){
            value= data;
        }
    })
    return value;

}
//光标失去交点的提示，用来验证用户名密码，以及确认密码时有没有错误
judgeUsername=()=>{
    var username = $("#regusername").val();
    var usernameError = document.querySelector("#UformatError");
    // /^[\u4E00-\u9FA5a-zA-Z0-9_@.]{8,30}$/
    //正则表达式，包含特殊字符
    var msg = "";
    if (!username.match( /^[A-Za-z\d][\w]{5,20}$/)&&!username.match(/^[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}$/)) {
    usernameError.style.display = "block";
    msg = "字母数字下划线(非开头)6-20位或邮箱";
    usernameError.innerHTML=msg;
    usernameLegal = false;
    }
    else {
        var result =  username_check("username1");
        if(result==false){
            msg="用户名重复，请重新输入";
                    usernameError.style.display = "block";
                    usernameError.innerHTML=msg;
                    usernameLegal = false;
        }
        else if(result==true){
            usernameError.style.display = "none";
            usernameLegal = true;
        }
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
    if(currentState=="show"){
        eyes.setAttribute("src","./login_icons/hide.png");
        input.type="text";
    }else{
        eyes.setAttribute("src","./login_icons/show.png");
        input.type="password";
    }

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
var registerurl = url+"/register_web";
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
                       alert("请求失败");
                   },
                   success: function(data){
                    //注册成功后应该出现一个提示框啥的
                    //待定
                   }
               })
    }else{
        alert("注册失败，请检查输入内容");
    }
}
//登录ajax
login=()=>{

    var loginurl = url+"/login_web";
    var username =$("#logUser").val();
    var usernameError= document.querySelector(".inputNameError");
    var  pasMsg = document.querySelector(".inputPasError");
    var password=$("#logPas").val();
    var code=-2;
    if(username==""){
        usernameError.innerHTML="请输入用户名"
    }else{
        if(password!=""){
            $.ajax({
                url:loginurl,
                type:"POST",
                async:false,
                data:{
                    username:username,
                    password:password
                },
                    error:function(){
                    alert("请求失败");
                },
                    success: function(data){
                        store.set('user_acid', data.userAccount.id)
                        code = data.code;
                }
            })
            if(code==0){
                pasMsg.style.display="none";
                usernameError.style.display="none"
                //跳转到个人页面
                /**
                 *  this.$router.push({
                    name:"personalHomePage.html",
                    params:{
                        id:this.idW
                    }
                })
                以上是vue的跳转路由，本项目没使用
                 */
                window.location.replace('../personalHomePage/personalHomePage.html');
            }else if( code ==-1){
                pasMsg.style.display = "block";
                pasMsg.innerHTML="密码错误，请检查后输入"
                usernameError.style.display="none"
            }else{
                usernameError.style.display = "block";
                usernameError.innerHTML="用户不存在"
                pasMsg.style.display="none";
            }
        }else{
            pasMsg.innerHTML="请输入密码"
        }
    }
    /**
     * 返回值为true时证明数据库没有数据
     */


}
