# Interactive Video Plugin for EK Content Editor

Just set up the plugin as usual. Once you add the plugin, a new menu icon will be available. Click the icon to add the video. 

## Step 1
Add the link to the video. Currently mp4 files are supported. Future versions will integrate a javascript library that will allow embedding youtube, vimeo etc videos. exp:- http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4

## Step 2
Add the JSON to indicate the points in your video when questions are shown. The JSON should have the following structure

```json
[
	{"sec":"6", "identifier": "do_1122153324231884801176"},
	{"sec":"15", "identifier": "do_1122153324254494721177"},
	{"sec":"30", "identifier": "do_1122153520679649281178"},
	{"sec":"57", "identifier": "do_1122153520706355201179"}
]
```

This is an array of objects that contains the second and the corresponding question that is shown at that second. In the above example, the question with identifier `do_1122153324231884801176` will be shown at the 6th second, and so on.

A future version of the plugin will provide a UI for doing this. 
