Ext.define('TouchApp1.controller.Upload', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            //loginView: 'loginview',
            homeView: 'homeview',
            uploadView: 'uploadview',
            //mainMenuView: 'mainmenuview'
            //backButton : '#backButton'
            'fileBtnCtl': 'uploadview #fileBtn'//,
            //'fileLoadBtn': 'uploadview #fileLoadBtn',
            //'loadedImage': 'Upload #loadedImage'
        },
        control: {
            /*homeView: {
                //signOffCommand: 'onSignOffCommand',
                uploadCommand : 'onUploadCommand'
            },*/
            uploadView:{
            	backcommand: 'onBackCommand'
            },
            //backButton : 'onBackButtonTap'
            fileBtnCtl: {
                success: 'onFileUploadSuccess',
                failure: 'onFileUploadFailure'
            }
            /*,
            fileLoadBtn: {
                loadsuccess: 'onFileLoadSuccess',
                loadfailure: 'onFileLoadFailure'
            }*/
        }
    },
    launch: function(){
        console.log('Upload controller launch');
    },
    onBackCommand:function (btn) {
    	console.log('Tap >> onBackCommand');
    	var homeView = this.getHomeView();
    	
    	Ext.Viewport.animateActiveItem(homeView, { type: 'slide', direction: 'right' });
    },
    onFileUploadSuccess: function() {
        //console.log('Success');
        Ext.device.Notification.show({
            title: 'All right',
            message: 'File uploaded successfully',
            buttons: Ext.MessageBox.OK,
            callback: Ext.emptyFn
        });
    },
    
    onFileUploadFailure: function(message) {
        //console.log('Failure');
        Ext.device.Notification.show({
            title: 'Uploading error',
            message: message,
            buttons: Ext.MessageBox.OK,
            callback: Ext.emptyFn
        });
    }
    /*,
    onFileLoadSuccess: function(dataurl, e) {
        //console.log('File loaded');
        
        var me = this;
        var image = me.getLoadedImage();
        image.setSrc(dataurl);
    },

    
    onFileLoadFailure: function(message) {
        Ext.device.Notification.show({
            title: 'Loading error',
            message: message,
            buttons: Ext.MessageBox.OK,
            callback: Ext.emptyFn
        });
    }*/
});