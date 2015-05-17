/*
 * App.js
 * http://github.com/summerstyle/jsonTreeViewer
 *
 * Copyright 2015 Vera Lobacheva (summerstyle.ru)
 * Released under the GPL3 (GPL3.txt)
 *
 * Sun 27 2014 20:15:00 GMT+0400
 */

'use strict';

/*
    TODO
    
*/

var Interface = (function() {
    self = {};
    
    /* Utilities */
    var utils = {
        
    };
    
    var Menu = function(items, settings) {
        /*
            var settings = {
                class: "navi",
                id: "navi"
            },
            
            items = {
                    
            };
        */
        var template = '<div id="nav">\
            \
        </div>';
        
        root.apendChild();
    };
    
    var MenuItem = function(config) {
        /*
        var config = {
            href: '',
            position: 'left',
            action: function() {
                Editor.open()
            },
            icon: 'lala.png',
            text: 'File'
        }
        */
    };
    
    self.menu;
    self.panel;
    self.modal_dialogs;
    
    var menu_config = {
        'help' : function() {
            layers.push(a);
        },
        'clear': function() {
            layers.clear();    
        }
    };
    
    
    var menu = document.querySelectorAll('.menu__item');
    
    for (var i = 0, c = menu.length; i < c; i++) {
        var action = menu[i].dataset['action'];
        if (action && typeof menu_config[action] === 'function') {
            menu[i].addEventListener('click', menu_config[action], false);
        }
    }
    
    
    
    var layers = (function() {
        var arr = [],
            current = 0;
        
        return {
            push : function(win) {
                current++;
                arr.push(new Layer(win));    
            },
            pop : function() {
                arr[current--].destroy();
                arr.pop();
            },
            clear: function() {
                while(arr.length) {
                    this.pop();
                }
            }
        };
    })();
    
    function Layer(win, with_overlay, z_index) {
        var overlay = null,
            iwindow = win;
        
        if (!with_overlay) {
            overlay = document.createElement('div');
            document.documentElement.appendChild(overlay);
            overlay.className = 'overlay';
            overlay.style.display = 'block';
            overlay.style.zIndex = z_index;
        }
        
        iwindow.show();
        
        this.destroy = function() {
            iwindow.hide();  
        };
    }
    
    function Window(config) {
        var el = document.querySelector('.window'),
            close_button = el.querySelector('.window__close-button'),
            content_wrapper = el.querySelector('.window__content'),
            header = el.querySelector('.window__header'),
            content = document.querySelector(config.content);
        
        /*
        config = {
            movable: false,
            closable: true,
            overlay: true,
            level
        }
        */
        
        close_button.addEventListener('click', hide, false);
        
        // init
        content_wrapper.innerHTML = '';
        content_wrapper.appendChild(content);
        
        if (config.movable) {
            el.classList.add('window_movable');
            
            // move logic
        }
        
        if (typeof config.js_module === 'function') {
            config.js_module(content);
        }
        
        function hide() {
            el.style.display = 'none';
        };
        
        function show() {
            el.style.display = 'block';
        };
        
        this.show = show;
        this.hide = hide;
    }
    
    
    var a = new Window({
        content: '#help',
        movable: false,
        closable: true,
        overlay: true,
        layout: 'black',
        header: 'This is window',
        js_module: function(content_el) {
            content_el.addEventListener('click', function() {
                alert(3949732523);
            }, false);    
        }
    });
    
    
    return {
        Menu: Menu,
        Window: Window
    };
})();
