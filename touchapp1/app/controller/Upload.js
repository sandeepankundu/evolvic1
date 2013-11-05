Ext.define('TouchApp1.controller.Upload', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            //loginView: 'loginview',
            homeView: 'homeview',
            uploadView: 'uploadview',
            //mainMenuView: 'mainmenuview'
            //backButton : '#backButton'
        },
        control: {
            homeView: {
                //signOffCommand: 'onSignOffCommand',
                uploadCommand : 'onUploadCommand'
            },
            uploadView:{
            	backcommand: 'onBackCommand'
            	/*backButton:{
	            	tap: 'onBackButtonTap'
	            }*/	
            }
            //backButton : 'onBackButtonTap'
            
        }
    },
    onBackCommand:function (btn) {
    	console.log('Tap >> onBackCommand');
    	var homeView = this.getHomeView();
    	
    	Ext.Viewport.animateActiveItem(homeView, { type: 'slide', direction: 'right' });
    },
    onBackButtonTap:function (btn) {
    	console.log('Tap >> onBackButtonTap');
    },
    onUploadCommand: function(){
		console.log('Tap >> onUploadCommand');
    }
});