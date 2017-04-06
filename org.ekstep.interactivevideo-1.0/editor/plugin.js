/**
 *
 * plugin to add interactive video to stage
 * @class interactivevideo
 * @extends EkstepEditor.basePlugin
 * @author Gourav/Ashwin <gourav_m@tekditechnologies.com>
 * @fires org.ekstep.interactivevideo:show
 * @listens org.ekstep.interactivevideo:showPopup
 */
EkstepEditor.basePlugin.extend({
    /**
     *
     * Registers events.
     * @memberof interactivevideo
     */
    currentInstance: undefined,
    initialize: function() {
        var templatePath = EkstepEditorAPI.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/popup.html");
        EkstepEditorAPI.getService('popup').loadNgModules(templatePath);
        EkstepEditorAPI.addEventListener(this.manifest.id + ":showPopup", this.openInteractivevideoBrowser, this);
    },
    /**
     *
     * Registers events.
     * @memberof interactivevideo
     */
    newInstance: function() {
        var props = this.convertToFabric(this.attributes);
        this.editorObj = new fabric.Rect({ top: 5, left: 20, width: 600, height: 380, fill: '#999' });
        if (this.editorObj) this.editorObj.setStroke(props.stroke);
    },
    /**
     *
     * Get triggerd on config change
     * @param key {Object} key of config
     * @param value {Object} data of config
     * @memberof interactivevideo
     *
     */
    onConfigChange: function(key, value) {
        var instance = EkstepEditorAPI.getCurrentObject();
        var editorObj = instance.editorObj;
        switch (key) {
            case 'questions':
                var data = [];
                jQuery.each(JSON.parse(value), function(key, val) {
                    var queObj = {};
                    queObj.sec = val.sec;
                    queObj.identifier = val.identifier;

                    EkstepEditorAPI.getService('assessment').getItem(val.identifier, function(err, resp) {
                        queObj.data = resp.data.result.assessment_item;
                        data.push(queObj);
                        instance.attributes.questions = data;
                    });
                });
                break;

            case 'video':
                instance.attributes.video = value;
                break;
        }

        EkstepEditorAPI.render();
        EkstepEditorAPI.dispatchEvent('object:modified', { target: EkstepEditorAPI.getEditorObject() });
    },
    /**
     *
     * open interactivevideo popup to get interactivevideo data.
     * @memberof interactivevideo
     *
     */
    openInteractivevideoBrowser: function(event, callback) {
        var instance = this;
        instance.isUploadVideo = true;
        instance.isVideoSrc = true;
        var modalController = function($scope) {
            $scope.isUploadVideo = instance.isUploadVideo;
            $scope.play = instance.play;
            $scope.pause = instance.pause;
            $scope.add = instance.add;
            $scope.next = instance.next;
            $scope.done = instance.done;
            $scope.isVideoSrc = instance.isVideoSrc;
            $scope.redirectToUploadVideo = instance.redirectToUploadVideo;
            $scope.currentVideoTime = instance.currentVideoTime;
        };
        EkstepEditorAPI.getService('popup').open({
            template: 'partials_org.ekstep.interactivevideo.html',
            controller: ['$scope', modalController],
            showClose: false,
            width: 900,
            className: 'ngdialog-theme-default'
        });
    },
    /**
     *
     * Play function to play video inside interactivevideo popup.
     * @memberof interactivevideo
     *
     */
    play: function() {
        var $oVideo = jQuery('video');
        $oVideo.get(0).play();
        $oVideo.bind('timeupdate', function() {
            var video = $(this).get(0);
            var iNow = video.currentTime;
        });
    },
    /**
     *
     * pause function to pause video inside interactivevideo popup.
     * @memberof interactivevideo
     *
     */
    pause: function() {
        var $oVideo = jQuery('video');
        $oVideo.get(0).pause();
        $oVideo.bind('timeupdate', function() {
            var video = $(this).get(0);
            var iNow = video.currentTime;
        });
    },
    /**
     *
     * add function to add question to video inside popup.
     * @memberof interactivevideo
     *
     */
    add: function() {
        var instance = this;
        var x = document.getElementById("questionVideo");
        setTimeout(function() {
            jQuery(".question-repeatable-container input:last").val(x.currentTime);
            EkstepEditorAPI.ngSafeApply(EkstepEditorAPI.getAngularScope());
        }, 1000);
    },
    /**
     *
     * next function to switch next step to add interactivevideo.
     * @memberof interactivevideo
     *
     */
    next: function() {
        var instance = this;
        if (jQuery("#videoSrc").val() != '') {
            instance.isUploadVideo = false;
            jQuery('#testVideo video source').attr('src', jQuery("#videoSrc").val());
            jQuery("#testVideo video")[0].load();

            jQuery(".question-repeatable-container").repeatable({
                template: '<div class="field"><label for="videoQuestion[]">Question no {?}.</label><input type="text" name="videoquestion[]" style="width: 40%; margin-bottom: 5px;"/> <input type="text" name="videoTime[]" style="width: 39%;margin-bottom: 5px;"/></div>',
                max: 10,
                startWith: 0,
                addTrigger: '.addQuestions',
                deleteTrigger: ".deleteQuestions",

            });
        } else {
            instance.isVideoSrc = false;
        }
        EkstepEditorAPI.ngSafeApply(EkstepEditorAPI.getAngularScope());
    },
    /**
     *   redirect to upload video page
     *   @memberof interactivevideo
     */
    redirectToUploadVideo: function() {
        window.open(
            'https://vimeo.com/upload',
            '_blank'
        );
    },
    /**
     *
     * Done function to add interactive video to stage.
     * @memberof interactivevideo
     *
     */
    done: function() {
        var data = [];
        var quetionsData = [];
        jQuery('input:text[name^="videoquestion[]"]').each(function() {
            quetionsData.push(jQuery(this).val());
        });

        var secData = [];
        jQuery('input:text[name^="videoTime[]"]').each(function() {
            secData.push(jQuery(this).val());
        });

        var allData = [];
        var i = 0;
        jQuery.each(quetionsData, function(key, val) {
            var que = {};
            que.sec = secData[i];
            que.identifier = quetionsData[i];
            allData.push(que);
            i++;
        });

        var i = 0;
        jQuery.each(allData, function(key, val) {
            i++;
            var queObj = {};
            queObj.sec = Math.round(val.sec);
            queObj.identifier = val.identifier;

            EkstepEditorAPI.getService('assessment').getItem(val.identifier, function(err, resp) {
                queObj.data = resp.data.result.assessment_item;
                data.push(queObj);
            });
            if (i == allData.length) {
                EkstepEditorAPI.dispatchEvent("org.ekstep.interactivevideo:create", {
                    "video": jQuery("#videoSrc").val(),
                    "questions": data
                });
            }
        });
    },
    /**
     * This method overridden from Ekstepeditor.basePlugin and it will provide the config of this plugin
     * @memberof poptext
     */
    getConfig: function() {
        var config = {};
        config.video = this.attributes.video;
        config.questions = JSON.stringify(this.attributes.questions);
        return config;
    },
    /**
     *
     * Track telemetry events.
     * @memberof interactivevideo
     *
     */
    generateTelemetry: function(data) {
        if (data) EkstepEditorAPI.getService('telemetry').interact({ "type": data.type, "subtype": data.subtype, "target": data.target, "pluginid": instance.manifest.id, "pluginver": instance.manifest.ver, "objectid": "", "stage": EkstepEditorAPI.getCurrentStage().id })
    }
});
//# sourceURL=interactivevideo.js
