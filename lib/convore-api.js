// TODO(fcarriedo): Find a sensible solution to 'same origin policy'
// other than jQuery's '?callback=?'. See how the twitter JS libraries
// are doing it. (Maybe the '?callback=?' is a sensible solution.
// See: http://en.wikipedia.org/wiki/Same_origin_policy

function ConvoreAPI( authCxt ) {
  // To guard against calls without 'new'
  if( !(this instanceof arguments.callee) ) {
    return new arguments.callee(arguments);
  }

  var convoreApiUrl = 'https://convore.com/api';

  var self = this;

  var settings = {
    authUsr: '',
    authPswd: '',
    onAuthError: null
  };

  // TODO: Do something like jQuery plugin 'extend'
  settings.authUsr = authCxt.username;
  settings.authPswd = authCxt.password;
  settings.onAuthError = authCxt.onAuthError;

  $.ajaxSetup({
    username: settings.authUsr,
    password: settings.authPswd
  });

  self.listenToFeed = function( callback ) {
    var url = convoreApiUrl + '/live.json?callback=?';
    setTimeout(function() {  // For non-blocknig the first time since long polls.
      $.getJSON(url, function(data) {
        callback.call(this, data.messages);
        // Calls itself again ad infinitum. (Long polling encouraged [see api docs]).
        // Reconnects as fast as the browser allows.
        setTimeout( function() { self.listenToFeed(callback); }, 0 ); 
      });
    }, 0);
  }

  self.fetchGroups = function( callback ) {
    var url = convoreApiUrl + '/groups.json?callback=?';
    $.getJSON(url, function(data) {
      callback.call(this, data.groups );
    });
  }

  self.fetchTopics = function( groupId , callback ) {
    var url = convoreApiUrl + '/groups/' + groupId + '/topics.json?callback=?';
    $.getJSON(url, function(data) {
      callback.call(this, data.topics );
    });
  }

  self.fetchMessages = function( topicId , callback ) {
    var url = convoreApiUrl + '/topics/' + topicId + '/messages.json?callback=?';
    $.getJSON(url, function(data) {
      callback.call(this, data.messages );
    });
  }
}
