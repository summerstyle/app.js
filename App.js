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

var Interface = (function() {
    self = {};
    
    /* Events */
    var events = (function() {
        var list = {};
        
        return {
            fire : function() {
                    
            }    
        };
    })();
    
    /* Utilities */
    var utils = {
        dom : {
            css : function(el, prop, value) {
                el.style[prop] = value;
            },
            show : function(el) {
                this.css(el, 'display', 'block');
            },
            hide : function(el) {
                this.css(el, 'display', 'none');
            },
            id : function(id) {
                return document.getElementById(id);
            },
            klass : function(klass) {
                return document.getElementsByClassName(klass);
            },
            stopEvent : function(e) {
                e.stopPropagation();
                e.preventDefault();
                
                return this;
            },
        },
        extend : function(obj, options) {
            var target = {};
            
            for (name in obj) {
                if(obj.hasOwnProperty(name)) {
                    target[name] = options[name] ? options[name] : obj[name];
                };
            };
            
            return target;
        },
        mixin : function(target, mixin) {
            for (var prop in mixin) {
                if (mixin.hasOwnProperty(prop)) {
                    target[prop] = mixin[prop];
                }
            }
        },
        foreach : function(arr, func) {
            for(var i = 0, count = arr.length; i < count; i++) {
                func(arr[i], i);
            };
        },
        foreachReverse : function(arr, func) {
            for(var i = arr.length - 1; i >= 0; i--) {
                func(arr[i], i);
            };
        },
        debug : (function() {
            var output = document.getElementById('debug');
            
            return function() {
                output.innerHTML = [].join.call(arguments, ' ');
            };
        })(),
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
            push : function(layer) {
                current++;
                arr.push(layer);
            },
            pop : function() {
                arr.pop();
            },
            clear: function() {
                while(arr.length) {
                    this.pop();
                }
            }
        };
    })();
    
    function create_overlay() {
        var overlay = document.createElement('div');
        overlay.className = 'overlay';
        utils.dom.hide(overlay);
        document.body.appendChild(overlay);
        
        return overlay;
    }
    
    /**
     *
     *
     *
     */
    function Window(config) {
        var defaults = {
            movable: false,
            closable: true,
            overlay: true,
            layout: 'default',
            content_el: null,
            js_module: null
        };
        
        var params = utils.extend(defaults, config);
        console.log(params);
        
        var el = document.createElement('div'),
            close_button = document.createElement('div'),
            content_wrapper = document.createElement('div'),
            overlay = params.overlay ? create_overlay() : null;
        
        this.el = params.content_el;
        
        if (params.content_el.dataset['header']) {
            var header = document.createElement('h5');
            header.className = 'window__header';
            header.innerHTML = params.content_el.dataset['header'];
            el.appendChild(header);
        }
        
        el.className = 'window';
        close_button.className = 'window__close-button';
        content_wrapper.className = 'window__content';
        
        if (params.movable) {
            el.classList.add('window_movable');
        }
        
        el.appendChild(close_button);
        el.appendChild(content_wrapper);
        content_wrapper.appendChild(params.content_el);
        
        document.body.appendChild(el);
        
        if (params.closable) {
            close_button.addEventListener('click', hide, false);
            overlay.addEventListener('click', hide, false);
        }
            
        
        if (typeof params.js_module === 'function') {
            var result = params.js_module.call(this, this);
            utils.mixin(this, result);
        }
 
        function show() {
            utils.dom.show(el);
            if (overlay) {
                utils.dom.show(overlay);
            }
            layers.push(this);
        }
        
        function hide() {
            utils.dom.hide(el);
            if (overlay) {
                utils.dom.hide(overlay);
            }
            layers.pop(this);
        }
        
        this.show = show;
        this.hide = hide;
    }
    
    return {
        utils : utils,
        Menu : Menu,
        Window : Window
    };
})();
