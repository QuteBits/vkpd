var result = [];

$('#audios_list .area').each( function(index) {
    //extract and correct URL
	var link = $(this).find('.play_btn input').val();
	link = link.substring(0, link.indexOf(','));
	  
	//extract and correct TITLE
	var title_artist = $(this).find('.title_wrap a:eq(0)').text();
	var title_song = $(this).find('.title_wrap .title').text();
		
	while(title_song.indexOf('\'') != -1){
		var index_ill = title_song.indexOf('\'');
		title_song = title_song.substring(0,index_ill) + title_song.substring(index_ill+1,title_song.length);
	}

	while(title_artist.indexOf('\'') != -1){
		var index_ill = title_artist.indexOf('\'');
		title_artist = title_artist.substring(0,index_ill) + title_artist.substring(index_ill+1,title_artist.length);
	}
	 
	var triple = [];
	
	//push DATA
	triple.push(link.trim());            
	triple.push(title_artist.trim() + ' - ' + title_song.trim());
	//mark currently played track
	if($(this).parent().hasClass('current')) {
		triple.push(1);
	}
	triple.push(0);
	result.push(triple);  
});

//send RESULT
chrome.extension.sendRequest(result);