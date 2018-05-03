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

    $.post('./api/comments/create', data, function(comment) {
        callback(comment)
    })
}

function upVoteLink(link_id,callback) {
	$.post('./api/links/' + link_id + '/upvote', function(link) {
        callback(link)
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
            fetchLinkList(function(links) {
                self.links = links;
            })

        },
        getComments(index){
        	var self = this;
        	var link = self.links[index]
        	fetchCommentList(link._id,function(comments){
        		link.comments = comments
        		Vue.set(self.links, index, link)
        	})

        },
        postLink() {
            var self = this;
            title = $('#link_title').val();
            link = $('#link_address').val();
            postLink(title, link, function(link) {
                self.links.push(link)
                $('#link_title').val("");
                $('#link_address').val("");
            })
        },
        postComment(index){
        	var self = this;
        	var link = self.links[index]
        	postComment(link._id,self.comment_content,function(comment){
        		link.comments.push(comment);
        		Vue.set(self.links, index, link)
        		self.comment_content = "";
        	})
        },
        upVoteLink(index){
        	var self= this
        	var link = self.links[index]
        	upVoteLink(link._id,function(link){
        		Vue.set(self.links, index, link)
        		self.links.sort(function(a,b){
        			return a.upvote_count<b.upvote_count
        		})
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