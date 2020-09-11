/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
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

  //immediate call of loadTweets so the feed loads when page is first visited
  loadTweets();

  // markup for new tweets
  const createTweetElement = (tweet) => {
    const escape = function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
    const timeDelta = moment(tweet.created_at).fromNow();
    const htmlStr = `<article class="tweet" id="tweet-box">
      <header class="tweet-header">
          <div class="user">
            <img src="${tweet.user.avatars}" class="avatar"/>
            <span class="name">${tweet.user.name}</span>
          </div>
          <div class="handle">${tweet.user.handle}</div>
        </header>
        <div class="tweet-text">
          ${safeHTML}
        </div>
        <footer class="tweet-footer">
          <div class="post-date">${timeDelta}</div>
          <span class="social-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </span>
        </footer>
        </article>`;
    $(".tweet-container").prepend(htmlStr);
  };

  // create new tweet and add it to the feed
  const renderTweets = (tweets) => {
    tweets.forEach(tweet => {
      const newTweet = createTweetElement(tweet);
      $(".tweet-container").prepend(newTweet);
    });
  };

  //use AJAX to POST tweet to /tweets
  $(".submit-tweet").submit(function(event) {
    event.preventDefault();

    //serialize new tweet form data for submission to server
    const serializedData = $(this).serialize();
    console.log(serializedData);

    // create error on submission if tweet is too long or short, or post the new tweet, clear text field, update the counter to 140, and load tweets
    const tweetText = $("#tweet-text").val();
    const $error = $("#errors");


    if (tweetText === "") {
      $error.empty();
      $error.append("<p><i class=\"fas fa-exclamation-triangle\"></i>Please enter a tweet!</p>");
      return false;
    } else if (tweetText.length > 140) {
      $error.empty();
      $error.append("<p><i class=\"fas fa-exclamation-triangle\"></i>Too many characters, please make your tweet shorter!</p>");
      return false;
    }
    $error.empty();
    $.post("/tweets", serializedData)
      .then(() => {
        $("#tweet-text").val("");
        $(".counter").text(140);
        loadTweets();
      });
  });
});
