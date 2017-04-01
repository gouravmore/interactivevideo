EkstepEditor.basePlugin.extend({
    initialize: function() {
    },
    newInstance: function() {
        var props = this.convertToFabric(this.attributes);
        this.editorObj = new fabric.Rect({ top: 5, left: 20, width: 600, height: 380, fill: '#f55' });
        if (this.editorObj) this.editorObj.setStroke(props.stroke);
    },
    onConfigChange: function(key, value) {
		console.log(value);
		console.log(key);
        var instance = EkstepEditorAPI.getCurrentObject();
        var editorObj = instance.editorObj
        switch (key) {
            case 'questions':
                for () {
                    this.data.questions.push
                }
				this.data.questions = EkstepEditorAPI.getService('assessment').getItem('do_1122146810356531201168', function(err, resp) {
                    console.log(resp.data.result.assessment_item.options);
                });
				break;

			case 'video':
				this.data.video = value;
				break;
        }
        EkstepEditorAPI.render();
        EkstepEditorAPI.dispatchEvent('object:modified', { target: EkstepEditorAPI.getEditorObject() });
    }
});
