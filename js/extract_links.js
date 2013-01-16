var result = [];

//check each audio box on the site
$('#audios_list .area').each( function(index) {
    //extract and correct URL
	var link = $(this).find('.play_btn input').val();
	link = link.substring(0, link.indexOf(','));
	  
	//extract and correct TITLE
	var title_artist = $(this).find('.title_wrap a:eq(0)').text();
	var title_song   = $(this).find('.title_wrap .title').text();
	var title = title_artist.trim() + ' - ' + title_song.trim();
	
	//throw away restricted characters from the song name
	while(title.indexOf('\'') != -1){
		var index_ill = title.indexOf('\'');
		title = title.substring(0,index_ill) + title.substring(index_ill+1,title.length);
	}

	//mark currently played track	 	
	var currently_played = 0;
	if($(this).parent().hasClass('current')) { currently_played = 1; }
		
	//push collected (URL,TITLE,FLAG) into a TRIPLE
	var triple = [];
	triple.push(link.trim());            
	triple.push(title);
	triple.push(currently_played);

	//push TRIPLE into RESULT
	result.push(triple);  
});

//send the RESULT
chrome.extension.sendRequest(result);