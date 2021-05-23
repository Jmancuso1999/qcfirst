$(function(){ // this will be called when the DOM is ready
    $(`#search`).keyup(function () {
        $.getJSON(`data.json`, function(data){
            var output = `<ul class= "searchResults">`;
            $.each(data, function(key, val) {
                    output += `<div class="box is-fluid">`;
                    output += `<p>` + val + `</p>`;
                    output += `</div>`;
            });
            output += `<ul>`;
            $(`#update`).html(output);
        });
    });
});