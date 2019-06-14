$(function() {
    
    // Globals
	window.stage = "";
    window.stageInfos = [];
    
    var stageNames = ["about", "music", "videos", "events"];
    var stageMap = {};
    var contentView = $("#content-div");
	var fbContainer = $("#facebook-container");
	var fbIframe = $(".fb-page");
    
    for (let i = 0; i < stageNames.length; ++i) {
        let name = stageNames[i];
        
        let stage = {
            name: name,
            view: $("#"+name),
            button: $("#"+name+"-button"),
            content: $("#"+name+"-content")
        };
        
        window.stageInfos.push(stage);
        stage.button.on("click", function () {window.setStage(stage.name);});
        stageMap[name] = stage;
    }
    
    window.setStage = function(stage) {
        if (window.stage == stage) {
            return;
        }
        
        // Update Visibilites
		for (let i = 0; i < window.stageInfos.length; ++i) {
			let view = window.stageInfos[i].view;
            let button = window.stageInfos[i].button;
			let name = window.stageInfos[i].name;
            let content = window.stageInfos[i].content;
			
			if (name == stage) {
                view.removeClass("hidden");
                content.removeClass("hidden");
                button.addClass("active");
            }
			else {
                view.addClass("hidden");
                content.addClass("hidden");
                button.removeClass("active");
            }
		}
        
        contentView.removeClass(window.stage+"-bg");
        contentView.addClass(stage+"-bg");
        
        // pause youtube videos
        /*stageMap["videos"].content.find("iframe").each(function () {
            let iframe = $(this).get()[0]contentWindow;
            if (iframe != null) 
                iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
        });*/
        
        window.stage = stage;
        contentView.scrollTop();    
        //contentView.delay(1).queue(function() {
        //    contentView.scrollTop();
        //});

		

		if (FB && stage == "events") {
			ShowFacebook();
			//setTimeout(ShowFacebook,512);
		}
		else {
			fbContainer.addClass("hidden");
		}
    }

	function ShowFacebook() {
		fbContainer.removeClass("hidden");
		fbIframe.attr("data-width", fbContainer.width());
		fbIframe.attr("data-height", Math.floor(fbContainer.height()));
		FB.XFBML.parse();
	}
    
    
    window.setStage("about");
    
    // Preload bg images
    var bgImages = [];
    for (let i = 0; i < stageNames.length; ++i) {
        bgImages.push(new Image());
        bgImages[i].src = "img/"+stageNames[i]+".jpg";
    }
});