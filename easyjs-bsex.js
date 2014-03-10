/**
 * Modules that extend and add more functionality to EasyJs Bootstrap.
 */
ejs.bs3ex = {}

/**
 * Module that implement a set of windows.
 */
ejs.bs3ex.window = {}

ejs.bs3ex.window.AbstractDialog = $.extend(true, {}, ejs.Object, {

    _dialog: null,

    _options: {
        title: '',
        message: '',
        callback: null
    },

    create: function(options) {
        ejs.Object.create.call(this)
        this._options = $.extend(this.options, options)
        return this
    },

    execute: function() {
        this._factoryModal().setVisible(true)
    }

})

/**
 * A Prompt Dialog
 * Options:
 *      title - Define the title of the dialog
 *      message - Defines the dialog message
 *      callback - The method which executes on any button click. The method is called with the parameters:
 *          code - the STATE_CONFIRM or STATE_CANCEL code
 *          value - the value set by client
 *          ev - click event
 *      buttonStyle - Define the style of the confirm button
 */
ejs.bs3ex.window.Prompt = $.extend(true, {}, ejs.bs3ex.window.AbstractDialog, {
    // TODO Add different kind of input (select, textarea, etc)

    INPUT_TYPE_TEXT: 'text',
    INPUT_TYPE_PASSWORD: 'password',

    STATE_OK: 1,
    STATE_CANCEL: 0,

    _input: null,

    _factoryModal: function() {
        var self = this
        var callbackCall = function(ev, code) {
            ev.preventDefault()
            self._dialog.setVisible(false)

            if (typeof self._options.callback != 'undefined' && self._options.callback != null) {
                return self._options.callback.call(self, code, $(self._input).val(), ev)
            }
        }

        var yesBtn = ejs.bs3.button.Button.create()
        yesBtn.setCaption('Ok')
        yesBtn.setStyle(ejs.util.isset(this._options.buttonStyle, ejs.bs3.button.STYLE_PRIMARY))
        yesBtn.setHandler(function(ev, btn) {
            return callbackCall(ev, ejs.bs3ex.window.Prompt.STATE_OK)
        })

        var cancelBtn = ejs.bs3.button.Button.create()
        cancelBtn.setCaption('Cancel')
        cancelBtn.setHandler(function(ev, btn) {
            return callbackCall(ev, ejs.bs3ex.window.Prompt.STATE_CANCEL)
        })

        this._dialog = ejs.bs3.modal.Modal.create({
            title: this._options.title,
            body: this._factoryBody(),
            buttons: [ yesBtn.htmlNode(), cancelBtn.htmlNode() ]
        })

        return this._dialog;
    },

    _factoryBody: function() {
        this._input = ejs.html.DomFactory.createNode({
            tagName: 'input',
            attrs: {
                type: ejs.util.isset(this._options.type, this.INPUT_TYPE_TEXT),
                styleClass: 'form-control'
            }
        })

        var container = ejs.bs3.base.Container.create()
        container.add(ejs.bs3.typography.Paragraph.create(this._options.message).htmlNode())
        container.add(this._input)

        return container.htmlNode()
    }
})

/**
 * A Confirm Dialog
 * Options:
 *      title - Define the title of the dialog
 *      message - Defines the dialog message
 *      callback - The method which executes on any button click. The method is called with the parameters:
 *          code - the STATE_CONFIRM or STATE_CANCEL code
 *          ev - click event
 *      buttonStyle - Define the style of the confirm button
 */
ejs.bs3ex.window.Confirm = $.extend(true, {}, ejs.bs3ex.window.AbstractDialog, {

    DIALOG_TYPE_DEFAULT: ejs.bs3.button.STYLE_PRIMARY,
    DIALOG_TYPE_DANGER: ejs.bs3.button.STYLE_DANGER,

    STATE_CONFIRM: 1,
    STATE_CANCEL: 0,

    _factoryModal: function() {
        var self = this
        var callbackCall = function(ev, code) {
            ev.preventDefault()
            self._dialog.setVisible(false)

            if (typeof self._options.callback != 'undefined' && self._options.callback != null) {
                self._options.callback.call(self, code, ev)
            }
        }

        var yesBtn = ejs.bs3.button.Button.create()
        yesBtn.setCaption('Confirm')
        yesBtn.setStyle(ejs.util.isset(this._options.buttonStyle, ejs.bs3.button.STYLE_PRIMARY))
        yesBtn.setHandler(function(ev, btn) {
            callbackCall(ev, ejs.bs3ex.window.Confirm.STATE_CONFIRM)
        })

        var cancelBtn = ejs.bs3.button.Button.create()
        cancelBtn.setCaption('Cancel')
        cancelBtn.setHandler(function(ev, btn) {
            callbackCall(ev, ejs.bs3ex.window.Confirm.STATE_CANCEL)
        })

        this._dialog = ejs.bs3.modal.Modal.create({
            title: this._options.title,
            body: ejs.bs3.typography.Paragraph.create(this._options.message).htmlNode(),
            buttons: [ yesBtn.htmlNode(), cancelBtn.htmlNode() ]
        })

        return this._dialog
    }
})

/**
 * A Prompt Dialog
 * Options:
 *      title - Define the title of the dialog
 *      message - Defines the dialog message
 *      callback - The method which executes on any button click. The method is called with the parameters:
 *          ev - click event
 */
ejs.bs3ex.window.Alert = $.extend(true, {}, ejs.bs3ex.window.AbstractDialog, {

    _factoryModal: function() {
        var self = this

        var okBtn = ejs.bs3.button.Button.create()
        okBtn.setCaption('Ok')
        okBtn.setStyle(ejs.bs3.button.STYLE_PRIMARY)
        okBtn.setHandler(function(ev, btn) {
            ev.preventDefault()
            self._dialog.setVisible(false)

            if (typeof self._options.callback != 'undefined' && self._options.callback != null) {
                self._options.callback.call(self, ev)
            }
        })

        this._dialog = ejs.bs3.modal.Modal.create({
            title: this._options.title,
            body: ejs.bs3.typography.Paragraph.create(this._options.message).htmlNode(),
            buttons: [okBtn.htmlNode()]
        })

        return this._dialog
    }

})