
var addSearchButtonClickHandler = function() {
    var searchFunction = function(terms) {
        console.log('search button clicked with value ' + $('input[name=terms]').val())
        $.ajax({
            url: "/searchrovi",
            type: "GET",
            data: 'terms=' + $('input[name=terms]').val(),

            success: function(data) {
                $('#contentarea').empty();
                if(data.searchResponse.totalResultCounts > 0) {
                    var ul = $('<ul>',{'class': 'artist-list'}).appendTo('#contentarea');
                    $(data.searchResponse.results).each(function(index, item) {
                        ul.append(
                         $(document.createElement('li')).text(item.song.primaryArtists[0].name)
                        );
                    });
                } else {
                    $('<div>', {'class': 'alert alert-success'}).
                        text('Your search returned no results').appendTo('#contentarea');
                }
            }});
        return false;
    };
    console.log('adding search click event handler')
    $('#rovisearch').click(searchFunction);
};
