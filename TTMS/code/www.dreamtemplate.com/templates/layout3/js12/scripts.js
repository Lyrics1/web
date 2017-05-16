// <![CDATA[
// Cufon.replace('h1,h2,h3,h4', { fontFamily: 'Trebuchet MS',  hover: true });
// Cufon.replace('.click_to_sign_up', { fontFamily: 'Liberation Sans',  hover: true });

$(function () {
	
	$('p.footer_slide a').click(function () {
		$('.footer_slide_script').slideToggle('fast', function () {
			if ($('.footer_slide_script').css('display') == 'block') {
				$('p.footer_slide a').addClass('active');
			} else {
				$('p.footer_slide a').removeClass('active');
			}
		});
		return false;
	});
 
	//Caption thumbs
//	$('a.thumb').mouseenter(function () {
//		$(this).find('.opacity').css({'display':'block', 'height':$(this).find('img').height()+'px', 'width':$(this).find('img').width()+'px'});
//	}).mouseleave(function () {
//		$(this).find('.opacity').css({'display':'none'});
//	});
// causes signup username check to fail
	
	//Member Area
	$('.member_area').mouseenter(function () {
		$(this).children('a').addClass('active');	
		$('.member_area_box').show();
	}).mouseleave(function () {
		$(this).children('a').removeClass('active');
		$('.member_area_box').hide();
	});
	
	$("form.jqtransform").jqTransform();
 
});

