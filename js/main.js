//panel switching functionality
function Panel() {
	
	var panels  	= [],
		active		= 'active',
		hide		= 'hide',
		panel 		= '.panel'

	this.initialize = function(elts, defaultPanel, excludeList) {
		var excludes = excludeList? excludeList : []

		if (elts){

			elts.each(function(i, elt){
				var $eltPanel = $(panel + '.' + elt.text)

				if (elt.text == defaultPanel) {
					$(elt).addClass(active)
					$eltPanel.addClass(active)
				}

				elt.onclick = function(e) {
					$(elts).removeClass(active)
					$(elt).addClass(active)

					$(panel).removeClass(active)
					$eltPanel.addClass(active)
				}

				excludes.forEach(function(exclude){
					if (elt.text == exclude) {
						elt.onclick = function (e) {}
					}
				})
			})
		}
	}
}

var homePanel = new Panel

homePanel.initialize($('.nav-links .panels a'), 'home', ['resume'])


$(document).ready(function() {
	$('body').imagesLoaded(function(){
		console.log('done')

		var delay 	= 200,
			offset 	= 1000
		$('.brick').each(function(i, element){
			setTimeout(function(){
				$(element).addClass('animated fadeIn slow').removeClass('hide').css('background', '#000')
			}, delay * i)
		})

		$('.blog-preview').each(function(i, element){
			setTimeout(function(){
				$('.blog-wrapper h6').removeClass('invisible')
				$(element).addClass('animated fadeIn slow').removeClass('hide')
			}, offset + delay * i)
		})

		$('.about .one-third.column').each(function(i, element){
			setTimeout(function(){
				$(element).addClass('animated fadeInUp slow')
			}, delay * i)
		})
	})
})