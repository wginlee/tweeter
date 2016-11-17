/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  var data = [];

  function createTweetElement(tweet) {
    var $tweet = $('<article>').addClass('tweet');

    var $header = $('<header>');
    $header.append($('<img>').addClass('avatar').attr({src: tweet.user.avatars.regular}));
    $header.append($('<span>').addClass('name').text(tweet.user.name));
    $header.append($('<span>').addClass('handle').text(tweet.user.handle));

    var $content = $('<p>').addClass('content').text(tweet.content.text);

    var $footer = $('<footer>');
    $footer.append($('<span>').addClass('time-posted').text(moment(tweet.created_at).fromNow()));
    $footer.append($('<span>').addClass('action-icons').text("icons"));

    $tweet.append($header).append($content).append($footer);

    return $tweet;
  }

  function renderNewTweet(tweet){
    var $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }

  function loadTweets(){
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json'
    }).done(function(tweets){

      renderTweets(tweets);
    });

  }

  loadTweets();

  function renderTweets(tweets) {
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container

    for (let tweet in tweets){
      var $tweet = createTweetElement(tweets[tweet]);
      $('#tweets-container').append($tweet);
    }
  }

  $('form[action="/tweets"]').on('submit', function (event) {
    event.preventDefault();
    var theForm = $(this);
    var flash = $(this).find('.flash-message');

    var charLength = theForm.find('textarea').val().length;

    if (charLength === 0){
      flash.text("Tweet cannot be empty!");
      return;
    }

    if (charLength > 140){
      flash.text("Too many characters!")
      return;
    }

    $.ajax({
      method: theForm.attr('method'),
      url: theForm.attr('action'),
      data: theForm.serialize()
    }).done(function (newTweet) {
      renderNewTweet(newTweet);
    });

    theForm.find('textarea[name=text]').val(''); //clears the textarea
    flash.text("");
  });

  $('new-tweet').hide();

  $('#nav-bar .button').click(function() {
    $('.new-tweet').slideToggle();
    $('.new-tweet').find($('textarea')).focus();

  });

  renderTweets(data);

});