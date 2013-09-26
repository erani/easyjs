/** ===== Bootstrap Common Package ===== **/

ejs.bs = {
    core: {
        HEADER_LEVEL_1: 1,
        HEADER_LEVEL_2: 2,
        HEADER_LEVEL_3: 3,
        HEADER_LEVEL_4: 4,
        HEADER_LEVEL_5: 5,
        HEADER_LEVEL_6: 6,

        ALIGNMENT_LEFT: 'left',
        ALIGNMENT_CENTER: 'center',
        ALIGNMENT_RIGHT: 'right',

        STYLE_MUTED: 'muted',
        STYLE_PRIMARY: 'primary',
        STYLE_SUCCESS: 'success',
        STYLE_INFO: 'info',
        STYLE_WARNING: 'warning',
        STYLE_DANGER: 'danger',

        DynamicNamedTag: {
            _getTagName: function() {
                throw "The method should be overridden"
            }
        }
    }
}

ejs.bs.core.Object = $.extend(true, {}, ejs.Object, {
    _domNode: null,

    _attrs: {
        id: "",
        name: "",
        styleClass: "",
        style: ""
    },

    html: function() {

    },

    htmlNode: function() {
        if (null == this._domNode) {
            this._computeAttributes()
            this._domNode = this._factoryNode()
        }

        return this._domNode
    },

    _factoryNode: function() {
        throw "The method should be overridden"
    },

    _computeAttributes: function() {}

})

ejs.bs.core.SimpleTag = $.extend(true, {}, ejs.bs.core.Object, ejs.bs.core.DynamicNamedTag, {
    _factoryNode: function() {
        return ejs.html.DomFactory.createNode({
            tagName: this._getTagName()
        })
    }
})

ejs.bs.core.BodyTag = $.extend(true, {}, ejs.bs.core.Object, ejs.bs.core.DynamicNamedTag, {
    _children: [],

    addChild: function(child) {
        this._children.push(child)
        return this
    },

    _factoryNode: function() {
        return ejs.html.DomFactory.createNode({
            tagName: this._getTagName(),
            attrs: this._attrs,
            children: this._children
        })
    }
})

ejs.bs.core.TextTag = $.extend(true, {}, ejs.bs.core.Object, ejs.bs.core.DynamicNamedTag, {
    _text: null,
    _textAlignment: null,
    _textStyle: null,

    create: function(text) {
        var obj = ejs.Object.create.call(this)
        obj._text = text

        return obj
    },

    setText: function(text) {
        this._text = text
        return this
    },

    setTextAlignment: function(alignment) {
        this._textAlignment = alignment
        return this
    },

    setTextStyle: function(style) {
        this._textStyle = style
        return this
    },

    _computeAttributes: function() {
        ejs.bs.core.Object._computeAttributes.call(this)

        if (this._textAlignment != null) {
            this._attrs.styleClass += " text-" + this._textAlignment.trim()
        }

        if (this._textStyle != null) {
            this._attrs.styleClass += " text-" + this._textStyle.trim()
        }
    },

    _factoryNode: function() {
        return ejs.html.DomFactory.createNode({
            tagName: this._getTagName(),
            attrs: this._attrs,
            html: this._text
        })
    }
})

/** ===== Bootstrap 3 Package ===== **/

ejs.bs3 = {}

/** ===== Base Package ===== **/

ejs.bs3.base = {}

ejs.bs3.base.LineBreak = $.extend(true, {}, ejs.bs.core.SimpleTag, {
    _getTagName: function() {
        return "br"
    }
})

ejs.bs3.base.HLineBreak = $.extend(true, {}, ejs.bs.core.SimpleTag, {
    _getTagName: function() {
        return "hr"
    }
})

/** ===== Typography Package ===== **/

ejs.bs3.typography = {}

ejs.bs3.typography.Header = $.extend(true, {}, ejs.bs.core.TextTag, {
    _level: null,

    create: function(level, text) {
        var obj = ejs.bs.core.TextTag.create.call(this)
        obj._level = ejs.util.defined(level, this.LEVEL_H1)

        return obj
    },

    setLevel: function(level) {
        this._level = level
        return this
    },

    _getTagName: function() {
        return "h" + this._level
    }
})

