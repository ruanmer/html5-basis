(function($){	
	/*
	 * Checa se um elemento existe
	 * 
	 * @usage if ( $(this).exists() )
	 *
	 */
	$.fn.exists = function(){return $(this).length>0;}
	

	/*
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
			var value 	= getValue( this );
			var id		= ( this.id ) ? this.id : 'styled-field-' + ++styledFields;			
			var html 	=	'<'+ options.wrapper +' class="styled-field styled-field-'+ ( ( this.type == 'select-one' ) ? 'select' : this.type ) +'">' +
							  '<label class="styled-field-label" for="'+ id +'" />' + 
						  	'</'+ options.wrapper +'>';
					
			// set id
			this.id = id;
			
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
})(jQuery);