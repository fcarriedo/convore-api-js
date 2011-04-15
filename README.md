# Convore API js

A Convore API JavaScript client

## Dependencies

The only dependency is on *jQuery 1.4.2* for all AJAX handling so it has
to be preceded by its declaration.

    <script src='jquery.min.js' type='text/javascript'></script>
    <script src='convore-api.js' type='text/javascript'></script>

Don't know if newer versions of jQuery would work correctly since basic 
authentication seems to be broken on `$.ajax` calls.

## Usage

    var convoreApi = new ConvoreApi(authContext);

where `authContext` is an object with the following props:

  * *username* - The authentication username `string`
  * *password* - The authentication password. `string`
  * *onAuthSuccess* - The callback to execute upon a successful authentication. `function`
  * *onAuthError* - The callback to execute on authentication error. `function`

## The authContext object

The Authentication Context object carries the credentials for any
further calls in the API.

    var authCtx = {
      username: 'myuser',
      password: 'mypassword',
      onAuthError: function() {
        console.log('An auth error just happened..!');
      }
    };

## Examples

### Live Feed Example

    $(document).ready(function() {
      var authCxt = {username: 'myusr', password: 'mypswd'};
      var convoreApi = new ConvoreAPI(authCxt);
      convoreApi.listenToFeed(function( messages ) {
        for(var i=0; i<messages.length; i++) {
          var msg = messages[i];
          $('<div class="feed-item">Msg kind: <b>' + msg.kind + '</b> by <i>' + msg.user.username + '</i></div>').appendTo('body');
        }
      });
    });

### Fetching Groups Example

    var convoreApi = new ConvoreApi(authCtx);

    convoreApi.getGroups( renderGroups );

    // The group callback receives an array of groups
    function renderGroups( arrayOfGroups ) {
      for(var i=0; i<arrayOfGroups.length; i++) {
        var group = arrayOfGroups[i];
        $('<div class="group-item">' + group.name + ' by ' + group.creator.username + '</div>').appendTo('body');
      }
    }
