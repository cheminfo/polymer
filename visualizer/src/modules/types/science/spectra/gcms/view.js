"use strict";define(["jquery","modules/default/defaultview","src/util/datatraversing","lib/gcms/gcms","jcampconverter","src/util/color"],function(a,b,c,d,e,f){"use strict";function g(){}return a.extend(!0,g.prototype,b,{init:function(){var a=document.createElement("div"),b=document.createElement("div"),c=document.createElement("div");c.appendChild(a),c.appendChild(b),b.style.width="100%",b.style.height="100px",a.style.width="100%",a.style.height="250px",this.div1=a,this.div2=b,this.dom=c,this.module.getDomContent().html(c),this.resolveReady()},inDom:function(){var a=this,b=a=>{var b=this.module.getConfiguration(a);return f.array2rgba(b)},c=b("auccolor"),e=c.replace(/,[^,]+\)$/,", 0.3)");this.gcmsInstance=new d(this.div1,this.div2,{gcSize:this.module.getConfiguration("gcsize"),mainColor:b("maincolor"),roColor:b("rocolor"),aucColor:c,aucColorT:e,onMsFromAUCChange:function(b){a.module.controller.createDataFromEvent("onMSChange","ms",b)},MZChange:function(b){a.module.controller.sendActionFromEvent("onMZSelectionChange","mzList",b)},MSChangeIndex:function(b,c){a.module.controller.sendActionFromEvent("onMSIndexChanged","msIndex",b),a.module.controller.createDataFromEvent("onMSIndexChanged","msMouse",c)},onZoomGC:function(b,c){a.module.controller.sendActionFromEvent("onZoomGCChange","fromtoGC",[b,c]),a.module.controller.sendActionFromEvent("onZoomGCChange","centerGC",(c+b)/2)},onlyOneMS:!0})},unload:function(){this.dom.remove()},onResize:function(){this.gcmsInstance.resize(this.width,this.height)},blank:{jcamp(){this.gcmsInstance.blank()},jcampRO(){this.gcmsInstance.blankRO()}},update:{jcamp:function(a){a=a.get()+"",e.convert(a,{chromatogram:!0},!0).then(a=>{a.chromatogram&&a.chromatogram.series.ms&&(this.gcmsInstance.setGC(a.chromatogram),this.gcmsInstance.setMS(a.chromatogram.series.ms.data),this.module.controller.createDataFromEvent("onJCampParsed","msdata",a.chromatogram.series.ms.data),this.module.controller.createDataFromEvent("onJCampParsed","gcdata",a.chromatogram),this.jcamp=a.chromatogram)})},jcampRO:function(a){a=a.get()+"",e.convert(a,{chromatogram:!0},!0).then(a=>{a.chromatogram&&a.chromatogram.series.ms&&(this.gcmsInstance.setGCRO(a.chromatogram),this.gcmsInstance.setMSRO(a.chromatogram.series.ms.data))})},annotationgc:function(a){a&&(this.resetAnnotationsGC(),this.addAnnotations(a))}},getDom:function(){return this.dom},resetAnnotationsGC:function(){this.gcmsInstance&&this.gcmsInstance.killAllAUC()},addAnnotations:function(b){var a=this;b.map(function(b){var c=a.gcmsInstance.addAUC(b.from,b.to,b);c._originalSource=b}),this.annotations=b},onActionReceive:{fromtoGC:function(a){var b=a.from-.1*Math.abs(a.to-a.from),c=a.to+.1*Math.abs(a.to-a.from);this.gcmsInstance.getGC().getBottomAxis()._doZoomVal(b,c,!0),this.gcmsInstance.getGC().redraw(!0,!0,!1),this.gcmsInstance.getGC().drawSeries(),this.module.controller.sendActionFromEvent("onZoomGCChange","centerGC",(c+b)/2),this.gcmsInstance.updateIngredientPeaks()},fromtoMS:function(a){this.gcmsInstance.getMS().getBottomAxis()._doZoomVal(a.from,a.to,!0)},zoomOnAnnotation:function(a){(a.pos||a.pos2)&&(this.gcmsInstance.zoomOn(a.pos.x,a.pos2.x,a._max||!1),this.module.controller.sendActionFromEvent("onZoomGCChange","centerGC",(a.pos.x+a.pos2.x)/2),this.gcmsInstance.updateIngredientPeaks())},centerGC:function(b){var c=this.gcmsInstance.getGC().getBottomAxis(),a=c.getCurrentMin(),d=c.getCurrentMax(),e=Math.abs(d-a)/2;c._doZoomVal(b-e,b+e,!0),this.gcmsInstance.getGC().redraw(!0,!0,!1),this.gcmsInstance.getGC().drawSeries()},setMSIndexData:function(a){this.gcmsInstance.setMSIndexData(a)}}}),g});