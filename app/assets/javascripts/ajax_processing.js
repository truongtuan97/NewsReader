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
    contentType: 'application/json',
    data: 'url=https://news.ycombinator.com/best',
    dataType: 'json',
    complete: function(data) {      
      var doc = data.responseText;
      var content = $(doc).find('table .itemlist');       
      $('#content').html(content);
    },
    error: function(error) {
      console.log("error: ", error);
    }
  });
}

