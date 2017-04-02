EkstepEditor.basePlugin.extend({
    initialize: function() {
		//~ var templatePath = EkstepEditorAPI.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/popup.html");
		//~ EkstepEditorAPI.getService('popup').loadNgModules(templatePath);
		// EkstepEditorAPI.addEventListener(this.manifest.id + ":showPopup", this.openAssessmentBrowser, this);
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
				jQuery.each(JSON.parse(value), function( key, value ) {
					var queObj = {};
                    queObj.sec = value.sec;
                    queObj.identifier = value.identifier;

					EkstepEditorAPI.getService('assessment').getItem(value.identifier, function(err, resp) {
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
		//~ var instance = this;
		//~ var modalController = function($scope) {
            //~ $scope.$on('ngDialog.opened', function(e, $dialog) {
                //~ callback();
            //~ });
        //~ };
		//~ EkstepEditorAPI.getService('popup').open({
            //~ template: 'partials_org.ekstep.interactivevideo.html',
            //~ controller: ['$scope', modalController],
            //~ showClose: false,
            //~ width: 900,
            //~ className: 'ngdialog-theme-default'
        //~ });
        //~ var instance = this;
        //~ var callback = function(items, config) {
			//~ alert(items);
            //~ var assessmentData = { items: items, config: config };
            //~ EkstepEditorAPI.dispatchEvent(instance.manifest.id + ':renderQuiz', assessmentData);
        //~ };
        //~ EkstepEditorAPI.dispatchEvent("org.ekstep.assessmentbrowser:show", callback);
    }
});
