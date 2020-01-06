$('document').ready(function() {
  if($('#content').length){
    console.log("element exists");
    getData('http://localhost:3000/pages/getNews');
  }
});

function getData(url) {
  $.ajax({
    type: "GET",    
    url: url,
    contentType: 'text/html',
    data: '{url: https://news.ycombinator.com/best}',
    dataType: 'json',
    complete: function(data) {
      console.log("data: ", data);
      $('#content').html(data.responseText);
    },
    error: function(error) {
      console.log("error: ", error);
    }
  });
}