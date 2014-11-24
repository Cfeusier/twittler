Twittler = (function () {

  // private methods
  var priv = {
    createBody: function() {
      var $body = $('body');
      $body.html('');
      return $body;
    },
    createTweet: function ($body, tweet) {
      var $tweet = $('<div class="tweet"></div>');
      $tweet.html('<p><span class="user">' + '@' + tweet.user + '</span>: ' + tweet.message + " | " + tweet.created_at + '</p>');
      $tweet.appendTo($body);
    },
    injectStream: function ($body, stream) {
      for (var index = stream.length - 1; index >= 0; index--) {
        this.createTweet($body, stream[index]);
      }
    },
    getUser: function (e) {
      var txt = $(e.target).text();
      return txt.match(/@/) ? txt.replace(/@/, "") : txt.replace("New Tweets for ", "");
    },
    renderTimeline: function (e) {
      var user = priv.getUser(e);
      var $body = priv.createBody();
      $body.html('<a href="index.html">Home</a><br /><br /><button type="submit" class="loadMoreUserTweets">New Tweets for ' + user + '</button>');
      priv.injectStream($body, streams.users[user]);
    },
    bindEvents: function (e) {
      $(document).on('click', '.tweet, .loadMoreUserTweets', priv.renderTimeline);
      $(document).on('click', '.loadMoreTweets', app.run);
    }
  };

  // public twittler interface
  var app = {
    run: function () {
      var $body = priv.createBody();
      $body.html('<button type="submit" class="loadMoreTweets">Load New Tweets</button>');
      priv.injectStream($body, streams.home);
      priv.bindEvents();
    }
  };

  // expose public twittler interface
  return app;
})();

// App Runner
$(function () { Twittler.run(); });
