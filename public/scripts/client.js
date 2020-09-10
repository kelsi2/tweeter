/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // const createTweetElement = tweetData => {
  //   //header
  //   const $header = $("<header>").addClass("tweet-header");
  //   const $avatar = $("<img>", {class: "avatar", src: tweetData.user.avatars});
  //   const $user = $("<h2>", {class: "user"}).text(tweetData.user.name);
  //   const $handle = $("<p>", {class: "handle"}).text(tweetData.user.handle);
  //   $header.append($avatar, $user, $handle);

  //   //body
  //   const $tweetText = $("<div>", {class: "tweet-text"}).text(tweetData.content.text);

  //   //footer
  //   const $footer = $("<footer>").addClass("tweet-footer");
  //   const $time = $("<div>", class {"post-date";}).text(tweetData.created_at);
  //   // const $count = $("<span>", {class: "like-count"}).text(tweet.likes.length);
  //   // const $like = $("<img>", {class: "like-tweet clickable hide"});
  //   // const $span = $("<span>", {class: "like-text"}).text("likes");
  //   $footer.append($time);

  //   //create article
  //   const $tweet = $(`<article class="tweet">Hello world</article>`);
  //   $tweet.append($header, $tweetText, $footer);
  //   return $tweet;
  // };

  const createTweetElement = (tweet) => {
    const $tweet = $(`<article class="tweet">Hello world</article>`);
    const htmlStr = `<article class="tweet">
      <header class="tweet-header">
          <div class="user">
            <img
              src="${tweet.user.avatars}"
              alt="avatar"
            />
            <span>${tweet.user.name}</span>
          </div>
          <div class="handle">${tweet.user.handle}</div>
        </header>
        <div class="tweet-text">
          ${tweet.content.text}
        </div>
        <footer class="tweet-footer">
          <div class="post-date">${tweet.created_at}</div>
          <span class="social icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </span>
        </footer>`;
    $tweet.append(htmlStr);
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

    const textArea = $("textarea").val();
    if (textArea === "") {
      alert("Please enter a Tweet!");
    } else if (textArea.length > 140) {
      alert("Your Tweet has too many characters, please make it shorter!");
    }

    //serialize new tweet form data for submission to server
    const serializedData = $(this).serialize();

    $.post({
      url: "/tweets/",
      data: serializedData,
      success: () => {
        $(".tweet-text").val("");
        loadTweets();
      }
    });
  });
});