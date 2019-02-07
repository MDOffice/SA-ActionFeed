import SAActionFeed from './sa-ActionFeed';
import pluginify from './pluginify';

pluginify('SAActionFeed', 'sa', SAActionFeed, true);

import $ from 'jquery';

/*$.SADActionFeed = {
  defaults: {
    visible_count: 5,
    title: null,
    url: null,
    cache: false,
    dom: {
      title: {
        tag: 'h3',
        className: 'mt-20'
      },
      container: {
        tag: 'ul',
        className: 'list-feed mt-20'
      },
      item: {
        tag: 'li'
      },
      date: {
        tag: 'div',
        className: 'text-muted',
        position: 'after'
      }
    }
  }
};

if ($.fn.SADActionFeed == null) {
  $.fn.SADActionFeed = function (options) {
    options = options || {};

    if (typeof options === 'object') {
      this.each(function () {
        var instanceOptions = $.extend($.SADActionFeed.defaults, {}, options);

        new SADActionFeed(this, instanceOptions);
      });

      return this;
    } else {
      throw new Error('Invalid arguments for SADActionFeed: ' + options);
    }
  };
}*/

$(function () {
  $('.SAD-Action-Feed').SAActionFeed();
});
