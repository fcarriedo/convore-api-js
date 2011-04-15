# Convore API js

Convore client

## Dependencies

The only dependency is on *jQuery 1.4.2* for all AJAX handling. Don't know
if newer versions would work correctly since basic authentication seems
to be broken on `$.ajax` calls.

## Usage

    var convoreApi = new ConvoreApi(authContext);

where `authContext` is an object with the following props:

  * *username* - The authentication username `string`
  * *password* - The authentication password. `string`
  * *onAuthSuccess* - The callback to execute upon a successful authentication. `function`
  * *onAuthError* - The callback to execute on authentication error. `function`

## Example

First we create the authentication context. Parameters here are going to be used for authenticating further API calls.

    var authCtx = {
      username: 'myuser',
      password: 'mypassword',
      onAuthSuccess: function() {
        console.log('Authentication successful!');
      },
      onAuthError: function() {
        console.log('An error just happened..!');
      }
    };

We then create an instance of ConvoreApi with the authentication context
object we just created.

    var convoreApi = new ConvoreApi(authCtx);

...and we can start using the library:

    // Connect to the feed and listen constantly. (Long polling strategy).
    // The callback will be triggered every time a set of messages arrive.
    // It will reconnect automatically upon desconnection.
    convoreApi.listenToFeed( renderLiveFeed );

    convoreApi.getGroups( renderGroups );

    // The callback receives an array if messages
    function renderLiveFeed( arrayOfMsgs ) {
      for(var i=0; i<arrayOfMsgs.length; i++) {
        var msg = arrayOfMsgs[i];
        $('<div class="feed-item">' + msg.kind + ' by ' + msg.user.username + '</div>').appendTo('body');
      }
    }

    // The group callback receives an array of groups
    function renderGroups( arrayOfGroups ) {
      for(var i=0; i<arrayOfGroups.length; i++) {
        var group = arrayOfGroups[i];
        $('<div class="group-item">' + group.name + ' by ' + group.creator.username + '</div>').appendTo('body');
      }
    }
