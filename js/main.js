$(document).ready(function(){
	// Twitter integration (JSON format) with AJAX
	$.ajax({
        url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
        type: 'GET',
        dataType: 'jsonp',
        data: {
            screen_name: username,
            include_rts: true,
            count: 3,
            include_entities: true
        },
        success: function(tweet, textStatus, xhr) {
        $(".tweets .tweetText").hide();
        
        id				= 0;
        tweet_num		= tweet.length;
        var tweet_text	= "<div class='header'><h4>Lastest Tweets</h4></div>";

        while(id < tweet_num) {
            tweet_text	+= '<div class="tweetText"><span class="text">' + JQTWEET.ify.clean(tweet[id].text) + '<span class="date">' +  JQTWEET.timeAgo(tweet[id].created_at) + '</span></span></div>';
            id++;
        }
        
        $(".tweets").html(tweet_text);
        $(".tweets").hide().fadeIn(1000);
        }
    });
	
    // Twitter data format function
    JQTWEET = {
        timeAgo: function(dateString) { // twitter date string format function
            var rightNow = new Date();
            var then = new Date(dateString);
             
            if ($.browser.msie) {
                // IE can't parse these crazy Ruby dates
                then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
            }
     
            var diff = rightNow - then;
            var second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7;
     
            if (isNaN(diff) || diff < 0) return "";
            if (diff < second * 2) return "right now";
            if (diff < minute) return Math.floor(diff / second) + " seconds ago";
            if (diff < minute * 2) return "about 1 minute ago";
            if (diff < hour) return Math.floor(diff / minute) + " minutes ago";
            if (diff < hour * 2) return "about 1 hour ago";
            if (diff < day) return  Math.floor(diff / hour) + " hours ago";
            if (diff > day && diff < day * 2) return "about 1 day ago";
            if (diff < day * 365) return Math.floor(diff / day) + " days ago";
            else return "over a year ago";
        }, // timeAgo()
         
        ify:  {
          link: function(tweet) { // twitter link string replace function
            return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
              var http = m2.match(/w/) ? 'http://' : '';
              return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
            });
          },
     
          at: function(tweet) { // twitter at (@) character format function
            return tweet.replace(/\B[@ï¼ ]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
              return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
            });
          },
     
          list: function(tweet) { // twitter list string format function
            return tweet.replace(/\B[@ï¼ ]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
              return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
            });
          },
     
          hash: function(tweet) { // twitter hash (#) string format function
            return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
              return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
            });
          },
     
          clean: function(tweet) { // twitter clean all string format function
            return this.hash(this.at(this.list(this.link(tweet))));
          }
        } // ify
    }
});