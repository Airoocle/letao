$(function(){
    var letao = new Letao();
    letao.initScroll();
    letao. getCategory();
   
   letao.getBrandData(1);
    letao.getBrand();

})
 
var Letao = function(){

}
Letao.prototype={
      // 初始化 区域滑动
      initScroll:function(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
       // 获取 左侧 品牌分类
       getCategory:function(){
        $.ajax({
            url:"/category/queryTopCategory",
            success:function(data){
                // console.log(data);
                var html = template("categoryTmp",data);
                // console.log(html);
                $(".category-left ul").html(html);
                
            }
        })
    },


    // 点击左侧分类  获取分类的品牌数据
    getBrand:function(){
        var that = this ;
        // 1. 给左侧分类添加点击事件  由于左侧分类是动态添加  所以用委托
        $(".category-left ul").on("tap","li",function(){
            // 2. 获取当前点击的左侧分类的分类ID
            var id = $(this).data("id");
            // 3. 根据这个区请求右侧品牌的数据
            // console.log(id);
            that.getBrandData(id);
            // console.log($(this).children());
            // var idx = $(this).index();
            // console.log(idx);
            $(this).children("a").addClass("active").parent("li").siblings().children("a").removeClass("active");
            // $(".category-left ul li").eq(idx).children("a").addClass("active");

        })
 
    },
    // 获取右侧品牌数据
    getBrandData:function(id){

        $.ajax({
            url:"/category/querySecondCategory",
            data:{id:id},
            success:function(data){
                // console.log(data);
                var html = template("brandTmp",data);
                // console.log(html);
                $(".category-right .mui-row").html(html);
                
            }
        })

    },




}