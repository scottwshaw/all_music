var addSearchFunction = function() {
        console.log("adding search click handler...")
        $('#search').click(function() {
            alert($('textarea[name=terms]'));
            return false;
        });
    };
