/* Composer Custom Scripts */

/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
*/
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y }
}
// setting the viewport width
var viewport = updateViewportDimensions();

function loadGravatars() {
	// set the viewport using the function above
	viewport = updateViewportDimensions();
	// if the viewport is tablet or larger, we load in the gravatars
	if (viewport.width >= 768) {
		jQuery('.comment img[data-gravatar]').each(function(){
			jQuery(this).attr('src',jQuery(this).attr('data-gravatar'));
		});
	}
} // end function

if( jQuery('body').hasClass('pix-ajaxify') ) {

	window.vc_js = function () {
		if( typeof('vc_toggleBehaviour') != 'undefined'){  // todo remove on next release
			vc_toggleBehaviour();
		}

		if( typeof('vc_tabsBehaviour') != 'undefined'){
			vc_tabsBehaviour();
		}

		if( typeof('vc_accordionBehaviour') != 'undefined'){
			vc_accordionBehaviour();
		}

		if( typeof('vc_teaserGrid') != 'undefined'){
			vc_teaserGrid();
		}

		if( typeof('vc_prettyPhoto') != 'undefined'){
			vc_prettyPhoto();
		}

		if( typeof('vc_pinterest') != 'undefined'){
			vc_pinterest();
		}

		if( typeof('vc_progress_bar') != 'undefined'){
			vc_progress_bar();
		}

		if( typeof('vc_carouselBehaviour') != 'undefined'){
			vc_carouselBehaviour();
		}

		if( typeof('vc_slidersBehaviour') != 'undefined'){
			vc_slidersBehaviour();
		}

		if( typeof('vc_plugin_flexslider') != 'undefined'){
			vc_plugin_flexslider();
		}

		if( typeof('vc_gridBehaviour') != 'undefined'){
			vc_gridBehaviour();
		}

		if( typeof('vc_rowBehaviour') != 'undefined'){
			vc_rowBehaviour();
		}
		
		jQuery( document ).trigger( 'vc_js' );
		window.setTimeout( vc_waypoints, 1500 );

		if( typeof('vc_waypoints') != 'undefined'){
			window.setTimeout(vc_waypoints, 1500);
		}	
		
	};

}

