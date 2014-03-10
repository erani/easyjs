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

        SIZE_LARGE: 'lg',
        SIZE_SMALL: 'sm',
        SIZE_EXTRA_SMALL: 'xs',

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

    addData: function(name, value) {
        if (this._domNode == null) {
            this._attrs['data-' + name] = value
        } else {
            $(this._domNode).attr('data-' + name, value)
        }
    },

    html: function() {
        // TODO Implement
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

/**
 * Create a line break
 * @link http://www.w3schools.com/tags/tag_br.asp
 * Usage: $('body').append(ejs.bs3.base.LineBreak.create().htmlNode())
 */
ejs.bs3.base.LineBreak = $.extend(true, {}, ejs.bs.core.SimpleTag, {
    _getTagName: function() {
        return "br"
    }
})

/**
 * Create a thematic line break
 * @link http://www.w3schools.com/tags/tag_hr.asp
 * Usage: $('body').append(ejs.bs3.base.HLineBreak.create().htmlNode())
 */
ejs.bs3.base.HLineBreak = $.extend(true, {}, ejs.bs.core.SimpleTag, {
    _getTagName: function() {
        return "hr"
    }
})

ejs.bs3.base.Container = $.extend(true, {}, ejs.bs.core.Object, {
    _children: [],

    add: function(child) {
        if (null == this._domNode) {
            this._children.push(child)
        } else {
            this._domNode.append(child)
        }
    },

    _factoryNode: function() {
        return ejs.html.DomFactory.createNode({
            tagName: 'div',
            children: this._children
        })
    }
})

/** ===== Typography Package ===== **/

// TODO Add alignment states (text-left, text-center, text-right)
// TODO Add emphasis classes (text-muted, text-primary, text-success, text-info, text-warning, text-danger)
// TODO Add Page Header
ejs.bs3.typography = {}

ejs.bs3.typography.Header = $.extend(true, {}, ejs.bs.core.TextTag, {
    _level: null,

    create: function(level, text) {
        var obj = ejs.bs.core.TextTag.create.call(this, text)
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

// TODO Add List Group
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

// TODO Unfinished module
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

// TODO Unfinished module
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

// TODO Unfinished module
ejs.bs3.button = {
    STYLE_DEFAULT:  'btn-default',
    STYLE_PRIMARY:  'btn-primary',
    STYLE_SUCCESS:  'btn-success',
    STYLE_INFO:     'btn-info',
    STYLE_WARNING:  'btn-warning',
    STYLE_DANGER:   'btn-danger',
    STYLE_LINK:     'btn-link',

    TYPE_BUTTON:    'button',
    TYPE_SUBMIT:    'submit',
    TYPE_RESET:     'reset'
}

/**
 * Button class
 * @link http://getbootstrap.com/css/#buttons
 */
ejs.bs3.button.Button = $.extend(true, {}, ejs.bs.core.Object, {
    // TODO Add custom constructor
    // TODO Add Block Level
    // TODO Add active state
    // TODO Add disabled state

    _caption: '',
    _style: ejs.bs3.button.STYLE_DEFAULT,
    _type: ejs.bs3.button.TYPE_BUTTON,
    _size: null,
    _handler: null,

    setCaption: function(caption) {
        this._caption = caption
    },

    setStyle: function(style) {
        this._style = style
    },

    setType: function(type) {
        this._type = type
    },

    setSize: function(size) {
        this._size = size
    },

    setHandler: function(handler) {
        this._handler = handler
    },

    _factoryNode: function() {
        var btn = ejs.html.DomFactory.createNode({
            tagName: 'button',
            html: this._caption,
            attrs: this._attrs
        })

        if (this._handler != null) {
            var self = this
            $(btn).on('click', function(ev) {
                self._handler(ev, self)
            })
        }

        return btn;
    },

    _computeAttributes: function() {
        this._attrs.styleClass = 'btn ' + this._style
        if (null != this._size) {
            this._attrs.styleClass += ' btn-' + this._size
        }

        this._attrs.type = 'button'
    }

})

ejs.bs3.button.ButtonGroup = {}
ejs.bs3.button.ButtonDropdown = {}

// TODO Unfinished module
ejs.bs3.image = {}

// TODO Unfinished module
ejs.bs3.helper = {}

// TODO Unfinished module
ejs.bs3.icon = {}

// TODO Unfinished module
ejs.bs3.drowpdown = {}

// TODO Unfinished module
ejs.bs3.helper = {}

// TODO Unfinished module
ejs.bs3.nav = {}

// TODO Unfinished module
ejs.bs3.navbar = {}

// TODO Unfinished module
ejs.bs3.breadcrumb = {}

// TODO Unfinished module
ejs.bs3.pagination = {}

// TODO Unfinished module
ejs.bs3.label = {}

// TODO Unfinished module
ejs.bs3.badge = {}

// TODO Unfinished module
ejs.bs3.jumbotron = {}

// TODO Unfinished module
ejs.bs3.helper = {}
ejs.bs3.helper.CloseButton = $.extend(true, {}, ejs.bs.core.Object, {

    _factoryNode: function() {
        return ejs.html.DomFactory.createNode({
            tagName: 'button',
            html: '&times;',
            attrs: this._attrs
        })
    },

    _computeAttributes: function() {
        this._attrs.styleClass = 'close'
        this._attrs.type = 'button'
        this._attrs['aria-hidden'] = true
    }
})

// TODO Unfinished module
ejs.bs3.thumbnail = {}

// TODO Unfinished module
ejs.bs3.alert = {}

// TODO Unfinished module
ejs.bs3.progressbar = {}

// TODO Unfinished module
ejs.bs3.media = {}

// TODO Unfinished module
ejs.bs3.panel = {}

// TODO Unfinished module
ejs.bs3.well = {}

ejs.bs3.modal = {}

/**
 * Modal element class
 * @link http://getbootstrap.com/javascript/#modals
 */
ejs.bs3.modal.Modal = $.extend(true, {}, ejs.bs.core.Object, {

    // TODO Add support of modal options
    // TODO Add support of modal events

    _options: {
        title: '',
        body: null,
        buttons: [],
        isClosable: true
    },

    create: function(options) {
        ejs.bs.core.Object.create.call(this)
        this._options = options

        return this
    },

    setVisible: function(b) {
        (b) ? $(this.htmlNode()).modal() : $(this.htmlNode()).modal('hide')
    },

    _factoryNode: function() {
        var header = []

        if (this._options.isClosable) {
            var closeBtn = ejs.bs3.helper.CloseButton.create()
            closeBtn.addData('dismiss', 'modal')
            header.push(closeBtn.htmlNode())
        }

        header.push({
            tagName: 'h4',
            html: this._options.title,
            attrs: {
                styleClass: 'modal-title'
            }
        })

        return ejs.html.DomFactory.createNode({
            tagName: 'div',
            attrs: {
                styleClass: 'modal fade'
            },
            children: [{
                tagName: 'div',
                attrs: {
                    styleClass: 'modal-dialog'
                },
                children: [{
                    tagName: 'div',
                    attrs: {
                        styleClass: 'modal-content'
                    },
                    children: [{
                        tagName: 'div',
                        attrs: {
                            styleClass: 'modal-header'
                        },
                        children: header
                    },{
                        tagName: 'div',
                        attrs: {
                            styleClass: 'modal-body'
                        },
                        children: [this._options.body]
                    },{
                        tagName: 'div',
                        attrs: {
                            styleClass: 'modal-footer'
                        },
                        children: this._options.buttons
                    }]
                }]
            }]
        })
    }
})