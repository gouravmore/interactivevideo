'use strict';

describe('Interactivevideo plugin', function() {
    var spyEvent;
    var stage, rect, circle, roundedRect, star, polygon, trapezium, arrow, doubleArrow;

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
});
