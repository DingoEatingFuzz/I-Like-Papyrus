(function($) {

  /*
   * get url from location.hash
   * load url into an iframe
   * rape the tags in the iframe
   * modify the font-sizes
   */
  

  $.fn.papyrusize = function() {
    // staticy things
    var scaleTable = {
      'Verdana': 0.8
    };

    $(this).each(function() {
      // individual things
      var domain = pageRequest.match(/https?:\/\/.+\//);
      if(domain)
        domain = domain[0];
      else
        domain = pageRequest;
      $(this).find('[href]').each(function(index, val) {
        var href = $(val).attr('href');
        if(href[0] == '/' && href[1] != '/') {
          href = href.substr(1);
        }
        if(href !== '' && !href.match(/http/) && !href.match(/\/\//)) {
          $(val).attr('href', domain + href);
        }
      });
      $(this).find('[src]').each(function(index, val) {
        var src = $(val).attr('src');
        if(src[0] == '/')
          src = src.substr(1);
        if(src !== '' && !src.match(/http/) && !src.match(/\/\//)) {
          $(val).attr('src', domain + src);
        }
      });
      $(this).find('*').not('meta link script').each(function(index, val) {
        var oldFamily = $(this).css('font-family').replace(/['"]/g, '');
        var newSize = 1;
        if(scaleTable[oldFamily]) {
          newSize *= scaleTable[oldFamily];
        }
        $(this).css({
          'font-family': 'Papyrus',
          'font-size':   $(this).css('font-size')*newSize
        });
      });
    });
  };

  $(document).ready(function() {
    window.pageRequest = location.hash.substr('#'.length);

    // var urlMatchRegex = /(?i)\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?]))/;

    //pageRequest = pageRequest.match(urlMatchRegex);
    
    if (pageRequest) {
      // has a valid url to papyrusify
      $.get('ajax.php', {path:pageRequest}, function(data) {
        $('#container').append(data);
        $('#container').papyrusize();
      });
    } else {
      window.location = 'about.html';
    }
  });

})(jQuery);
