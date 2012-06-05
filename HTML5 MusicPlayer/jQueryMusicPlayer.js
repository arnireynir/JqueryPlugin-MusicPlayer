
var Song = function (artist, song, album, url) {
				this.artist = artist;
				this.song = song;
				this.album = album;
				this.url = url;
			};

( function ($) {
	 
	// Attach new method to jQuery    
	$.fn.extend ({
		// Comment.
		// branch comment omg!.
		// Music Player plugin begins      
		musicPlayer: function(playlist) {
			//Icons used in player 
			var playButtonSrc = "Icons/Shuffle.png"
			var pauseButtonSrc = "Icons/Pause.png"
			var previousButtonSrc = "Icons/Back.png"
			var nextButtonSrc = "Icons/Forward.png"
			var shuffleButtonSrc = "Icons/Shuffle.png"
			var muteOffButtonSrc = "Icons/MuteOff.png"
			var muteOnButtonSrc = "Icons/MuteOn.png"
				
			// Iterate over the current set of matched elements
			// Calls all nessasary function for player to run     		
			return this.each(function() { 
				var MusicPlayer = $(this);
				
				// Audio player created
				if (Modernizr.audio) {			
					generateStructure (MusicPlayer); // MP3 player structure generated
					generateElements ();
					loadPlaylistToUI(playlist, "#mpTracks");
					
					$('#mpBody').append("<audio id='html5Player' preload='auto'></audio>");
					var audioElement = document.getElementById("html5Player");
					var counter = 0;
                    audioElement.src = playlist[counter].url;
					
					updateDisplay(playlist[0], "#mpDisplayArtist", "#mpDisplaySong", "#mpDisplayAlbum");
					updateTrackTheme(counter);
					
					$('#mpDuration').progressbar({ value: 0 });
					//$('#mpDurationSlider').slider();

                    //Play next song when end of song
                    $(audioElement).bind( 'ended', function( ){
                        counter++;
                        audioElement.src = songs [ counter ];
                        audioElement.play( );
                    });


                    //Duration time displayed and updated.
                    audioElement.addEventListener("timeupdate", function() {						
                        var len = audioElement.duration;
						var secs = audioElement.currentTime;
						var prog = (secs / len ) * 100;
						$('#mpDuration').progressbar("option", "value", prog);
						
						var duration = document.getElementById('mpDurationTime');
                        var s = parseInt(audioElement.currentTime % 60);
                        var m = parseInt((audioElement.currentTime / 60) % 60);
                        if(s < 10){
                            $(duration).text(m + ':' + '0'+s )
                        }
                        else{
                            $(duration).text(m + ':' + s )
                        }
						
                    }, false);
					
					$('.mpPlaylistTrack').live('click', function(e) { // Change color of the selected track
						var tracks = $('.mpPlaylistTrack');
						for (var i=0; i<tracks.length; i++) { // Reset all styles in playlist
							tracks[i].className = "mpPlaylistTrack";
						}
						e.currentTarget.className = "mpPlaylistTrack mpTheme";
						
						var currentSong = playlist[e.currentTarget.id.substring(e.currentTarget.id.length - 1, e.currentTarget.id.length)];
						updateDisplay(currentSong, "#mpDisplayArtist", "#mpDisplaySong", "#mpDisplayAlbum");
					 }); 

                    //Play/Pause button and which img.
					 $('#btnPlayPause').live('click', function() {					


						var playPause = $('#btnPlayPause').attr("src");
                         if (playPause == playButtonSrc){
                            $('#btnPlayPause').attr("src", pauseButtonSrc);
							audioElement.play();
                         }
                         else {
                             $('#btnPlayPause').attr("src", playButtonSrc);
                             audioElement.pause();
							 
                         }
						updateDisplay(playlist[counter], "#mpDisplayArtist", "#mpDisplaySong", "#mpDisplayAlbum");
						//updateTrackTheme(counter);
					 });
					 //Selects next song from array and updates playbutton & display
					 $('#btnNext').live('click', function(e) {
						counter++;
						if (counter < playlist.length) {
							audioElement.src = playlist[counter].url;
                            $('#btnPlayPause').attr("src", pauseButtonSrc);
                            audioElement.play();
						}
						else {
							counter = 0;
							audioElement.src = playlist[counter].url;
                            $('#btnPlayPause').attr("src", pauseButtonSrc);
                            audioElement.play();
						}

						updateDisplay(playlist[counter], "#mpDisplayArtist", "#mpDisplaySong", "#mpDisplayAlbum");
						updateTrackTheme(counter);
					 });
                    //Selects random song from playlist array and updates playbutton & display
                    $('#btnShuffle').live('click', function(e) {
                        var rn=Math.floor(Math.random()*playlist.length);
                        audioElement.src = playlist[rn].url;
                        $('#btnPlayPause').attr("src", pauseButtonSrc);
                        audioElement.play();

                        updateDisplay(playlist[rn], "#mpDisplayArtist", "#mpDisplaySong", "#mpDisplayAlbum");
                        updateTrackTheme(rn);
                    });
					 
					 $('#btnPrevious').live('click', function() {
						if (counter > 0) {
							counter--;
						}
						else {
							counter = playlist.length - 1;
						}
						
						if (counter < playlist.length) {
							audioElement.src = playlist[counter].url;
                            $('#btnPlayPause').attr("src", pauseButtonSrc);
                            audioElement.play();
						}
						else {
							counter = 0;
							audioElement.src = playlist[counter].url;
                            $('#btnPlayPause').attr("src", pauseButtonSrc);
                            audioElement.play();
						}
						
						updateDisplay(playlist[counter], "#mpDisplayArtist", "#mpDisplaySong", "#mpDisplayAlbum");
						updateTrackTheme(counter);
					 });
					 
					 $('#btnMute').live('click', function() {
                        var mute = $('#btnMute').attr("src");
						if (mute == muteOffButtonSrc) {
							$('#btnMute').attr("src", muteOnButtonSrc);
                            audioElement.volume = 0;
						}
						else {
							$('#btnMute').attr("src", muteOffButtonSrc);
                            audioElement.volume = 1;
						}
					 });
				}
				else {
					var niftyPlayer =
					"<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='165' height='37' id='niftyPlayer1' align=''>" +
						 "<param name=movie value='niftyplayer.swf?file=betty.mp3&as=0'>" +
						 "<param name=quality value=high>" +
						 "<param name=bgcolor value=#FFFFFF>" +
						 "<embed src='niftyplayer/niftyplayer.swf?file=niftyplayer/betty.mp3&as=0' quality=high bgcolor=#FFFFFF width='165' height='37' name='niftyPlayer1' align='' type='application/x-shockwave-flash' swLiveConnect='true' pluginspage='http://www.macromedia.com/go/getflashplayer'>" +
						 "</embed>" +
					"</object>";
					$(MusicPlayer).append(niftyPlayer);
				}
			});   
			
			function generateStructure (mp) { // Creates a structure of the MP3 player
				mp.append('<div id="mpBody"></div>'); // Player body
				
				$('#mpBody').append
					('<div id="mpDisplay"></div>'); // Display section added
					
				$('#mpBody').append
					('<section id="mpDuration"></section>'); // Duration bar
				
				$('#mpDuration').append
					('<div id="mpDurationTime">0:00</div>'); // Duration time
					
				$('#mpDuration').append
					('<div id="mpDurationSlider"></div>'); // Slider
					
				$('#mpBody').append
					('<div id="mpTracks"></div>'); // Tracks container
				
				$('#mpTracks').append
					('<section id="mpTracksTop"></section>'); // Tracks top section ("Playlist" label and controls)
				
				$('#mpTracksTop').append
					('<dfn id="mpDfnPlaylist">Playlist</dfn>'); // "Playlist" label
				
				$('#mpTracksTop').append
					('<section id="mpControls"></section>'); // Controls bar
			}
			
			function generateElements () { // Creates the elements (i.e. control buttons, artist div...)
				// Controls
				var controlItems = 
					"<span class='mpControlsBorderRight'><img id='btnPlayPause' src='" + playButtonSrc + "' alt='Play/Pause' /></span>" +
					"<span class='mpControlsBorderRight'><img id='btnPrevious' src='" + previousButtonSrc + "' alt='Previous' /></span>" +
					"<span class='mpControlsBorderRight'><img id='btnNext' src='" + nextButtonSrc + "' alt='Next' /></span>" +
					"<span><img id='btnShuffle' src='" + shuffleButtonSrc + "' alt='Shuffle' /></span>";
				$('#mpControls').append // Sending list of controls to view
					(controlItems);
					
				// Display items (artist, song and album)
				var displayItems =
					"<div id='mpDisplayMute'><img id='btnMute' src='" + muteOffButtonSrc + "' alt='Mute' /></div>" +
					"<div id='mpDisplayTitlesContainer'>" +
						"<div id='mpDisplayArtist'></div>" +
						"<div id='mpDisplaySong' class='mpTheme'></div>" +
						"<div id='mpDisplayAlbum'></div>" +
					"</div>";
				$('#mpDisplay').append
					(displayItems);
			}
			
			function loadPlaylistToUI(playlist, destinationElement) {
				var songsStructure =
				"<div id='mpPlaylistContainer'>";			
				for (var i=0; i<playlist.length; i++) {
					songsStructure +=
						"<div class='mpPlaylistTrack' id='song" + i + "'>" +
							"<span>" + playlist[i].song + " - " + "</span>" +
							"<span>" + playlist[i].artist + "</span>" +
						"</div>";
				}			
				songsStructure +=
				"</div>"; // mpPlaylistContainer ends
				
				$(destinationElement).append(songsStructure);
			}
			
			function updateDisplay(song, artistDiv, songDiv, albumDiv) { // Updates the display section to the corresponding song
				$(artistDiv).text(song.artist);
				$(songDiv).text(song.song);
				$(albumDiv).text(song.album);
			}
			
			function updateTrackTheme(cntr) {
				var tracks = $('.mpPlaylistTrack');
				for (var i=0; i<tracks.length; i++) { // Reset all styles in playlist
					tracks[i].className = "mpPlaylistTrack";
				}
				tracks[cntr].className = "mpPlaylistTrack mpTheme";
			}

		} // musicPlayer ends
		
	}); // jQuery extension ends

// Pass jQuery to the function,
// so that we will able to use any valid Javascript variable name
// to replace "$" SIGN.
})(jQuery);


















