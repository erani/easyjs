/** ===== Bootstrap Common Package ===== **/

ejs.bs = {
    core: {
        HEADER_LEVEL_1: 1,
        HEADER_LEVEL_2: 2,
        HEADER_LEVEL_3: 3,
        HEADER_LEVEL_4: 4,
        HEADER_LEVEL_5: 5,
        HEADER_LEVEL_6: 6,

        DynamicNamedTag: {
            _getTagName: function() {
                throw "The method should be overridden"
            }
        }
    }
}

ejs.bs.core.Object = $.extend({}, ejs.Object, {
    _domNode: null,

    _attrs: {
        id: null,
        name: null,
        styleClass: null,
        style: null
    },

    html: function() {

    },

    htmlNode: function() {
        if (null == this._domNode) {
            this._domNode = this._factoryNode()
        }

        return this._domNode
    },

    _factoryNode: function() {
        throw "The method should be overridden"
    }
})

ejs.bs.core.SimpleTag = $.extend({}, ejs.bs.core.Object, ejs.bs.core.DynamicNamedTag, {
    _factoryNode: function() {
        return ejs.html.DomFactory.createNode({
            tagName: this._getTagName()
        })
    }
})

ejs.bs.core.BodyTag = $.extend({}, ejs.bs.core.Object, ejs.bs.core.DynamicNamedTag, {
    _children: [],

    addChildren: function(children) {
        this._children.push(children)
    },

    _factoryNode: function() {
        return {
            tagName: this._getTagName(),
            children: this._children
        }
    }
})

ejs.bs.core.TextTag = $.extend({}, ejs.bs.core.Object, ejs.bs.core.DynamicNamedTag, {
    _text: null,

    setText: function(text) {
        this._text = text
    },

    _factoryNode: function() {
        return ejs.html.DomFactory.createNode({
            tagName: this._getTagName(),
            html: this._text
        })
    }
})

/** ===== Bootstrap 3 Package ===== **/

ejs.bs3 = {}

/** ===== Base Package ===== **/

ejs.bs3.base = {}

ejs.bs3.base.LineBreak = $.extend({}, ejs.bs.core.SimpleTag, {
    _getTagName: function() {
        return "br"
    }
})

ejs.bs3.base.HLineBreak = $.extend({}, ejs.bs.core.SimpleTag, {
    _getTagName: function() {
        return "hr"
    }
})

/** ===== Typography Package ===== **/

ejs.bs3.typography = {}

ejs.bs3.typography.Header = $.extend({}, ejs.bs.core.TextTag, {
    _level: null,

    create: function(level, text) {
        var obj = ejs.Object.create.call(this)
        obj._level = ejs.util.defined(level, this.LEVEL_H1)
        obj._text = ejs.util.defined(text, null)

        return obj
    },

    setLevel: function(level) {
        this._level = level
    },

    _getTagName: function() {
        return "h" + this._level
    }
})

//ejs.bs3.typography.Code = $.extend({}, ejs.bs3.core.SimpleContentTag, {
//    _getTagName: function() {
//        return "code"
//    }
//})
//
//ejs.bs3.typography.Pre = $.extend({}, ejs.bs3.core.SimpleContentTag, {
//    _getTagName: function() {
//        return "pre"
//    }
//})
//
//ejs.bs3.Table = $.extend({}, ejs.bs3.UIObject, {
//    STRIPED: 'table-striped',
//    BORDERED: 'table-bordered',
//    HOVER: 'table-hover',
//    CONDENSED: 'table-condensed',
//
//    SUCCESS: 'success',
//    DANGER: 'danger',
//    WARNING: 'warning',
//    ACTIVE: 'active',
//
//    _data: {
//        headers: [],
//        footers: [],
//        rows: []
//    },
//
//    _prop: [],
//
//    _constructor: function()  {
//        this._attrs.styleClass = "table"
//    },
//
//    addRow: function(columns, property) {
//        this._data.rows.push({
//            property: property,
//            tagName: 'td',
//            columns: columns
//        })
//    },
//
//    addHeaderRow: function(columns) {
//        this._data.headers.push({
//            tagName: 'th',
//            columns: columns
//        })
//    },
//
//    addFooterRow: function(columns) {
//        this._data.footers.push({
//            tagName: 'tf',
//            columns: columns
//        })
//    },
//
//    addProperty: function(style) {
//        this._prop.push(style)
//    },
//
//    _factoryNode: function() {
//        var conf = {
//            tagName: 'table',
//            attrs: this._attrs,
//            children: []
//        }
//
//        for (var i = 0; i < this._prop.length; i++) {
//            conf.attrs.styleClass += " " + this._prop[i]
//        }
//
//        for (var i = 0; i < this._data.headers.length; i++) {
//            conf.children.push(this.__getRowFactoryConfiguration(this._data.headers[i]))
//        }
//
//        for (var i = 0; i < this._data.rows.length; i++) {
//            conf.children.push(this.__getRowFactoryConfiguration(this._data.rows[i]))
//        }
//
//        for (var i = 0; i < this._data.footers.length; i++) {
//            conf.children.push(this.__getRowFactoryConfiguration(this._data.footers[i]))
//        }
//
//        return ejs.html.DomFactory.createNode(conf)
//    },
//
//    __getRowFactoryConfiguration: function(data) {
//        var conf = {
//            tagName: 'tr',
//            attrs: {
//                styleClass: ejs.util.defined(data.property, '')
//            },
//            children: []
//        }
//
//        for (i = 0; i < data.columns.length; i++) {
//            conf.children.push({
//                tagName: data.tagName,
//                children: [data.columns[i]]
//            })
//        }
//
//        return conf
//    }
//})