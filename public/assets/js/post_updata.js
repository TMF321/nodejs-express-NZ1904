$(function(){
    //需要登录
    needLogin();

    //获取id
    let herfId = getHerfId(window.location.href);

    // 这段代码之前的用处是用来回填数据的
    // 这个思想是正确的，但是不应该使用  更新帖子 这个api接口
    // 而应该使用查询帖子详情这个 api 接口

    // $.ajax({
    //     url:`http://localhost:7778/posts/${herfId}`,
    //     type: "put",
    //     success:function(res) {
    //         // console.log(res)
    //     $("#form-title").prop("value", res.data.title);
    //     $("#form-content").val(res.data.content);
    //     }
    // })

     $.ajax({
        url:`/posts/${herfId}`,
        type: "get",
        success:function(res) {
            // console.log(res)
             // $("#form-title").prop("value", res.data.title);
        $("#form-title").val(res.data.title);
        $("#form-content").val(res.data.content);
        }
    })

    $("#update-post").click(() => {
        $.ajax({
            url:`/posts/${herfId}`,
            type: "put",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify({
                title:$("#form-title").prop("value"),
                content:$("#form-content").val()
            }),
            headers: {
            Authorization: Cookies.get("token")
            },
            success:function(res){
                // console.log(res)
            if(res.code === 0) {
                alert("更新成功")
                window.location.href = "./index.html";
            }else{
                console.log(res);
              }
            }
        })
    })
})