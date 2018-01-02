$(document).ready(function(){
    var socket = io();
    socket.on("connect",function(){
        console.log("connected to a socket");
        socket.emit("sendSongs", "all");
        socket.on("getSongs",function(data){
            
            var tracks=data.tracks;
            var musicContainer = document.getElementById("music-container");
            var imgCount=1;
            for(var i=0; i<tracks.length; i++){
                console.log(tracks[i]);
                
                musicContainer.innerHTML += `<div class="filterable-item no-transition ${tracks[i].category}"><a><figure class="stream-container"><div class="stream-image"><div class="stream-image"><img src="dummy/gallery-${imgCount}.jpg" alt="gallery ${imgCount}"></div><div class="stream-text"><h3>${tracks[i].name}</h3></div></figure></a><audio style="width:100%;" preload="none" controls><source src="../music/${tracks[i].name}.mp3"  type-"audio/mpeg">Your Browser Doesn't support mp3 audio</audio></div> `;

                imgCount++;
                if(imgCount>12){
                    imgCount=1;
                }
            }
            $(".filterable-item a").click(function(){
                var myAudio = $(this).next()[0];
                if(myAudio.paused){
                    var allAudio = $(".filterable-item audio");
                    for(var i =0; i<allAudio.length; i++){
                        if(allAudio[i]!==myAudio){
                            allAudio[i].pause();
                        }	
                    }
                    myAudio.play()
                }
                else{
                    myAudio.pause()
                }
            });
        });
    });
});
// <div class="filterable-item hiphop">
// 								<a>
// 									<figure class="stream-container" >
// 										<div class="stream-image">
// 											<img src="dummy/gallery-1.jpg" alt="gallery 2">
// 										</div>
// 										<div class="stream-text">
// 											<h3>Till I Die</h3>
// 										</div>
// 									</figure>	
// 								</a>
// 								<audio style="width:100%;" controls>
// 									<source src="../music/2Pac - Till I Die (ft. Eminem).mp3"  type-"audio/mpeg">		
// 									Can't play
// 								</audio>
// 	</div>

