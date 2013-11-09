Ext.define('TouchApp1.controller.Home', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            homeView: 'homeview',
            uploadView: 'uploadview'
            //mainMenuView: 'mainmenuview'
        },
        control: {
            homeView: {
                signOffCommand: 'onSignOffCommand',
                uploadCommand : 'onUploadCommand'
            }
        }
    },
    launch: function(){
        console.log('Home controller launch');
    },
    onSignOffCommand: function(){
    	console.log(' --> onSignOffCommand >> Handler');
    	var loginView = this.getLoginView();
    	
    	Ext.Viewport.animateActiveItem(loginView, { type: 'slide', direction: 'right' });//, this.getSlideLeftTransition());
    },
    onUploadCommand:function(){
    	console.log(' --> onUploadCommand >> Handler');
    	var uploadView = this.getUploadView();
    	
    	Ext.Viewport.animateActiveItem(uploadView, { type: 'slide', direction: 'left' });
    }
});