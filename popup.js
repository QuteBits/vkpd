var visibleLinks = [];
var visibleNames = [];
var current = -1;

function showLinks() {
  //clean the list
  var linksTable = document.getElementById('links');
  while (linksTable.children.length > 1) {
    linksTable.removeChild(linksTable.children[linksTable.children.length - 1])
  }
    
  for (var i = 0; i < visibleLinks.length; ++i) {
    var row = document.createElement('tr');
    
	//mark currently played song
	if(i == current){ row.id = 'current'; }
	
	//create HTML DATA
	var col0 = document.createElement('td');
    var col2 = document.createElement('td');
    var checkbox = document.createElement('input');
    checkbox.checked = false;
    checkbox.type = 'checkbox';
    checkbox.id = 'check' + i;
    col0.appendChild(checkbox);
    col2.innerText = visibleNames[i];
    col2.style.whiteSpace = 'nowrap';

	//show HTML DATA
    row.appendChild(col0);
    row.appendChild(col2);
    linksTable.appendChild(row);
  }
}

function toggleAll() {
  //(un)check all items in the list
  var checked = document.getElementById('toggle_all').checked;
  for (var i = 0; i < visibleLinks.length; ++i) {
    document.getElementById('check' + i).checked = checked;
  }
}

function downloadCheckedLinks() {
  var pending = 0;
  for (var i = 0; i < visibleLinks.length; i++) {
	pending++;
    if (document.getElementById('check' + i).checked) {
	    chrome.downloads.download({url: visibleLinks[i],filename: visibleNames[i] + '.mp3'}, function(id) { 
			pending = pending - 1;
			if (pending < 1) {
				window.close();
			};
		});
    }
  }
}

chrome.extension.onRequest.addListener(function(links_and_names) {
  visibleLinks = [];
  visibleNames = [];

  current = -1;
  
  for (var index in links_and_names) {
    visibleLinks.push(links_and_names[index][0]);
	visibleNames.push(links_and_names[index][1]);
	if(links_and_names[index][2] == 1){current = index};
  }
  showLinks();
});

//when clicking on plugin button, extract data from the page
window.onload = function() {
  document.getElementById('toggle_all').onchange = toggleAll;
  document.getElementById('download').onclick = downloadCheckedLinks;
  
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
							chrome.tabs.executeScript(activeTabs[0].id, { file:"jquery-1.8.2.min.js" }, function() {
							chrome.tabs.executeScript(activeTabs[0].id, { file:"extract_links.js" });
		});
    });
  });
};