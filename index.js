(function(root, main) {
  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'mustache'],
      function(Backbone, Mustache) {
        return main(Backbone, Mustache);
      });
    // CommonJS
  } else if (typeof exports !== 'undefined' && typeof require !== 'undefined') {
    module.exports = main(require('backbone'), require('mustache'));
    // Globals
  } else {
    root.Auth = main(root.Backbone, root.Mustache);
  }
})(this, function(Backbone, Mustache) {
  'use strict';
  /**
   * Authorization Backbone Model
   */
  return Backbone.Model.extend({
    // Method called when authorization model is initialized with new constructor
    initialize: function() {
      var self = this;

      // define default mustache render at initialization
      var defaultRender = Mustache.render;

      //monkey-patch Mustache render to include on all views the
      //  authorizations (_auth_)
      Mustache.render = function(template, view) {
        if (!view) {
          return defaultRender.apply(this, [template, {
            _auth_: self.attributes
          }]);
        } else {
          view._auth_ = self.attributes;
          return defaultRender.apply(this, arguments);
        }
      };
    },
    /**
     * Overides default set of attributes to allow for setting an array of
     * authorizations (strings) that will be parsed to an object of
     * authorizations as key and true for value
     */
    set: function() {
      var args = Array.prototype.slice.call(arguments);
      // checks if attributes are an array
      if (args[0] instanceof Array) {
        var data = {};
        // build object from array
        args[0].forEach(function(key) {
          data[key] = true;
        });
        // overwrite attributes
        args[0] = data;
      }
      // applies new arguments to default set function
      Backbone.Model.prototype.set.apply(this, args);
    }
  });
});
