( function ($) {
	 
	// Attach new method to jQuery    
	$.fn.extend ({            
		  
		// Music Player plugin begins      
		musicPlayer: function(playlist) { 
			var pauseButtonSrc = "Icons/Pause.png"
			var stopButtonSrc = "Icons/Stop.png"
			var backButtonSrc = "Icons/Back.png"
			var forwardButtonSrc = "Icons/Forward.png"
			var shuffleButtonSrc = "Icons/Shuffle.png"
			
			var Song = function (artist, song, album) {
				this.artist = artist;
				this.song = song;
				this.album = album;
			};
		
			// Iterate over the current set of matched elements     		
			return this.each(function() { 
				var MusicPlayer = $(this);
				
				generateStructure (MusicPlayer); // MP3 player structure generated
				generateElements ();
				
				var songs = loadFromPlaylist(playlist);
				loadSongsToUI(songs);
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
			
			function generateElements () {
				// Controls
				var controlItems = 
					"<span class='mpControlsBorderRight'><img id='btnPause' src='" + pauseButtonSrc + "' alt='Pause' /></span>" +
					"<span class='mpControlsBorderRight'><img id='btnStop' src='" + stopButtonSrc + "' alt='Stop' /></span>" +
					"<span class='mpControlsBorderRight'><img id='btnBack' src='" + backButtonSrc + "' alt='Back' /></span>" +
					"<span class='mpControlsBorderRight'><img id='btnForward' src='" + forwardButtonSrc + "' alt='Forward' /></span>" +
					"<span><img id='btnShuffle' src='" + shuffleButtonSrc + "' alt='Shuffle' /></span>";
				$('#mpControls').append
					(controlItems);
					
				// Display items (artist, song and album)
				var displayItems =
					"<div id='mpDisplayMute'>Mute</div>" +
					"<div id='mpDisplayTitlesContainer'>" +
						"<div id='mpDisplayArtist'>Britney Spears</div>" +
						"<div id='mpDisplaySong'>Toy Soldier</div>" +
						"<div id='mpDisplayAlbum'>Blackout</div>" +
					"</div>";
				$('#mpDisplay').append
					(displayItems);
			}
			
			function loadFromPlaylist(playlist) {
				// read from meta data
				// then load data into Song "class"
				// return array of Song
			}
			
			function loadSongsToUI(songsArray) {
				// load array of songs and
				// generate html structure for all the songs
			}
		}
		
	}); 
	
// Pass jQuery to the function,
// so that we will able to use any valid Javascript variable name
// to replace "$" SIGN.
})(jQuery);



















