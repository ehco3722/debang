var Page = function (wrap,total,current) {
    var total = Number(total) || 100;    // 总页数
    var visible = Number(visible) || 5;    // 显示页数
    var current = Number(current) || 1;    // 当前页 
    wrap.innerHTML = createPage(current, visible, total);

    function createPage (current, visible, total) {
        var halfVisible = visible/2;
        var halfVisible_ceil = Math.ceil(halfVisible);

        //上一页
        var up_row = current - 1;
        var up_page = (up_row > 0) ? '<li><a class="prev" href="#' + up_row + '">' + '上一页' + '</a></li>' : '';

        //下一页
        var down_row  = current + 1;
        var down_page = (down_row <= total) ? '<li><a class="next" href="#' + down_row + '">' + '下一页' + '</a></li>' : '';

        //第一页
        var the_first = '';
        // if(total > visible && (current - halfVisible) >= 1){
        //     the_first = '<li><a class="first" href="#1">' + '首页' + '</a></li>';
        // }

        //最后一页
        var the_end = '';
        // if(total > visible && (current + halfVisible) < total){
        //     the_end = '<li><a class="end" href="#' + total + '"">' + '末页' + '</a></li>';
        // }    

        //数字连接
        var link_page = "";
        var page;
        for(var i = 1; i <= visible; i++){
            if((current - halfVisible) <= 0 ){
                page = i;
            }else if((current + halfVisible - 1) >= total){
                page = total - visible + i;
            }else{
                page = current - halfVisible_ceil + i;
            }
            if(page > 0 && page != current){
                if(page <= total){
                    link_page += '<li><a class="num" href="#' + page + '">' + page + '</a></li>';
                }else{
                    break;
                }
            }else{
                if(page > 0 && total != 1){
                    link_page += '<li><a class="current" href="#' + page + '">' + page + '</a></li>';
                }
            }
        }

        //返回拼接内容
        var page_str = the_first + up_page + link_page + down_page + the_end;
        return "<ul class='pagination'>"+ page_str +"</ul>";
    }
};