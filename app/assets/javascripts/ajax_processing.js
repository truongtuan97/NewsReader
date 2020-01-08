$('document').ready(function() {
  displayDataAtFirstTime();
});

function displayDataAtFirstTime(){
  $($('.more_button')[0]).hide();

  var url = $('#url_page_get_news').text();    
  getData(url, 'https://news.ycombinator.com/best');
  if ($('#content').length > 0){
    if ($('#content').html().length > 0) {
      $($('.more_button')[0]).show();
    } else {
      $($('.more_button')[0]).hide();
    }
  }    
}

function loadMore(sender){
  var index = $(sender).attr('page');
  var url = $('#url_page_get_news').text();    

  index = parseInt(index) + 1;
  $(sender).attr('page', index);
  getData(url, 'https://news.ycombinator.com/best?p=' + index);
}

function getData(url, pageUrl) {
  $.ajax({
    type: "GET",    
    url: url,
    contentType: 'application/json',
    data: 'url=' + pageUrl,
    dataType: 'json',
    complete: function(data) {      
      var doc = data.responseText;
      processDataAndDisplay(doc);
    },
    error: function(error) {
      console.log("error: ", error);
    }
  });
}

function processDataAndDisplay(data) {
  $($('.more_button')[0]).hide();

  var table = $(data).find('table .itemlist');
  var titles = [];
  var urls = [];

  getUrlsAndTitles(table, titles, urls);

  var string_html = processDisplayContent(titles, urls);

  $('#content').html(string_html);

  setRandomColor();

  if ($('#content').length > 0){
    if ($('#content').html().length > 0) {
      $($('.more_button')[0]).show();
    } else {
      $($('.more_button')[0]).hide();
    }
  }
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
  var page_detail_url = $('#url_page_detail').text() + '?page=';

  var html_str = '';
  for (var i = 0; i < titles.length; i++) {
    html_str += "<div class='col-sm-3 single-post-card'>";
    html_str +=   "<div class='card'>";
    html_str +=     "<div class='card-block'>";
    html_str +=         "<a href='" + page_detail_url + urls[i] + "' class='interested'>"     
    html_str +=           "<h4 class='post-text'>" + titles[i] + "</h4>"
    html_str +=         "</a>"
    html_str +=       "<div class='post-content'>"    
    html_str +=       "</div>"
    html_str +=     "</div>"
    html_str +=   "</div>"
    html_str += "</div>"
  }

  return html_str;
}