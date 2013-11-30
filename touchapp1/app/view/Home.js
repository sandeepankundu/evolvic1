/*
@FileName: Home.js
@Author: Sandeepan Kundu
@Dscription: Home View (landup page after login)

*/
Ext.define('TouchApp1.view.Home', {
    extend: 'Ext.form.Panel',
    alias: "widget.homeview",
    requires: [
    	'Ext.TitleBar',
    	'TouchApp1.view.Gallery',
    	'TouchApp1.view.GalleryCarousel'
	],
    //xtype: 'homeview',
    /*config: {
        title: 'Home',
        html: 'Home View'
    }*/
    config: {
    	layout:{
    		type:'fit'
    	},
    	items:[{
    		xtype:'titlebar',
    		title: 'Main Menu',
    		docked:'top',
    		items: [{
		            xtype: 'button',
		            text: 'Log Off',
		            itemId: 'logOffButton',
		            align: 'right'
		    	}
		    ]
	    },
	    {
	    	xtype:'titlebar',
    		docked:'top',
    		items:[
    			/*{
	            xtype: 'button',
	            text: 'Upload Image',
	            itemId: 'uploadButton'
	    	},*/
	    	{
	            itemId: 'fileBtn',
	            xtype: 'fileupload',
	            //autoUpload: false,
	            autoUpload: true,

	            //url: 'http://localhost/~sandeepankundu/cakephp13/myapp/photos/add.json'
	            //url: 'http://192.168.1.3/~sandeepankundu/cakephp13/myapp/photos/add.json'
	            url: TouchApp1.config.Config.getImageUploadUrl()
	            
	        }]
	    },
	    {
            xtype : 'gallery',
            itemId: 'photogallery',
        }
	    ],
	    listeners: [{
		    delegate: '#logOffButton',
		    event: 'tap',
		    fn: 'onLogOffButtonTap'
		},{
		    delegate: '#fileBtn',
		    event: 'success',
		    fn: 'onUploadButtonSuccess'
		},{
		    delegate: '#fileBtn',
		    event: 'failure',
		    fn: 'onUploadButtonFailure'
		}]
    },
    /*items: [
	    	{
	            xtype: 'button',
	            text: 'Log Off',
	            itemId: 'logOffButton',
	            align: 'right'
	    	}
	],*/
    onLogOffButtonTap: function () {
    	console.log('session token: ' + this.sessionToken);
    	console.log(' Tap Event >> onLogOffButtonTap');
    	this.fireEvent('signOffCommand');
	},
	onUploadButtonSuccess: function () {
		console.log(' Tap Event >> onUploadButtonSuccess');
    	this.fireEvent('uploadsuccesscommand');
	},
	onUploadButtonFailure: function () {
		console.log(' Tap Event >> onUploadButtonFailure');
    	this.fireEvent('uploadfailurecommand');
	}
});