var ProgressBar = function(elem){
    var current = 0;
    var self = {
	step: function() {
	    if( current == 8 ) {
		self.clear();
	    }
	    $(elem).removeClass('step_' + current);
	    current += 1;
	    $(elem).addClass('step_' + current);
	},
	clear: function() {
	    $(elem).removeClass('step_' + current);
	    current = 0;
	    $(elem).addClass('step_' + current);
	},
	percent_done: function() {
	    if( current > 0 ) {
		return (current/8)*100;
	    }
	    return 0;
	},
	complete: function() {
	    var fast_complete_timer;
	    if (fast_complete_timer) {
		window.clearInterval(fast_complete_timer);
	    }
	    fast_complete_timer = window.setInterval(function(){
                if( current < 8 ) {
		    self.step();
                } else {
		    window.clearInterval(fast_complete_timer);
		}
	    }, 10);
	}
    }
    return self;
};

/*  *************** TEST CODE FOR THE PROGRESS BAR ************
$(document).ready(function() {
	var p_bar = ProgressBar($('.progress_bar'));
	var step_timer;
	if (step_timer) {
            window.clearInterval(step_timeout);
        }
	step_timer = window.setInterval(function() { p_bar.step(); console.log( p_bar.precent_done ); }, 1000);
    });
****************************************************************/