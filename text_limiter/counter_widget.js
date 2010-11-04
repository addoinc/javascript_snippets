/*
  A jQuery object the implements a character limit for a textarea widget
  The counter div turn red when there negative characters remaining ;-).
  You can also choose to force the user not type any more characters (instead of displaying negative characters)
*/
var TextLimiter = function(text_area_obj) {
    var self = {
	init: function() {
	    self.char_count = parseInt($(text_area_obj).val().length);
	    $(text_area_obj).focus(function() {
		if( $(text_area_obj).val() == "Maximum allowed length is 200" ) {
		    $(text_area_obj).val("");
		}
	    });
	    $(text_area_obj).blur(function() {
		if( $(text_area_obj).val() == "" ) {
		    $(text_area_obj).val("Maximum allowed length is 200")
		}
	    });
	    $(text_area_obj).keyup(function() {
		self.char_count = $(text_area_obj).val().length;
		var max_length = parseInt($(text_area_obj).attr('maxlength'));
		var remaining = max_length-self.char_count;
		if( self.char_count <= max_length ) {
		    $(text_area_obj).next('.counter').css('color', '#000000');
		    $(text_area_obj).next('.counter').html(remaining);
		    return true;
		} else {
		    //$(text_area_obj).val( text_area_obj.val().substr(0, max_length) );
		    $(text_area_obj).next('.counter').css('color', '#FF0000');
		    $(text_area_obj).next('.counter').text(remaining);
		    return false;
		}
	    });
	}
    }
    return self;
};

$(document).ready(function() {
    var counter_1 = TextLimiter($('#first'));
    counter_1.init();
    var counter_2 = TextLimiter($('#second'));
    counter_2.init();
});
