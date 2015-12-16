# Backbone-Mustache-Auth

Managing Roles and content visualization through Backbone and Mustache.

## Features
- Visualizing specific elements in Mustache templates according to available Roles;
- Global access to the Roles through Javacript variables;
- Possibility to request the Roles from an external API;

## Requirements
- [backbonejs](http://backbonejs.org/)
- [mustache.js](https://github.com/janl/mustache.js/)

## Instalation
- **Script Tag:** `<script type="text/javascript" src="https://github.com/Cloudoki/backbone-mustache-auth/blob/master/index.js"></script>`
- **Bower:** `bower install git://github.com/Cloudoki/backbone-mustache-auth.git`
- **npm:** `npm install github:Cloudoki/backbone-mustache-auth`

## Usage
#### Initialize the plugin:
```javascript
  // Define your Roles in an array or json format
  var roles = ['title:view'];             // Roles array
  // var roles = {"title:view": true}     // Roles json

  var auth = new Auth();                  // Initialize the authorizations plugin
  auth.set(roles);                        // Apply the Roles
```

After initializing the plugin, the Roles will be automatically hooked up with the Mustache object:
```javascript
  var template = "{{#_auth_.title:view}} {{title}} {{/_auth_.title:view}} \
                  {{^_auth_.title:view}} Not authorized to see title {{/_auth_.title:view}}";

  this.$el.html(Mustache.render( template, {title: 'Hello World!'}));     // Render
```

You can also access the Roles through Javascript variables:
```javascript
  console.log(auth.get('title:view'));    // true
  console.log(auth.get('name:update'));   // undefined
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
