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
	 * customLightbox - ver 0.0.1
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
})(jQuery);