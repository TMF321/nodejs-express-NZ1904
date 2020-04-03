$(function() {
    //获取当前的帖子id
    // var href = window.location.href;
    // var str = href.split("?")[1];
    // // 判断str是否存在
    // if(!str){
    //     alert("请注意查看是否携带有id");
    //     return;
    // }

    // var arr = str.split("&");
    // var result = {};
    // arr.forEach(item => {
    //     var tmp = item.split("=");
    //     result[tmp[0]] = tmp[1];
    // })

    // console.log(result.id);
    let hrefId = getHerfId(window.location.href);

    //直接发送ajax请求获取详情数据
    var url = `/posts/${hrefId}`;
    $.get(url ,function(res) {
        if(res.code === 0) {
            var data = res.data;
            var html = `
            <h1 class="mb-5 font-weight-light">${data.title}</h1>
            <div class="py-4">${data.content}</div>
            <div class="mt-2 text-black-50">
            <small>${data.userId.nickname}</small>
            </div>
            <div class="border-top py-4 mt-4">
              <ul class="nav justify-content-end">
                <li class="nav-item">
                  <a href="./edit.html?id=${hrefId}" class="nav-link btn btn-link">Edit</a>
                </li>
                <li class="nav-item">
                  <a id="delete-post" href="javascript:;" class="nav-link btn btn-link">Delete</a>
                </li>
              </ul>
            </div>
            `;
            $(".container").html(html);
        }
    })


    //删除功能
    $(".container").on("click", "#delete-post", function(){
      // 判断是否有登陆
      if(!isLogined()){
        // 没有登录
        alert("请登录");
        window.location.href = "/login.html";
        return;
      }

      // 二次确认是否删除呢
      if(!confirm("你确认要删除么？")){
        //点击取消，那就删除
        return;
      }

      let url = `/posts/${hrefId}`;
      $.ajax({
        url,
        type: "delete",
        headers: {
          Authorization: Cookies.get("token")
        },
        success:function(res) {
          if(res.code == 0) {
            alert("删除成功");
            window.location.href = "./index.html";
          }else{
            console.log(res);
          }
        }
      })
    })
})