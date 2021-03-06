var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  var top10 = tracks.slice(0,10);
  return top10;
}

function extractPopularity(tracks) {
  var popularity = tracks.map(function(obj){
    return obj.popularity;
  });
  return popularity;
}

function extractNames(tracks) {
  var names = tracks.map(function(obj){
    return obj.name;
  });
  return names;
}

function chartData(labels, inputData) {

  var data = {
    labels: labels,
    datasets: [
        {   label: "Spotify Top",
            data: inputData,
            fillColor: 'rgba(220,220,220,0.5)',
            strokeColor: 'rgba(220,220,220,0.8)',
            highlightFill: 'rgba(220,220,220,0.75)',
            highlightStroke: 'rgba(220,220,220,1)'
        }
    ]
};
return data;
}

function getSpotifyTracks(callback){
  var json = $.ajax({url: url, success: (function() {
      callback(jQuery.parseJSON(json.responseText).tracks)
    })
  })
};



  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  var tracks = extractTop10Tracks(parsedJSON);
  var names = extractNames(tracks);
  var popularity = extractPopularity(tracks);
  var ctx = $('#spotify-chart').get(0).getContext("2d");
  var data = chartData(names, popularity)
  var myBarChart = new Chart(ctx).Bar(data, {});
};
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
