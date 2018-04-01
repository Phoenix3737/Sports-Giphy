var topics = ["Atlanta Falcons", "Braves", "Atlanta Hawks", "Georgia Bulldogs", "Georgia Tech Yellow Jackets", "Georgia Southern Eagles"];

function renderButtons() {
    $("#topics-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topics");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#topics-view").append(a);
    }
}

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    renderButtons();
});

renderButtons();

$(document).on("click", "button", function () {
    var sport = $(this).data("name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sport + "&api_key=fQCwJ8GOYebmEo7xj9CPLBTR7zmWxPRm&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var sportImage = $("<img>");
                    sportImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.append(p);
                    gifDiv.append(sportImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
});