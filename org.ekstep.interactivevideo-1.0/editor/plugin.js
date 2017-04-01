EkstepEditor.basePlugin.extend({
    initialize: function() {
    },
    newInstance: function() {
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
    }
});
