//////////
// TIPPY
//////////
(function($, APP) {
  APP.Plugins.Tippy = {
    init: function() {
      var $elements = $('.js-tippy');
      if ($elements.length === 0) return;
      $elements.each(function(i, el) {
        var $el = $(el);
        var content = $($el.data('content')).html();

        tippy(el, {
          content: content,
          allowHTML: true,
          // debug - click trigger
          // trigger: 'click',
        });
      });
    },

    refresh: function() {
      AOS.refreshHard();
    },
  };
})(jQuery, window.APP);
