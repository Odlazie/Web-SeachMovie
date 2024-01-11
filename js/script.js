// api key ef4baaf5
function movieSearch(){
    $('#movie-list').html('');
    $.ajax({
        type: "get",
        url: "http://www.omdbapi.com/",
        data: {
            'apikey' : 'ef4baaf5',
            's' : $('#search-input').val(),
        },
        dataType: "json",
        success: function (result) {
            if(result.Response === 'True'){
                let movies = result.Search;
                $.each(movies, function (i, data) { 
                     $('#movie-list').append(`
                    <did class="col-md-4">
                            <div class="card mb-4">
                            <img src="`+ data.Poster +`" class="card-img-top" >
                            <div class="card-body">
                            <h5 class="card-title">`+ data.Title +`</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">`+data.Year +`  `+ data.Type +`</h6>
                            <a href="#" class="card-link details" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+data.imdbID+`">Detail</a>
                            </div>
                        </div>
                    </div>
                     `)                
                    })
                    $('#search-input').val('');
            }else{
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">`+ result.Error+ `</h1>
                </div>
                `)
            }
        }
    });
}
$('#search-button').on('click', function(){
   movieSearch();
});

$('#search-input').on('keyup', function(e){
    if(e.which == 13){
        movieSearch();
    }
})
$('#movie-list').on('click','.details', function(){
    $.ajax({
        type: "get",
        url: "http://www.omdbapi.com/",
        dataType: "json",
        data: {
            'apikey' : 'ef4baaf5',
            'i' : $(this).data('id'),
        },
        success: function (result) {
            if( result.Response === 'True'){
                $('.modal-body').html(`
                <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        <img src="`+ result.Poster+`" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                        <ul class="list-group">
                        <li class="list-group-item"><h3>`+ result.Title +`</h3></li>
                        <li class="list-group-item">Released : `+ result.Released +`</li>
                        </ul>
                    </div>
                </div>
            </div>
                `)
            }
        }
    });
});