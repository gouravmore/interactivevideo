Plugin.extend({
    _type: 'interactivevideo',
    _isContainer: false,
    _render: true,
    initPlugin: function(data) {
    	if (typeof(data.video) != 'string') {
    		console.log('Video not defined');
    		console.log(data.video);
    		return false;
    	}

    	if (typeof(data.questions) != 'object') {
    		console.log('Questions not defined');
    		console.log(data.questions);
    		return false;
    	}

		var parentDiv = document.getElementById(Renderer.divIds.gameArea);
        var div = document.getElementById("testDiv");
        div = document.createElement('div');
        div.style.width = "100%";
        var videohtml = [];
        videohtml.push('<div id="container" align="center">');
        videohtml.push('<video style="position:relative; z-index:-1;" width="650" height="325" autoplay>');
        videohtml.push('<source src="'+data.video+'" type="video/mp4"/>');
        videohtml.push('</video>');
        videohtml.push('<div id="interactivevideo-question-container" style="display:none; position:relative; color: rgb(230, 200, 98);z-index:1;top: -330px; background: #000; opacity: 0.8; height: 330px; "></div>');
        videohtml.push('</div>');
        div.innerHTML = videohtml.join('');

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
				if (typeof(value.data.question) != 'string') {
					console.log("Invalid question identifier : " + identifier);
					return false;
				}

				if(a != Math.round(iNow))
				{
					flag =false;
				}

				if (Math.round(iNow) == value.sec && !flag) {
					jQuery("#interactivevideo-question-container").show();

			    	var html = [];
			    	html.push('<div class="ui-form"><div class="grouped-fields">');
			    	html.push('<p>' + value.data.question + '</p>');
			    	html.push('<ul>');
			    	jQuery.each(value.data.options, function(key, val) {
			    		html.push('<li><input type="radio" id="option'+val.value.resindex+'" name="interactivevideo-question" value="'+val.value.resvalue+'"><label for="option'+val.value.resindex+'">'+val.value.text+'</label><div class="check"></div></li>');
			    	});
			    	html.push('</ul>');
			    	html.push('<p><button id="videocover">Submit</button></p>');
			    	html.push('</div></div>');

					jQuery('#interactivevideo-question-container').html(html.join(''));

					video.pause();
					var elem = document.getElementById('videocover');
					elem.addEventListener('click', function(event) {
						var video = $("video").get(0);
						video.play();
						jQuery("#interactivevideo-question-container").hide();

						flag = true;
						a = Math.round(iNow);
						return false;
					});
				}
			});
		});
    },

    _buildQuestion: function(question) {
    	console.log(question);
    	var html = [];
    	html.push('<div id="interactivevideo-question-container">');
    	html.push('<h2>' + question.data.questions + '</p>');
    	html.push('<ul>');
    	jQuery.each(question.data.options, function(key, val) {
    		html.push('<li><label><input type="radio" name="question" value="'+val.value.resvalue+'" />' + val.value.resvalue + '</label></li>');
    	});
    	html.push('</ul>');

    	html.push('<p><button class="button">Submit</button></p>');

    	return html.join('');
    },

    drawBorder: function() {

    }

});
