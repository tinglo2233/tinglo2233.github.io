$(function() {
    
    // Globals
	window.stage = "";
    window.stageInfos = [];
    
    var stageNames = ["about", "music", "projects", "news"];
    var stageMap = {};
    var contentView = $("#content-div");
    var menuView = $("#menu-div");
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
        menuView.removeClass(window.stage+"-menu-bg");
        menuView.addClass(stage+"-menu-bg");
        
        // pause youtube videos
        /*stageMap["videos"].content.find("iframe").each(function () {
            let iframe = $(this).get()[0]contentWindow;
            if (iframe != null) 
                iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
        });*/
        
        window.stage = stage;
		location.hash = stage;
        contentView.scrollTop();    
        //contentView.delay(1).queue(function() {
        //    contentView.scrollTop();
        //});

		

		if (stage == "news") {
			ShowFacebook();
			//setTimeout(ShowFacebook,512);
		}
    }

	var lastFbWidth = 0;
	var lastFbHeight = 0;
	function ShowFacebook() {
		if (typeof(FB) != 'undefined'&& FB != null )
		{
			var fbWidth = Math.floor(fbContainer.width());
			var fbHeight = Math.floor(fbContainer.height());

			if (fbWidth  != lastFbWidth || fbHeight != lastFbHeight) {
				fbIframe.attr("data-width", fbWidth);
				fbIframe.attr("data-height", fbHeight);
				FB.XFBML.parse();
				lastFbWidth = fbWidth;
				lastFbHeight = fbHeight;
			}
		} else {
			setTimeout(ShowFacebook,256);
		}
	}
    
    // Preload bg images
    var bgImages = [];
    for (let i = 0; i < stageNames.length; ++i) {
        bgImages.push(new Image());
        bgImages[i].src = "img/"+stageNames[i]+".jpg";
    }
    
	var wantedLandingStage = "about";

	var currentHash = location.hash;
	currentHash = currentHash.substr(1, currentHash.length - 1);
	console.log(currentHash);
	for (var i = 0; i < stageNames.length; ++i) {
		if (stageNames[i] == currentHash) wantedLandingStage = stageNames[i];
	}
    window.setStage(wantedLandingStage);
});