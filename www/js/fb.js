function funR() {
	var loginR = document.getElementById('loginR');
	var pswR = document.getElementById('pswR');
	var pswRC = document.getElementById('pswRC');
			
	var email = loginR.value;
    var pswd1 = pswR.value;
	var pswd2 = pswRC.value;
	alert(email + " " + pswd1 + " " + pswd2);
	errorCode = "";

	 if (pswd1 !== pswd2) {
        alert('Hasła nie zgadzają się');
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(email, pswd1).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert("Error: " + errorMessage);
        return false;
    }). then(function(en) {
	if (errorCode == "") {
	alert('Zarejestrowałeś się');
    window.location.href = "#login";
	}});
}