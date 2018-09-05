$(function(){
    var letao = new Letao();
    // 调用 添加历史记录的方法
    letao.addHistory();
    // 调用 获取历史记录 
    letao.getHistory();
    // 调用清空历史记录 方法
    letao.emptyHistory();
    // 调用 删除图标 删除数据方法
    letao.removeHistory();
})
var Letao = function(){

}
 Letao.prototype = {
    //  添加历史记录的方法
    addHistory:function(){
        // 1.给按钮添加事件
        var that = this;
        $(".btn-search").on("tap",function(){
            // 2. 获取搜索框的内容
            var search = $(".input-search").val();
            // console.log(search);
            // 清空输入框的数据
             $(".input-search").val("");
           // 3.添加内容到本地存储
            // 3.1  存储必须要有健
            // localStorage.setItem("name","张三");
            if(!search.trim()){
                alert("请输入搜索内容") ;
                return;
            }
            var searchObj={
                id:1,
                search:search
            }
         
            // 3.2  只能存 字符串
            var historyList = JSON.parse(localStorage.getItem("history"))||[];
      
            if(historyList.length>0){
                searchObj.id = historyList[historyList.length-1].id +1;
            }

         
             historyList.push(searchObj);
             localStorage.setItem("history",JSON.stringify(historyList));
            //  console.log(historyList);
           that.getHistory();
        })
    },
    // 获取 历史记录 数据
    getHistory:function(){
        var data = JSON.parse(localStorage.getItem("history"))||[];
        // console.log(data);
     
        // 翻转数组 使得最新的数据显示在上面
            data = data.reverse();
        

        var html = template("historyTmp",{historyList:data});
        // console.log(html);
        $(".search-history .content ul").html(html);
        
    },

    // 清空记录 
    emptyHistory:function(){
        // 给 a 标签添加点击事件
        var that = this ;
        $(".title .empty").on("tap",function(){
            // console.log(1);
            
            localStorage.removeItem("history");
            that.getHistory();
        })

    },

    // 点击  删除图标 删除 记录
     removeHistory:function(){
         var that = this ;
        //   给图标按钮添加点击事件  动态添加  所有用事件委托
        $(".search-history .content ul").on("tap","li .remove",function(){
            var id = $(this).data("id");
            // console.log(id);
            var historyList = JSON.parse(localStorage.getItem("history")) || [];
            // console.log(historyList);
            
            
            // 遍历 所有记录
            for(var i=0;i<historyList.length;i++){

                if(historyList[i].id == id){
                    historyList.splice(i,1);
                }
            }
            // 拿出来删除后  在保存到 本地储存中
            // console.log(historyList);
            historyList = JSON.stringify(historyList)
          localStorage.setItem("history",historyList);

            that.getHistory();

        })
     }





}