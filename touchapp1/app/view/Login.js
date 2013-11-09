/*
@FileName: Login.js
@Author: Sandeepan Kundu
@Dscription: Main Authentication View

code inspired from : http://miamicoder.com/2012/adding-a-login-screen-to-a-sencha-touch-application/
*/
Ext.define('TouchApp1.view.Login', {
    extend: 'Ext.form.Panel',
    alias: "widget.loginview",
    //xtype: 'loginview',
    requires: [
        'Ext.Img',
        'Ext.Label',
        'Ext.form.FieldSet',
        'Ext.field.Password',
        'Ext.util.DelayedTask'
    ],
    config: {
        title: 'Login',
        /*refs:{
        	loginLockIcon : '#loginLockIcon'
        },*/
        items: [
                    {
                        xtype: 'image',
                        itemId: 'loginLockIcon',
                        src: Ext.Viewport.getOrientation() == 'portrait' ? 'img/login.png' : 'img/login-small.png',
                        style: Ext.Viewport.getOrientation() == 'portrait' ? 'width:80px;height:80px;margin:auto;margin-top:10px;' : 'width:40px;height:40px;margin:auto;margin-top:10px;' //-webkit-min-device-pixel-ratio: 2
                    },
                    {
                        xtype: 'label',
                        html: 'Login failed. Please enter the correct credentials.',
                        itemId: 'signInFailedLabel',
                        hidden: true,
                        hideAnimation: 'fadeOut',
                        showAnimation: 'fadeIn',
                        style: 'color:#990000;margin:5px 0px;',
                        margin:'10px'
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Login - Evolvic Image Gallery',
                        items: [
                            {
                                xtype: 'textfield',
                                placeHolder: 'Username',
                                itemId: 'userNameTextField',
                                name: 'userNameTextField',
                                value: 'demo',
                                required: true
                            },
                            {
                                xtype: 'passwordfield',
                                placeHolder: 'Password',
                                itemId: 'passwordTextField',
                                name: 'passwordTextField',
                                value: 'demo',
                                required: true
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        itemId: 'logInButton',
                        ui: 'action',
                        padding: '10px',
                        margin:'10px',
                        text: 'Log In'
                    }
        ],
        listeners: [{
		    delegate: '#logInButton',
		    event: 'tap',
		    fn: 'onLogInButtonTap'
		}],
    },
    // Fires when the Panel is initialized
    initialize: function () {
        //console.log('TouchApp1.view.Login ~ initialize');
        // Add a Listener. Listen for [Viewport ~ Orientation] Change.
        Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
        this.callParent(arguments);
    },
    handleOrientationChange: function(){
        //console.log('TouchApp1.view.Login ~ handleOrientationChange');
        var src= Ext.Viewport.getOrientation() == 'portrait' ? 'img/login.png' : 'img/login-small.png';
        var style = Ext.Viewport.getOrientation() == 'portrait' ? 'width:80px;height:80px;margin:auto;margin-top:10px;' : 'width:40px;height:40px;margin:auto;margin-top:10px;';
        var logImg = this.down('#loginLockIcon');// this.getComponent('loginLockIcon');
        logImg.setSrc( src );
        logImg.setStyle( style );
        //Ext.Msg.alert('Login View', 'Orientation Change.', Ext.emptyFn);
        // Execute the code that needs to fire on Orientation Change.
    },
	onLogInButtonTap: function () {
	    console.log('Log In tapped');
	    var me = this;

	    var usernameField = me.down('#userNameTextField'),
	        passwordField = me.down('#passwordTextField'),
	        label = me.down('#signInFailedLabel');

	    label.hide();

	    var username = usernameField.getValue(),
	        password = passwordField.getValue();

	    // Using a delayed task in order to give the hide animation above
	    // time to finish before executing the next steps.
	    var task = Ext.create('Ext.util.DelayedTask', function () {

	        label.setHtml('');
	        me.fireEvent('signInCommand', me, username, password);

	        usernameField.setValue('');
	        passwordField.setValue('');
	    });

	    task.delay(500);
	    //me.fireEvent('signInCommand', me, username, password);
	},
	showSignInFailedMessage: function(msg) {
		var me = this,
			label = me.down('#signInFailedLabel');
		label.setHtml(msg);
		label.show();
	}



});