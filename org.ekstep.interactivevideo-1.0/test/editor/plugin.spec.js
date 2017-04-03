'use strict';

describe('Interactivevideo plugin', function() {
    var stage;

    beforeAll(function(done) {
        ContentEditorTestFramework.init(function() {
            stage = EkstepEditorAPI.instantiatePlugin('org.ekstep.stage');
            EkstepEditorAPI.loadPlugin('org.ekstep.interactivevideo', '1.0');
            done();
        });
    });

    describe('should show interacive video popup', function() {
        it('On load first step should be shown', function() {
            expect(stage.isUploadVideo).toBeFalsy();
        });
    });

    describe('should show interacive video popup', function() {
        it('On load first step should be shown', function() {
            // Test Rectangle
            stage.openInteractivevideoBrowser();
            expect(stage.isUploadVideo).toBeTruthy();
        });
    });


});
