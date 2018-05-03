//get link list
function fetchLinkList(callback) {
    $.get('./api/links/', function(data) {
        rows = []
        for (var i = 0; i < data.length; i++) {
            rows.push(buildLinkRow(data[i]))
        }
        $('#links_table').html(rows);
        callback()
    })
}

function buildLinkRow(rowdata) {
    var rowcontent = $('<tr id=' + rowdata.id + '><td><a href=' + rowdata.link + '>' + rowdata.title + '</a></td></tr>')
    return rowcontent;
}

/*function buildCommentRow(commentdata){
	var commentrow = $('<tr id=' + commentdata.id + '><td><a href=' + commentdata.link + '>' + commentdata.title + '</a></td></tr>')
}

function fetchCommentList(link_id) {
    $.get('./api/comments/' + link_id + '/list', function(data) {
            rows = []
            for (var i = 0; i < data.length; i++) {
                rows.push(buildLinkRow(data[i]))
            }

        }
    }*/
    $(document).ready(function() {
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