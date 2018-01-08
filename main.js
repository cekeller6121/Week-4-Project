

// ?client_id=86b6a66bb2d863f5d64dd8a91cd8de94
// ^ Client ID needed in order to stream tracks

console.log("JavaScript file connected");
console.log("Hello, Clement");

var submit_button = document.getElementById('submit-button');
var search_textbox = document.getElementById('search-textbox');
var searchResults = "";

submit_button.addEventListener('click', function submitButton() {
    searchResults = document.getElementById('search-textbox').value;
    acquireMusic(searchResults);
});

search_textbox.addEventListener('keydown', function enterKey(e) {
  var key = e.keyCode;
  if (key === 13) {
    searchResults = document.getElementById('search-textbox').value;
    acquireMusic(searchResults);
  };
});

function acquireMusic(e) {
  searchResults = document.getElementById('search-textbox').value;
  fetch('https://api.soundcloud.com/tracks/?client_id=86b6a66bb2d863f5d64dd8a91cd8de94&q=' + searchResults)
    .then(
      function(response) {
        console.log("Submit button click");
        if (response.status !== 200) {
          console.log("Looks like there was a problem. It's a trap!" + response.status);
          return
          } else {
            console.log("Lookin' good, dev. Response status: " + response.status);
    }
    console.log(searchResults);

response.json().then(function(data){ // Variables set below pull in data from the API. The bottom one
                                     // concatenates the stream url with the client id needed to play the song.
  for (var i = 0; i < data.length && i < 36; i++) {

    var artistName = data[i].user.username;
    console.log(artistName);
    var artistPic = data[i].user.avatar_url;
    console.log(artistPic);
    var artistUrl = data[i].user.permalink_url;
    console.log(artistUrl);
    var songTitle = data[i].title;
    console.log(songTitle);
    var songUrl = data[i].permalink_url;
    console.log(songUrl);
    var streamUrl = data[i].stream_url + "/?client_id=86b6a66bb2d863f5d64dd8a91cd8de94";
    console.log(streamUrl);

  let htmlMarkup = `
  <div class="JS-results">
    <div class="result-box">
    <ul>
      <li><img src="${artistPic}" alt="${artistName} Album Artwork" title="${artistName} Album Artwork"></li>
      <li><a class="song_title" href="${streamUrl}" id="${artistName}" name="${songTitle}">${songTitle}</a></li>
      <li><span><a href="${artistUrl}" target="_blank">${artistName}</a></span></li>
    </ul>
    </div>
  </div>`

  document.getElementById('results').innerHTML += htmlMarkup;
};

  let htmlMarkupSearchResults = `
    <div class="searchTitleMarkup">
    <br>
    <br>
    <hr>
    <br>
    <span>Search Results:</span>
    <br>
    <br>
    </div>`

  document.getElementById('search-results').innerHTML = htmlMarkupSearchResults;

  songTitleArray = document.getElementsByClassName('song_title') // Loops over the results and listens for click
    for (s = 0; s < songTitleArray.length; s++) {
      songTitleArray[s].addEventListener('click', function getTrackToPlay(e) {
        console.log("Track clicked, let's play...");
        e.preventDefault(); // Prevents the page from redirecting to play the file when clicked
        var clickedSong = e.target.getAttribute('href'); // Targets only the link to be passed into the variable
        console.log(clickedSong);
        var clickedSongName = e.target.getAttribute('name');
        console.log(clickedSongName);
        var clickedSongArtist = e.target.getAttribute('id');
        console.log(clickedSongArtist);

        let weGotIt = `
        <audio id="music-player" controls="controls" src="${clickedSong}" autoplay></audio>
        <marquee behavior="scroll" direction="left">${clickedSongName} ~ ${clickedSongArtist}</marquee>`

        document.getElementById('player').innerHTML = weGotIt; // Replaces the empty audio element
      });
  };

});
})};










// *** Intentional white space ***
