Ext.define('TouchApp1.config.Config', {
  singleton: true,
 
  config: {
    userLoginUrl : 'http://192.168.1.3/~sandeepankundu/cakephp13/myapp/users/login.json',
    imageFeedUrl : 'http://192.168.1.3/~sandeepankundu/cakephp13/myapp/photos/feed.json',
    imageUploadUrl : 'http://192.168.1.3/~sandeepankundu/cakephp13/myapp/photos/add.json',
  },
 
  constructor: function(config) {
    this.initConfig(config);
    return this;
  },
 
  isWebApp: function() {
    if(document.URL.indexOf('http') != -1) {
      return true;
    }
    return false;
  }
 
});