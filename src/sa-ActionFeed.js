import $ from 'jquery';

class SADActionFeed {

  constructor(element, options) {
    this.$element = $(element);
    this.options = options;

    if (!this.options.title)
      this.options.title = this.$element.attr('data-title');
    if (!this.options.url)
      this.options.url = this.$element.attr('data-url');

    if (!this.options.url)
      throw new Error('URL is required');

    this.dom = {
      container: $('<' + this.options.dom.container.tag + '/>')
        .addClass(this.options.dom.container.className)
    };

    this._constructor();
    this.render();
  }

  _constructor() {
    const instance = this;

    if (this.options.title)
      $('<' + instance.options.dom.title.tag + '/>')
        .addClass(instance.options.dom.title.className)
        .html(this.options.title)
        .appendTo(this.dom.container);

    const jqxhr = $.ajax({
      'url': this.options.url,
      'data': this.options.cache ? {} : {'cache': Math.random()}
    });
    jqxhr.done(function (data) {
      $.each(data.result, function (key, value) {
        const item = $('<' + instance.options.dom.item.tag + '/>');

        if (value.date && instance.options.dom.date.position === 'before')
          item.append($('<' + instance.options.dom.date.tag + '/>')
            .addClass(instance.options.dom.date.className)
            .html(value.date));

        if (value.text) {
          item.append(value.text);
        } else {
          if (value.user_link) {
            item.append($('<a/>', {'href': value.user_link}).html(value.user_name));
          } else {
            item.append(value.user_name);
          }
          item.append(' ');

          if (value.action_class) {
            item.append($('<span/>', {'class': value.action_class}).html(value.action_name));
          } else {
            item.append(value.action_name);
          }
          item.append(' ');

          if (value.item_link) {
            item.append($('<a/>', {'href': value.item_link}).html(value.item_name));
          } else {
            item.append(value.item_name);
          }
          item.append(' ');
        }

        if (value.date && instance.options.dom.date.position === 'after')
          item.append($('<' + instance.options.dom.date.tag + '/>')
            .addClass(instance.options.dom.date.className)
            .html(value.date));

        instance.dom.container.append(item);
      });
    });
  }

  render() {
    this.$element.html(this.dom.container);
  }
}


