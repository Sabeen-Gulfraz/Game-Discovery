console.log(search_data)
$.ajax({
    url: `https://api.rawg.io/api/games?key=e846941916824f6091e522660b25338c&search=${search_data}`,
    dataType: "json",
     beforeSend: function () {
        $(".cards").append(`<img  width="104px" height="104px" src=${loading} alt="">`);
    },
    success: function (response) {
        $(".cards").html("")
        var matchingGames = response.results;

        // Filter games where the entered word is present in the game title
        var filteredGames = matchingGames.filter(game => game.name.toLowerCase().includes(search_data.toLowerCase()));

        if (filteredGames.length > 0) {
            filteredGames.forEach(game => {
                var game_id = game.id
                console.log(game_id)
                var gameName = game.name;
                var backgroundImage = game.background_image;
                var releaseDate = game.released;
                 var rate = game.rating;
                 var review = game.reviews_count;
                var genreName = game.genres.length > 0 ? game.genres[0].name : "N/A";

                $(".cards").append(`
                     <div class="card">
                          <img src="${backgroundImage}" class="card-img-top" alt="...">
                          <div class="card-des">
                               <h2 class="card-title">${gameName}</h2>
                               <div class="list-group">
                                   <span class="list-group-item"> - Release date  : ${releaseDate} </span>
                                    <span class="list-group-item"> - Category  : ${genreName} </span>
                                     <span class="list-group-item"> - Rating  : ${rate} </span>
                                    <span class="list-group-item"> - Views  : ${review} </span>
                               </div>
                               <div class="links">
                                    <a href="/favorites">
                                         <button class="card-link">Add to Favorites</button>
                                    </a>
                                    <button class="card-link" onclick="gotogamepage(${game_id})">Go to Official Page</button>
                                     <button class="card-link" onclick='watchTrailer("${gameName}")'>Watch Trailer</button>
                               </div>
                          </div>
                     </div>
                `);
            });
        } else {
            $(".cards").html(`
              <div style="color: gray">No games found for your search 😞 , please try again....</div>
            `);
        }
    }
});
