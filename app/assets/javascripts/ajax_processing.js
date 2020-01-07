$('document').ready(function() {
  if($('#content').length){
    console.log("element exists");
    var url = $('#url_page_get_news').text();
    console.log(url);
    getData(url);
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
      var table = $(doc).find('table .itemlist');    
      var titles = [];
      var urls = [];

      getUrlsAndTitles(table, titles, urls);
    
      var string_html = processDisplayContent(titles, urls);

      $('#content').html(string_html);

      setRandomColor();
    },
    error: function(error) {
      console.log("error: ", error);
    }
  });
}

function getUrlsAndTitles(contentTable, titles, urls) {  
  var tbody = $(contentTable).children('tbody');
  var trs = $(tbody).children('tr .athing');
  for (var i=0; i< trs.length; i++) {
    var title_el = $(trs[i]).children('td .title');
    var a_tag = $(title_el).children('a');
    titles.push($(a_tag).text());
    if ($(a_tag).attr('href').indexOf('http') < 0)
      urls.push('https://news.ycombinator.com/' + $(a_tag).attr('href'));
    else
      urls.push($(a_tag).attr('href'));
  }  
}

function processDisplayContent(titles, urls) {
  var html_str = '';
  for (var i = 0; i < titles.length; i++) {
    html_str += "<div class='col-sm-3 single-post-card'>";
    html_str +=   "<div class='card'>";
    html_str +=     "<div class='card-block'>";
    html_str +=         "<a href='" + urls[i] + "' class='interested'>"     
    html_str +=           "<h4 class='post-text'>" + titles[i] + "</h4>"
    html_str +=         "</a>"
    html_str +=       "<div class='post-content'>"    
    html_str +=       "</div>"
    html_str +=     "</div>"
    html_str +=   "</div>"
    html_str += "</div>"
  }

  html_str   += "<div class='col-sm-12 more_button'>"
  html_str   +=   "<sapn>More</span>"
  html_str   += "<div>"
  return html_str;
}