/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Create new tweet and add to feed
  const createTweetElement = (tweet) => {
    const escape = function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
    const htmlStr = `<article class="tweet">
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
          <div class="post-date">${tweet.created_at}</div>
          <span class="social-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </span>
        </footer>
        </article>`;
    $(".tweet-container").append(htmlStr);
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
    $("#tweet-container").empty();
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
    console.log(serializedData);


    const tweetText = $("#tweet-text").val();
    if (tweetText === "") {
      $(".text-too-short-error").slideDown();
    } else if (tweetText.length > 140) {
      $(".text-too-long-error").slideDown();
    } else {
      $(".text-too-short-error").slideUp();
      $(".text-too-long-error").slideUp();
      $.post({
        url: "/tweets/",
        data: serializedData,
        success: () => {
          $("#tweet-text").val("");
          $(".counter").text(140);
          loadTweets();
        }
      });
    }
  });
});



