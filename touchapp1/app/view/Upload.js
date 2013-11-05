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
        'Ext.ux.Fileup'
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
            autoUpload: false,
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