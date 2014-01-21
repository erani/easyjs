/**
 * Modules that extend and add more functionality to EasyJs Bootstrap.
 */
ejs.bs3ex = {}

/**
 * Module that implement a set of windows.
 */
ejs.bs3ex.window = {}

ejs.bs3ex.window.Prompt = {}

ejs.bs3ex.window.Confirm = $.extend(true, {}, ejs.Object, {

    RS_YES: 1,
    RS_NO: 0,

    execute: function(questionText, titleText, callback) {
        var modal = this._factoryModal(callback)
        modal.setTextTitle(titleText)
        modal.setBody(ejs.bs3.typography.Paragraph.create(questionText))
        $('body').append(modal)
        modal.setVisible(true)
    },

    _factoryModal: function(callback) {
        var modal = ejs.bs3.modal.Modal.create()

        var yesBtn = ejs.bs3.button.Button.create()
        yesBtn.setCaption('Yes')
        yesBtn.setStyle(ejs.bs3.button.STYLE_PRIMARY)
        yesBtn.setHandler(function(ev, btn) {
            ev.preventDefault()
            modal.setVisible(false)
            callback(ejs.bs3ex.window.Confirm.RS_YES)
        })
        modal.addButton(yesBtn)

        var cancelBtn = ejs.bs3.button.Button.create()
        cancelBtn.setCaption('Cancel')
        cancelBtn.setStyle(ejs.bs3.button.STYLE_LINK)
        cancelBtn.setHandler(function(ev, btn) {
            ev.preventDefault()
            modal.setVisible(false)
            callback(ejs.bs3ex.window.Confirm.RS_NO)
        })
        modal.addButton(cancelBtn)

        return modal
    }
})

ejs.bs3ex.window.Alert = {}