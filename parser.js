function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
}

var text = "Not Set Yet";
var out = new Array();

function getData() {
	var url = "http://pipes.yahoo.com/pipes/pipe.run?_id=8aecae73d4d2627721b730c5c3bdb694&_render=json";
	var xhr = createCORSRequest('GET', url);
	// Response handlers.
	xhr.onload = function() {
		text = xhr.responseText;
		var json = $.parseJSON(text);
		var dataArr = json.value.items;
		
		for (var i = 0; i < dataArr.length; i++) {
			out[i] = [dataArr[i].Commodity, dataArr[i].Start, dataArr[i].Change]
		}
		
		for (var i = 0; i < dataArr.length; i++) {
			for (var j = 0; j < dataArr[i].length; j++) {
				console.log(dataArr[i][j]);
			}
		}
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	xhr.send();
	return out;
}
console.log(getData());