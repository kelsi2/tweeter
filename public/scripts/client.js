/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//moment calculates the time since the tweet was created for the tweet element footer
const moment = require("moment");
//fromNow allows moment to calculate the time from the moment the tweet was created
const fromNow = require("fromnow");

$(document).ready(function() {

  //Create HTML article for tweet post
  const createTweetElement = tweetData => {
    //header
    const $header = $("<header>").addClass("tweet-header");
    const $avatar = $("<img>", {class: "avatar", src: tweetData.user.avatars});
    const $name = $("<h2>", {class: "name"}).text(tweetData.user.name);
    const $handle = $("<p>", {class: "handle"}).text(tweetData.user.handle);
    $header.append($avatar, $name, $handle);

    //body
    const $tweetText = $("<div>", {class: "tweet-text"}).text(tweetData.content.text);

    //footer
    const $footer = $("<footer>").addClass("tweet-footer");
    const $time = $("<div>", class {"post-date";}).text(tweetData.created_at);
    // const $count = $("<span>", {class: "like-count"}).text(tweet.likes.length);
    // const $like = $("<img>", {class: "like-tweet clickable hide"});
    // const $span = $("<span>", {class: "like-text"}).text("likes");
    $footer.append($time);

    //create article
    const $tweet = $("<article>");
    $tweet.append($header, $tweetText, $footer);
    return $tweet;
  };



  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.  

});