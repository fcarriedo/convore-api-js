# Convore API js

A Convore API JavaScript client

## Dependencies

The only dependency is on *jQuery 1.4.2* for all AJAX handling so it has
to be preceded by its declaration.

``` html
    <script src='jquery.min.js' type='text/javascript'></script>
    <script src='convore-api.js' type='text/javascript'></script>
```

Don't know if newer versions of jQuery would work correctly since basic 
authentication seems to be broken on `$.ajax` calls.

## Examples

### Live Feed Example

``` javascript
var convoreApi = new ConvoreAPI( {username: 'myusr', password: 'mypswd'} );

convoreApi.listenToLiveFeed( function( messages ) {
  for(var i=0; i<messages.length; i++) {
    var msg = messages[i];
    $('<div class="feed-item">Msg kind: <b>' + msg.kind + '</b> by <i>' + msg.user.username + '</i></div>').appendTo('body');
  }
});
```

### Fetching Groups Example

``` javascript
convoreApi.fetchGroups( function( groups ) {
  for(var i=0; i<groups.length; i++) {
    var group = groups[i];
    $('<div class="group-item">' + group.name + ' by ' + group.creator.username + '</div>').appendTo('body');
  }
});
```

## The authContext object

``` javascript
var convoreApi = new ConvoreApi(authContext);
```

where `authContext` object carries the credentials for the API calls that require authentication.

  * *username* - The authentication username `string`
  * *password* - The authentication password. `string`
  * *onAuthError* - The callback to execute on authentication error. `function`

Example:

``` javascript
var authCtx = {
  username: 'myuser',
  password: 'mypassword',
  onAuthError: function() {
    console.log('An auth error just happened..!');
  }
};
```