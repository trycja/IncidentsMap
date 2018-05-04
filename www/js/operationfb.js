function addIncident() {
	var lat = returnLat();
	var lng  = returnLng();
	var desc = document.getElementById('description').value;
	var type = document.getElementById('rodzaj');
	var selectedType = type.options[type.selectedIndex].text;
	var userId = firebase.auth().currentUser.uid;
	var date = new Date();
	date = date.toISOString().substring(0, 10);
	var dat = new Date();
	var dd = dat.toISOString().substring(11, 16);
	date = date + " " + dd;
	alert(date + " " + desc + " " + userId);
	if(desc != "") {
		if(lat != "") {
			var r = confirm("Na pewno chcesz dodać incydent do bazy?");
			if (r == true) {
			txt = "You pressed OK!";
			var newIncident = firebase.database().ref('app/incidents/').push();
			newIncident.set({
			latitude: lat,
			longitude: lng,
			description: desc,
			type: selectedType,
			date: date,
			user: userId
		})
		alert("Dodano incydent do bazy");		
		}
		}else {
			alert("Brak znacznika na mapie");
		}
	}
	else {
	alert("Podaj opis zdarzenia");
	}
}

var markers = [];
var incidents = new Array();

function readFb() {
	var i = 0;
	var map = returnMap();
	firebase.database().ref('app/incidents/').once('value').then(function(snapshot) {
    snapshot.forEach(function(incidentSnapshot) {
		incidents[i] = new Array();
        var inc = incidentSnapshot.val();
		incidents[i][0] = inc.description;
		incidents[i][1] = inc.latitude;
		incidents[i][2] = inc.longitude;
		incidents[i][3] = inc.type;
		incidents[i][4] = inc.date;
		incidents[i][5] = inc.user;

		i+=1;
    });
	}). then(function(en) {
		
	for(j = 0; j < incidents.length; j++) {
		//alert(incidents[j][1]);
		var position = {
		lat: incidents[j][1],
		lng: incidents[j][2]
		}
		var pinImage = "";
		switch(incidents[j][3]) {
		case "Wypadek":
			pinImage = pinImageW;
			break;
		case "Stłuczka":
			pinImage = pinImageS;
			break;
		case "Kradzież":
			pinImage = pinImageK;
			break;
		case "Napaść":
			pinImage = pinImageN;
			break;
		case "Zaginięcie":
			pinImage = pinImageZ;
			break;
		case "Morderstwo":
			pinImage = pinImageM;
			break;
} 
		var marker = new google.maps.Marker({
        position: position,
		icon: pinImage,
        map: map,
    });
	markers.push(marker);
    var infowindow = new google.maps.InfoWindow({content:""});
    google.maps.event.addListener(marker, 'click', (function(marker, j) {
        return function() {
            infowindow.setContent("Data zdarzenia: " + incidents[j][4] + "<br> Opis:" + incidents[j][0]);
            infowindow.open(map, marker);
        }
    })(marker, j));
	}
	});
}

var pinColorW = "4D2600"; //brazowy
var pinImageW = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorW,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));

var pinColorS = "FF6600"; //pomaranczowy
var pinImageS = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorS,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));
	
var pinColorK = "600080"; //fioletowy
var pinImageK = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorK,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));
	
var pinColorN = "B30000"; //czerwony
var pinImageN = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorN,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));
	
var pinColorZ = "7A7A52"; //szary
var pinImageZ = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorZ,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));
	
var pinColorM = "1A1A1A"; //czarny
var pinImageM = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorM,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));