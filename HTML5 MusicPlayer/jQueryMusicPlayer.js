
var Song = function (artist, song, album, url) {
				this.artist = artist;
				this.song = song;
				this.album = album;
				this.url = url;
			};

( function ($) {
	 
	// Attach new method to jQuery    
	$.fn.extend ({
	
		// Music Player plugin begins      
		musicPlayer: function(playlist) {
			//Icons used in player 
			var playButtonSrc = "Icons/Play.png"
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
					
					$('#mpBody').append("<audio id='html5Player'></audio>");
					var audioElement = document.getElementById("html5Player");
					var counter = 0;
					
					updateDisplay(playlist[0], "#mpDisplayArtist", "#mpDisplaySong", "#mpDisplayAlbum");
					updateTrackTheme(counter);
					
					$('.mpPlaylistTrack').live('click', function(e) { // Change color of the selected track
						var tracks = $('.mpPlaylistTrack');
						for (var i=0; i<tracks.length; i++) { // Reset all styles in playlist
							tracks[i].className = "mpPlaylistTrack";
						}
						e.currentTarget.className = "mpPlaylistTrack mpTheme";
						
						var currentSong = playlist[e.currentTarget.id.substring(e.currentTarget.id.length - 1, e.currentTarget.id.length)];
						updateDisplay(currentSong, "#mpDisplayArtist", "#mpDisplaySong", "#mpDisplayAlbum");
					 }); 
					 
					 $('#btnPlayPause').live('click', function() {					
						audioElement.src = playlist[counter].url;
						audioElement.play();
						
						updateDisplay(playlist[counter], "#mpDisplayArtist", "#mpDisplaySong", "#mpDisplayAlbum");
						updateTrackTheme(counter);
					 });
					 
					 $('#btnNext').live('click', function(e) {
						counter++;
						if (counter < playlist.length) {
							audioElement.src = playlist[counter].url;
							audioElement.play();
						}
						else {
							counter = 0;
							audioElement.src = playlist[counter].url;
							audioElement.play();
						}
						
						updateDisplay(playlist[counter], "#mpDisplayArtist", "#mpDisplaySong", "#mpDisplayAlbum");
						updateTrackTheme(counter);
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
							audioElement.play();
						}
						else {
							counter = 0;
							audioElement.src = playlist[counter].url;
							audioElement.play();
						}
						
						updateDisplay(playlist[counter], "#mpDisplayArtist", "#mpDisplaySong", "#mpDisplayAlbum");
						updateTrackTheme(counter);
					 });
					 
					 $('#btnMute').live('click', function() {
						var mute = $('#btnMute').attr("src");
						if (mute == muteOffButtonSrc) {
							$('#btnMute').attr("src", muteOnButtonSrc);
						}
						else {
							$('#btnMute').attr("src", muteOffButtonSrc);
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
					('<div id="mpDurationTime">2:39</div>'); // Duration time
					
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
					"<span class='mpControlsBorderRight'><img id='btnPlayPause' src='" + pauseButtonSrc + "' alt='Play/Pause' /></span>" +
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


















