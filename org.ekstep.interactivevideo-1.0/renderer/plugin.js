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

		var $oVideo = jQuery('video');
        $oVideo.bind('timeupdate', function() {
			var video = $(this).get(0);
			var iNow = video.currentTime;

			jQuery.each(data.questions, function(key, value) {
				if (Math.round(iNow) == value.sec) {
					jQuery("#custom-message").show();
				jQuery('#custom-message').html('<div class="ui form">  <div class="grouped fields">    <label>How often do you use checkboxes?</label>    <div class="field">      <div class="ui radio checkbox">        <input type="radio" name="example2" checked="checked">        <label>Once a week</label>      </div>    </div>    <div class="field">      <div class="ui radio checkbox">        <input type="radio" name="example2">        <label>Once a day</label>      </div>    </div> </div><button class="ui button" id="videocover">Submit</button></div>');
				video.pause();
				var elem = document.getElementById('videocover');
				elem.addEventListener('click', function(event) {
					var video = $("video").get(0);
					video.play();
					jQuery("#custom-message").hide();

					return false;
				});
			}
			});
		});
    },
    drawBorder: function() {

    }

});
