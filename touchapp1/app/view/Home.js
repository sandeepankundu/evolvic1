/*
@FileName: Home.js
@Author: Sandeepan Kundu
@Dscription: Home View (landup page after login)

*/
Ext.define('TouchApp1.view.Home', {
    extend: 'Ext.form.Panel',
    alias: "widget.homeview",
    requires: ['Ext.TitleBar'],
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
		    	}/*,
			    	*/
		    ]
	    },
	    {
	    	xtype:'titlebar',
    		docked:'top',
    		items:{
	            xtype: 'button',
	            text: 'Upload Image',
	            itemId: 'uploadButton'
	    	}
	    }
	    ],
	    listeners: [{
		    delegate: '#logOffButton',
		    event: 'tap',
		    fn: 'onLogOffButtonTap'
		},{
		    delegate: '#uploadButton',
		    event: 'tap',
		    fn: 'onUploadButtonTap'
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
    	console.log(' Tap Event >> onLogOffButtonTap');
    	this.fireEvent('signOffCommand');
	},
	onUploadButtonTap: function () {
    	console.log(' Tap Event >> onUploadButtonTap');
    	this.fireEvent('uploadCommand');
	}
});