$(function(){ // this will be called when the DOM is ready
    $(`#search`).keyup(function () {
    var searchField = $(`#search`).val();
    var myExp = new RegExp(searchField, "i");
        $.getJSON(`data.json`, function(data){
            var output = `<ul class= "searchResults">`;
            $.each(data, function(key, val) {
                if((val.name.search(myExp) !== -1) || (val.course.search(myExp) !== -1)) {
                    output += `<div class="box is-fluid">`;
                    output += `<h3 class="classFont">` + val.course + " - " + val.name + `</h3>`;
                    output += `<p>` + val.semester + `</p>`;
                    output += `<p>` + val.days + `</p>`;
                    output += `<p>` + val.time + `</p>`;
                    output += `</div>`;
                }
                // <button class="button is-small is-pulled-right is-primary">Add</button>
            });
            output += `<ul>`;
            $(`#update`).html(output);
        });
    });
});
