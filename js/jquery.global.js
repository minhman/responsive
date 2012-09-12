jQuery(document).ready(function($) {
	
	// Create dropdown menu
	var menu = $("nav ul li");
	menu.toggle(function(){
		$(this).find('.subMenu').show("fast");
	},function(){
		$(this).find('.subMenu').hide("fast");
	})

	//
	today = new Date();
	var node = new Array();

	node[6] = new Date(today.getFullYear(),9,1);
	node[5] = new Date(today.getFullYear(),10,15);
	node[4] = new Date(today.getFullYear(),10,25);
	node[3] = new Date(today.getFullYear(),11,1);
	node[2] = new Date(today.getFullYear(),11,15);
	node[1] = new Date(today.getFullYear(),11,20);
	node[0] = new Date(today.getFullYear(), 11, 30);
	var oneDay=1000*60*60*24;
	var totalDay = (node[6].getTime()-node[0].getTime())/(oneDay);
	
	// console.log(totalDay);
	
	// function tinh so ngay va khoang cach ngay
	function fixDate(){
		var scWidth = $(window).width();
		//Kiem tra so luong node
		var wrapDate = $(".wrapDate");
		var numNode = wrapDate.children().length;
		var pxPerDay = scWidth/-totalDay;
		// console.log(scWidth);
		// tạo vòng lập cho node va them css margin-left
		var lostDay = 100;
		for (i = 0; i < numNode-1; i++) {
			// console.log(node[i]);

			var spaceDay = -(node[6].getTime()-node[i].getTime())/(oneDay);
			// console.log(spaceDay)
			var itemWidth = wrapDate.find(".node_"+i).width();
			var dayTpx = spaceDay*pxPerDay;
			// console.log(spaceDay,pxPerDay,dayTpx);
			if (i==6) {
				var item = wrapDate.find(".node_"+i).css('left', dayTpx);
			}else{
				var item = wrapDate.find(".node_"+i).css('left', dayTpx - itemWidth/1.5);
				// console.log(item);
			}
			var todayCom = today.getDate()+"_"+today.getMonth();
			var todayFix = node[i].getDate()+"_"+today.getMonth();
			if (todayCom == todayFix) {
				wrapDate.find(".nodeDate").removeClass('activeDate');
				wrapDate.find(".node_"+i).addClass('activeDate');
			};
			// console.log(Math.ceil(pxPerDay*i*spaceDay),spaceDay);
		};
		if (today < node[6]) {
			var widthRun = 0;	
		}else{
			var widthRun = (today.getTime()-node[6].getTime())/(oneDay)*pxPerDay-50;	
		};
		
		// console.log(widthRun,pxPerDay);
		$(".finLine").css('width', widthRun);
	}
	fixDate()
	// console.log(node_5,node_4,node_3,node_2,node_1,pxPerDay)
	// Change menu style
	function menuChange(){
    	if ($(window).width() <= 960){
    		$("#top-menu").find('ul').hide();
    		$("#top-menu").find('select').show();
    	}else{
    		$("#top-menu").find('ul').show();
    		$("#top-menu").find('select').hide();
    	};
	}

	// Fix Node change
	function fixNode(){
		if ($(window).width() <= 960) {
			$(".dateNote").find("span").css('display', 'none');
			$(".dateNote").find("strong").css('display', 'block');
			$(".dateNote").css({
				width:10,
				display:"block"
			});
		}else{
			$(".dateNote").find("span").css('display', 'block');
			$(".dateNote").find("strong").css('display', 'none');
			$(".dateNote").css({
				width:50,
				display:"block"
			});
		};
	}

	function fixMenu(){
		if ($(window).width() < 720) {
			$("#top-menu").css('margin-top', 20)	
		}else{
			$("#top-menu").css('margin-top', 145)	
		};
		
	}

	function fitTexts(){
		$(".fitHead").fitText(1.2, { 
			minFontSize: '35px', maxFontSize: '80px' 
		});
		$(".fitPara").fitText(1.2, { 
			minFontSize: '15px', maxFontSize: '25px' 
		});
	}
	// Run function
	menuChange();
	fixNode();
	fitTexts();
	fixMenu()
	// 
	$(function () {
        var plugin = new $.jQueryAdaptive960(window, { 
            onResize: function () {
            	menuChange();
            	fixNode();
            	fixDate();
            	fitTexts();
            	fixMenu();
            }, 
            onRotate: function () {
            	
            }
        })
    });


// 
	(function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=260852200596196";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
// 
	$('#fGal').jflickrfeed({
		limit: 12,
		qstrings: {
			id: '25137179@N05'
		},
		itemTemplate: 
			'<a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a>'
	});
});