ejs.bs3.typography.Paragraph = $.extend(true, {}, ejs.bs.core.TextTag, {
    _lead: false,

    setLead: function(b) {
        this._lead = b;
        return this
    },

    _getTagName: function() {
        return "p"
    },

    _computeAttributes: function() {
        ejs.bs.core.TextTag._computeAttributes.call(this)

        if (this._lead) {
            this._attrs.styleClass += " lead".trim()
        }
    }
})

ejs.bs3.typography.SmallText = $.extend(true, {}, ejs.bs.core.TextTag, {
    _getTagName: function() {
        return "small"
    }
})

ejs.bs3.typography.StrongText = $.extend(true, {}, ejs.bs.core.TextTag, {
    _getTagName: function() {
        return "strong"
    }
})

ejs.bs3.typography.ItalicText = $.extend(true, {}, ejs.bs.core.TextTag, {
    _getTagName: function() {
        return "em"
    }
})

ejs.bs3.typography.Abbreviation = $.extend(true, {}, ejs.bs.core.TextTag, {
    _initialism: false,
    _title: null,

    setInitialism: function(b) {
        this._initialism = b
        return this
    },

    setTitle: function(title) {
        this._title = title
        return this
    },

    _getTagName: function() {
        return "abbr"
    },

    _computeAttributes: function() {
        ejs.bs.core.TextTag._computeAttributes.call(this)

        if (this._initialism) {
            this._attrs.styleClass += " initialism".trim()
        }

        if (!ejs.util.empty(this._title)) {
            this._attrs.title = this._title
        }
    }
})

ejs.bs3.typography.Address = $.extend(true, {}, ejs.bs.core.Object, {
    _childrens: [],

    addLine: function(line) {
        this._childrens.push(line)
        this._childrens.push({
            tagName: 'br'
        })
    },

    _factoryNode: function() {
        var childrens = []
        if (!ejs.util.empty(this._text)) {
            childrens.push({
                tagName: 'p',
                html: this._text
            })
        }

        if (!ejs.util.empty(this._source)) {
            childrens.push({
                tagName: 'small',
                html: this._source
            })
        }

        return ejs.html.DomFactory.createNode({
            tagName: 'address',
            attrs: this._attrs,
            children: this._childrens
        })
    }
})

ejs.bs3.typography.Blockquote = $.extend(true, {}, ejs.bs.core.Object, {
    _text: null,
    _source: null,

    setText: function(text) {
        this._text = text
        return this
    },

    setSource: function(source) {
        this._source = source
        return this
    },

    _factoryNode: function() {
        var childrens = []
        if (!ejs.util.empty(this._text)) {
            childrens.push({
                tagName: 'p',
                html: this._text
            })
        }

        if (!ejs.util.empty(this._source)) {
            childrens.push({
                tagName: 'small',
                html: this._source
            })
        }

        return ejs.html.DomFactory.createNode({
            tagName: 'blockquote',
            attrs: this._attrs,
            children: childrens
        })
    }
})

ejs.bs3.typography.AbstractList = $.extend(true, {}, ejs.bs.core.BodyTag, {
    _inline: false,

    setInline: function(b) {
        this._inline = b
    },

    addChild: function(child) {
        ejs.bs.core.BodyTag.addChild.call(this, {
            tagName: 'li',
            children: [child]
        })

        return this
    },

    _computeAttributes: function() {
        if (!ejs.util.empty(this._inline)) {
            this._attrs.styleClass += " list-inline"
            this._attrs.styleClass.trim()
        }
    },
})

ejs.bs3.typography.UnorderedList = $.extend(true, {}, ejs.bs3.typography.AbstractList, {
    _getTagName: function() {
        return "ul"
    }
})

ejs.bs3.typography.OrderedList = $.extend(true, {}, ejs.bs3.typography.AbstractList, {
    _getTagName: function() {
        return "ol"
    }
})

ejs.bs3.typography.UnstyledList = $.extend(true, {}, ejs.bs3.typography.AbstractList, {
    _computeAttributes: function() {
        ejs.bs3.typography.AbstractList._computeAttributes.call(this)
        this._attrs.styleClass += " list-unstyled"
        this._attrs.styleClass.trim()
    },

    _getTagName: function() {
        return "ul"
    }
})

