(function(Backbone, Mustache, Auth) {
  'use strict';

  var authorizations = ['title'];

  var auth = new Auth();

  auth.set(authorizations);

  console.log(auth.get('title')); // true
  console.log(auth.get('name')); // undefined

  var GreetingView = Backbone.View.extend({
    el: document.getElementById('title'),
    render: function() {
      this.$el.html(Mustache.render('{{#_auth_.title}}{{title}}{{/_auth_.title}}' +
        '{{^_auth_.title}}Not authorized to see title{{/_auth_.title}}', {
        title: 'Hello World!'
      }));

      return this;
    }
  });

  new GreetingView().render();
})(Backbone, Mustache, Auth);
