window.onpageshow=function(){
    var avatar = document.querySelector(".toolbar-avatar");
    avatar.src = store.get("userinfo").portiImage;
}
function btnBaGrColOver(e){
    e.style.backgroundColor="#2196F3";
}
function btnBarGrColorOut(e){
    e.style.backgroundColor="#00AEE8";
}
function btnBorderOver(e){
    e.style.borderColor="#000"
    e.style.color="#000"
}
function btnBorderOut(e){
    e.style.borderColor="#999aaa";
    e.style.color="#999aaa"
}
