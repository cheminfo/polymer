'use strict';define(["modules/default/defaultview","src/util/util","BiojsSequence","BiojsTooltip"],function(a,b){"use strict";function c(){}return $.extend(!0,c.prototype,a,{init:function(){this.dom||(this._id=b.getNextUniqueId(),this.dom=$(` <div id="${this._id}"></div>`).css("height","100%").css("width","100%"),this.module.getDomContent().html(this.dom),this.resolveReady())},update:{sequence:function(a){this.sequence=a,this.render()},annotations:function(a){this.annotations=a,this.render()}},blank:{sequence:function(){},annotations:function(){}},render:function(){var a=this;if(this.clear(),!!this.sequence){var b=this.sequence+"",c=this.annotations||{},d=new window.Biojs.Sequence({sequence:b,target:this.dom.attr("id"),format:"CODATA",annotations:c.annotations,highlights:c.highlights});d.onSelectionChange(function(b){a.module.controller.onSequenceSelectionChanged(b)})}},resize:function(){this.render()},clear:function(){this.dom.html("")},inDom:function(){this.render()}}),c});