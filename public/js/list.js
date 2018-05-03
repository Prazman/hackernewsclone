/*
Fetch the list of all links
*/
function fetchLinkList(callback) {
    $.get('./api/links/', function(links) {

        callback(links)
    })
}
/*
Fetch the list a comment attached to on link*/
function fetchCommentList(link_id, callback) {
    $.get('./api/comments/' + link_id + '/list', function(comments) {

        callback(comments);
    })
}
/*
Post a new link
*/
function postLink(link_title, link_address, callback) {
    var data = {
        title: link_title,
        link: link_address
    }

    $.post('./api/links/create', data, function(link) {
        callback(link)
    })
}
/*
Post a new comment on a link
*/
function postComment(link_id, content, callback) {
    var data = {
        link_id: link_id,
        content: content
    }

    $.post('./api/comments/create', data, function(comment) {
        callback(comment)
    })
}
/*
Upvote a link
*/
function upVoteLink(link_id, callback) {
    $.post('./api/links/' + link_id + '/upvote', function(link) {
        callback(link)
    })
}
/*
Our view component that renders the whole link list with comments
*/
Vue.component('link-list', {

    template: '#link-list-template',

    data: () => ({
        links: []
    }),

    mounted() {
        this.getLinks();
    },

    methods: {
    	/*
			Handles link list rendering
    	*/
        getLinks() {
            var self = this
            fetchLinkList(function(links) {
                self.links = links;
            })

        },
        /*
			Handles comment list rendering for one link
    	*/
        getComments(index) {
            var self = this;
            var link = self.links[index]
            fetchCommentList(link._id, function(comments) {
                link.comments = comments
                //update using view set to update view
                Vue.set(self.links, index, link)
            })

        },
        /*
			Handles link posting
    	*/
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
        /*
			Handles comment posting
    	*/
        postComment(index) {
            var self = this;
            var link = self.links[index]
            postComment(link._id, self.comment_content, function(comment) {
                link.comments.push(comment);
                Vue.set(self.links, index, link)
                self.comment_content = "";
            })
        },
        /*
			Handles link upvoting
    	*/
        upVoteLink(index) {
            var self = this
            var link = self.links[index]
            upVoteLink(link._id, function(link) {
                Vue.set(self.links, index, link)
                self.links.sort(function(a, b) {
                    return a.upvote_count < b.upvote_count
                })
            })

        }
    }
});

// Create new Vue instance and mount onto elmement with id app
var app = new Vue({
    el: '#app'
});
