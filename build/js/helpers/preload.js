define(["jquery"],function(n){n.fn.preload=function(t){n.each(this,function(t){var i=this.toString();n.get(i,function(){n("<img/>")[0].src=i})}),"function"==typeof t&&t.call(this)}});