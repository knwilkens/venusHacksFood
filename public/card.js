var db = firebase.firestore();
 
function storeData() {
 
  var inputID = document.getElementById("ID").value;
  var inputTitle = document.getElementById("Title").value;
  var inputDesc = document.getElementById("Desc").value;
 
     db.collection("posts").doc(inputID).set({
         Category: inputTitle,
         PunText: inputDesc
     })
     .then(function() {
         console.log("Doc successful");
     })
     .catch(function(error) {
        console.error("Error writing doc", error);
     });
}

