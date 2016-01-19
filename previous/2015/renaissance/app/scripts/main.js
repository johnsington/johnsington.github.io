$(document).ready(function(){
	$('.menu-shortcut').click(function(e){
		e.preventDefault()
		$('.main').toggleClass('active')
		$('.menu-shortcut i').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up')
		$('nav').toggleClass('active')
	})

	$('.tablet-screen,.phone-screen').slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000
	});
})