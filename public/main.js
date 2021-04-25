// Front end for homepage

class Card {
   static reqOneCard(){
      
   }

   static handleClaim(element){
      let poster = element.id
      fetch("http://localhost:5001/venushacksfood/us-central1/api/update-status-by-id/" + poster + "/" + localStorage.getItem("user") + "/" )
         .then(response => response.json())
         .then(data => {
            element.innerHTML = data.status;
         })
   }

   static generateHTML(title, id, op,desc, status){
      let html = "<div class='col-sm'>"
      +       "<div class='card' 'style='width: 18rem;'>"
      +         "<img src='https://www.almanac.com/sites/default/files/image_nodes/carrots-table_popidar-ss.jpg' class='card-img-top'>"
      +         "<div class='card-body'>"
      +           "<h5 class='card-title'>" + title + "</h5>"
      +           "<p class='card-text'>" + desc + "</p>"
      +           "<p></p>"
      +           "<button class='btn btn-primary' op='"+ op +"'id='" + id + "' onclick='Card.handleClaim(this)'> " + status + "</button>"
      +         "</div>"
      +       "</div>"
      +     "</div>"
      return html;
   }

}

class Feed { 
   static loadFeed(){
      var x = document.getElementById('main-row').innerHTML;
      fetch("http://localhost:5001/venushacksfood/us-central1/api//view-posts/10")
         .then(response => response.json())
         .then(data => {
            data.forEach(post => {
               let cur = Card.generateHTML(post.title, post.id, post.postUser, post.description, post.status);
               x = x + cur;
               document.getElementById('main-row').innerHTML = x;
            }) 
         });
   }

   static renderOneCard(){
      
   }
}