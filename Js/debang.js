;$(function() {
	/*搜索框聚焦失焦*/
	$(".keyword")
		.focus(function () {
    		$(this).val() === this.defaultValue ? $(this).val ('') : '';
		})
		.blur(function () {
	    	$(this).val() === '' ? $(this).val (this.defaultValue) : '';
		});

	/*城市选择框显示隐藏*/
	$(".city-box")
		.mouseover(function () {
			$(".city-wrap").show();
			$('.ct-active').trigger('mouseover');
		})
		.mouseout(function () {
			$(".city-wrap").hide();		
		});
	$(".city-wrap")
		.mouseover(function () {
			$(".city-wrap").show();
		})
		.mouseout(function () {
			$(".city-wrap").hide();		
		});
	
	/*城市选择框切换字母*/
	$('.city-title').on('mouseover','li',function(e){
		$(this).addClass('ct-active').siblings().removeClass('ct-active');
		var cname = $(this).html();
		getAjax('./Data/city.txt','','get',function(data){
			var liC = ''; 
			for (var i in data[cname]) {
				liC+='<li>'+ data[cname][i] +'</li>';
			}
			$('.city-message li').remove();
			$('.city-message').append($(liC));
		});
	});

	/*城市选择框点击切换城市*/
	$('.city-message').on('click','li',function(e){
		var iname = $(this).html();
		$('.city').val(iname);
	})

	//职位类型点击
	$('.job-type').on('click','li',function(e){
		$(this).addClass('job-active').siblings().removeClass('job-active');
		var type = $(this).attr('id'),
		    data = {"p": 1, "type": type};
		getAjax('./Data/data.php', data, 'post', assignPage);		
	});

	getAjax('./Data/data.php', {"p": '1', "type": 'worker'}, 'post', assignPage);
	//分页点击发送数据
	$('.page-show').on('click','a',function(e){
		var page = $(this).attr('href'),
			num = page.split("#")[1],
		    type = $('.job-active').attr('id'),
		    data = {"p": num, "type": type};
		getAjax('./Data/data.php', data, 'post', assignPage);
	});

	/*分页数据回调*/
	function assignPage(data){
		if(data){
			var current = data['currentp'],
				total = data['totalp'],
			    arr = data['data'],
				len = arr.length;
			Page($('.page-show').get(0),total,current);
			$('.list-item ul').remove();
			for (var i=0; i<len; i++) {
				var ul = $('<ul>');
				var num = arr[i].length;
				for (var j=0; j<num; j++) {
					if (j===0) {
						ul.append($('<li><a href="#">'+ arr[i][j] +'</a></li>'));
					}else{
						ul.append($('<li>'+ arr[i][j] +'</li>'));

					}
				}
				ul.children('li:eq(0)').addClass('lt-na');
				ul.children('li:eq(1)').addClass('lt-po');
				ul.children('li:eq(2)').addClass('lt-mo');
				ul.children('li:eq(3)').addClass('lt-ex');
				ul.children('li:eq(4)').addClass('lt-re');
				ul.children('li:eq(5)').addClass('lt-ti');
				$('.list-item').append(ul);
			}			
		}
	}

	/*ajax异步传输数据*/
	function getAjax (url, data, type, callback) {
		var aj = $.ajax({
			url: url,
			data: data,
			type: type,
			dataType: 'json',
			success: function (data) {
				callback(data);
			}
		});		
	}
}());