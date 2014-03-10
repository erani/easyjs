ejs.ctrl = {
    ScopeObject: {
        _name: null,
        _node: null,

        /**
         * Find first element with provided name
         * @param string name
         * @returns jQuery DOM Element
         */
        findOne: function(name) {
            return this._node.find('[name="'+ name +'"]').first()
        },

        /**
         * Find all elements with provided name
         * @param string name
         * @returns array of jQuery DOM Elements
         */
        findAll: function(name) {
            return this._node.find('[name="'+ name +'"]')
        },

        /**
         * Find all collection elements by provided name
         * @param string name
         * @returns array of jQuery DOM Elements
         */
        findCollection: function(name) {
            return this._node.find('[name="'+ name +'[]"]')
        }
    },

    global: []
}

$(document).ready(function() {
    $('[id]').each(function() {
        ejs.ctrl.global[$(this).attr('id')] = $(this)
    })

    $('[ejs-ctrl]').each(function() {
        var $this = $(this)
        var $scope = $.extend(true, {}, ejs.ctrl.ScopeObject, {
            _name:   $this.attr('ejs-ctrl'),
            _node:   $this
        })

        ejs.ctrl[$this.attr('ejs-ctrl')] = $scope

        var tokens = $this.attr('ejs-ctrl').split('.')
        var object = window[tokens.shift()];
        while (tokens.length > 0) {
            object = object[tokens.shift()];
        }

        $this.find('[name]').each(function() {
            var match = $(this).attr('name').match(/\[\]/gi)

            if (match != null && match.length > 0) {
                $scope[$(this).attr('name').replace("[]", "")] = $(this)
            } else {
                $scope[$(this).attr('name')] = $(this).first()
            }
        })

        var actionHandler = function(ev, node, attr) {
            var tokens = attr.split("|");
            var fn = $scope[tokens.shift()]

            if (typeof fn == "function") {
                tokens.unshift(ev, node)
                fn.apply($scope, tokens)
            }
        }

        $this.on('click', 'a[ejs-ctrl-action], button[ejs-ctrl-action]', function(ev) {
            actionHandler(ev, $(this), $(this).attr('ejs-ctrl-action'))
        })

        $this.on('change', 'select[ejs-ctrl-action], input[ejs-ctrl-action]', function(ev) {
            actionHandler(ev, $(this), $(this).attr('ejs-ctrl-action'))
        })

        new object($scope);
    })
})