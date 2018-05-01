google.maps.event.addDomListener(window, 'load', getLocation);
function getLocation(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });    
}

var lat = "";
var lng = "";

function onSuccess(position) {
    var latGM=position.coords.latitude;
    var langGM=position.coords.longitude;
    //Google Maps
    var myLatlng = new google.maps.LatLng(latGM,langGM);
    var mapOptions = {zoom: 15,center: myLatlng}
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var onClick = map.addListener('mousedown', function(e) {
    var marker = placeMarker(e.latLng, map);
      google.maps.event.removeListener(onClick);
   });
}

function onError(error) {
    alert('code: ' + error.code + '\n' +'message: ' + error.message + '\n');
}

function returnLat(){
	return lat;
}

function returnLng(){
	return lng;
}

function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
	lat = marker.getPosition().lat();
	lng = marker.getPosition().lng();
    map.panTo(position);
}