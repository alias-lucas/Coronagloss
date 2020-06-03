$("form").submit(function(e) {
    $(".radioRequired").each(function() {
      var rName = $(this).attr('name');
      var checked = $('[name=' + rName + ']').is(':checked');
      if (!checked && !$(this).hasClass('radioWarning')) {
        $(this).addClass('radioWarning');
        $(this).append('<div class="chip radioMessage">' + $(this).data("error") + '</div>');
      }
      if (checked) {
        $(this).removeClass('radioWarning');
        $(this).children('.radioMessage').remove();
      }
    });
  
    if ($(".radioWarning").length > 0) {
      e.preventDefault();
      return false;
    }
  });
  