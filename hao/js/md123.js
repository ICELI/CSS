// 20130427 Iceli 迈点导航
(function($){
$(function(){
	//获取本地存储换肤
	var strStoreDate = window.localStorage? localStorage.getItem("skinColor"):$.cookie("skinColor");
	if(strStoreDate != null){
		$("body").attr("class","skin_color_"+strStoreDate);
		}
	
	$("a,input:button").each(function() {
        $(this).attr("hidefocus","true");
    });
	//登录弹出框	
	$(".login_link").click(function(){
		var popup_left = $(this).offset().left; 
		$(".login_popup").show().css({"left":popup_left});
		});
	//取消登录
	$(".cancel_btn").click(function(){
		$(".login_popup").animate({"opacity":0},500,function(){
			$(this).css({"opacity":"1"}).hide();
			});
		}); 
	//email输入框提示
	$("label.ew_tip").css("display","inline");
	$(".input_account,.input_password").focus(function(){
		$(this).siblings("label.ew_tip").hide();
		}).blur(function(){
			if($(this).val()==''||$(this).val()==' '){
				$(this).val('');
				$(this).siblings("label.ew_tip").show();
				}
			});
	//选择邮箱		
	$(".select_mailtype").click(function(e){
		if($(".mail_list").css("display")=="block"){
			$(".mail_list").hide();
			} else{
				$(".mail_list").show().css({"top":$(this).offset().top+$(this).height(),"left":$(this).offset().left});
				}
		e.stopPropagation();		
		});	
	$(".mail_list li").hover(function(){
		$(this).addClass("option_hover").siblings().removeClass("option_hover");
	});
	$(".mail_list li").click(function(){
		$(".mail_list").attr("selectindex",$(this).attr("dn"));
		if(!$(this).attr("dn").length == 0)
		$(".select_mailtype").html($(this).html());
		});
	//关闭邮箱列表	
	document.onclick = function(){
		$(".mail_list").hide();
	};
	
	//搜索切换搜索引擎
	$("#eng_logo").on("click",function(){
		$(".eng_list").toggle();
		});
	$(".eng_list a").on("click",function(){
		var engName = $(this).attr("class");
		$("#eng_logo").attr("class",engName);
		$("."+engName+"_tab").show().siblings().hide();
		$(".eng_list").hide();
		$(".search_form").attr("action",$(this).attr("href"));
		if($(this).hasClass("baidu")){
			$(".baidu_tab li").eq(1).addClass("on").siblings().removeClass("on");
			}else if($(this).hasClass("meadin")){
				$(".meadin_tab li").eq(0).addClass("on").siblings().removeClass("on");
				}	
		return false;
		});
	//tab切换搜索	
	$(".search_hd a").on("click",function(){
		var formAction = $(this).attr("href");
		var form = $(".search_form");
		$(this).parent("li").addClass("on").siblings().removeClass("on");
		form.attr("action",formAction);
		if($(this).hasClass("mdbk")){
			form.attr('accept-charset', 'GBK');
			form.attr('target', '_blank');
			$(".search_input").attr("name","word");
			}else{
				form.attr('accept-charset', '');
				form.attr('target', '');
				$(".search_input").attr("name","q");
				}
		return false;
		});	
	//.search_hd li
	$(".baidu_tab li:last").css("width",63);	
	//下一组
	$(".next_btn").on("click",function(){
		var $wl = $(this).siblings(".saw_inner").children(".weibo_list");
		var wlLeft = $(".saw_inner").width();
		var liNum = $wl.children("li").length;
		var liWith = parseInt(liNum*$(".saw_inner ul li").width());
		var ulLeft = parseInt($wl.css("margin-left"))-parseInt(wlLeft);
		if(-ulLeft < liWith){
			$wl.stop(true,false).animate({"margin-left":"-="+wlLeft},1000);
			}else{
				$wl.stop(true,false).animate({"margin-left":0},1000);
				}		
		});
	$(".next_btn2").on("click",function(){
		var $qici = $(this).siblings(".qi_con").children(".qi_con_inner");
		var qiciLeft = $(".qi_con").width();
		$qici.stop(true,false).animate({"margin-left":-qiciLeft},1000,function(){
			$qici.children(".qrcode_inner_list:first").appendTo($qici);
			$qici.css("margin-left",0);
			});
		});	
	//二维码导航
	$(".qrcode_tab_nav li").eq(0).addClass("current");
	$(".qrcode_tab_bd .qrcode_inner").eq(0).show();
	$(".qrcode_tab_nav li").on("click",function(){
		var tIndex = $(this).index();
		var tLeft = tIndex*235;
		$(this).addClass("current").siblings().removeClass("current");
		$(".tab_bg").animate({"left":tLeft},200);
		$(".qrcode_tab_bd .qrcode_inner").eq(tIndex).show().siblings().hide(); 
		});
	//酷站地址
	$(".groups:last").addClass("last");
	$(".groups>li").hover(function(){
		$(".groups>li").removeClass("lihover");
		$(this).addClass("lihover");
		},function(){
			$(".groups>li").removeClass("lihover");
			});	
	//sc_inner
	$(".sc_inner").hover(function(){
		$(this).addClass("sc_bg").siblings().removeClass("sc_bg");
		},function(){
			$(this).removeClass("sc_bg");
			});
	//top hover
	$(".weixin_topnav li").hover(function(){
		$(this).stop(true,true).animate({"height":89},500).siblings("li").stop(true,true).animate({"height":24},500);;
		});			
	//tab关于我们
	$(".acs_inner li").on("click",function(){
		var acsIndex = $(this).index();
		$(this).children("a").addClass("current");
		$(this).siblings().children("a").removeClass("current");
		$(".ac_main").eq(acsIndex).show().siblings(".ac_main").hide();	
		});	
	checkHref();
	//申请链接
	$(".sbBtn").on("click",function(){
		var sp_left = $("#layout").offset().left+235;
		var sp_top = ($(window).height()-140)/2+$(window).scrollTop();
		$(".ad_text,.ad_textarea").each(function() {
          var thisVal = $(this).val();
		  if(thisVal == ''||thisVal == ' '){
			  thisVal == '';
			  $(this).siblings(".error").show();
			  }else{
				  $(this).siblings(".error").hide();
				  }
		 if($(".http_text").val() == $(".http_text").attr("data-default")||$(".http_text").val() == ""){
		 	$(".http_text").siblings(".error").show();
		  }else{
			  $(".http_text").siblings(".error").hide();
			  }		  
        });
		if($(".error:visible").length>0){
			return false;
			}else{			
				$(".success_popup").css({"left":sp_left,"top":sp_top}).show();
				}	
		});	
	$(".ad_text,.ad_textarea").blur(function(){
		var thisVal = $(this).val();
		if(thisVal == ''||thisVal == ' '){
		  thisVal == '';
		  $(this).siblings(".error").show();
		  }else{
			  $(this).siblings(".error").hide();
			  }
		if($(".http_text").val() == $(".http_text").attr("data-default")||$(".http_text").val() == ""){
		 $(".http_text").siblings(".error").show();
		  }else{
			  $(".http_text").siblings(".error").hide();
			  }	  
		});
	$(".close_btn").on("click",function(){
		$(".success_popup").hide();
		});	
	//app hover效果
	$(".aci_list li").hover(function(){
		$(this).addClass("aci_lihover").siblings().removeClass("aci_lihover");
		},function(){
			$(this).removeClass("aci_lihover");
			});	
				
});
	//返回顶部
	$(function(){var a=$("<a class='gotop' style='display:none'><span>\u56de\u9876\u90e8</span></a>"),b=!1,c=$(window),d=navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/6./i)=="6.";window.onscroll=function(){200<c.scrollTop()?(d&&(a.css({top:document.documentElement.scrollTop+document.documentElement.clientHeight-273}),a.hover(function(){a.find("span").css({"background-color":"#e5e5e8",color:"#f30"})},function(){a.find("span").css({"background-color":"#EDEDF0",color:"#498949"})})),b||($("body").append(a),b=!0),a.fadeIn()):a.fadeOut()};
a.click(function(){c.scrollTop(0);a.hide()})});
})(jQuery);