ejs.bs3.typography.Description = $.extend(true, {}, ejs.bs.core.Object, {
    _children: [],
    _horizontal: false,

    addItem: function(caption, text) {
        this._children.push({
            tagName: 'dt',
            html: caption
        })
        this._children.push({
            tagName: 'dd',
            html: text
        })
    },

    setHorizontal: function(b) {
        this._horizontal = b
    },

    _computeAttributes: function() {
        if (!ejs.util.empty(this._horizontal)) {
            this._attrs.styleClass += " dl-horizontal"
            this._attrs.styleClass.trim()
        }
    },

    _factoryNode: function() {
        return ejs.html.DomFactory.createNode({
            tagName: 'dl',
            attrs: this._attrs,
            children: this._children
        })
    }
})

ejs.bs3.typography.CodeInline = $.extend(true, {}, ejs.bs.core.TextTag, {
    _getTagName: function() {
        return "code"
    }
})

ejs.bs3.typography.CodeBlock = $.extend(true, {}, ejs.bs.core.BodyTag, {
    _scrollable: false,

    setScrollable: function(b) {
        this._scrollable = b
    },

    addChild: function(child) {
        this._children.push(child)
        this._children.push({
            tagName: 'br'
        })
    },

    _computeAttributes: function() {
        if (!ejs.util.empty(this._scrollable)) {
            this._attrs.styleClass += " pre-scrollable"
            this._attrs.styleClass.trim()
        }
    },

    _getTagName: function() {
        return "pre"
    }
})

ejs.bs3.Table = $.extend({}, ejs.bs.core.Object, {
   STRIPED: 'table-striped',
   BORDERED: 'table-bordered',
   HOVER: 'table-hover',
   CONDENSED: 'table-condensed',

   SUCCESS: 'success',
   DANGER: 'danger',
   WARNING: 'warning',
   ACTIVE: 'active',

   _data: {
       headers: [],
       footers: [],
       rows: []
   },

   _prop: [],

   _constructor: function()  {
       this._attrs.styleClass = "table"
   },

   addRow: function(columns, property) {
       this._data.rows.push({
           property: property,
           tagName: 'td',
           columns: columns
       })
   },

   addHeaderRow: function(columns) {
       this._data.headers.push({
           tagName: 'th',
           columns: columns
       })
   },

   addFooterRow: function(columns) {
       this._data.footers.push({
           tagName: 'tf',
           columns: columns
       })
   },

   addProperty: function(style) {
       this._prop.push(style)
   },

   _factoryNode: function() {
       var conf = {
           tagName: 'table',
           attrs: this._attrs,
           children: []
       }

       for (var i = 0; i < this._prop.length; i++) {
           conf.attrs.styleClass += " " + this._prop[i]
       }

       for (var i = 0; i < this._data.headers.length; i++) {
           conf.children.push(this.__getRowFactoryConfiguration(this._data.headers[i]))
       }

       for (var i = 0; i < this._data.rows.length; i++) {
           conf.children.push(this.__getRowFactoryConfiguration(this._data.rows[i]))
       }

       for (var i = 0; i < this._data.footers.length; i++) {
           conf.children.push(this.__getRowFactoryConfiguration(this._data.footers[i]))
       }

       return ejs.html.DomFactory.createNode(conf)
   },

   __getRowFactoryConfiguration: function(data) {
       var conf = {
           tagName: 'tr',
           attrs: {
               styleClass: ejs.util.defined(data.property, '')
           },
           children: []
       }

       for (i = 0; i < data.columns.length; i++) {
           conf.children.push({
               tagName: data.tagName,
               children: [data.columns[i]]
           })
       }

       return conf
   }
})

ejs.bs3.form = {}

ejs.bs3.form.Form = $.extend(true, {}, ejs.bs.core.Object, {
    _factoryNode: function() {
        return ejs.html.DomFactory.createNode({
            tagName: 'form',
            attrs: this._attrs,
            children: this._children
        })
    }
})

ejs.bs3.layout = {}

ejs.bs3.layout.Layout = $.extend(true, {}, ejs.bs.core.Object, {
    _elements: [],

    addColumn: function(element, size) {
        this._elements.push({
            element: element,
            size: size
        })
    },

    _computeAttributes: function() {
        this._attrs.styleClass = "row"
    },

    _factoryNode: function() {
        var items = this.__factoryItems()

        return ejs.html.DomFactory.createNode({
            tagName: 'div',
            attrs: this._attrs,
            children: items
        })
    },

    __factoryItems: function() {
        var elements = []
        for (var el in this._elements) {
            elements.push({
                tagName: 'div',
                html: el
            })
        }
    }
})