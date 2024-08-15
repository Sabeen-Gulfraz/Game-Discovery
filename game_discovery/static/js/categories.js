$("#cat").addClass("active")

$.ajax({
    url: "https://api.rawg.io/api/genres?key=e846941916824f6091e522660b25338c",
    dataType: "json",
     beforeSend: function () {
        $(".categories").append(`<img  width="104px" height="104px" src="./static/images/loading.gif" alt="">`);
    },
    success: function (response) {
        $(".categories").html("")
        if (response.results.length > 0) {
            console.log(response)
            var genres = response.results;
            for (var i = 0; i < genres.length; i++) {
                var genresData = genres[i];
                var backgroundImage = genresData.image_background;
                var name = genresData.name;

                $(".categories").append(`
                     <div class="category">
                            <img id="img-bg" src="${backgroundImage}" alt="bg">
                            <h1 class="cat-name">${name}</h1>
                            <a href="/category/${name}">View Games</a>
                     </div>
                 `);
            }
        }
    }
});