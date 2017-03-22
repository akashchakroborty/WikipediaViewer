$(document).ready(function() { 
    var markup_1 = "<div class=\"Result\"><h2><a class=\"Title_Link\" href=\"";
    var markup_2 = "\" target=\"_blank\"><i class=\"fa fa-external-link\" aria-hidden=\"true\"></i> <span class=\"Title\">";
    var markup_3 = "</span></a></h2><h3 class=\"Description\">";
    var markup_4 = "</h3></div><div class=\"Res_Border\"></div>";

    function wikiSearch() {
        var MediaWiki_API = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&callback=?&search="; 
        
        var searchedWord = encodeURIComponent($('#search').val().trim());
        var full_URL = MediaWiki_API + searchedWord;
        $("#Results_container").empty(); //So when you search again the container will be cleared from the previous search results.

        $.getJSON(full_URL, function(response) { // Console.Log(response) to understand my loop more.
            for (var i = 1; i   < response[1].length; i++) {
                var title       = response[1][i];
                var description = response[2][i];
                var URL         = response[3][i];
             
                var fullResult  = markup_1 + URL + markup_2 + title + markup_3 + description + markup_4;
                $("#Results_container").append(fullResult);
            }; // End of FOR-i
        }); //----.getJSON-WikiAPI
    }; //----End of wikiSearch()

    $("#search_btn").on('click', wikiSearch);
    $("#search").on("keypress", function(event) {
        if (event.keyCode == 13) { // keycode number 13 is the ENTER key. So when you press enter the function wikiSearch() will be evoked.
            wikiSearch();
        }
    }); //----End of #search".on"keypress"
}); //----End-Doc.ready

/********
action : opensearch     (search the wiki) 
limit  : 10             (Number of search results to display)
format : json           (You tell me?)
search : searchedWord   (what you searched)
callback : ?            (Treats the request as JSONP instead)


NOTE: TIP: Use &format=jsonfm for debugging search results.
NOTE: For testing purposes: console.log()

 
NOTE: If the URL includes the string "callback=?" (or similar, as defined by the server-side API), the request is treated as JSONP instead.
Using callback=? will wrap the JSON response with a parentheses and brackets "([ JSON_DATA ])"

********/