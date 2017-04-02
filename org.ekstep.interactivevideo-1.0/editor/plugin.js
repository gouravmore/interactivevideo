EkstepEditor.basePlugin.extend({
    initialize: function() {
		var templatePath = EkstepEditorAPI.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/popup.html");
		EkstepEditorAPI.getService('popup').loadNgModules(templatePath);
		EkstepEditorAPI.addEventListener(this.manifest.id + ":showPopup", this.openInteractivevideoBrowser, this);
    },
    newInstance: function() {
		//this.openInteractivevideoBrowser(this);
        var props = this.convertToFabric(this.attributes);
        this.editorObj = new fabric.Rect({ top: 5, left: 20, width: 600, height: 380, fill: '#999999' });
        if (this.editorObj) this.editorObj.setStroke(props.stroke);
    },
    onConfigChange: function(key, value) {
        var instance = EkstepEditorAPI.getCurrentObject();
        var editorObj = instance.editorObj;
        switch (key) {
            case 'questions':
				var data = [];
				jQuery.each(JSON.parse(value), function( key, val ) {
					var queObj = {};
                    queObj.sec = val.sec;
                    queObj.identifier = val.identifier;

					EkstepEditorAPI.getService('assessment').getItem(val.identifier, function(err, resp) {
						queObj.data = resp.data.result.assessment_item;
						data.push(queObj);
						instance.attributes.questions = data;
					});
				});

			case 'video':
				instance.attributes.video = value;
				break;
        }

        EkstepEditorAPI.render();
        EkstepEditorAPI.dispatchEvent('object:modified', { target: EkstepEditorAPI.getEditorObject() });
    },
    /**
     *
     * open assessment browser to get assessment data.
     * @memberof assessment
     *
     */
    openInteractivevideoBrowser: function(event, callback) {
		var instance = this;
		instance.isUploadVideo = false;
		//EkstepEditorAPI.ngSafeApply(EkstepEditorAPI.getAngularScope());
		var modalController = function($scope) {
			$scope.isUploadVideo = instance.isUploadVideo;
			$scope.play = instance.play;
			$scope.pause = instance.pause;
			$scope.add = instance.add;
			$scope.$on('ngDialog.opened', function(e, $dialog) {
				callback();
			});
		};
		EkstepEditorAPI.getService('popup').open({
			template: 'partials_org.ekstep.interactivevideo.html',
			controller: ['$scope', modalController],
			showClose: false,
			width: 900,
			className: 'ngdialog-theme-default'
		});
    },
    play: function(){
		var $oVideo = jQuery('video');
		$oVideo.get(0).play();
        $oVideo.bind('timeupdate', function() {
			var video = $(this).get(0);
			var iNow = video.currentTime;
		});
	},
	pause: function(){
		var $oVideo = jQuery('video');
		$oVideo.get(0).pause();
        $oVideo.bind('timeupdate', function() {
			var video = $(this).get(0);
			var iNow = video.currentTime;
		});
	},
	add: function(){
		var $oVideo = jQuery('video');
		var iNow = $oVideo.currentTime();
		alert(iNow);
	}
});
