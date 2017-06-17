

console.log("JavaScript file connected");
console.log("Hello, Clement");

/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with

var submit_button = document.getElementById('submit-button');
var searchResults = "";

// 2. Create your `onSubmit` event for getting the user's search term


submit_button.addEventListener('click', function getResults() {
  searchResults = document.getElementById('search-textbox').value;
})


// 3. Create your `fetch` request that is called after a submission

submit_button.addEventListener('click', function acquireMusic() {
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

response.json().then(function(data){

  for (var i = 0; i < 30; i++) {
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

  let htmlMarkup = `
  <div class="JS-results">
    <ul>
      <li><img src="${artistPic}"></li>
      <li><a href="${songUrl}" target="_blank">${songTitle}</a></li>
      <li><span><a href="${artistUrl}" target="_blank">${artistName}</a></span></li>

    </ul>
  </div>`

  document.getElementById('results').innerHTML += htmlMarkup;
};

  let htmlMarkupSearchResults = `
    <div>
    <br>
    <br>
    <hr>
    <br>
    <span>Search Results:</span>
    <br>
    <br>
    </div>`

  document.getElementById('search-results').innerHTML = htmlMarkupSearchResults;


  });
})});

// 4. Create a way to append the fetch results to your page


// 5. Create a way to listen for a click that will play the song in the audio play
