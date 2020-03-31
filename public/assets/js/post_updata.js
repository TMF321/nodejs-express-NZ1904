$(function(){
    //需要登录
    needLogin();

    //获取id
    let herfId = getHerfId(window.location.href);

    $.ajax({
        url:`http://localhost:7778/posts/${herfId}`,
        type: "put",
        success:function(res) {
            // console.log(res)
        $("#form-title").prop("value", res.data.title);
        $("#form-content").val(res.data.content);
        }
    })

    $("#update-post").click(() => {
        $.ajax({
            url:`http://localhost:7778/posts/${herfId}`,
            type: "put",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify({
                title:$("#form-title").prop("value"),
                content:$("#form-content").val()
            }),
            success:function(res){
                // console.log(res)
            if(res.code === 0) {
                window.location.href = "./index.html";
            }else{
                console.log(res);
              }
            }
        })
    })
})