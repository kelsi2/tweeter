/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = tweet => {
    //header
    const $header = $("<header>").addClass("tweet-header");
    const $avatar = $("<img>", {class: "avatar", src: tweet.user.avatars});
    const $user = $("<h2>", {class: "user"}).text(tweet.user.name);
    const $handle = $("<p>", {class: "handle"}).text(tweet.user.handle);
    $header.append($avatar, $user, $handle);

    //body
    const $tweetText = $("<div>", {id: "tweet-text"}).text(tweet.content.text);

    //footer
    const $footer = $("<footer>").addClass("tweet-footer");
    const $time = $("<div>", {class: "post-date"}).text(tweet.created_at);
    // var $div = $("<div>", {class: "footer-div"});
    // var $count = $("<span>", {class: "like-count"}).text(tweet.likes.length);
    // var $like = $("<img>", {class: "like-tweet clickable hide"});
    // var $span = $("<span>", {class: "like-text"}).text("likes");
    // $div.append($count, $span, $like);
    $footer.append($time);

    //create article
    const $tweet = $("<article>").addClass("tweet");
    $tweet.append($header, $tweetText, $footer);
    return $tweet;
  };

  const renderTweets = (tweets) => {
    $(".tweet-container").empty();
    tweets.forEach(tweet => {
      const newTweet = createTweetElement(tweet);
      $(".tweet-container").prepend(newTweet);
    });
  };

  //receive all tweets from server and display in feed
  const loadTweets = () => {
    $(".tweet-container").empty();
    $.ajax({
      method: "GET",
      url: "/tweets/",
    }).then((response) => {
      renderTweets(response);
    });
  };

  //use AJAX to POST tweet to /tweets
  $(".submit-tweet").submit(function(event) {
    event.preventDefault();

    //serialize new tweet form data for submission to server
    const serializedData = $(this).serialize();

    $.post({
      url: "/tweets/",
      data: serializedData,
      success: () => {
        $("#tweet-text").val("");
        loadTweets();
      },
      error: () => {
        const textArea = $("textarea").val();
        if (textArea === "") {
          alert("Please enter a Tweet!");
        } else if (textArea.length > 140) {
          alert("Your Tweet has too many characters, please make it shorter!");
        }
      }
    });
  });
});