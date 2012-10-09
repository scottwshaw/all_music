var addSearchButtonClickHandler = function() {
    console.log('adding search button click handler');
    function displayAsList(data) {
        var ul =
            $('<ul>', {'class':'thumbnails'}).
                appendTo($('<div>', {'class':'span9'}).
                appendTo('#contentarea'));
        $(data.searchResponse.results).each(function (index, item) {
            ul.append(
                $('<li>', {'class':'span3'}).text(item.album.primaryArtists[0].name)
            );
        });
    }

    function displayEmptyResults() {
        $('<div>', {'class':'alert alert-info'}).
            text('Your search for "' + $('input[name=terms]').val() +
            '" returned no results').appendTo('#contentarea');
    }

    var searchFunction = function() {
        $('body').spin();
        var success = function(data) {
            $('#contentarea').empty();
            if(data.searchResponse.totalResultCounts > 0) {
                displayAsList(data);
            } else {
                displayEmptyResults();
            }
            $('body').spin(false);
        };
        $.ajax({
            url: "/searchrovi",
            type: "GET",
            data: 'terms=' + encodeURIComponent($('input[name=terms]').val()),
            success: success
        });
        return false; // prevents further event handling
    };
    $('#rovisearch').click(searchFunction);
};
