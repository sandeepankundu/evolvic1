/*
@FileName: Upload.js
@Author: Sandeepan Kundu
@Dscription: Home View (landup page after login)

*/
Ext.define('TouchApp1.view.Upload', {
    extend: 'Ext.form.Panel',
    alias: "widget.uploadview",
    requires: [
        'Ext.TitleBar',
        'Ext.Button',
        'Ext.ux.Fileup',
        'Ext.device.Notification',
        'Ext.Img'
    ],
    //xtype: 'uploadview',
    /*config: {
        title: 'Upload',
        html: 'Upload View <br/> <input id="image-file" type="file" />'
    }*/
    config: {
    	/*layout:{
    		type:'fit'
    	},*/
        
    	items:[{
    		xtype:'titlebar',
    		title: 'Upload Image',
    		docked:'top',
    		items: [{
		            xtype: 'button',
		            text: 'Back',
		            itemId: 'backButton',
		            align: 'left'
		    	}
		    ]
	    },
	    {
            itemId: 'fileBtn',
            xtype: 'fileupload',
            //autoUpload: false,
            autoUpload: true,
            //url: 'http://192.168.1.5/evolvic1/handlers/Upload.ashx'
            //url: 'http://127.0.0.1:8080/Upload.ashx'
            url: 'src/php/getfile.php'
            // For success and failure callbacks setup look into controller
        }],
	    listeners: [{
		    delegate: '#backButton',
		    event: 'tap',
		    fn: 'onBackButtonTap'
		}]
    },
    onBackButtonTap:function(){
    	console.log(' Tap Event >> onBackButtonTap');
    	this.fireEvent('backcommand');
    }
});