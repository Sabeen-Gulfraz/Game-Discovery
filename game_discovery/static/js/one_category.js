console.log(loading)
$.ajax({
    url: "https://api.rawg.io/api/genres?key=e846941916824f6091e522660b25338c",
    dataType: "json",
     beforeSend: function () {
        $(".cards").append(`<img  width="104px" height="104px" src=${loading}  alt="">`);
    },
    success: function (response) {
        if (response.results.length > 0) {
            var genres = response.results;
            var userSelectedGenre = name;

            var selectedGenre = genres.find(genre => genre.name === userSelectedGenre);

            if (selectedGenre) {
                var genreId = selectedGenre.id;

                $.ajax({
                    url: `https://api.rawg.io/api/games?key=e846941916824f6091e522660b25338c&genres=${genreId}`,
                    dataType: "json",
                    success: function (gamesResponse) {
                         $(".cards").html("");
                        var games = gamesResponse.results;
                        console.log(games)
                        games.forEach(game => {
                           var game_id = game.id
                            $(".cards").append(`
                     <div class="card">
                          <img src="${game.background_image}" class="card-img-top" alt="...">
                          <div class="card-des">
                               <h2 class="card-title">${game.name}</h2>
                               <div class="list-group">
                                   <span class="list-group-item"> - Release date  : ${game.released} </span>
                                    <span class="list-group-item"> - Category  : ${name} </span>
                                    <span class="list-group-item"> - Rating  : ${game.rating} </span>
                                    <span class="list-group-item"> - Views  : ${game.reviews_count} </span>
                               </div>
                               <div class="links">
                                    <a href="/favorites">
                                         <button class="card-link">Add to Favorites</button>
                                    </a>
                                     <button class="card-link" onclick="gotogamepage(${game_id})">Go to Official Page</button>
                                     <button class="card-link" onclick="watchTrailer('${game.name}')">Watch Trailer</button>
                               </div>
                          </div>
                     </div>
                     `)
                        });
                    }
                });
            } else {
                $(".cards").html(`
                     <div style="color: gray">No games found for this category 😞 , please try again....</div>
                `);
            }
        }
    }
});


