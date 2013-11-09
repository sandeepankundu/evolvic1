Ext.define('TouchApp1.controller.Login', {
    extend: 'Ext.app.Controller',
    requires:['Ext.data.proxy.JsonP'],
    config: {
        refs: {
            loginView: 'loginview',
            homeView: 'homeview'//,
            //mainMenuView: 'mainmenuview'
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand'
            }
        }
    },
    launch: function(){
    	console.log('login controller launch');
    },
    onSignInCommand: function(view, username, password ){
    	console.log( Ext.String.format('onSignInCommand -> username :{0} password :{0} ', username, password ));

    	var me = this,
        loginView = me.getLoginView();

	    if (username.length === 0 || password.length === 0) {

	        loginView.showSignInFailedMessage('Please enter your username and password.');
	        return;
	    }

	    loginView.setMasked({
	        xtype: 'loadmask',
	        message: 'Signing In...'
	    });

	    //Ext.data.JsonP.request({
	    Ext.data.JsonP.request({
	    	//url : 'http://192.168.1.5/evolvic1/handlers/Login.ashx',
	    	//url : 'http://127.0.0.1:8080/Login.ashx',
	    	url : 'http://192.168.1.3:8080/Login.ashx',
	    	//callbackKey: 'callback',
	    	params: {
	            username: username,
	            password: password
	        },
	        /*callback:function(result,response){
	              console.log(response);
	              debugger;
	        },*/
	        success: function (loginResponse) {

	            //var loginResponse = Ext.JSON.decode(response.responseText);
	            //debugger;
	            //if (loginResponse.success === "true") {
	            if (loginResponse.success === true) {
	                // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
	                me.sessionToken = loginResponse.sessionToken;
	                me.signInSuccess();     //Just simulating success.

	            } else {
	                me.signInFailure(loginResponse.message);
	                //me.getLoginView().showSignInFailedMessage(loginResponse.message);
	            }
	        },
	        failure: function (response) {
	        	me.sessionToken = null;
	            me.signInFailure('Login failed. Please try again later.');
	        }
	    });
    },
    signInSuccess: function(){
    	console.log("sign in success");
    	this.getLoginView().setMasked(false);
    	var homeView = this.getHomeView();
    	
    	Ext.Viewport.animateActiveItem(homeView, { type: 'slide', direction: 'left' });//, this.getSlideLeftTransition());
    },
    signInFailure:function(msg){
    	msg = msg ||  "Login failed. Please try again later.";
    	this.getLoginView().showSignInFailedMessage(msg);
    	this.getLoginView().setMasked(false);
    }
});