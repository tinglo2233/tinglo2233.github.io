// This code loads the IFrame Player API code asynchronously.
//var tag = document.createElement('script');

//tag.src = "https://www.youtube.com/iframe_api";
//var firstScriptTag = document.getElementsByTagName('script')[0];
//firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var ytPlayers = {};
function onYouTubeIframeAPIReady() {
	console.log("hello youtube");
	ytPlayers["strings"] = new YT.Player('strings-iframe', {
		listType: 'playlist',
		list: 'PLjd2GXZgLHfQoco2vfF0VxVsydX3Xc6Kn',
		enablejsapi: 1

		/*height: '390',
		width: '640',
		videoId: 'M7lc1UVf-VE',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}*/
	});
	ytPlayers["offscore"] = new YT.Player('offscore-iframe', {
		listType: 'playlist',
		list: 'PLjd2GXZgLHfRwOLh_R7wkPachGP9N-tCb',
		enablejsapi: 1
	});
	ytPlayers["originals"] = new YT.Player('originals-iframe', {
		listType: 'playlist',
		list: 'PLjd2GXZgLHfSm-sCS-PXkb-UndpZ_JyMC',
		enablejsapi: 1
	});
	ytPlayers["standards"] = new YT.Player('standards-iframe', {
		listType: 'playlist',
		list: 'PLjd2GXZgLHfR6prtzs7rSOtFwd6Nm5Dks',
		enablejsapi: 1
	});
}

$(function() {
    // Globals
	window.stage = "";
    window.stageInfos = [];
	window.projectInfos = [];

	const aboutStage = "about";
	const musicStage = "music";
	const projectStage = "projects";
	const newsStage = "news";
    
    var stageNames = [aboutStage, musicStage, projectStage, newsStage];
    var stageHasSideInfo = {aboutStage: true, musicStage: true, projectStage: false, newsStage: false};
    var stageMap = {};
	var projectNames = ["strings", "offscore", "originals", "standards"];
	var projectMap = {};
    var contentView = $("#content-div");
    var menuView = $("#menu-div");
	var fbContainer = $("#facebook-container");
	var fbIframe = $(".fb-page");
	var body = $("#bg-root");
    
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

	for (let i = 0; i < projectNames.length; ++i) {
        let name = projectNames[i];
        
        let project = {
            name: name,
            button: $("#"+name+"-button"),
            content: $("#"+name+"-project-content"),
			iframe: $("#"+name+"-iframe")
        };
        
        window.projectInfos.push(project);
        project.button.on("click", function () {window.setProject(project.name);});
        projectMap[name] = project;
    }
    
    window.setStage = function(stage)
	{
		if (window.project != null) 
			window.setProject(null);

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
				if (stageHasSideInfo[stage]) {
					view.removeClass("hidden");
				}
                content.removeClass("hidden");
                button.addClass("active");
            }
			else {
				view.addClass("hidden");
                content.addClass("hidden");
                button.removeClass("active");
            }
		}
        
        body.removeClass(window.stage+"-bg");
        body.addClass(stage+"-bg");
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
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

        //contentView.delay(1).queue(function() {
        //    contentView.scrollTop();
        //});

		

		if (stage == newsStage) {
			ShowFacebook();
			//setTimeout(ShowFacebook,512);
		}
    }

	window.setProject = function (project) {
		if (project != null && window.stage != projectStage) {
			window.setStage(projectStage);
		}

		// Update Visibilites
		for (let i = 0; i < window.projectInfos.length; ++i) {
            let button = window.projectInfos[i].button;
			let name = window.projectInfos[i].name;
            let content = window.projectInfos[i].content;
			
			if (name == project) {
                content.removeClass("hidden");
                button.addClass("hidden");
            }
			else if (project == null) {
                content.addClass("hidden");
                button.removeClass("hidden");
            }
			else {
                content.addClass("hidden");
                button.addClass("hidden");
			}

			let iframePlayer = ytPlayers[name];
			if (iframePlayer != null) {
				iframePlayer.pauseVideo();
			}
		}

		window.project = project;
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
    
	var wantedLandingStage = aboutStage;

	var currentHash = location.hash;
	currentHash = currentHash.substr(1, currentHash.length - 1);
	console.log(currentHash);
	for (var i = 0; i < stageNames.length; ++i) {
		if (stageNames[i] == currentHash) wantedLandingStage = stageNames[i];
	}

    window.setStage(wantedLandingStage);
	window.setProject(null);
});