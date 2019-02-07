import $ from 'jquery';

export default function jQueryPluginDefinition(...args) {

  let [pluginName, dataName, ClassName, shorthand = false] = args;
  let old = $.fn[pluginName];

  $.fn[pluginName] = function (options = {}) {

    return this.each((i, el) => {

      let $this = $(el);
      let data = $this.data(dataName);

      if (typeof options === "object") {
        if (!data) $this.data(dataName, new ClassName($.extend(options, {el: $this})));

      } else {
        if (data && data[options]) return data[options].apply(data, options);
      }
    });
  };

  // SHORTHAND
  if (shorthand) {
    $[pluginName] = (options) => $({})[pluginName](options);
  }

  // NO CONFLICT
  $.fn[pluginName].noConflict = () => $.fn[pluginName] = old;
}
