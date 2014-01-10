/**
 * Created by Andrei Ermicioi on 11/27/13.
 */

var JQScopeObject = {
    id: null,
    name: null,
    node: null,

    one: function(name) {
        return this.node.find('[name="'+ name +'"]').first()
    },

    multi: function(name) {
        return this.node.find('[name="'+ name +'"]')
    },

    all: function(name) {
        return this.node.find('[name="'+ name +'[]"]')
    }
}

$(document).ready(function() {
    $('[id]').each(function() {
        window['$' + $(this).attr('id')] = $(this)
    })

    $('[jq-controller]').each(function() {
        var $this = $(this)
        var $scope = $.extend(true, JQScopeObject, {
            id:     $this.attr('jq-id'),
            name:   $this.attr('jq-controller'),
            node:   $this
        })

        if ($this.attr('jq-id')) {
            window['jq' + $this.attr('jq-id')] = $scope
        }

        var tokens = $this.attr('jq-controller').split('.')
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

        $this.on('click', '[jq-click]', function(ev) {
            actionHandler(ev, $(this), $(this).attr('jq-click'))
        })
        $this.on('change', '[jq-change]', function(ev) {
            actionHandler(ev, $(this), $(this).attr('jq-change'))
        })
        $this.on('change', 'select[jq-action], input[jq-action]', function(ev) {
            actionHandler(ev, $(this), $(this).attr('jq-action'))
        })

        new object($scope);
    })

})