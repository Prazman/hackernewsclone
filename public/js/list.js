//get link list
function fetchLinkList(){
	$.get('./api/links/', function(data) {
    rows = []
    for (var i = 0; i < data.length; i++) {
        rows.push(buildLinkRow(data[i]))
    }
    $('#links_table').html(rows);
})
}
function buildLinkRow(rowdata) {
    var rowcontent = $('<tr><td><a href=' + rowdata.link + '>' + rowdata.title + '</a></td></tr>')
    return rowcontent;
}

$(document).ready(function(){
	fetchLinkList();
	//handles create link form submission
$('#create_form').submit(function() {
    var data = {
        title: $('#title').val(),
        link: $('#link').val()
    }
    console.log(data)

    $.post('./api/links/create', data, function(e) {
        fetchLinkList();
    })
    return false
})
})