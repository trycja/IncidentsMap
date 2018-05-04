function addIncident() {
	alert("add");
	var lat = returnLat();
	var lng  = returnLng();
	var desc = document.getElementById('description').value;
	var cos = "sobacz";
	var userId = firebase.auth().currentUser.uid;
	alert(desc + " " + userId);
	if(desc != "") {
		if(lat != "") {
			var newIncident = firebase.database().ref('app/incidents/').push();
			newIncident.set({
			latitude: lat,
			longitude: lng,
			description: desc,
			type: "brak",
		})
		alert("Dodano incydent do bazy");		
		}else {
			alert("Brak znacznika na mapie");
		}
	}
	else {
	alert("Podaj opis zdarzenia");
	}
}

	var pinColor = "FE7569";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
    var marker = new google.maps.Marker({
        position: position,
		icon: pinImage,
		map: map
    });

function readFb() {
	var incidents = new Array();
	var i = 0;
	alert("read");
	var map = returnMap();
	firebase.database().ref('app/incidents/').once('value').then(function(snapshot) {
    snapshot.forEach(function(incidentSnapshot) {
		incidents[i] = new Array();
        var inc = incidentSnapshot.val();
		incidents[i][0] = inc.description;
		incidents[i][1] = inc.latitude;
		incidents[i][2] = inc.longitude;
		incidents[i][3] = inc.type;
		i+=1;
    });
	}). then(function(en) {
		
	for(j = 0; j < incidents.length; j++) {
		alert(incidents[j][1]);
		var position = {
		lat: incidents[j][1],
		lng: incidents[j][2]
		}
		
		var marker = new google.maps.Marker({
        position: position,
        map: map,
    });
    var infowindow = new google.maps.InfoWindow({content:""});
    google.maps.event.addListener(marker, 'click', (function(marker, j) {
        return function() {
            infowindow.setContent(incidents[j][0]);
            infowindow.open(map, marker);
        }
    })(marker, j));
	}
	});
}