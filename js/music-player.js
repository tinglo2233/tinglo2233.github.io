// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
$(function () {
    // Add user agent as an attribute on the <html> tag...
    // Inspiration: http://css-tricks.com/ie-10-specific-styles/
    var b = document.documentElement;
    b.setAttribute('data-useragent', navigator.userAgent);
    b.setAttribute('data-platform', navigator.platform);
    
    var playlistNames = ["strings", "offscore", "other", "standards"];
    var playlists = {
        "strings" : [
            {
                "name": "Waltz of Color 本色示人",
                "file": "strings/waltz of color"
            },
            {
                "name": "Foreshore",
                "file": "strings/foreshore"
            },
            {
                "name": "The extra 5 min 多出來的這五分鐘",
                "length": "00:57",
                "file": "strings/5min"
            },
            {
                "name": "Epiphyllum",
                "length": "00:57",
                "file": "strings/epiphyllum"
            },
            {
                "name": "Lucid Dreaming 清醒夢",
                "length": "00:57",
                "file": "strings/lucid"
            },
            {
                "name": "Cassia Fistula 雨樹澄黃",
                "length": "00:57",
                "file": "strings/cassia string"
            }
        ],
        "offscore" : [
            {
                "name": "Copy Machine",
                "length": "00:32",
                "file": "offscore/copy machine"
            },
            {
                "name": "My Late-coming Puberty",
                "length": "00:34",
                "file": "offscore/puberty"
            },
            {
                "name": "Elephants Remember",
                "length": "00:30",
                "file": "offscore/elephants"
            },
            {
                "name": "Cicada and Banyan Tree",
                "length": "00:34",
                "file": "offscore/cicada"
            },
            {
                "name": "Relativity",
                "length": "00:34",
                "file": "offscore/relativity"
            }
        ],
        "other" : [
            {
                "name": "Leave Me Be (ft. CvA Tuesday Big Band)",
                "length": "00:30",
                "file": "other/leave me be"
            },
            {
                "name": "Space Colonization Fantasia (ft. CvA Tuesday Big Band)",
                "length": "00:57",
                "file": "other/space colonization"
            },
             {
                "name": "Absinthe  (Theme of movie 'Double Date')",
                "file": "other/Absinthe"
            },
            {
                "name": "Garlic Skin",
                "length": "00:30",
                "file": "other/Garlic Skin"
            },
            {
                "name": "畢業序曲",
                "length": "00:57",
                "file": "other/Graduation overture"
            },
            {
                "name": "I Fall Asleep Too Easily",
                "length": "00:57",
                "file": "other/Fall Asleep"
            },
            {
                "name": "Cassia Fistula",
                "length": "00:57",
                "file": "other/Cassia Fistula"
            },
            {
                "name": "Another Voyage",
                "length": "00:30",
                "file": "other/Another Voyage"
            }, 
            {
                "name": "Beer and Gossip",
                "length": "00:57",
                "file": "other/Beer and Gossip"
            },
            {
                "name": "Tromsø Sky",
                "length": "00:57",
                "file": "other/Tromso Sky"
            },
            {
                "name": "Street Carol",
                "length": "00:57",
                "file": "other/Street Carol"
            },
            {
                "name": "Sweetest Single Valentine",
                "length": "00:57",
                "file": "other/Sweetest single valentine"
            },
            {
                "name": "Leaving",
                "length": "00:57",
                "file": "other/leaving"
            }
        ],
        "standards" : [
            {
                "name": "I've Got You Under My Skin (ft. KoSwing Big Band)",
                "length": "00:34",
                "file": "standards/I've got you under my skin"
            },
            {
                "name": "Hi Fly",
                "length": "00:32",
                "file": "standards/Hi Fly"
            },
            {
                "name": "The Boy Next Door",
                "length": "00:34",
                "file": "standards/The Boy Next Door"
            },
            {
                "name": "Night And Day (ft. Taipei Riot Big Band)",
                "length": "00:30",
                "file": "standards/Night and Day"
            },
            {
                "name": "On A Clear Day",
                "length": "00:34",
                "file": "standards/On a Clear Day"
            },
            {
                "name": "Cry Me a River",
                "length": "00:34",
                "file": "standards/Cry me a River"
            },
            {
                "name": "Se Todos Fossem Iguais A Você",
                "length": "00:32",
                "file": "standards/Se Todos Voce"
            },
            {
                "name": "On The Sunny Side Of The Street (ft. KoSwing Big Band)",
                "length": "00:30",
                "file": "standards/Sunnyside of the Street"
            },
            {
                "name": "I'll Remember April",
                "length": "00:30",
                "file": "standards/I'll remember april"
            },
            {
                "name": "God Bless The Child",
                "length": "00:34",
                "file": "standards/God bless the child"
            },
            {
                "name": "Sous Le Ciel de Paris",
                "length": "00:34",
                "file": "standards/sous le ciel"
            },
            {
                "name": "Speak Low",
                "length": "00:30",
                "file": "standards/Speak low"
            },
            {
                "name": "Love For Sale",
                "length": "00:34",
                "file": "standards/Love For Sale"
            },
            {
                "name": "Easy Living",
                "length": "00:32",
                "file": "standards/Easy living"
            },
            {
                "name": "Skylark",
                "length": "00:30",
                "file": "standards/Skylark"
            },
            {
                "name": "The Song Is You",
                "length": "00:30",
                "file": "standards/the song is you"
            }  
        ]
    };
    
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (!supportsAudio) {
        return;
    }
    
    var audioPlayers = [];
    function nowPlaying(a) {
        for (let i = 0; i < audioPlayers.length; ++i) {
            if (a !== audioPlayers[i]) {
                audioPlayers[i].pause();
            }
        }
    }
    
    function buildPlaylist (n) {
        let trackCount = 0;
        let name = n;
        let li;
        let index = 0,
            playing = false,
            mediaPath = 'music/',
            extension = '.mp3',
            player = $("#"+name),
            listElement = player.find("#listElement"),
            list = player.find('#plList'),
            npAction = player.find('#npAction'),
            npTitle = player.find('#npTitle'),
            audio = player.find('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
                nowPlaying(audio);
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = player.find('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = player.find('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            loadTrack = function (id) {
                player.find('.plSel').removeClass('plSel');
                player.find('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(playlists[name][id].name);
                index = id;
                audio.src = mediaPath + playlists[name][id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
                console.log(id);
            },
            loadPlaylist = function () {
                audio.pause();
                list.empty();

                for (let i = 0; i < playlists[name].length; ++i) {
                    let newElement = listElement.clone();
                    newElement.find(".plNum").text((i+1)+".");
                    newElement.find(".plTitle").text(playlists[name][i]["name"]);
                    //newElement.find(".plLength").text(playlists[name][i]["length"]);
                    newElement.removeClass("hidden");
                    list.append(newElement);
                }

                li = list.find('li').click(function () {    
                    var id = parseInt($(this).index());
                    if (id !== index || audio.paused) {
                        playTrack(id);
                    }
                });

                trackCount = playlists[name].length;
                index = 0;
                loadTrack(index);
            };
        
        loadPlaylist(name);

        return audio;
    }
    
    for (let i = 0; i < playlistNames.length; ++i) {
        audioPlayers.push(buildPlaylist(playlistNames[i]));
    }
    
    //extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
});