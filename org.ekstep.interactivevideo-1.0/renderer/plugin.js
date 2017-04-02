Plugin.extend({
    _type: 'interactivevideo',
    _isContainer: false,
    _render: true,
    /**init plugin data**/
    initPlugin: function(data) {

		/**check video src is available**/
    	if (typeof(data.video) != 'string') {
    		console.log('Video not defined');
    		console.log(data.video);
    		return false;
    	}

		/**check question data is available**/
    	if (typeof(data.questions) != 'object') {
    		console.log('Questions not defined');
    		console.log(data.questions);
    		return false;
    	}

		/**Get parent div of canvas**/
		var parentDiv = document.getElementById(Renderer.divIds.gameArea);
        var div = document.getElementById("testDiv");
        div = document.createElement('div');
        div.style.width = "100%";

        /**create html for video**/
        var videohtml = [];
        videohtml.push('<div id="container" align="center">');
        videohtml.push('<video style="position:relative; z-index:-1;" width="570" height="325" autoplay>');
        videohtml.push('<source src="'+data.video+'" type="video/mp4"/>');
        videohtml.push('</video>');
        videohtml.push('<div id="interactivevideo-question-container" style="display:none; position:relative; color: rgb(230, 200, 98);z-index:1;top: -330px; background: #000; opacity: 0.8; height: 330px; "></div>');
        videohtml.push('</div>');
        div.innerHTML = videohtml.join('');

		/**Append html to parrent div**/
        parentDiv.insertBefore(div, parentDiv.childNodes[0]);
        this._self = new createjs.DOMElement(div);

		/**Get Data from Questions object**/
        var timer = data.questions;

		/**Remove data and identifier from Questions object**/
		for (var key in timer) {
			if (timer[key] == 'data') {
				timer.splice(key, 1);
			}
			if (timer[key] == 'identifier') {
				timer.splice(key, 1);
			}
		}

		/**Get video html**/
		var $oVideo = jQuery('video');

		/**Set flag play/pause video**/
		var flag = false;

		/**Use temperary variable to avoid time conflicts**/
		var temp = '';

		/**Triggerd timeupdate to get current time of video**/
        $oVideo.bind('timeupdate', function() {
			var video = $(this).get(0);
			var iNow = video.currentTime;

			/**Check for video and quetion time**/
			jQuery.each(timer, function(key, value) {
				if (typeof(value.data.question) != 'string') {
					console.log("Invalid question identifier : " + identifier);
					return false;
				}

				/**If it is new then set flag to false**/
				if(temp != Math.round(iNow))
				{
					flag =false;
				}

				/**check for current video time and question display time and also check flag**/
				if (Math.round(iNow) == value.sec && !flag) {
					jQuery("#interactivevideo-question-container").show();

					/**Create Html for questions**/
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

					/**Video pause for show questions**/
					video.pause();

					/**Add Event for submit question**/
					var elem = document.getElementById('videocover');
					elem.addEventListener('click', function(event) {
						var video = $("video").get(0);

						/**Play video after submitting answer and hide question**/
						video.play();
						jQuery("#interactivevideo-question-container").hide();

						/**Set flag and current data**/
						flag = true;
						temp = Math.round(iNow);
						return false;
					});
				}
			});
		});
    },

	/**Build Questions from data**/
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
    }
});
