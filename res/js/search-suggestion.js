$(window).on('load', function() {
  $('#input-search').on('input', function() {
    let text = $('#input-search').val();
    $('.search-suggestions').empty();

    let suggestion_url = "http://google.com/complete/search?client=firefox&q=" + text;

    $.ajax({
      url: suggestion_url,
      success: function(result) {
        var p = $.parseJSON(result);
        $.each(p[1], function(key, val) {
          $('.search-suggestions').append('<a href="https://www.google.com/search?q=' + val + '">' + val + "</a>");
        });
      }
    });
  });
});
