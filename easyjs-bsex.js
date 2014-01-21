/**
 * Modules that extend and add more functionality to EasyJs Bootstrap.
 */
ejs.bs3ex = {}

/**
 * Module that implement a set of windows.
 */
ejs.bs3ex.window = {}

ejs.bs3ex.window.Prompt = $.extend(true, {}, ejs.Object, {
    // TODO Add different kind of input (select, textarea, etc)

    RS_OK: 1,
    RS_CANCEL: 0,

    _input: null,

    execute: function(questionText, titleText, callback) {
        var modal = this._factoryModal(callback)
        modal.setTitle(titleText)
        modal.setBody(this._factoryBody(questionText))
        $('body').append(modal)
        modal.setVisible(true)
    },

    getInput: function() {
        return $(this._input).val()
    },

    _factoryModal: function(callback) {
        var modal = ejs.bs3.modal.Modal.create()

        var yesBtn = ejs.bs3.button.Button.create()
        yesBtn.setCaption('Ok')
        yesBtn.setStyle(ejs.bs3.button.STYLE_PRIMARY)
        yesBtn.setHandler(function(ev, btn) {
            ev.preventDefault()
            modal.setVisible(false)

            if (typeof callback != 'undefined') {
                callback(ejs.bs3ex.window.Prompt.RS_OK)
            }
        })
        modal.addButton(yesBtn)

        var cancelBtn = ejs.bs3.button.Button.create()
        cancelBtn.setCaption('Cancel')
        cancelBtn.setHandler(function(ev, btn) {
            ev.preventDefault()
            modal.setVisible(false)

            if (typeof callback != 'undefined') {
                callback(ejs.bs3ex.window.Prompt.RS_CANCEL)
            }
        })
        modal.addButton(cancelBtn)

        return modal
    },

    _factoryBody: function(text) {
        text = ejs.bs3.typography.Paragraph.create(text)
        this._input = ejs.html.DomFactory.createNode({
            tagName: 'input',
            attrs: {
                type: 'text',
                styleClass: 'form-control'
            }
        })

        var container = ejs.bs3.base.Container.create()
        container.add(text.htmlNode())
        container.add(this._input)

        return container
    }
})

ejs.bs3ex.window.Confirm = $.extend(true, {}, ejs.Object, {

    RS_CONFIRM: 1,
    RS_CANCEL: 0,

    execute: function(questionText, titleText, callback) {
        var modal = this._factoryModal(callback)
        modal.setTitle(titleText)
        modal.setBody(ejs.bs3.typography.Paragraph.create(questionText))
        $('body').append(modal)
        modal.setVisible(true)
    },

    _factoryModal: function(callback) {
        var modal = ejs.bs3.modal.Modal.create()

        var yesBtn = ejs.bs3.button.Button.create()
        yesBtn.setCaption('Confirm')
        yesBtn.setStyle(ejs.bs3.button.STYLE_PRIMARY)
        yesBtn.setHandler(function(ev, btn) {
            ev.preventDefault()
            modal.setVisible(false)

            if (typeof callback != 'undefined') {
                callback(ejs.bs3ex.window.Confirm.RS_CONFIRM)
            }
        })
        modal.addButton(yesBtn)

        var cancelBtn = ejs.bs3.button.Button.create()
        cancelBtn.setCaption('Cancel')
        cancelBtn.setHandler(function(ev, btn) {
            ev.preventDefault()
            modal.setVisible(false)

            if (typeof callback != 'undefined') {
                callback(ejs.bs3ex.window.Confirm.RS_CANCEL)
            }
        })
        modal.addButton(cancelBtn)

        return modal
    }
})

ejs.bs3ex.window.Alert = $.extend(true, {}, ejs.Object, {

    execute: function(text, titleText, callback) {
        var modal = this._factoryModal(callback)
        modal.setTitle(titleText)
        modal.setBody(ejs.bs3.typography.Paragraph.create(text))
        $('body').append(modal)
        modal.setVisible(true)
    },

    _factoryModal: function(callback) {
        var modal = ejs.bs3.modal.Modal.create()

        var okBtn = ejs.bs3.button.Button.create()
        okBtn.setCaption('Ok')
        okBtn.setStyle(ejs.bs3.button.STYLE_PRIMARY)
        okBtn.setHandler(function(ev, btn) {
            ev.preventDefault()
            modal.setVisible(false)

            if (typeof callback != 'undefined') {
                callback()
            }
        })
        modal.addButton(okBtn)

        return modal
    }
})