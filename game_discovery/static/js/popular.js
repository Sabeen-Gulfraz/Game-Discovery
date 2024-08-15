$("#top").addClass("active")
$.ajax({
    url: "https://api.rawg.io/api/games?key=e846941916824f6091e522660b25338c&ordering=-rating&page_size=40",
    dataType: "json",
     beforeSend: function () {
      $(".cards").append(`<img  width="104px" height="104px" src="./static/images/loading.gif" alt="">`);
    },
    success: function (response) {
        $(".cards").html(" ")
        if (response.results.length > 0) {
            for (var i = 0; i < response.results.length; i++) {
                var gameData = response.results[i];
                var game_id = gameData.id
                var backgroundImage = gameData.background_image;
                var name = gameData.name;
                var releasedDate = gameData.released;
                var rate = gameData.rating;
                var review = gameData.reviews_count;
                var genreName = "";


                // Extract the name of the first genre (if available)
                if (gameData.genres.length > 0) {
                    genreName = gameData.genres[0].name;
                }
                 $(".cards").append(`
                     <div class="card">
                          <img src="${backgroundImage}" class="card-img-top" alt="...">
                          <div class="card-des">
                               <h2 class="card-title">${name}</h2>
                               <div class="list-group">
                                   <span class="list-group-item"> - Release date  : ${releasedDate} </span>
                                    <span class="list-group-item"> - Category  : ${genreName} </span>
                                     <span class="list-group-item"> - Rating  : ${rate} </span>
                                    <span class="list-group-item"> - Views  : ${review} </span>
                               </div>
                               <div class="links">
                                    <a href="/favorites">
                                         <button class="card-link">Add to Favorites</button>
                                    </a>
                                     <button class="card-link" onclick="gotogamepage(${game_id})">Go to Official Page</button>
                                    <button class="card-link" onclick="watchTrailer('${name}')">Watch Trailer</button>
                               </div>
                          </div>
                     </div>
                `);
            }
        } else {
            $(".cards").html(`
              <div style="color: gray">No games found 😞 , please try again....</div>
            `);
        }
    },
    error: function (error) {
        console.error("Error fetching data: " + error);
    }
});