/* Theme Scripts */
(function($){
	'use strict';

	$(window).unload(function(){});

	String.prototype.decodeHTML = function() {
		return $("<div>", {html: "" + this}).html();
	};

	//WOO DROP DOWN
	var $main = $("#wrapper"),
		$mainCon = $("#main-wrapper"),
		responsive_viewport = $(window).width(),
		contentNode = $main.get(0),

	updateQueryStringParameter = function ( uri, key, value ) {
		var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
		if( value === undefined ) {
			if (uri.match(re)) {
				return uri.replace(re, '$1$2');
			} else {
				return uri;
			}
		} else {
			if ( uri && uri.match(re) ) {
				return uri.replace(re, '$1' + key + "=" + value + '$2');
			} else {
				var separator = uri && uri.indexOf('?') !== -1 ? "&" : "?";    
				return uri + separator + key + "=" + value;
			}
		}  
	},

	woo_drop_down = function (){
		/* WOO COMMERCE Cart */
		var $cartBtn = $('.cart-trigger'),
			$cartDropdown = $('.cart-trigger').find('.woo-cart-dropdown');

		if($cartBtn.length > 0 && $cartDropdown.length > 0){

			$cartBtn.mouseover(function(){
				$(this).find('.woo-cart-dropdown').stop().fadeIn();
			}).mouseout(function(){
				$(this).find('.woo-cart-dropdown').stop().fadeOut();
			});

		}
	},

	// Blocks Load more
	blockLoadMore = function ( self ) {

		// Assign div as variables
		var $loadMoreBtn = self.parents('.block-load-more-btn'),
			$loadContainer = self.parents('.loadmore-wrap').find('.load-container');

		// Assign useful values
		var ajaxurl = pix_composer.ajaxurl,
			values = self.data('values'),
			args = self.data('args');

		var page_number = self.data('paged');
		if( undefined != page_number ) {
			var page_number = page_number+1;
		}

		var max = values.max;

		$.ajax({
			type: 'post',
            url: ajaxurl,
            data: {
				action : values.action,
				values : values,
				args   : args,
				paged  : page_number
            },
			beforeSend: function(){			
				$loadMoreBtn.find('.spinner').fadeIn();
				$loadMoreBtn.find('a').hide();
				$loadMoreBtn.addClass('disabled');
			},
			complete: function() {
				//Magnific Popup
				$('.popup-gallery').magnificPopup({
					type: 'image',
					tLoading: 'Loading image...',
					mainClass: 'mfp-img-mobile',
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						//preload: [0,1] // Will preload 0 - before current, and 1 after the current image
					},
					image: {
						verticalFit: true,
						tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
						titleSrc: function(item) {
							return item.el.data('title');
						}
					},
					zoom: {
						enabled: true,
						duration: 300, // don't foget to change the duration also in CSS
						opener: function(element) {
							return element;
						}
					}
				});
			},
		}).done(function(data) {

			var $data = $(data),
				$posts = $data.find('.load-element'),
				paged = $data.find('.ajax-posts').data('paged'),
				categories = $data.find('.ajax-posts').data('categories');

			self.data('paged', paged );

			if( max == paged ) {

				$loadMoreBtn.find('.loaded-msg').removeClass('hide');
				$loadMoreBtn.find('.loaded-msg').show(0);
			}
			else {
				$loadMoreBtn.find('a').show();
			}

			var $loadContainer = self.parents('.loadmore-wrap').find('.load-container');

			// Append Elements
			if( $loadContainer.hasClass('portfolio-contents') || $loadContainer.hasClass('grid-blog-contents') || $loadContainer.hasClass('shop-contents') ) {
				$loadContainer.isotope()
				.append( $posts )
				.isotope( 'appended', $posts );
				$loadContainer.imagesLoaded().progress( function() {
					$loadContainer.isotope('layout');
				});

				// For portfolio filter
				if( $loadContainer.hasClass('portfolio-contents') ) {
					var $filter = $loadContainer.parents( '.loadmore-wrap' ).find( '#filters' ),
						oldCategories = $filter.data('categories');
					// Merge oldCategories into categories
					$.extend( categories, oldCategories );

					$filter.data('categories', categories);

					$.each( categories, function(index, val) {
						if( ! ( index in oldCategories ) ) {
							$filter.append('<li><a href="#" data-filter=".'+ index +'">'+ val +'</a></li>');
						}
					});
					if( $filter.length > 0 ) {
						$filter.find('li').eq(0).find('a').trigger('click');
					}
				}
				
			}
			else {
				$loadContainer.find('.load-element').last().after( $posts );
			}

		}).always(function(){

			$loadMoreBtn.find('.spinner').fadeOut();
			$loadMoreBtn.removeClass('disabled');

		});
	},

	/* Make pie Responsive */
	pieChartResponsive = function (options, $self, $border, size){
		if($self.hasClass('style2') && $self.hasClass('style4')){

			$border.css({
				'line-height': (size + options.style4) +'px',
				'height': (size + options.style4) +'px',
				'width': (size + (options.style4)) +'px'
			});

		}else if($self.hasClass('style2') && $self.hasClass('style5')){

			$border.css({
				'line-height': (size - options.style5) +'px',
				'height': (size - options.style5) +'px',
				'width': (size - (options.style5)) +'px'
			});

		}
		else if($self.hasClass('style2') && $self.hasClass('style6')){

			$border.css({
				'line-height': (size + options.style6) +'px',
				'height': (size + options.style6) +'px',
				'width': (size + options.style6) +'px'
			});

		}
		else if($self.hasClass('style2')){

			$border.css({
				'line-height': (size + options.style2) +'px',
				'height': (size + options.style2) +'px',
				'width': (size + options.style2) +'px'
			});

		}
	},

	afterContentLoad = function() {
		

	},

	loadMore = function( self ) {

		// Assign variables
		var $loadMoreBtn = self.parents('.load-more-btn'),
			$loadContainer = self.parents('.loadmore-wrap').find('.load-container'),
			ajaxurl = pix_composer.ajaxurl,
			values = self.data('values'),
			args = self.data('args'),
			page_number = self.data('paged'),
			max = values.max,
			url = self.data('link'),
			change_url = self.data('change-url'),
			search = $loadMoreBtn.data('search'),
			searchPaged = $loadMoreBtn.data('search-paged'),
			searchMax = $loadMoreBtn.data('search-max');

		if( $loadMoreBtn.hasClass('disabled') ) return;

		if( '' != search && 'undefined' != typeof( search ) ) {
			page_number = searchPaged;
			max = searchMax;
		}		

		if( 'undefined' != typeof( page_number ) ) {
			page_number = page_number+1;
		}		

		if( page_number > max ) return;

		$.ajax({
			type: 'post',
            url: ajaxurl,
            data: {
				action : values.action,
				values : values,
				args   : args,
				paged  : page_number
            },
			beforeSend: function(){			
				$loadMoreBtn.find('.spinner').fadeIn();
				$loadMoreBtn.find('a').hide();
				$loadMoreBtn.addClass('disabled');
			},
			complete: function() {
				//Magnific Popup
				$('.popup-gallery').magnificPopup({
					type: 'image',
					tLoading: 'Loading image...',
					mainClass: 'mfp-img-mobile',
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						//preload: [0,1] // Will preload 0 - before current, and 1 after the current image
					},
					image: {
						verticalFit: true,
						tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
						titleSrc: function(item) {
							return item.el.data('title');
						}
					},
					zoom: {
						enabled: true,
						duration: 300, // don't foget to change the duration also in CSS
						opener: function(element) {
							return element;
						}
					}
				});
			},
		}).done(function(data) {

			var $data = $(data),
				$posts = $data.find('.load-element'),
				paged = $data.find('.ajax-posts').data('paged'),
				categories = $data.find('.ajax-posts').data('categories');

			self.data('paged', paged );

			if( 'yes' == change_url ) {
				var newUrl = updateQueryStringParameter(url, 'page', paged);
				history.pushState( '', '', newUrl );
			}
			

			if( max == paged ) {

				$loadMoreBtn.find('.loaded-msg').removeClass('hide');
				$loadMoreBtn.find('.loaded-msg').show(0);
			}
			else {
				$loadMoreBtn.find('a').show();
			}

			var $loadContainer = self.parents('.loadmore-wrap').find('.load-container');

			// Append Elements
			if( $loadContainer.hasClass('portfolio-contents') || $loadContainer.hasClass('blog-isotope') || $loadContainer.hasClass('shop-contents') || $loadContainer.hasClass('recent-blog-posts-contents') ) {
				$loadContainer.isotope()
				.append( $posts )
				.isotope( 'appended', $posts );
				$loadContainer.imagesLoaded().progress( function() {
					$loadContainer.isotope('layout');
				});

				// For portfolio filter
				if( $loadContainer.hasClass('portfolio-contents') ) {
					var $filter = $loadContainer.parents( '.loadmore-wrap' ).find( '#filters' ),
						oldCategories = $filter.data('categories');

					if( $filter.length > 0 ) {

						// Merge oldCategories into categories
						$.extend( categories, oldCategories );

						$filter.data('categories', categories);
						
						$.each( categories, function(index, val) {
							if( ! ( index in oldCategories ) ) {
								$filter.append('<li><a href="#" data-filter=".'+ index +'">'+ val +'</a></li>');
							}
						});

						$filter.find('li').eq(0).find('a').trigger('click');

					}					
				}
				
			}
			else {
				$loadContainer.find('.load-element').last().after( $posts );
			}

			var $elem = $('.pix-animate-cre');

			$elem.each(function(){
				var $singleElement = $(this);

				// Get data-attr from element
				var animateTrans = $singleElement.data('trans') ? $singleElement.data('trans') : 'fadeIn';
				var animateDelay = $singleElement.data('delay') ? $singleElement.data('delay') : '';
				var animateDuration = $singleElement.data('duration') ? $singleElement.data('duration') : '';

				if(animateDelay != ''){
					$singleElement.css('animation-delay', animateDelay);
				}

				if(animateDuration != ''){
					$singleElement.css('animation-duration', animateDuration);
				}

				$singleElement.waypoint(function() {
					if ($singleElement.hasClass('animated ' + animateTrans)) return;
					$singleElement.css('opacity','1').addClass('animated '+ animateTrans);

				},
				{
					offset: '80%',
					triggerOnce: true
				});
			});

		}).always(function(){

			$loadMoreBtn.find('.spinner').fadeOut();
			$loadMoreBtn.removeClass('disabled');

		});
	},

	portfolioSearch = function( $self, search ) {

		// Assign div as variables
		var $con = $self.parents('.loadmore-wrap'),
			$loadMoreBtn = $con.find('.load-more-btn'),
			$loadContainer = $con.find('.load-container'),
			ajaxurl = pix_composer.ajaxurl,
			$wrap = $self.parent(),
			values = $wrap.data('values'),
			args = $wrap.data('args'),
			max = $wrap.data('max');

		if( $loadMoreBtn.hasClass('disabled') ) return;

		// Set loadmore btn for search query
		$loadMoreBtn.data( 'search', search );

		// Remove the All post loaded btn before ajax starts
		$loadMoreBtn.find('.loaded-msg').addClass('hide');
		$loadMoreBtn.find('.loaded-msg').hide(0);

		$.ajax({
			type: 'post',
            url: ajaxurl,
            data: {
				action : values.action,
				values : values,
				args   : args,
				paged  : 1,
				search : search
            },
			beforeSend: function(){		
				$loadContainer.addClass('port-search-loading');
				$loadMoreBtn.find('.spinner').fadeIn();
				$loadMoreBtn.find('a').hide();
				$loadMoreBtn.addClass('disabled');
			},
			complete: function() {
				$loadContainer.removeClass('port-search-loading');
				//afterContentLoad();
			},
		}).done(function(data) {

			var $data = $(data),
				$posts = $data.find('.load-element'),
				$ajaxPosts = $data.find('.ajax-posts'),
				postFound = $ajaxPosts.data('post-found'),
				postNotFoundText,
				paged = $ajaxPosts.data('paged'),
				max = $ajaxPosts.data('max');

			$loadContainer.find('.load-element').remove();
			$con.find('.not-found').remove();

			if( '' != search && 'undefined' != typeof( search ) ) {
				$con.find('.clear-search').fadeIn();
			}
			else {
				$con.find('.clear-search').fadeOut();
			}

			if( !postFound ) {
				postNotFoundText = $ajaxPosts.text();
				$loadContainer.before('<div class="not-found">'+ postNotFoundText +'</div>');
			}
			else {

				$loadMoreBtn.data('search-paged', paged );
				$loadMoreBtn.data('search-max', max );

				if( max == paged ) {

					$loadMoreBtn.find('.loaded-msg').removeClass('hide');
					$loadMoreBtn.find('.loaded-msg').show(0);
				}
				else {
					$loadMoreBtn.find('a').show();
				}

				// Append Elements
				$loadContainer.isotope()
					.append( $posts )
					.isotope( 'appended', $posts );
					$loadContainer.imagesLoaded().progress( function() {
						$loadContainer.isotope('layout');
				});

				var $elem = $('.pix-animate-cre');

				$elem.each(function(){
					var $singleElement = $(this);

					// Get data-attr from element
					var animateTrans = $singleElement.data('trans') ? $singleElement.data('trans') : 'fadeIn';
					var animateDelay = $singleElement.data('delay') ? $singleElement.data('delay') : '';
					var animateDuration = $singleElement.data('duration') ? $singleElement.data('duration') : '';

					if(animateDelay != ''){
						$singleElement.css('animation-delay', animateDelay);
					}

					if(animateDuration != ''){
						$singleElement.css('animation-duration', animateDuration);
					}

					$singleElement.waypoint(function() {
						if ($singleElement.hasClass('animated ' + animateTrans)) return;
						$singleElement.css('opacity','1').addClass('animated '+ animateTrans);

					},
					{
						offset: '80%',
						triggerOnce: true
					});
				});
			}

		}).always(function(){

			$loadMoreBtn.find('.spinner').fadeOut();
			$loadMoreBtn.removeClass('disabled');

		});
	},

	// Ajaxify Remove item in flyin cart
	AjaxifyRemoveIteminCart = function(e){

		e.preventDefault();

		var $wooCart = $('.woo-cart-dropdown'),
			$cartContent = $wooCart.find('.woo-cart-content'),
			$cartLoader = $wooCart.find('.spinner');

		$.ajax({
			type: "POST",
			url: pixLike.ajaxurl,
			data: {
				'action'   : 'composer_cart_remove_item',
				'item_key': $(this).data('item_key'),
			},
			cache: false,
			headers: {'cache-control': 'no-cache'},
			beforeSend: function() {
				// Show flyin cart loader & hide content
				$cartLoader.show();
				$(this).parent('li').addClass('removing');
			}
		}).done(function(data){
			var $data = $(data),
				status = $data.find('#status').html(),
				cartCount = $data.find('#amz-cart-count').html(),
				wcNotice = $data.find('#amz-wc-notice').html(),
				wccart = $data.find('#amz-mini-cart').html();

				$(this).parent('li').removeClass('removing');

			if ( status != 1 ) {
				$cartLoader.hide();
				return;
			}

			// Update cart count in menu.
			$('body').find('.pix-item-icon').html( cartCount );

			// Update flyin cart if no error notice found
			if( ! $data.find('.woocommerce-error').length ) {
				$cartContent.html( wccart );
			}

			$cartLoader.hide();
		});

	},

	modernPosts = function( $self, count ){

		var $con = $self.closest('.modern-posts'),
			$imageListWrap = $con.find('.image-list-wrap'),
			$titleListWrap = $con.find('.title-list-wrap'),
			$imageList = $imageListWrap.find('.image-list'),
			$titleList = $titleListWrap.find('.title-list');

			$imageList.eq(count).addClass('current').siblings().removeClass('current');
			$titleList.eq(count).addClass('current').siblings().removeClass('current');
	},

	init = function() {

		// to top right away 
		if ( window.location.hash ){
			scroll(0,0); 
			// void some browsers issue 
			setTimeout( function() { scroll(0,0); }, 1);
		}

		/* getting viewport width */
		var responsive_viewport = $(window).width();
		
		loadGravatars();			


		/* WPML Language Menu */
		var $langBtn = $('#lang-list.lang-dropdown.translated');

		if($langBtn.length > 0){

			$langBtn.mouseover(function(){
				var $langDropdown = $(this).find('.lang-dropdown-inner');
				$langDropdown.stop().slideDown();
			}).mouseout(function(){
				var $langDropdown = $(this).find('.lang-dropdown-inner');
				$langDropdown.stop().slideUp();
			});

		}

		//Mobile Menu
		var mMenuStatus = 0,
			$mMenu = $('.mobile-menu-nav'),
			$pixOverlay = $('<div />', {class: 'pix-overlay'});
			
		$('.pix-menu .pix-menu-trigger').on('click', function(e) {
			var $this = $(this);
			if(mMenuStatus == 0){
				$this.parent().addClass('pix-menu-open').removeClass('pix-menu-close');
				$('#content-pusher').addClass('content-pushed');
				//Add Overlay
				$pixOverlay.hide().appendTo('body').fadeIn(300);            

				//Show Menu
				$mMenu.addClass('mobile-nav').addClass('moved');
				$('.left-main-menu').addClass('moved');

				mMenuStatus = 1;    

				//Add Click event to overlay
				$pixOverlay.off().on('click', function(e) {
					e.preventDefault();
					if(mMenuStatus == 1){
						$this.parent().removeClass('pix-menu-open').addClass('pix-menu-close');
						$('#content-pusher').removeClass('content-pushed');
						$mMenu.removeClass('mobile-nav').removeClass('moved');
						$('.left-main-menu').removeClass('moved');
						$pixOverlay.fadeOut(300, function() {
							$(this).remove();
						});
						mMenuStatus = 0;
					}
				});

				

			}else{
				$mMenu.removeClass('mobile-nav').removeClass('moved');
				$('.left-main-menu').removeClass('moved');
				$pixOverlay.fadeOut(300, function() {
					$(this).remove();
				});
				mMenuStatus = 0;
				$this.parent().removeClass('pix-menu-open').addClass('pix-menu-close');
				$('#content-pusher').removeClass('content-pushed');
			}

			e.preventDefault();
		});

		//Flyin Sidebar
		var fsStatus = 0,	
		$fs = $('.pix-flyin-content');

		$('.pix-flyin-sidebar .pix-flyin-trigger').on('click', function(e) {
			var $this = $(this);
			if(fsStatus == 0){
				$this.parent().addClass('pix-flyin-open').removeClass('pix-flyin-close');
				$('#content-pusher').addClass('flyin-pushed');     

				//Show Menu
				$fs.addClass('moved');

				fsStatus = 1;    
				

			}else{
				$fs.removeClass('moved');
				fsStatus = 0;
				$this.parent().removeClass('pix-flyin-open').addClass('pix-flyin-close');
				$('#content-pusher').removeClass('flyin-pushed');
			}

			e.preventDefault();
		});

		// Modern Post
		$('.modern-posts .title-list-wrap').on('mouseover', '.title', function(e) {
			e.preventDefault();

			var $self = $(this),
				$con = $self.closest('.modern-posts'),
				$ul = $con.find('.next-prev ul'),
				count = $self.data('count');

			$ul.data('count', count);

			modernPosts( $self, count );

		});

		$('.modern-posts .next-prev').on( 'click', 'li', function(e) {
			e.preventDefault();

			var $self = $(this),
				count = $self.closest('ul').data('count'),
				$ul = $self.closest('ul'),
				maxCount = $ul.data('max-count');

			if( $self.hasClass( 'prev' ) ) {
				count = ( 0 != count ) ? count - 1 : 0;
			}
			else { // next
				count = ( maxCount != count ) ? count + 1 : count;
			}

			$ul.data( 'count', count );

			modernPosts( $self, count );

		});

	

		/* Responsive video */
		/*$(".container, .posts, .pix-blog-video,.wp-video, .pix-post-video").fitVids();*/

		/* open share in popup window */
		$('.port-share-btn a, .share-social a').on('click', function(e){
			e.preventDefault();
			var newwindow = window.open($(this).attr('href'),'','height=450,width=700');
			if (window.focus) {newwindow.focus()}
				return false;
		});

		//Magnific Popup
		/*$('.popup-gallery').magnificPopup({
			type: 'image',
			tLoading:'Loading image...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				//preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				verticalFit: true,
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.data('title');
				}
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function(element) {
					return element;
				}
			}
		});/*

		/* Pie Chart Used in Skills */
		$('.pix-chart').each(function(index, el) {

			var $self = $(this);
				$self.width($self.data('size')).height($self.data('size')).css('line-height', $self.data('size') +'px');

			$self.waypoint(function() {

				$(this).easyPieChart({  
					onStart: function(from, to){
						var canvas = $(this.el).find('canvas'),
							size = canvas.width(),
							$border = $(this.el).find('.border-bg'), 
							$bg = $(this.el).find('.bg'),
							$self = $(this.el);

						$self.css({
							'line-height': (size) +'px',
							'height': (size) +'px',
							'width': (size) +'px'
						});

					},      
					onStep: function(from, to, percent) {
						$(this.el).find('.percent-text').text(Math.round(percent));
					}
				});

			},
			{
				offset: '90%',
				triggerOnce: true
			});

		});	

		/* Menu open and close( header-11 ) */
		var $navDash = $('.nav-dash');

		if($navDash.length > 0){

			$navDash.on('click', function(e) {
				e.preventDefault();
				$navDash.closest('.main-nav').toggleClass('menu-open');
			});

		}

		// Login Form
		var loginForm = function( self ){

			var ajaxurl = pix_composer.ajaxurl,
				$form = self.parents('.login-form'),
				username = $form.find('.username').val(),
				password = $form.find('.password').val(),
				remember = $form.find('.remember_me').prop('checked');

			$.ajax({
				type: 'post',
	            url: ajaxurl,
	            data: {
					action : 'composer_ajax_login_form',
					username : username,
					password : password,
					remember : remember
	            },
				beforeSend: function(){
					self.addClass('btn-loading');
				},
				complete: function() {
					afterContentLoad();
				},
			}).done( function( data ) {
				self.removeClass('btn-loading');

				var data = $.parseJSON(data),
					error = data.error;

				if( 1 == error ) {
					var username = data.username,
						password = data.password;

					// Insert error content	
					$form.find('.username-notice').text(username);
					$form.find('.password-notice').text(password);

				}
				else {
					
					var success = data.success,
						redirect = data.redirect;

					$form.find('.success').text(success).delay(400).fadeOut(400);

					// Redirect
					$(location).attr('href',redirect);
				}

			}).always( function(){
			});
		};

		$('.login-form').on('click', '.submit-login-form', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var self = $(this);

			// Call login ajax function
			loginForm( self );
		});


		// Forgot Form
		var forgotForm = function( self ){

			var ajaxurl = pix_composer.ajaxurl,
				$form = self.parents('.forgot-form'),
				user_login = $form.find('.user_login').val();

			$.ajax({
				type: 'post',
	            url: ajaxurl,
	            data: {
					action : 'composer_ajax_forgot_form',
					user_login : user_login
	            },
				beforeSend: function(){
					self.addClass('btn-loading');
				},
				complete: function() {
					afterContentLoad();
				},
			}).done( function( data ) {
				self.removeClass('btn-loading');

				var data = $.parseJSON(data),
					error = data.error,
					notice = data.notice;

				if( 1 == error ) {
					var forgot_login = data.forgot_login;

					// Insert error content	
					$form.find('.user-login-notice').text(notice);

				}
				else {
					var success = data.success,
						redirect = data.redirect;

					$form.find('.success').text(success).delay(400).fadeOut(400);
				}

			}).always( function(){
			});
		};

		$('.forgot-form').on('click', '.submit-forgot-form', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var self = $(this);

			// Call login ajax function
			forgotForm( self );
		});


		// Forgot Form
		var resetForm = function( self ){

			var ajaxurl = pix_composer.ajaxurl,
				$form = self.parents('.reset-form'),
				login = self.data('login'),
				password = $form.find('.password').val(),
				key = $form.data('key');

			$.ajax({
				type: 'post',
	            url: ajaxurl,
	            data: {
					action : 'composer_ajax_reset_form',
					login : login,
					password : password,
					key : key
	            },
				beforeSend: function(){
					self.addClass('btn-loading');
				},
				complete: function() {
					afterContentLoad();
				},
			}).done( function( data ) {
				self.removeClass('btn-loading');

				var data = $.parseJSON(data),
					error = data.error,
					notice = data.notice;

				if( 1 == error ) {
					var forgot_login = data.forgot_login;

					// Insert error content	
					$form.find('.user-login-notice').text(notice);

				}
				else {
					var redirect = data.redirect;

					// Redirect
					$(location).attr('href',redirect);

					// Insert error content	
					$form.parent().next('.login-form-con').find('.reset-notice').text(notice);
				}

			}).always( function(){
			});
		};

		$('.reset-form').on('click', '.submit-reset-form', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var self = $(this);

			// Call login ajax function
			resetForm( self );
		});

		// Update Profile
		var updateProfile = function( self ){

			var ajaxurl = pix_composer.ajaxurl,
				$form = self.parents('.update-form'),
				firstName = $form.find('.first_name').val(),
				lastName = $form.find('.last_name').val(),
				email = $form.find('.email').val(),
				website = $form.find('.website').val(),
				oldPassword = $form.find('.old_password').val(),
				newPassword = $form.find('.new_password').val();

			$.ajax({
				type: 'post',
	            url: ajaxurl,
	            data: {
					action : 'composer_ajax_update_form',
					first_name : firstName,
					last_name : lastName,
					email : email,
					website : website,
					old_password : oldPassword,
					new_password : newPassword,
	            },
				beforeSend: function(){
					self.addClass('btn-loading');
				},
				complete: function() {
					afterContentLoad();
				},
			}).done( function( data ) {
				
				self.removeClass('btn-loading');

				var data = $.parseJSON(data),
					error = data.error;

				if( true == error ) {
					var username_notice = data.username_notice,
						password_notice = data.password_notice;

					// Insert error content
					$form.find('.username-notice').text(username_notice);
					$form.find('.password-notice').text(password_notice);

				}
				else {
					var success = data.succcess_notice,
						redirect = data.redirect;

					$form.find('.success').text(success);
				}

			}).always( function(){
			});
		};

		$('.my-account-con').on('click', '.submit-update-form', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var self = $(this);

			// Call register ajax function
			updateProfile( self );
		});


		// Register Form
		var registerForm = function( self ){

			var ajaxurl = pix_composer.ajaxurl,
				$form = self.parents('.register-form'),
				username = $form.find('.username').val(),
				email = $form.find('.email').val();

			$.ajax({
				type: 'post',
	            url: ajaxurl,
	            data: {
					action : 'composer_ajax_register_form',
					username : username,
					email : email
	            },
				beforeSend: function(){
					self.addClass('btn-loading');
				},
				complete: function() {
					afterContentLoad();
				},
			}).done( function( data ) {
				self.removeClass('btn-loading');

				var data = $.parseJSON(data),
					error = data.error;

				if( 1 == error ) {
					var username_notice = data.username_notice,
						email_notice = data.email_notice,
						general_notice = data.general_notice;

					// Insert error content	
					$form.find('.general-notice').addClass('error').removeClass('success').text(general_notice);
					$form.find('.username-notice').text(username_notice);
					$form.find('.email-notice').text(email_notice);

				}
				else {
					var success = data.succcess_notice,
						redirect = data.redirect;

					$form.find('.general-notice').addClass('success').removeClass('error').text(success).delay(400).fadeOut(400);

					// Redirect
					$(location).attr('href',redirect);
				}

			}).always( function(){
			});
		};

		$('.register-form').on('click', '.submit-register-form', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var self = $(this);

			// Call register ajax function
			registerForm( self );
		});

		$('.login-form').on('click', '.forgot-password', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var self = $(this);

			// Switch form
			self.parents('.login-form-con').fadeOut(400);
			self.parents('.login-form-con').next('.forgot-password-con').fadeIn(400);
		});

		$('.login-form').on('click', '.change-password', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var self = $(this);

			// Switch form
			self.parents('.login-form-con').fadeOut(400);
			self.parents('.login-form-con').next().next('.change-password-con').fadeIn(400);
		});

		// Checkbox
        $('.login-form').on('click', '.form-checkbox label', function( e ) {

        	e.preventDefault();
        	e.stopPropagation();

        	var self = $(this);

        	// Trigger checkbox
        	self.next('.remember-me').trigger('click');

        });

        // Trigger checkbox
        $('.login-form').on('click', '.remember-me', function( e ) {

        	e.preventDefault();
        	e.stopPropagation();

        	var self = $(this),
        		$form = self.parents('.login-form'),
        		$checkbox = self.parent().find('.remember_me'),
        		val = $checkbox.prop('checked');

        	if( false == val ) {
        		$checkbox.prop('checked',true);
        	}
        	else{
        		$checkbox.prop('checked',false);
        	}

        	self.toggleClass('active');

        });

        $('.show-login-form').on('click', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var self = $(this),
				$forgotPasswordCon = self.parents('.forgot-password-con'),
				$changePasswordCon = self.parents('.change-password-con');

			// Switch form
			$forgotPasswordCon.fadeOut(0);
			$changePasswordCon.fadeOut(0);
			$('.login-form-con').fadeIn(0);
		});

		$('.main-nav .menu-item-has-children .pix-dropdown-arrow').on('click',function(e) {
			e.preventDefault();
			$(this).next('ul').stop().slideToggle();
		});

		$('.pix-recent-blog-posts.blog-slide').on('mouseenter', '.post-container', function() {
			$(this).addClass('slide-open').siblings().removeClass('slide-open');
		}).on('mouseleave', function() {

			var $parent = $(this).closest('.pix-recent-blog-posts'),
				count = $parent.data('blog-slide-count');

			$parent.find('.post-container').eq(count - 1).addClass('slide-open').siblings().removeClass('slide-open');
		});

		$(window).resize(function(event) {

			var responsive_viewport = $(window).width(),
				$sideHeader = $('.left-main-menu'),$container = $('.portfolio-contents'),
			$portfolioInnerText = $container.find('.portfolio-inner-text');

			// initialize isotope

			if($portfolioInnerText.length > 0 ){
				$portfolioInnerText.css('height', $container.find('.element').first().height());
			};

			// Single portfolio affix 
			var $affix = $('.single-portfolio-affix'),
				$singlePortAffixWrap =  $('.single-portfolio-affix-wrap'),
				$footer = $('#footer');

			if( $affix.length > 0 ) {
		
				if (responsive_viewport >= 991) {

						$('.single-portfolio-affix-container').height( $('.single-portfolio-item').height() - 50 );

						$singlePortAffixWrap.waypoint('destroy');
						$footer.waypoint('destroy');

						$singlePortAffixWrap.waypoint({
							handler: function(direction) {
								$('.single-portfolio-affix').toggleClass('sticky-top'); //change position to fixed by adding 'sticky-top' class
							}
						});

						$footer.waypoint({
							offset: $('.single-portfolio-affix').height() + 180, //calculate menu's height and margin before footer
							handler: function(direction) {
								if( direction === 'down' ) {
									$('.single-portfolio-affix').removeClass('sticky-top'); //remove 'sticky-top' class
									$singlePortAffixWrap.addClass('sticky-bottom'); //change position to absolute for the wrapper
								} else if ( direction === 'up' ) {
									$('.single-portfolio-affix').addClass('sticky-top'); //remove 'sticky-top' class
									$singlePortAffixWrap.removeClass('sticky-bottom'); //change position to absolute for the wrapper
								}
							}
						});
					
				} else {
					/* Single portfolio affix */									
					$('.single-portfolio-affix-container').height( 'auto' );
					$singlePortAffixWrap.waypoint('destroy');
					$footer.waypoint('destroy');
				}

			}

			if (responsive_viewport >= 991) {
				$mainCon.css('padding-bottom',$('.footer-fixed').height()+'px');

			}else{
				$mainCon.css('padding-bottom','0px');				
			}
			
			/* PIE CHART */
			$('.pix-chart').each(function(index, el) {

				var $self = $(this),
					canvas = $self.find('canvas'), 
					size = canvas.width(),
					$border = $self.find('.border-bg'), 
					$bg = $self.find('.bg');

				$self.css({
					'line-height': (size) +'px',
					'height': (size) +'px'
				});

			});
			
			if(responsive_viewport <= 991){
				$mMenu.addClass('mobile-nav');
				
			}else{
				$mMenu.removeClass('mobile-nav');
			}
			
		});

	},

	portfolioImageOnScroll = function( $portElem ) {
		var portTotal = $portElem.length,
			showed = 0;

		$portElem.each(function(index){
			var $singleElement = $(this);

			// Get data-attr from element
			var animateTrans = $singleElement.data('trans') ? $singleElement.data('trans') : 'fadeIn';
			var animateDelay = $singleElement.data('delay') ? $singleElement.data('delay') : 200;
			var animateDuration = $singleElement.data('duration') ? $singleElement.data('duration') : '';

			if(animateDelay != ''){
				// $singleElement.css('animation-delay', animateDelay);
			}

			if(animateDuration != ''){
				$singleElement.css('animation-duration', animateDuration);
			}

			$singleElement.waypoint(function() {
				if ($singleElement.hasClass('animated ' + animateTrans)) return;

				var delay = index, parentIndex = $(this).closest('.load-element').index();

				delay -= showed;

				setTimeout(function() {
					$singleElement.css('opacity','1').addClass('animated '+ animateTrans);
					showed = parentIndex;
				}, delay * parseInt( animateDelay ) );

				// destroy waypoint after applied

			},
			{
				offset: '100%',
				triggerOnce: true
			});
			
		});

	},

	initHoverbox = function( $el ) {
		var $elem = '';

		$('[data-hover-animate]').addClass('loaded');

		/* HoverBox */
		$el.hover(
			function() {
				var $elems = $(this).find('[data-hover-animate]');

				$elems.each(function() {
					
					var animateTransIn  = $(this).data('trans-in')    ? $(this).data('trans-in')    : 'fadeIn';
					var animateTransOut = $(this).data('trans-out')   ? $(this).data('trans-out')   : 'fadeOut';			
					var animateDelay    = $(this).data('delay-in')    ? $(this).data('delay-in')    : '';
					var animateDuration = $(this).data('duration-in') ? $(this).data('duration-in') : '';

					if( animateDelay != '' ){
						$(this).css('animation-delay', animateDelay);
					}

					if( animateDuration != '' ){
						$(this).css('animation-duration', animateDuration);
					}

					$(this).removeClass(animateTransOut).addClass(animateTransIn);

				});

			},
			function(){

				var $elems = $(this).find('[data-hover-animate]');

				$elems.each(function() {
					

					var animateTransIn  = $(this).data('trans-in')    ? $(this).data('trans-in')    : 'fadeIn';
					var animateTransOut = $(this).data('trans-out')    ? $(this).data('trans-out')   : 'fadeOut';
					var animateDelay    = $(this).data('delay-out')    ? $(this).data('delay-out')       : '';
					var animateDuration = $(this).data('duration-out') ? $(this).data('duration-out')    : '';

					if( animateDelay != '' ){
						$(this).css('animation-delay', animateDelay);
					}

					if( animateDuration != '' ){
						$(this).css('animation-duration', animateDuration);
					}

					$(this).removeClass(animateTransIn).addClass(animateTransOut);

				});

				$elems = '';
			}
	    );
	},

	afterPageLoad = function() {/*

	//	$('.popup-lightbox a').magnificPopup({
	//		type: 'image',
	//		closeOnContentClick: true,
	//		mainClass: 'mfp-img-mobile',
	//		image: {
	//			verticalFit: true
	//		}
	//	});

	/*	var $shopContainer = $('.shop-contents');
		$shopContainer.isotope({
			itemSelector : '.shop-item',
			percentPosition: true,
			masonry : {
				columnWidth : '.shop-grid-sizer'
			}
		});

		var $galleryContainer = $('.gallery-contents');
		$galleryContainer.isotope({
			itemSelector : '.gallery-item',
			percentPosition: true,
			masonry : {
				columnWidth : '.gallery-grid-sizer'
			}
		});

		var $portfolioContainer = $('.portfolio-contents');
		$portfolioContainer.isotope({
			itemSelector : '.pix-portfolio-item',
			percentPosition: true,
			masonry : {
				columnWidth : '.portfolio-grid-sizer'
			}
		});

		var $gridBlogContainer = $( '.grid-blog-contents' );
		$gridBlogContainer.isotope({
			itemSelector : '.grid-blog-item',
			percentPosition: true,
			masonry : {
				columnWidth : '.grid-blog-grid-sizer'
			}
		});

		var $recentBlogContainer = $( '.recent-blog-posts-contents' );
		$recentBlogContainer.isotope({
			itemSelector : '.load-element',
			percentPosition: true,
			masonry : {
				columnWidth : '.recent-blog-grid-sizer'
			}
		});*/

		// Load More
		var $loadMoreBtn = $( '.block-load-more-btn' );

		if ( $loadMoreBtn.length ) {

			if ( $loadMoreBtn.hasClass( 'amz-autoload') ) {

				$( window ).on('scroll', function() { 

					if( $( window ).scrollTop() >= $( '.load-container' ).offset().top + $( '.load-container' ).outerHeight() - window.innerHeight ) { 

						if( $loadMoreBtn.hasClass('done-loading') || $loadMoreBtn.hasClass( 'disabled' ) ) {
							return;
						}

						$loadMoreBtn.find('a').trigger('click');

					}

				});
			}

			$( '.block-load-more-btn' ).on( 'click', 'a', function(e) {
				e.preventDefault();
				
				blockLoadMore( $(this) );
				
			});
		}

		/* HoverBox */
		initHoverbox( $(".hover-box") );

		/* Contact form move label */
		$('.move-label').on('focus', function () {
			$(this).parents('p').find('label').addClass('is_focus');
		});

		$('.move-label').on('blur', function () {
			if( ! $(this).val() ) {
				$(this).parents('p').find('label').removeClass('is_focus');
			}
		});

		// Ajax remove cart
		var $wooCartDropdown = $('.woo-cart-dropdown'),
			$cartContent = $wooCartDropdown.find('.woo-cart-content'),
			$cartLoader = $wooCartDropdown.find('.spinner');
		$wooCartDropdown.on('click', '.remove', AjaxifyRemoveIteminCart);

		//WooCommerce update minicart
		$( document.body ).on( 'added_to_cart', function(){
		
			$.ajax({
				url: woocommerce_params.ajax_url,
				type: 'post',
				data: { 
					'action': 'composer_update_mini_cart'
				},
				beforeSend: function(){				
					//$cartContent.html('');
					$cartLoader.show();

				},
			}).done(function(data) {
				$cartContent.html(data);
			}).always(function(){
				$cartLoader.hide();
			});
		});

	//	$('.parallax').parallax('50%', -0.3, true);

		if (responsive_viewport >= 991) {
			$mainCon.css('padding-bottom',$('.footer-fixed').height()+'px');
		}else{
			$mainCon.css('padding-bottom','0px');
		}

		/* Skrollr */
		var s = skrollr.init({
			easing: {
				quintic: function(p) {
					return 1*(p*p*p*p*p) - 5*(p*p*p*p) + 10*(p*p*p) - 10*(p*p) + 5*p;
				}
			},forceHeight: false
		});

		if (s.isMobile()) {
    			s.destroy();
		}

		/* Search button */


		var $searchHeader = $('.search-btn'), 
			$search = $searchHeader.find('.topSearchForm');

		//if search is present in header then add events
		if($search.length > 0){

			$searchHeader.off().on('click', function(e) {
				var self = $(this);

				self.toggleClass('color');
				$search.toggleClass('show');

				setTimeout( function() { $search.find('input').focus(); }, 300 );
				

				e.preventDefault();
				e.stopPropagation();
			});

			$search.off().on('click', function(e) {
       			e.stopPropagation();
			});

			$(document).on('click', function(e) {								
					$search.removeClass('show');
					$searchHeader.removeClass('color');
			});
		}

		$('#dot-nav').css({marginTop:-($('#dot-nav').height()/2)});
		var changeHashInURL = ($('body').hasClass('pix-ajaxify')) ? false : true;

	$('#dot-nav').amzOnePageNav({
			currentClass: 'current',
			changeHash: changeHashInURL
		});

		$('.main-nav').amzOnePageNav({
			currentClass: 'current-menu-item',
			changeHash: changeHashInURL,
			filter: ':not(.external)',
			begin: function() { 
				//Hack so you can click other menu items after the initial click 
				$('body').append('<div id="device-dummy" style="height: 1px;"></div>');
				$('button.overlay-close').trigger('click');

				var $mainnav = $('.main-nav');
				if( $mainnav.length == 2 ) {
					$('.main-nav').find('li').removeClass('current-menu-item');
				}
			}, 
			end: function() { 
				$('#device-dummy').remove(); 
			}
		});

		$('.popup-video').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});

		//Woo DropDown
		woo_drop_down();

		var $simplemenu = $( '#dl-menu' );

		/* Sticky Header */
		var $headerCon = $('.header-con.pix-sticky-header');
		if($headerCon.length > 0){

			$headerCon.waypoint('sticky', {
				offset: -($('.header-wrap').height()+30)
			});

		}

		/* Single portfolio affix */
		var $affix = $('.single-portfolio-affix'),
			$singlePortAffixWrap =  $('.single-portfolio-affix-wrap'),
			$footer = $('#footer');

		if ( responsive_viewport >= 991 ) {

			if ( $affix.length > 0 ) {				

				$('.single-portfolio-affix-container').height( $('.single-portfolio-item').height() - 50 );

				$singlePortAffixWrap.waypoint('destroy');
				$footer.waypoint('destroy');

				$singlePortAffixWrap.waypoint({
					handler: function(direction) {
						$('.single-portfolio-affix').toggleClass('sticky-top'); //change position to fixed by adding 'sticky-top' class
					}
				});

				$footer.waypoint({
					offset: $('.single-portfolio-affix').height() + 180, //calculate menu's height and margin before footer
					handler: function(direction) {
						if( direction === 'down' ) {
							$('.single-portfolio-affix').removeClass('sticky-top'); //remove 'sticky-top' class
							$singlePortAffixWrap.addClass('sticky-bottom'); //change position to absolute for the wrapper
						} else if ( direction === 'up' ) {
							$('.single-portfolio-affix').addClass('sticky-top'); 
							$singlePortAffixWrap.removeClass('sticky-bottom');
						}					
					}
				});

			}

		} else {
			/* Single portfolio affix */
			if( $affix.length > 0 ) { 
				$('.single-portfolio-affix-container').height( 'auto' );
				$singlePortAffixWrap.waypoint('destroy');
				$footer.waypoint('destroy');
			}
		}

		var $elem = $('.pix-animate-cre');

		$elem.each(function(){
			var $singleElement = $(this);

			// Get data-attr from element
			var animateTrans = $singleElement.data('trans') ? $singleElement.data('trans') : 'fadeIn';
			var animateDelay = $singleElement.data('delay') ? $singleElement.data('delay') : '';
			var animateDuration = $singleElement.data('duration') ? $singleElement.data('duration') : '';

			if(animateDelay != ''){
				$singleElement.css('animation-delay', animateDelay);
			}

			if(animateDuration != ''){
				$singleElement.css('animation-duration', animateDuration);
			}

			if($singleElement.parent('.portfolio-container')){

				$singleElement.waypoint(function() {
					if ($singleElement.hasClass('animated ' + animateTrans)) return;

					$singleElement.css('opacity','1').addClass('animated '+ animateTrans);

				},
				{
					offset: '80%',
					triggerOnce: true
				});

			} else {

				$singleElement.waypoint(function() {
					if ($singleElement.hasClass('animated ' + animateTrans)) return;
					$singleElement.css('opacity','1').addClass('animated '+ animateTrans);

				},
				{
					offset: '90%',
					triggerOnce: true
				});

			}

			
		});

		var $portElem = $('.pix-animate-portfolio');
		portfolioImageOnScroll( $portElem );
		
		// Owl Carousel
		if ( ! $('body').hasClass('compose-mode') ) {

			$(".composer-primary-slider").each( function( index, el ) {
				var $self = $(this);
				$self.owlCarousel({
					navText: ['',''],
					items: 1,
					nav: ( typeof ( $(this).data( 'nav' ) ) == 'undefined' ) ? false : $(this).data( 'nav' ),
					dots: ( typeof ( $(this).data( 'dots' ) ) == 'undefined' ) ? true : $(this).data( 'dots' ),
					autoplay : ( typeof ( $(this).data( 'autoplay' ) ) == 'undefined' ) ? false : $(this).data( 'autoplay' ),
					autoplayTimeout: ( typeof ( $(this).data( 'autoplay-timeout' ) ) == 'undefined' ) ? 5000 : $(this).data( 'autoplay-timeout' ),
					autoplayHoverPause : ( typeof ( $(this).data( 'autoplay-hover-pause' ) ) == 'undefined' ) ? true : $(this).data( 'autoplay-hover-pause' ),
					loop: ( typeof ( $(this).data( 'loop' ) ) == 'undefined' ) ? true : $(this).data( 'loop' ),
					animateOut : ( typeof ( $(this).data( 'animate-out' ) ) == 'undefined' ) ? false : $(this).data( 'animate-out' ),
					animateIn : ( typeof ( $(this).data( 'animate-in' ) ) == 'undefined' ) ? false : $(this).data( 'animate-in' ),
					mouseDrag : ( typeof ( $(this).data( 'mouse-drag' ) ) == 'undefined' ) ? true : $(this).data( 'mouse-drag' ),
					touchDrag : ( typeof ( $(this).data( 'touch-drag' ) ) == 'undefined' ) ? true : $(this).data( 'touch-drag' ),
					rtl: ( pix_composer.rtl === 'true' ) ? true : false,
					onInitialized: function(){
						$self.find('.slide-title, .slide-content, .pix_button').removeClass('animated fadeInUp');
						$self.find('.active .slide-title, .active .slide-content, .active .pix_button').addClass('animated fadeInUp');

						var header = $self.find('.active .slider-content').data('header');

						if( header == 'white' ) {
							$('.header-wrap').addClass('dark');
							$('.pageTopCon').addClass('top-sec-dark');
						} else if( header == 'black' ) {
							$('.header-wrap').removeClass('dark');
							$('.pageTopCon').removeClass('top-sec-dark');
						}

					},
					onTranslated: function(){
						$self.find('.slide-title, .slide-content, .pix_button').removeClass('animated fadeInUp');
						$self.find('.active .slide-title, .active .slide-content, .active .pix_button').addClass('animated fadeInUp');

						var header = $self.find('.active .slider-content').data('header');

						if( header == 'white' ) {
							$('.header-wrap').addClass('dark');
							$('.pageTopCon').addClass('top-sec-dark');
						} else if( header == 'black' ) {
							$('.header-wrap').removeClass('dark');
							$('.pageTopCon').removeClass('top-sec-dark');
						}

					}
				});
			});

			var $owlCarousel = $(".owl-carousel");

			if ( $owlCarousel.length ) {

				$owlCarousel.each( function( index, el ) {

					var elem = {};
					elem.Items              = ( typeof ( $(this).data( 'items' ) ) == 'undefined' ) ? 3 : $(this).data( 'items' ), 
					elem.Margin             = ( typeof ( $(this).data( 'margin' ) ) == 'undefined' ) ? 30 : $(this).data( 'margin' ),
					elem.Loop               = ( typeof ( $(this).data( 'loop' ) ) == 'undefined' ) ? true : $(this).data( 'loop' ),
					elem.Center             = ( typeof ( $(this).data( 'center' ) ) == 'undefined' ) ? false : $(this).data( 'center' ),
					elem.MouseDrag          = ( typeof ( $(this).data( 'mouse-drag' ) ) == 'undefined' ) ? true : $(this).data( 'mouse-drag' ),
					elem.TouchDrag          = ( typeof ( $(this).data( 'touch-drag' ) ) == 'undefined' ) ? true : $(this).data( 'touch-drag' ),
					elem.StagePadding       = ( typeof ( $(this).data( 'stage-padding' ) ) == 'undefined' ) ? 0 : $(this).data( 'stage-padding' ),
					elem.StartPosition      = ( typeof ( $(this).data( 'start-position' ) ) == 'undefined' ) ? 0 : $(this).data( 'start-position' ),
					elem.Nav                = ( typeof ( $(this).data( 'nav' ) ) == 'undefined' ) ? false : $(this).data( 'nav' ),
					elem.Dots               = ( typeof ( $(this).data( 'dots' ) ) == 'undefined' ) ? true : $(this).data( 'dots' ),
					elem.Autoplay           = ( typeof ( $(this).data( 'autoplay' ) ) == 'undefined' ) ? false : $(this).data( 'autoplay' ),
					elem.AutoHeight         = ( typeof ( $(this).data( 'autoHeight' ) ) == 'undefined' ) ? false : $(this).data( 'autoHeight' ),
					elem.AutoplayTimeout    = ( typeof ( $(this).data( 'autoplay-timeout' ) ) == 'undefined' ) ? 5000 : $(this).data( 'autoplay-timeout' ),
					elem.AutoplayHoverPause = ( typeof ( $(this).data( 'autoplay-hover-pause' ) ) == 'undefined' ) ? true : $(this).data( 'autoplay-hover-pause' ),
					elem.AnimateOut         = ( typeof ( $(this).data( 'animate-out' ) ) == 'undefined' ) ? false : $(this).data( 'animate-out' ),
					elem.AnimateIn          = ( typeof ( $(this).data( 'animate-in' ) ) == 'undefined' ) ? false : $(this).data( 'animate-in' ),
					elem.Video              = ( typeof ( $(this).data( 'video' ) ) == 'undefined' ) ? false : $(this).data( 'video' );

					if ( elem.Items >= 2 ) {
						elem.TabItems = 2;
					} else {
						elem.TabItems = 1;
					}

					var $owl = $(this);

					$(this).owlCarousel({
						navText: ['',''],
						items: elem.Items,
						margin: elem.Margin,
						loop: elem.Loop,
						center: elem.Center,
						mouseDrag: elem.MouseDrag,
						touchDrag: elem.TouchDrag,
						stagePadding: elem.StagePadding,
						startPosition: elem.StartPosition,
						nav: elem.Nav,
						dots: elem.Dots,
						rtl: ( pix_composer.rtl === 'true' ) ? true : false,
						autoplay: elem.Autoplay,
						autoplayTimeout: elem.AutoplayTimeout,
						autoplayHoverPause: elem.AutoplayHoverPause,
						autoHeight: elem.AutoHeight,
						responsive: {0:{'items':1},768:{'items':elem.TabItems},991:{'items': elem.Items },1199:{'items': elem.Items }},
						animateOut: elem.AnimateOut,
						animateIn: elem.AnimateIn,
						video: elem.Video,
						onInitialized: function () {
													
							var id = window.location.hash.replace('#', '');
							if(id) {
								var $id = $('#' + id );
								if($id) {
									$('html,body').animate({
										scrollTop: $id.offset().top
									}, 1000);
								}
							}

							var $self = $(this.$element[0]),
								$item = $self.find('.owl-item');

							if( ! $item.length ) {
								return;
							}

							if( true == elem.Loop ) {
								var $hoverBox = $item.find('.hover-box');
								if( $hoverBox.length ) {
									initHoverbox( $hoverBox );
								}							
							}

							if( elem.Center ) {

								$item.on('click', function() {

									if( $(this).hasClass('center') && $(this).hasClass('active') ) {
										return;
									}

									var curIndex = $(this).index(),
										activeIndex = $self.find('.center').index();

									if( curIndex < activeIndex ) {
										$owl.trigger('prev.owl.carousel');
									} else {
										$owl.trigger('next.owl.carousel');
									}

								});

							}
							
						},
						onChanged: function() {
							if ( elem.Items > 1  && elem.AnimateIn ) {
								var $item = $(this.$element[0]).find('.owl-item'),
									$curItem = $(this.$element[0]).find('.owl-item.active'),
									$prevItem = $curItem.first().prev(),
									$nextItem = $curItem.last().next();

								$(this.$element[0]).find('.owl-item').removeClass('animated '+ elem.AnimateIn);
								$prevItem.addClass('animated '+ elem.AnimateIn);
								$nextItem.addClass('animated '+ elem.AnimateIn);
							}
						},
					});
					
				});

			} else {
				
				var id = window.location.hash.replace('#', '');
				if(id) {
					var $id = $('#' + id );
					if($id) {
						$('html,body').animate({
							scrollTop: $id.offset().top
						}, 1000);
					}
				}

			}
		}	
				
		/* Isotope js */ 
		// cache container
		var $container = $('.portfolio-contents'),
			$portfolioInnerText = $container.find('.portfolio-inner-text');
		// initialize isotope

		if($portfolioInnerText.length > 0 ){
			$portfolioInnerText.css('height', $container.find('.element').first().height());
		}

		$container.isotope({
			itemSelector : '.pix-portfolio-item',
			percentPosition: true,
			masonry : {
				columnWidth : '.portfolio-grid-sizer'
			}
		});



		var  $masonryContainer = $('.blog-isotope'), $filterCon = $("#filters");
		$masonryContainer.isotope({
			itemSelector : '.element',
			masonry : {
				columnWidth : 1
			}
		});

		if($filterCon.hasClass('dropdown')){
			$filterCon.find('.selected').parent('li').css('display', 'none');
		}
		
		/* Portfolio Filter - Dropdown Style */
		$('.top-active').on('click', function(e) {
			e.preventDefault();
			
			$(this).next('#filters').slideToggle('400');

		});

		// filter items when filter link is clicked
		$('#filters').on( 'click', 'a', function(e){
			var $this = $(this),
				$filter = $this.parents('#filters');

			$portElem.waypoint('destroy');


			if($filter.hasClass('dropdown')){
				$filter.slideUp(400, function(){
					$this.parent('li').css('display', 'none');
					$this.parent('li').siblings().css('display', 'block');
				});
				$filter.prev('.top-active').find('.txt').text($this.text());
			}

			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
				return false;
			}
			

			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');



			var selector = $(this).attr('data-filter');
			
			$portElem = $(selector).find('.pix-animate-portfolio');
			// var $portElem = $('.pix-animate-portfolio');

			$container.isotope({ filter: selector });
			$container.isotope( 'on', 'layoutComplete', function() {
				
				portfolioImageOnScroll( $portElem );
			} ); 
			//var $demo = $('.demo-filter');
			//$demo.isotope({ filter: selector });
			
			$masonryContainer.isotope({ filter: selector });
			$masonryContainer.isotope( 'on', 'layoutComplete', function() {
				portfolioImageOnScroll( $portElem );
			});

			return false;
		});

	};

	$(window).load(function() {		

		afterPageLoad();
		if( $('body').hasClass('pix-preload-enabled') ){

			var $preLoaderCon = $('#preloader-con');
			$preLoaderCon.fadeOut(function(){
				//$mainCon.fadeIn(500);
				var trans = $main.data('preloadtrans');
				$main.removeClass().addClass('animated ' + trans);				
				$('body').delay(750).removeClass('pix-preloader-enabled');
			});

			$(document).on("click", 'a:not(.noajax, .woocommerce a, .btn, .button, [data-month], .popup-gallery, .popup-video, [href$=".png"], [href$=".jpg"], [href$=".jpeg"], [href$=".svg"], [href$=".mp4"], [href$=".webm"], [href$=".ogg"], [href$=".mp3"], [href^="#"], [href^="mailto:"], [href=""], [href*="wp-login"], [href^="tel:"], [href*="wp-admin"], .dot-nav-noajax, .pix-dropdown-arrow)', function(e) {

				var attr = $(this).attr('href');

				if ( e.shiftKey || e.ctrlKey || e.metaKey || '_blank' == $.trim( $(this).attr('target') ) || typeof attr === typeof undefined || attr === false || window.location.href.split('#')[0] == attr.split('#')[0] ) { 
					return;
				}

				$('body').addClass('pix-preloader-enabled');
				$preLoaderCon.fadeIn();

			});
			
		}

		if( $('body').hasClass('like-count-on-ajax') ){

			if( $( '.pix-like-me' ).length ) {

				$( '.pix-like-me' ).each(function(){

					var $self = $(this),
						id = $self.data('id'),
						getURL = pix_composer.ajaxurl+'?action=ajax_get_like_count&id='+id;

					$.get( getURL, function( data ) {
						$self.find('.like-count').html(data);
					});

				});
			}			
			
		}		

		$('.tool-tip').tooltip();

		$('.mobile-menu-menu-nav li.menu-item-has-children').on('click', '.pix-dropdown-arrow, a[href="#"], a[href=""]', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var $li = $(this).parent('li');

			$li.find('.sub-menu').first().stop().slideToggle();

			if( $(this).hasClass('pix-dropdown-arrow') ){
				$(this).toggleClass('pix-bottom-arrow');
			} else {
				$li.find('.pix-dropdown-arrow').toggleClass('pix-bottom-arrow');
			}
			
		});

		var changeHashInURL = ($('body').hasClass('pix-ajaxify')) ? false : true;
		$('.mobile-menu-inner').amzOnePageNav({
			currentClass: 'current-menu-item',
			changeHash: changeHashInURL,
			filter: ':not(.external)',
			begin: function() { 
				if($('.mobile-menu-nav').hasClass('mobile-nav')){
					$('.pix-menu-trigger').trigger('click');
				}
			},
		});


		// Load More
		var $loadMoreBtn = $( '.load-more-btn' );

		if ( $loadMoreBtn.length ) {

			if ( $loadMoreBtn.hasClass( 'amz-autoload') ) {

				$( window ).on('scroll', function() { 

					if( $( window ).scrollTop() >= $( '.load-container' ).offset().top + $( '.load-container' ).outerHeight() - window.innerHeight ) { 

						if( $loadMoreBtn.hasClass('done-loading') || $loadMoreBtn.hasClass( 'disabled' ) ) {
							return;
						}

						$loadMoreBtn.find('a').trigger('click');

					}

				});
			}

			$( '.load-more-btn' ).on( 'click', 'a', function(e) {
				e.preventDefault();
				
				loadMore( $(this) );
				
			});
		}

	});

	//Back To Top
	$("#back-top").hide();

	var lastScrollTop = 0;
	$(window).scroll(function(){

		var scrollTopVal = $(this).scrollTop();
		
		if( $(this).scrollTop() > 100 ){
			$("#back-top").fadeIn();
		}else{
			$("#back-top").fadeOut();
		}

		var $headerConScrollUp = $('.header-con.pix-sticky-header.pix-sticky-header-scroll-up');

		if($headerConScrollUp.length > 0){

			if ( scrollTopVal > lastScrollTop ){
				$headerConScrollUp.addClass('hide-sticky-header');
			} else {
				$headerConScrollUp.removeClass('hide-sticky-header');
			}

			lastScrollTop = scrollTopVal;

		}

	});

	$("#back-top a").click(function(){
		$("body,html").animate({
			scrollTop:0},800);
			return false;
	});


	// Header Widget
	var $headerWidgetCon = $("#headerWidgetCon"),
		$toggleBtn = $headerWidgetCon.find('.toggleBtn'),
		headerWidgetStatus = 0;
	
	if($headerWidgetCon.length > 0 ){

		$toggleBtn.on('click', function(e) {
			e.preventDefault();
			
			if(headerWidgetStatus == 0){
				$headerWidgetCon.animate({bottom: -$headerWidgetCon.outerHeight()});
				$toggleBtn.addClass('close').removeClass('open');
				headerWidgetStatus = 1;
			}else{
				$headerWidgetCon.animate({bottom: -2});         
				$toggleBtn.addClass('open').removeClass('close');
				headerWidgetStatus = 0;
			}
			
		});
	}

	/* End of Header Scripts */

	init();

	$('#pix-header-search-form').on('submit',
		function(e){
			e.preventDefault();
			var host = pix_composer.rootUrl + "?s=", searchUrl;
			searchUrl = host + $(this).find('.pix-search').val();

			if($(window).scrollTop() > 10){
				$("body,html").animate({ scrollTop:0 },300,function(){
					history.pushState({}, '', searchUrl);
					loadPage(searchUrl);
				});
			}else{
				history.pushState({}, '', searchUrl);
				loadPage(searchUrl);
			}	
		}
	);

	/* Ajaxify Navigation */
	var ajaxLoad = function(html) {
		document.title = html
		.match(/<title>(.*?)<\/title>/)[1]
		.trim()
		.decodeHTML();		
	},

	documentHtml = function(html){
		// Prepare
		var result = String(html).replace(/<\!DOCTYPE[^>]*>/i, '')
								 .replace(/<(html|head|body|title|script|style)([\s\>])/gi,'<div id="document-$1"$2')
								 .replace(/<\/(html|head|body|title|script|style)\>/gi,'</div>');
		// Return
		return result;
	},

	loadPage = function(href) {	
		
		$.ajax({
			url: href,
			dataType: "html",
			beforeSend: function(){

				$mainCon.height(($(window).height()) + 200);
				

				var trans = $main.data('ajaxtransout');
				$main.removeClass().addClass('animated ' + trans);
					
					if ($("#pix-loadingbar").length > 0) {
						$('#pix-loadingbar').delay(750).show(function(){
							$main.html('');
						});
					}
				

			}

		}).done(function(data) {
			var $data 		= $(documentHtml(data)),
				$dataHead	= $data.find('#document-head:first'),
				$dataBody	= $data.find('#document-body:first #wrapper'),
				bodyClasses = $data.find('#document-body:first').attr('class'),
				htmlFiltered = $('#wrapper', data).html(),

				rootUrl 	= pix_composer.rootUrl,
				relativeUrl = href.replace(rootUrl,''),
				url 		= href,
				$menu_list, $scripts, $embeddedStyle, $wpadminbar;

			$menu_list = $data.find('.main-nav');

			//Add classes to body
			$('body').attr('class', bodyClasses);

			//Embeded Style
			$embeddedStyle = $dataHead.find('#document-style');

			var $pixAllStyle = $('head').find('#pix-all-styles');
			if($pixAllStyle.length){
				$pixAllStyle.html('');
			}else{				
				$('head').append('<style media="screen" id="pix-all-styles"></style>');
				$pixAllStyle = $('head').find('#pix-all-styles');
			}
			var newStyles = '';
			$embeddedStyle.each(function(){
				var media = ($(this).attr('media')) ? $(this).attr('media') : 'screen';

				if(media == 'screen'){
					newStyles += $(this).html();
				}

			});
			
			$pixAllStyle.html(newStyles);

			// Fetch the scripts
			$scripts = $dataBody.find('#document-script');
			if ( $scripts.length ) $scripts.detach();		

			if(!htmlFiltered){
				document.location.href = href;
				return false;
			}

			$main.html(htmlFiltered).fadeIn();
			$mainCon.height('auto');
			ajaxLoad(data);

			//Append new menu HTML to provided classs
			$('.main-nav').html($menu_list.html());

			//Change wpadminbar edit link id.
			var $currwpadminbar = $('#wpadminbar');
			if($currwpadminbar.length > 0 ){
				$wpadminbar = $data.find('#wpadminbar');

				if( $wpadminbar.length > 0 ){
					$('#wpadminbar').html($wpadminbar.html());
				}else{
					$currwpadminbar.remove();
				}
			}

			// Add the scripts
			$scripts.each(function(){
				var scriptText = $(this).html();
					
				if ( '' != scriptText ) {
					var scriptNode = document.createElement('script');
					scriptNode.appendChild(document.createTextNode(scriptText));
					contentNode.appendChild(scriptNode);
				} else {
					$.getScript( $(this).attr('src') );
				}
			});

			init();
			$(window).trigger('load');
			
			if (typeof window['vc_js'] == 'function') {
				window.vc_js();
			}

			if ($("#pix-loadingbar").length > 0) {
				$('#pix-loadingbar').hide(function(){
					var trans = $main.data('ajaxtransin');
					$main.removeClass().addClass('animated ' + trans);
				});
			}			

			// Inform Google Analytics of the change
			if ( typeof window.pageTracker !== 'undefined' ) window.pageTracker._trackPageview(relativeUrl);

			// Inform ReInvigorate of a state change
			if ( typeof window.reinvigorate !== 'undefined' && typeof window.reinvigorate.ajax_track !== 'undefined' )
				reinvigorate.ajax_track(url);



		}).error(function(){

			document.location.href = href;
			return false;

		});
	};

	// Used to detect initial (useless) popstate.
	// If history.state exists, assume browser isn't going to fire initial popstate.
	var popped = ('state' in window.history && window.history.state !== null), initialURL = location.href;

	if($('body').hasClass('pix-ajaxify')){

		$(window).on("popstate", function(e) {
				var initialPop = !popped && location.href == initialURL
				popped = true
			
				if (initialPop) return;

				loadPage(location.href);
		});

		$(document).on("click", 'a:not(.noajax, [href^="#"], [href^=""], [href=""], [href*="wp-login"], [href*="wp-admin"], .dot-nav-noajax, .pix-dropdown-arrow)', function(e) {
			var self = $(this),
				href = self.attr("href");

			// Continue as normal for cmd clicks etc
			if ( e.which == 2 || e.metaKey ) return true;

			if($('.mobile-menu-nav').hasClass('mobile-nav')){
				$('.pix-menu-trigger').trigger('click');
			}
			
			if (href.indexOf(document.domain) > -1 || href.indexOf(':') === -1){
				if($(window).scrollTop() > 10){

					$("body,html").animate({ scrollTop:0 },300,function(){
						history.pushState({}, '', href);
						loadPage(href);
						
					});
				}else{
					history.pushState({}, '', href);
					loadPage(href);
				}

				return false;
			}
			
		});

	}


	/*----------------------------------------------------
	/* Make all anchor links smooth scrolling
	/*--------------------------------------------------*/
	jQuery(document).ready(function($) {

		if ( ! $('body').hasClass('seperate-mobile-nav') ) {

			$('.main-nav').each(function(){
				var navHtml = $(this).html();
				$('.mobile-menu-inner').append(navHtml);

				var $titleStyle = $('.mobile-menu-inner').find('.pix-title-style');

				$titleStyle.each(function(index, el) {

					var $this = $(this);

					$this.nextUntil('.pix-title-style').wrapAll('<ul class="sub-menu">');

					$this.addClass('menu-item-has-children moved-pix-title-style');

					// move ul inside li.pix-title-style
					$this.append( $this.next('.sub-menu') );
					$this.next('.sub-menu').remove();

					// then move li.pix-title-style next to parent li
					var $parentLi = $this.parents('li'),
						$parentLiNext = $parentLi.next('.moved-pix-title-style');

					if( $parentLiNext.length ) {
						var $moveItems = $parentLi.parent().find('.moved-pix-title-style'),
							elem = $this.prop('outerHTML');
						$( elem ).insertAfter( $moveItems.eq( $moveItems.length - 1 ) );

					} else {
						$this.insertAfter( $this.parents('li') );

					}

					$this.remove();

				});

			});

		} 
		


		// scroll handler
		var scrollToAnchor = function( id, event ) {
			// grab the element to scroll to based on the name
			var elem = $("a[name='"+ id +"']");
			// if that didn't work, look for an element with our ID
			if ( typeof( elem.offset() ) === "undefined" ) {
				elem = $("#"+id);
			}
			// if the destination element exists
			if ( typeof( elem.offset() ) !== "undefined" ) {
				// cancel default event propagation
				event.preventDefault();
				var scroll_to = elem.offset().top;
				// do the scroll
				$('html, body').animate({
					scrollTop: scroll_to
				}, 600, 'swing', function() { if (scroll_to > 46) window.location.hash = id; } );
			}
		};
		// bind to click event
		$("a.scroll-to, .scroll-to a").click(function( event ) {
			// only do this if it's an anchor link
			var href = $(this).attr("href");
			if ( href.match("#") && href !== '#' && $(this).parents(".tabs").length !== 1 ) {
				// scroll to the location
				var parts = href.split('#'),
					url = parts[0],
					target = parts[1];
			if ((!url || url == window.location.href.split('#')[0]) && target)
				scrollToAnchor( target, event );
			}
		});

		$('.portfolio-search').on('keypress', '.search-field', function(e) {

			var $self = $(this),
				search = $self.val();

			if( e.keyCode === 13 ) {
               // Call portfolio search ajax
		    	portfolioSearch( $self, search );
        	}		

		});

		$('.portfolio-search').on('click', '.clear-search', function(e) {

			var $self = $(this),
				search = $self.val();

			portfolioSearch( $self, '' );

		});

	}); 

	$('.blog-modern').on('click', '.show-content-arrow', function(e) {
		e.preventDefault();
		$(this).parents('.post-container').toggleClass('show-content');
	});

})(jQuery);