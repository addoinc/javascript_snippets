/********
  1) Include the prototype slider js file
  2) Inlude the following css files and the associated images

#ratings .rating_full {
  background-image: url('/images/rating_stars.png');
  width: 14px;
  height: 13px;
  background-position: 0% 0%;
  clear: none;
  float: left; }
#ratings .rating_half {
  background-image: url('/images/rating_stars.png');
  width: 14px;
  height: 13px;
  background-position: 0% 45%;
  clear: none;
  float: left; }
#ratings .rating_empty {
  background-image: url('/images/rating_stars.png');
  width: 14px;
  height: 13px;
  background-position: 0% 93%;
  clear: none;
  float: left; }
 ********/

function initialize_slider() {
    
    if( $('ratings_track') ) {
	
        slider = new Control.Slider('handle', 'ratings_track', {
	    onSlide: function(v) {
	        var rating = 0.5 * Math.round(v / 0.5);
		var classes = numeric_rating_to_css_class(rating);
		classes.each(function(e,i) {
		    if( !$('star'+(i+1)).hasClassName( e ) ) {
			$('star'+(i+1)).classNames().each(function(c,j) {
			    $('star'+(i+1)).removeClassName(c);
			});
			$('star'+(i+1)).addClassName(e);
			$('rating_desc').innerHTML = numeric_rating_to_text(rating);
		    }
		});
		$('rating').value = rating;
	    },
	    onChange: function(v) {
		var rating = 0.5 * Math.round(v / 0.5);
		var classes = numeric_rating_to_css_class(rating);
		classes.each(function(e,i) {
		    if( !$('star'+(i+1)).hasClassName( e ) ) {
			$('star'+(i+1)).classNames().each(function(c,j) {
		            $('star'+(i+1)).removeClassName(c);
		        });
			$('star'+(i+1)).addClassName(e);
			$('rating_desc').innerHTML = numeric_rating_to_text(rating);
		    }
		});
		$('rating').value = rating;
            },
	    range: $R(1,5),
	    increment: 0.5
        });
	slider.setValue( $('rating').value, 0 );
    }

}

function numeric_rating_to_css_class(rating) {
    var classes = [];
    (Math.floor(rating)).times(function(i) {
        classes.push("rating_full");
    });
    if(rating != Math.ceil(rating)) {
	classes.push("rating_half");
    }
    (5 - Math.ceil(rating)).times(function(i) {
        classes.push("rating_empty");
    });
    return classes;
}

function numeric_rating_to_text(rating) {
    if(rating >= 1 && rating < 2) {
	return "Improvement desired";
    } else if(rating >= 2 && rating < 3) {
	return "Fair";
    } else if(rating >= 3 && rating < 4) {
	return "Good";
    } else if(rating >= 4 && rating < 5) {
	return "Great!";
    } else if(rating >= 5) {
	return "Amazing!";
    }
}
