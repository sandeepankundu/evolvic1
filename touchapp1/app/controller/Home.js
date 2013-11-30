Ext.define('TouchApp1.controller.Home', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            homeView: 'homeview',
            uploadView: 'uploadview'//,
            //fileUploadControl: 'fileupload'
            //mainMenuView: 'mainmenuview'
        },
        control: {
            homeView: {
                signOffCommand: 'onSignOffCommand',
                uploadCommand : 'onUploadCommand',
                uploadsuccesscommand : 'onUploadSuccessCommand',
                uploadfailurecommand : 'onUploadFailureCommand'
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
    },
    onUploadSuccessCommand:function(){
        //initiate galler reload
        Ext.Msg.alert('Uploader', 'Photo uploaded successfully.', Ext.emptyFn);
        
        var homeView = this.getHomeView();
        homeView.down('#photogallery').reload();

        //console.log(' --> onUploadSuccessCommand >> Handler');
    },
    onUploadFailureCommand:function(){
        Ext.Msg.alert('Uploader', 'File upload failed. ( allowed : jpg/png and size < 1 MB. )', Ext.emptyFn);
        //console.log(' --> onUploadFailureCommand >> Handler');
    }
});