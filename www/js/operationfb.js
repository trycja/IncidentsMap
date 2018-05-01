function addIncident() {
	alert("read");
	var lat = returnLat();
	var lng  = returnLng();
	var desc = document.getElementById('description').value;
	var cos = "sobacz";
	var userId = firebase.auth().currentUser.uid;
	alert(desc + " " + userId);
	if(desc != "") {
		if(lat != "") {
			var newIncident = firebase.database().ref('users/' + userId).push();
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

function readFb() {
	var userId = firebase.auth().currentUser.uid;
	return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
	var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
});
}