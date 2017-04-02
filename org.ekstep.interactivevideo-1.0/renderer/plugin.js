Plugin.extend({
    _type: 'interactivevideo',
    _isContainer: false,
    _render: true,
    initPlugin: function(data) {
		var parentDiv = document.getElementById(Renderer.divIds.gameArea);
        var div = document.getElementById("testDiv");
        div = document.createElement('div');
        div.style.width = "100%";
        div.innerHTML = '<div id="container" align="center"><video style="position:relative; z-index:-1;" width="640" height="320" autoplay><source src="http://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4"/></video><div id="custom-message" style="position:relative; color: rgb(230, 200, 98);z-index:1;top: -200px; ">CENTERED TEXT ABOVE</div></div>';
        parentDiv.insertBefore(div, parentDiv.childNodes[0]);
        this._self = new createjs.DOMElement(div);

        var timer = data.questions;

		for (var key in timer) {
			if (timer[key] == 'data') {
				timer.splice(key, 1);
			}
			if (timer[key] == 'identifier') {
				timer.splice(key, 1);
			}
		}

		var $oVideo = jQuery('video');
		var flag = false;
		var a = '';
        $oVideo.bind('timeupdate', function() {
			var video = $(this).get(0);
			var iNow = video.currentTime;
			jQuery.each(timer, function(key, value) {
				if(a != Math.round(iNow))
				{
					flag =false;
				}
				if (Math.round(iNow) == value.sec && !flag) {
					jQuery("#custom-message").show();
					jQuery('#custom-message').html('<div class="ui form"> '+ value.data.name +'</div><button class="ui button" id="videocover">Submit</button></div>');
					video.pause();
					var elem = document.getElementById('videocover');
					elem.addEventListener('click', function(event) {
						var video = $("video").get(0);
						video.play();
						jQuery("#custom-message").hide();
						flag = true;
						a = Math.round(iNow);
						return false;
					});
				}
			});
		});
    },
    drawBorder: function() {

    }

});
