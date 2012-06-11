(function($){	
	/*
	 * Checa se um elemento existe
	 * 
	 * @usage if ( $(this).exists() )
	 *
	 */
	$.fn.exists = function() { return $(this).length>0; }
	

	/*
	 * styledFields - ver 0.1.1
	 *
	 * Para customizar elementos de form
	 * 
	 * @support [select, file, radio, checkbox]
	 *
	 * @ex: 	<span class="styled-field styled-field-select">
	 * 				<span class="styled-field-value">Selecione</span>
	 *				<label class="styled-field-label" for="localidade-select">
	 *					<select></select>
	 *				</label>
	 *			</span>
	 *
	 */
	$.fn.styledFields = function(options) {
		var options = jQuery.extend({
			wrapper: 'span'	
		}, options);	
		
		var styledFields = 0;
				
		var getValue = function( self ) {
			return 	( self.type == 'file' ) 
						? self.value || self.getAttribute('value') || 'Escolha o arquivo' 
						: ( self.type == 'select-one' ) 
							? self.options[self.selectedIndex].innerHTML 
							: false;
		}
		
		return this.each(function(){
			var value     = getValue( this );
			var id        = this.id;
			var label_for = ( id ) ? id : 'styled-field-' + ++styled_fields_count;			
			var html      = '<'+ options.wrapper +''+ ( ( id ) ? ' id="styled-'+ id +'"' : '' ) +' class="styled-field styled-field-'+ ( ( this.type == 'select-one' ) ? 'select' : this.type ) +'">' +
								'<label class ="styled-field-label" for="'+ label_for +'" />' + 
							'</'+ options.wrapper +'>';
					
			// set id
			this.id = label_for;
			
			// build struture
			$(this)
				.addClass('styled-field-element')
				.wrap(html)
				.parent().parent().prepend('<span class="styled-field-value">'+ value +'</span>');	
			
			
			// change
			$(this).bind('change', function(){
	            var value = getValue( this );
				
	            $(this).parent().prev('span').text(value);  
	        });  
		});		
	};


	/*
	 * customLightbox - ver 0.0.1 ALPHA
	 */
	$.fn.customLightbox = function( options ) {
		var options = jQuery.extend({
			close: 'Close',
			content_html: null
		}, options);	

		var html_overlay      = '<div id="clightbox-overlay"></div>';		
		var html_clightbox    = '<div id="clightbox">' + 
									'<div id="clightbox-container">' +
										'<div id="clightbox-close">'+ options.close +'</div>' +
										'<div id="clightbox-content"></div>' +
									'</div>' +
								'</div>';	

		/* append */
		$('body').prepend( html_overlay + html_clightbox );

		/* close and remove */
		$('#clightbox-overlay, #clightbox-close').live('click', function() {
		    
			$('#clightbox, #clightbox-overlay').fadeOut( function() {
				$('#clightbox-content').empty();
			});

		});
		
		/* this */
		$(this).on('click', function( event ){
			var content_html = ''; 
			var self         = $(this);

		    content_html = options.content_html( self );

		    $('#clightbox-content').append( content_html );
	    
		    $('#clightbox, #clightbox-overlay').fadeIn();

		    return false;
		});
	};


	/*
	 * emulatePlaceholder - ver 0.0.1 ALPHA
	 */
	$.fn.emulatePlaceholder = function( options ) {	
		var options = jQuery.extend({
			wrapper: 'span'	
		}, options);

	    var setLabelOpacity = function(e){        
	        if ( this.value == false )
	            $(this).siblings('label').css('opacity', e.data.opacity);
	    };
	    
	    return this.each(function(){
	    	if ( $(this).parent('.e-placeholder') ) {
	    		$(this)
	                .on('focus', { opacity: 0.5 }, setLabelOpacity)
	                .on('keydown', { opacity: 0 }, setLabelOpacity)
	                .on('blur', { opacity: 1 }, setLabelOpacity)	               	
	        		.prev('label').css('opacity', 1);
	    	};

			var top_value      = parseInt( $(this).css('paddingTop') , 10 ) + parseInt( $(this).css('borderTopWidth'), 10 );
			var left_value     = parseInt( $(this).css('paddingLeft') , 10 ) + parseInt( $(this).css('borderLeftWidth'), 10 );
			var fontsize_value = $(this).css('fontSize');
			var color_value    = $(this).css('color');

	    	$('.e-placeholder')
	    		.css({ 'position' : 'relative', 'display' : 'inline-block' })
	    		.find('label')
	    			.css({ 'position' : 'absolute', 'top' : top_value, 'left' : left_value, 'fontSize' : fontsize_value, 'color' : color_value })
	    			.on('click', function() {
	    				$(this).next('input:text').trigger('focus');
	    			});
	    });
	};

	/* 
	 * animateAuto 
	 */
    $.fn.animateAuto = function(prop, speed, callback){
	    var elem, height, width;
	    return this.each(function(i, el){
	        el = jQuery(el), elem = el.clone().css({'height':'auto','width':'auto'}).appendTo('body');
	        height = elem.css('height'),
	        width = elem.css('width'),
	        elem.remove();

	        if(prop === 'height')
	            el.animate({'height':height}, speed, callback);
	        else if(prop === 'width')
	            el.animate({'width':width}, speed, callback);
	        else if(prop === 'both')
	            el.animate({'width':width,'height':height}, speed, callback);
	    });
	};
})(jQuery);