function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, false);

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

function getCommodityData() {
	var url = "http://pipes.yahoo.com/pipes/pipe.run?_id=8aecae73d4d2627721b730c5c3bdb694&_render=json";
	var xhr = createCORSRequest('GET', url);
	// Response handlers.
	xhr.onload = function() {
		text = xhr.responseText;
		var json = $.parseJSON(text);
		var dataArr = json.value.items;
		
		for (var i = 0; i < dataArr.length; i++) {
			out[i] = Number(dataArr[i].Start) + Number(dataArr[i].Change);
		}
		cData = out;
	};

	xhr.onerror = function() {
		console.log('Woops, there was an error making the request.');
	};

	xhr.send();

	for (var i = 0; i < 10; i ++) {
		if (!out [i]) {
			out[i] = getRandomInt(1, 100);
		}
	}
}