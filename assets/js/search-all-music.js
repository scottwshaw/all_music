var addSearchButtonClickHandler = function() {
    console.log('adding search button click handler');
    function displayAsList(data) {
        var ul =
            $('<ul>', {'class':'thumbnails'}).
                appendTo($('<div>', {'class':'span12'}).
                appendTo('#contentarea'));
        $(data.searchResponse.results).each(function (index, item) {
            var thumb = $('<div>', {'class':'thumbnail'})
            var title = $('<h3>').text(item.album.title).appendTo(thumb);
            var artist = $('<h4>').text(item.album.primaryArtists[0].name).appendTo(thumb);
            if(item.album.headlineReview){
                var review = $('<p>').text(item.album.headlineReview.text).appendTo(thumb);
            }
            var li = $('<li>', {'class':'span3'});
            thumb.appendTo(li);
            li.appendTo(ul);
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
