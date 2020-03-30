$(function() {
    //获取当前的帖子id
    var href = window.location.href;
    var str = href.split("?")[1];
    // 判断str是否存在
    if(!str){
        alert("请注意查看是否携带有id");
        return;
    }

    var arr = str.split("&");
    var result = {};
    arr.forEach(item => {
        var tmp = item.split("=");
        result[tmp[0]] = tmp[1];
    })

    console.log(result.id);

    //直接发送ajax请求获取详情数据
    var url = `http://localhost:7778/posts/${result.id}`;
    $.get(url ,function(res) {
        if(res.code === 0) {
            var data = res.data;
            var html = `
            <h1 class="mb-5 font-weight-light">${data.title}</h1>
            <div class="py-4">${data.content}</div>
            <div class="border-top py-4 mt-4">
              <ul class="nav justify-content-end">
                <li class="nav-item">
                  <a href="./edit.html" class="nav-link btn btn-link">Edit</a>
                </li>
                <li class="nav-item">
                  <a href="javascript:;" class="nav-link btn btn-link">Delete</a>
                </li>
              </ul>
            </div>
            `;
            $(".container").html(html);
        }
    })
})