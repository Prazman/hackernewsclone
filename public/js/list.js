function fetchLinkList(callback) {
    $.get('./api/links/', function(links) {

        callback(links)
    })
}

function fetchCommentList(link_id, callback) {
    $.get('./api/comments/' + link_id + '/list', function(comments) {

            callback(comments);
        })
    }

function postLink(link_title, link_address, callback) {
    var data = {
        title: link_title,
        link: link_address
    }

    $.post('./api/links/create', data, function(link) {
        callback(link)
    })
}

function postComment(link_id, content, callback) {
    var data = {
        link_id: link_id,
        content: content
    }

    $.post('./api/links/create', data, function(comment) {
        callback(comment)
    })
}

 Vue.component('link-list', {

        template: '#link-list-template',

        data: () => ({
            links: []
        }),

        mounted() {
            this.getLinks();
        },

        methods: {

            getLinks() {
            	var self = this
            	fetchLinkList(function(links){
            		self.links = links;
            	})
                
            }
        }
    });

    // Create new Vue instance and mount onto elmement with id app
    var app = new Vue({
        el: '#app'
    });
	


    /*//get link list


    function buildLinkRow(rowdata) {
        var rowcontent = $('<tr id=' + rowdata.id + '><td><a href=' + rowdata.link + '>' + rowdata.title + '</a></td></tr>')
        return rowcontent;
    }

    function buildCommentRow(commentdata){
    	var commentrow = $('<tr id=' + commentdata.id + '><td><a href=' + commentdata.link + '>' + commentdata.title + '</a></td></tr>')
    }


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
        })*/