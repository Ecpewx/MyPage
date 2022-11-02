
var url="http://localhost:8080/coderhome";
/**
 * 
 * // const app = new Vue({
//     el:'#app',
//     data:{
//         msg:'hello Vue!',
//         count:-1,
//     }
// });
这样的方法可以保证使用{{变量名}}的风格
但是在页面跳转之后会刷新页面，也会重新编译js文件，于是原来的保存的值就回到了初始值的状态

为了解决这个问题，引入了store.js，采用键值对的方式，将静态变量保留在本地，该静态变量不会随着页面的重编译而改变
 */

/**
 * 封装的获取路由跳转的接收参数的方法
 * 调用规则为：
 * var a = GetRequest();
 * console.log(a['id'])
 * @returns 
 */
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
} 
