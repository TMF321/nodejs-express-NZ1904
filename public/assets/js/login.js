$(function(){
    $("#login-btn").click(function(){
        $.ajax({
            url:"/login",
            type: "POST",
            data: {
                email:$("#inputEmail").val(),
                password: $("#inputPassword").val()
            },
            success: function(res){
                if(res.code !== 0){
                    //弹出错误信息
                    alert(res.msg);
                    return;
                }


                //登录成功
                //1.将token信息写入到cookie中
                //跳转到首页帖子列表页
                Cookies.set("token", res.token);


                window.location.href = "/post/index.html";
            }
        })
    })
})