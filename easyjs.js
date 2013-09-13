if (!HTMLElement) {
    var HTMLElement = Element;
}

var ejs = {
    Object: {
        create: function() {
            var obj = $.extend({}, this)
            obj._constructor()

            return obj
        },

        _constructor: function()  { }
    }
}

ejs.util = {
    defined: function(value, def) {
        return (typeof value != 'undefined') ? value : ((typeof def != 'undefined') ? def : null)
    },

    empty: function(value, def) {
        return (value != null && value != "") ? false : ((typeof def != 'undefined') ? def : true)
    }
}

ejs.html = {
    DomFactory: $.extend({}, ejs.Object, {
        createNode: function(conf) {
            var node = document.createElement(conf.tagName)

            if (ejs.util.defined(conf.html)) {
                node.innerHTML = conf.html
            }

            conf.attrs = ejs.util.defined(conf.attrs, {})
            conf.attrs['class'] = ejs.util.defined(conf.attrs.styleClass, null)
            conf.attrs.styleClass = null

            for (var attr in conf.attrs) {
                if (!ejs.util.empty(conf.attrs[attr])) {
                    node.setAttribute(attr, conf.attrs[attr])
                }
            }

            if (ejs.util.defined(conf.children)) {
                for (var child in conf.children) {
                    if (conf.children[child] == null) {
                        continue
                    } else if (conf.children[child] instanceof HTMLElement) {
                        node.appendChild(conf.children[child])
                    } else if (typeof conf.children[child] == 'string') {
                        node.appendChild(document.createTextNode(conf.children[child]))
                    } else {
                        node.appendChild(this.createNode(conf.children[child]))
                    }
                }
            }

            return node
        }
    })
}
