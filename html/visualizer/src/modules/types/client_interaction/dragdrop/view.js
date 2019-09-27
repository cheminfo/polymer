'use strict';define(["modules/default/defaultview","src/util/ui"],function(a,b){"use strict";function c(){}function d(a){return new Promise(function(c){function d(a){if(f=a,h)return void e(f);if(navigator.mozGetUserMedia)l.mozSrcObject=f;else{var b=window.URL||window.webkitURL;l.src=b.createObjectURL(f)}l.play()}function i(){m.width=n,m.height=o,m.getContext("2d").drawImage(l,0,0,n,o),j=m.toDataURL("image/png")}g||(g=$("<div/>"),$("body").append(g));var j=null;g.html(a);var k=!1,l=document.querySelector("#video"),m=document.querySelector("#canvas"),n=320,o=0;navigator.getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,navigator.getMedia({video:!0,audio:!1},d,function(a){b.showNotification(a.message),g.dialog("close")}),l.addEventListener("canplay",function(){k||(o=l.videoHeight/(l.videoWidth/n),l.setAttribute("width",n),l.setAttribute("height",o),m.setAttribute("width",n),m.setAttribute("height",o),k=!0)},!1),h=!1,g.dialog({modal:!0,buttons:{Cancel:function(){$(this).dialog("close")},"Take Picture":function(){i(),c(j),$(this).dialog("close")}},close:function(){return f?(e(f),c(j)):c(!1)},width:400})})}function e(a){if(a){const b=a.getTracks();if(b)for(let a of b)a.stop()}}$.extend(!0,c.prototype,a,{init:function(){var a=this,b=$("<input/>").css("display","none").attr({type:"file",multiple:!0});this.canDropOrPaste=this.module.getConfigurationCheckbox("inputOptions","allowDrop")||this.module.getConfigurationCheckbox("inputOptions","allowPaste");var c=$("<textarea>").css({position:"absolute",top:0,left:0,height:0,width:0,opacity:0}),e=this.module.getConfiguration("label");if(this.messages={default:e,drag:this.module.getConfiguration("dragoverlabel")||e,hover:this.module.getConfiguration("hoverlabel"),fileSelect:this.module.getConfiguration("fileSelectLabel")},this.$messages=$("<div class=\"flex-container\">"),this.messageP=$("<div>").css("display","inline-block").css("font-size",this.module.getConfiguration("labelFontSize")).html(this.messages.default),this.dom=$("<div />",{class:this.canDropOrPaste?"content-zone dragdropzone":"content-zone"}).html(this.$messages).on("click mousemove",function(){c.focus()}).mouseout(function(){c.blur()}).append(c),this.module.getConfigurationCheckbox("inputOptions","allowPaste")&&c.on("paste",function(b){b.preventDefault(),b.stopPropagation(),a.module.controller.open(b.originalEvent.clipboardData)}),this.canDropOrPaste&&this.$messages.append(this.messageP),this.module.getConfigurationCheckbox("inputOptions","allowFileInput")&&this.module.getConfigurationCheckbox("inputOptions","showFileInputButton")){const a=$(`<button type="button" class="form-button blue"><i class="fa fa-file fa-lg"/>&nbsp; &nbsp; ${this.messages.fileSelect}</button>`);this.$messages.append(a),a.on("click",function(a){a.stopPropagation(),b.click()})}if(this.module.getConfigurationCheckbox("inputOptions","allowFileInput")&&this.dom.on("click",function(a){a.stopPropagation(),b.click()}),this.module.getConfigurationCheckbox("inputOptions","allowCamera")){const b=$("<button type=\"button\" class=\"form-button red\"><i class=\"fa fa-camera fa-lg\"/>&nbsp; &nbsp; Take picture</button>");this.$messages.append(b),b.on("click",function(b){b.stopPropagation(),d($("<video id=\"video\"></video><canvas id=\"canvas\" style=\"display:none;\"></canvas>")).then(function(b){!b||b&&a.module.controller.openPhoto(b)})})}b.on("change",function(b){a.module.controller.open(a.module.controller.emulDataTransfer(b))}),b.on("load",function(){}),this.module.getDomContent().html(this.dom)},inDom:function(){var a=this,b=this.dom.get(0),c=0;this.module.getConfigurationCheckbox("inputOptions","allowDrop")&&(b.addEventListener("dragenter",function(b){c++,b.stopPropagation(),b.preventDefault(),1===c&&(a.messageP.html(a.messages.drag),a.dom.addClass("dragdrop-over"))}),b.addEventListener("dragover",function(a){a.stopPropagation(),a.preventDefault()}),b.addEventListener("dragleave",function(b){c--,b.stopPropagation(),b.preventDefault(),c||(a.messageP.html(a.messages.default),a.dom.removeClass("dragdrop-over"))}),b.addEventListener("drop",function(b){c=0,b.stopPropagation(),b.preventDefault(),a.dom.removeClass("dragdrop-over"),a.messageP.html(a.messages.default),a.module.controller.open(b.dataTransfer)})),this.module.getConfigurationCheckbox("inputOptions","allowPaste")&&(b.addEventListener("mouseleave",function(b){b.stopPropagation(),b.preventDefault(),a.messageP.html(a.messages.default),a.dom.removeClass("dragdrop-over")}),b.addEventListener("mouseenter",function(b){b.stopPropagation(),b.preventDefault(),a.messageP.html(a.messages.hover),a.dom.addClass("dragdrop-over")})),this.resolveReady()}});var f,g,h=!0;return c});