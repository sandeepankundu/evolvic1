Ext.define('TouchApp1.view.Gallery', {
    extend: 'Ext.Container',
    xtype: 'gallery',
    //requires: ['Ext.data.JsonP'],
    config: {
        cls: 'gallery',
        scrollable: true,
        showNavigation: true,
        floatingCloseBtn: true,

        // Template to show the thumbnail images
        tpl: Ext.create('Ext.XTemplate',
            '<tpl if="this.isEmpty(items)">',
            '<div class="empty-text empty-gallery">No image available</div>',
            '</tpl>',
            '<div class="gallery" id="photos">',
            '<tpl for="items">',
            //'<img src="{media.m:this.getThumbnail}" class="thumbnail" data-fullimage="{media.m:this.getFullImage}"/>',
            '<img src="{media.t}" class="thumbnail" data-fullimage="{media.m}"/>',
            '</tpl>',
            '</div>', {
                isEmpty: function (items) {
                    if (items.length === 0) {
                        return true;
                    }

                    return false;
                },

                getThumbnail: function (url) {
                    return url.replace('_m', '_t');
                },

                getFullImage: function (url) {
                    return url.replace('_m', '_n');
                }
            })
    },

    initialize: function () {
        var me = this;
        //this._initialized = false;

        me.element.un(this.onImageElementTap);
        // Add tap event on the images to open the carousel
        me.element.on('tap', this.onImageElementTap, me, {
            delegate: 'img.thumbnail'
        });

        me.loadImages();

        //this.customInit();
        me.callParent(arguments);
        //this._initialized = true;
    },
    /*customInit: function(){
        var me = this;

        me.element.un(this.onImageElementTap);
        // Add tap event on the images to open the carousel
        me.element.on('tap', this.onImageElementTap, me, {
            delegate: 'img.thumbnail'
        });

        me.loadImages();
    },*/
    reload : function(){
      //debugger;
        //this.events['tap'].clearListeners();
        this.initialize();
      //this.customInit();
    },
    onImageElementTap :  function (e, el) {
        this.showGalleryCarousel(el);
    },


    /**
     * Load the images and add them to the gallery container
     * Here is the point where you have to change the fetching mechanism
     * say to get data with proxy and save in a Store.
     * Also, you may have to change the
     */
    loadImages: function () {
        var me = this;
        Ext.Ajax.request({
            url: TouchApp1.config.Config.getImageFeedUrl() ,
            success: function (response) {
                response = Ext.JSON.decode(response.responseText);
                me.items = response.items;
                me.setData(response);
                
            }
        });
    },

    /**
     * Show the gallery carousel with all the images
     */
    showGalleryCarousel: function (clickedImage) {
        var me = this,
            clickedImgIndex = 0,

            // Create the Gallery Carousel
            galleryCarousel = Ext.Viewport.add({
                xtype: 'gallerycarousel',
                totalCount: me.items.length
            });

        // Query all the images and save in an array
        me.images = me.images || me.element.query('img.thumbnail');

        // On clicking close icon, hide the carousel 
        // and destroy it after a certain perdiod
        galleryCarousel.element.on('tap', function (e, el) {
            galleryCarousel.hide(true);

            Ext.defer(function () {
                Ext.Viewport.remove(galleryCarousel);
            }, 300);
        }, this, {
            delegate: 'div[data-action="close_carousel"]'
        });

        // Get the image index which is clicked
        while ((clickedImage = clickedImage.previousSibling) != null) {
            clickedImgIndex++;
        }

        // Add the images as separate containers in the carousel
        /*for (var i = 0; i < me.images.length; i++) {
            galleryCarousel.add({
                xtype: 'container',
                //html: '<img class="gallery-item" src="' + Ext.get(me.images[i]).getAttribute('data-fullimage') + '" />',
                html: '<img class="gallery-item" src="' + this.getData().items[i].media.m + '" />',
                index: i + 1
            });
        }*/
        for (var i = 0; i < me.items.length; i++) {
            galleryCarousel.add({
                xtype: 'container',
                //html: '<img class="gallery-item" src="' + Ext.get(me.images[i]).getAttribute('data-fullimage') + '" />',
                html: '<img class="gallery-item" src="' + me.getData().items[i].media.m + '" />',
                index: i + 1
            });
        }

        // Set the clicked image container as the active item of the carousel
        galleryCarousel.setActiveItem(clickedImgIndex);

        // Show the carousel
        galleryCarousel.show();
    }
});