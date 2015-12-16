# Backbone-Mustache-Auth

Manage content view authorization with Backbone and Mustache

Provide authorizations as an Array of strings

```json
["authorization1", "authorization2", "title"]
```

or already parsed as an object

```json
{
    "authorization1": true,
    "authorization2": true,
    "title": true
}
```

You can call the `_auth_.authorization1` property to check current authorization

```html
  {{#_auth_.title}}{{title}}{{/_auth_.title}}
  {{^_auth_.title}}Not authorized to see title{{/_auth_.title}}
```

### Example Usage

```javascript
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
```

### Fetch authorizations from resource API

```javascript
var xAuth = Auth.extend({
  url: function(){
    return '/authorizations'
  }
});

var auth = new xAuth();
auth.fetch({
  success: function(){
    console.log('authorizations loaded');  
  },
});
```
