Ext.define('TouchApp1.controller.Login', {
    extend: 'Ext.app.Controller',
    //requires:['Ext.data.proxy.JsonP'],
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

	    Ext.Ajax.request({
	    	method:'POST',
			url : TouchApp1.config.Config.getUserLoginUrl(),
	    	params: {
	            username: username,
	            password: password
	        },
	        success: function (response) {

	            var loginResponse = Ext.JSON.decode(response.responseText);
	            if (loginResponse.success === true) {
	                // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
	                me.sessionToken = loginResponse.token;
	                localStorage.setItem("authtoken", loginResponse.token);
	                me.signInSuccess(loginResponse.token);     //Just simulating success.
	                console.log()

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
    signInSuccess: function(token){
    	localStorage.setItem("authtoken", token);
    	console.log("sign in success, authtoken :" + localStorage.getItem("authtoken"));
    	this.getLoginView().setMasked(false);
    	var homeView = this.getHomeView();
    	
    	Ext.Viewport.animateActiveItem(homeView, { type: 'slide', direction: 'left' });//, this.getSlideLeftTransition());
    },
    signInFailure:function(msg){
    	localStorage.removeItem("userid"); //remove
    	msg = msg ||  "Login failed. Please try again later.";
    	this.getLoginView().showSignInFailedMessage(msg);
    	this.getLoginView().setMasked(false);
    }
});