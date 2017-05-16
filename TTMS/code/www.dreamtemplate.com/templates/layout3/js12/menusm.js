// menu smothness
// version 1.0.2

$(function(){

  // dropdown menu with 3 levels
  $('.menusm li').click(function() {
    window.location = $(this).find('a:first').attr('href');
  });
  var level=0;
  $('.menusm').find('li:first-child').addClass('ms_first');
  $('.menusm').find('li:last-child').addClass('ms_last');
  $('.menusm').find('li:first-child').children('a').addClass('ms_first');
  $('.menusm').find('li:last-child').children('a').addClass('ms_last');
  $('.menusm ul').find('li:first-child').addClass('ms_first');
  $('.menusm ul').find('li:last-child').addClass('ms_last');
  $('.menusm ul').find('li:first-child').children('a').addClass('ms_first');
  $('.menusm ul').find('li:last-child').children('a').addClass('ms_last');
  $('.menusm').children('li').addClass('ms_top');
  $('.menusm').children('li').children('a').addClass('ms_top');
  $('.menusm').children('li').children('ul').parent().addClass('ms_havesubmenu');
  $('.menusm').children('li').children('ul').parent().children('a').addClass('ms_havesubmenu');
  $('.menusm ul li').children('ul').parent().addClass('ms_havesubmenu');
  $('.menusm ul li').children('ul').parent().children('a').addClass('ms_havesubmenu');
  $('.menusm li').hover(function(){
    $(this).find('ul:first').stop(true,true).slideDown(300).show();
    $(this).addClass('ms_hover');
    $(this).children('a').addClass('ms_hover');
    level++;
  },function(){
    $(this).find('ul:first').stop(true,true).slideUp(200);
    $(this).removeClass('ms_hover');
    $(this).children('a').removeClass('ms_hover');
    level--;
  });
  
  // slidedown menu with 3 levels
  
  var level=0;
  $('.navsm').find('li:first-child').addClass('ns_first');
  $('.navsm').find('li:last-child').addClass('ns_last');
  $('.navsm').find('li:first-child').children('a').addClass('ns_first');
  $('.navsm').find('li:last-child').children('a').addClass('ns_last');
  $('.navsm ul').find('li:first-child').addClass('ns_first');
  $('.navsm ul').find('li:last-child').addClass('ns_last');
  $('.navsm ul').find('li:first-child').children('a').addClass('ns_first');
  $('.navsm ul').find('li:last-child').children('a').addClass('ns_last');
  $('.navsm').children('li').addClass('ns_top');
  $('.navsm').children('li').children('a').addClass('ns_top');
  $('.navsm').children('li').children('ul').parent().addClass('ns_havesubmenu');
  $('.navsm').children('li').children('ul').parent().children('a').addClass('ns_havesubmenu');
  $('.navsm ul li').children('ul').parent().addClass('ns_havesubmenu');
  $('.navsm ul li').children('ul').parent().children('a').addClass('ns_havesubmenu');
  $('.navsm li.ns_active').each(function(){
	$(this).find('ul:first').stop(true,true).slideDown(300).show();
	$(this).addClass('ns_active');
	$(this).children('a').addClass('ns_active');
	level++;
  });
  $('.navsm li').live('click',function(){
	if ($(this).children('ul').css('display') == 'none') {
		$(this).find('ul:first').stop(true,true).slideDown(300).show();
		$(this).addClass('ns_active');
		$(this).children('a').addClass('ns_active');
		level++;
	} else {
		$(this).find('ul:first').stop(true,true).slideUp(200);
		$(this).removeClass('ns_active');
		$(this).children('a').removeClass('ns_active');
		level--;
	}
	return false;
  });
  $('.navsm li li a').click(function() {
	window.location = $(this).attr('href');
  });

  // tab-navigation
  $('#mstabs').find('ul:first').find('li:first').children('a').addClass('ms_active');
  $('#mstabs').children('div').css({'display':'none'});
  $('#'+$('#mstabs').find('a.ms_active:first').attr('rel')).css({'display':'block'});
  $('#mstabs').find('ul:first').children('li').children('a').click(function() {
	$('#mstabs').find('ul:first').children('li').children('a').removeClass('ms_active');
	$(this).addClass('ms_active');
	$('#mstabs').children('div').css({'display':'none'});
	$('#'+$(this).attr('rel')).css({'display':'block'});
	return false;
  });

});