function addFavorite() {
	var url = window.location.href;
	var title = document.getElementsByTagName('title')[0].innerHTML;
	try {
		window.external.addFavorite(url,title);
	} catch (e){
		try {
			window.sidebar.addPanel(title,url,'');
        	} catch (e) {
			alert("请按 Ctrl+D 键添加到收藏夹");
		}
	}
}

function setHomepage(sURL) {
	if(navigator.appName == "Microsoft Internet Explorer"){
		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage(sURL);
	} else {
		alert("非 IE 浏览器请手动将本站设为首页");
	}
}

//换肤
function changeSkin(obj){
	$("body").attr("class","skin_color_"+obj);
	//存储，IE6~7 cookie 其他浏览器HTML5本地存储localStorage
	if (window.localStorage) {
		localStorage.setItem("skinColor", obj);	
	} else {
		$.cookie("skinColor", obj);	
	}
}

//根据地址切换到页面
function checkHref(){
	var str = window.location.href; 
	var pos = str.indexOf("#"); 
	if(pos!=-1){ 
	parastr = str.substring(pos+1); //参数集：此处仅有一个 
	$(".acs_inner li").eq(parastr).children("a").addClass("current");
	$(".acs_inner li").eq(parastr).siblings().children("a").removeClass("current");
	$(".ac_main").eq(parastr).show().siblings(".ac_main").hide();
	}
}
