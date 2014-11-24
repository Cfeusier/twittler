var TwittlerView = (function () {
  var createBody = function() {
    var $body = $('body');
    $body.html('');
    return $body;
  };

  var injectStream = function ($body) {
    var index = streams.home.length - 1;

    while(index >= 0) {
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($body);
      index -= 1;
    }
  };

  return {
    initView: function () {
      var body = createBody();
      injectStream(body);
    }
  }
})();

var TwittlerCtrl = (function () {
  var init = function (view) {
    view.initView();
  };

  return {
    runApp: function () {
      init(TwittlerView);
    }
  }
})();

// App Runner
$(function () {
  TwittlerCtrl.runApp();
});
