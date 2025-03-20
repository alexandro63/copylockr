/*!
* CopyLockr v2.0.0
* (c) 2025 Alexandro Fuentelsaz
* Released under the MIT License.
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.CopyLockr = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var copylockr$1 = {exports: {}};

	(function (module) {
		(function (root, factory) {
		  if (module.exports) {
		    module.exports = factory();
		  } else {
		    root.CopyLockr = factory();
		  }
		}(typeof self !== 'undefined' ? self : commonjsGlobal, function () {

		  var CopyLockr = {
		    enabled: false,
		    version: '2.0.0',
		    settings: {
		      disableContextMenu: true,
		      disableCopy: true,
		      disableCut: true,
		      disableDrag: true,
		      disableSelect: true,
		      disableDevTools: true,
		      password: null,
		      customStyles: true,
		      debug: false,
		      onBlock: null
		    },
		    
		    _styleElement: null,
		    _observer: null,
		    
		    _handleEvent: function(e) {
		      if (this.settings.onBlock) {
		        this.settings.onBlock(e.type, e);
		      }
		      
		      if (this.settings.debug) {
		        console.log('Blocked event:', e.type);
		      }
		      
		      e.preventDefault();
		      e.stopPropagation();
		      return false;
		    },

		    _handleKeydown: function(e) {
		      var ctrlOrMeta = e.ctrlKey || e.metaKey;
		      var blockedCombinations = [
		        ctrlOrMeta && e.keyCode === 85,  // Ctrl+U
		        e.keyCode === 123,               // F12
		        ctrlOrMeta && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67) // DevTools
		      ];

		      if (blockedCombinations.some(Boolean)) {
		        this._handleEvent(e);
		      }
		    },

		    _applyStyles: function() {
		      if (this.settings.disableSelect && this.settings.customStyles) {
		        this._styleElement = document.createElement('style');
		        this._styleElement.textContent = `
          body * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
          }
          img, [data-copylockr-allow] {
            -webkit-user-drag: none !important;
            -moz-user-drag: none !important;
            -ms-user-drag: none !important;
            user-drag: none !important;
          }
        `;
		        document.head.appendChild(this._styleElement);
		      }
		    },

		    _observeDOM: function() {
		      if (this.settings.disableSelect) {
		        this._observer = new MutationObserver(function(mutations) {
		          mutations.forEach(function(mutation) {
		            Array.from(mutation.addedNodes).forEach(function(node) {
		              if (node.nodeType === 1) { // Element node
		                node.style.userSelect = 'none';
		              }
		            });
		          });
		        });

		        this._observer.observe(document.body, {
		          childList: true,
		          subtree: true
		        });
		      }
		    },

		    _attachListeners: function() {
		      var events = {
		        contextmenu: this.settings.disableContextMenu,
		        copy: this.settings.disableCopy,
		        cut: this.settings.disableCut,
		        dragstart: this.settings.disableDrag
		      };

		      Object.entries(events).forEach(([event, enabled]) => {
		        if (enabled) document.addEventListener(event, this._handleEvent.bind(this), true);
		      });

		      if (this.settings.disableDevTools) {
		        document.addEventListener('keydown', this._handleKeydown.bind(this), true);
		      }
		    },

		    _detachListeners: function() {
		      document.removeEventListener('contextmenu', this._handleEvent, true);
		      document.removeEventListener('copy', this._handleEvent, true);
		      document.removeEventListener('cut', this._handleEvent, true);
		      document.removeEventListener('dragstart', this._handleEvent, true);
		      document.removeEventListener('keydown', this._handleKeydown, true);
		      
		      if (this._styleElement) {
		        document.head.removeChild(this._styleElement);
		        this._styleElement = null;
		      }
		      
		      if (this._observer) {
		        this._observer.disconnect();
		        this._observer = null;
		      }
		    },

		    _validatePassword: function(password) {
		      if (this.settings.password && this.settings.password !== password) {
		        throw new Error('Invalid password');
		      }
		      return true;
		    },

		    enable: function(options) {
		      Object.assign(this.settings, options);
		      
		      if (this.enabled) this.disable();
		      
		      this._applyStyles();
		      this._observeDOM();
		      this._attachListeners();
		      this.enabled = true;
		    },

		    disable: function(password) {
		      try {
		        this._validatePassword(password);
		        this._detachListeners();
		        this.enabled = false;
		        return true;
		      } catch (e) {
		        if (this.settings.debug) console.error(e.message);
		        return false;
		      }
		    },

		    toggle: function(state, password) {
		      if (typeof state === 'boolean') {
		        return state ? this.enable() : this.disable(password);
		      }
		      return this[this.enabled ? 'disable' : 'enable'](password);
		    },

		    updateSettings: function(newSettings) {
		      Object.assign(this.settings, newSettings);
		      if (this.enabled) {
		        this.disable();
		        this.enable();
		      }
		    }
		  };

		  return CopyLockr;
		})); 
	} (copylockr$1));

	var copylockrExports = copylockr$1.exports;
	var copylockr = /*@__PURE__*/getDefaultExportFromCjs(copylockrExports);

	return copylockr;

}));
//# sourceMappingURL=copylockr.js.map
