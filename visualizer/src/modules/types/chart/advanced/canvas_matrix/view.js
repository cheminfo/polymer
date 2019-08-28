"use strict";define(["jquery","require","modules/default/defaultview","src/util/util","src/util/color","src/util/worker","components/jquery.threedubmedia/event.drag/jquery.event.drag"],function(a,b,c,d,e,f){"use strict";function g(){}return a.extend(!0,g.prototype,c,{init:function(){this.colors=null,this.canvas=document.createElement("canvas"),this.canvasContext=this.canvas.getContext("2d"),this.scaleCanvas=document.createElement("canvas"),this.scaleCanvasContext=this.scaleCanvas.getContext("2d"),this.scaleCanvas.width=40,this.canvasContainer=a("<div />").addClass("matrix-container"),this.scaleContainer=a("<div />").addClass("scale-container"),this.dom=a("<div />").addClass("canvasmatrix-container").append(this.canvasContainer.append(this.canvas)).append(this.scaleContainer.append(this.scaleCanvas)),this.module.getDomContent().html(this.dom),this.squareLoading=250,this.availableZooms=[1,2,3,4,5,6,7,8,9,10],this.buffers={};var b=this;b.accumulatedDelta=0,a(this.canvasContainer).on("mousewheel","canvas",function(c){c.preventDefault();var d=c.originalEvent.detail||c.originalEvent.wheelDelta;b.max&&0<d||b.min&&0>d||(b.accumulatedDelta+=d,void 0!==d&&b.changeZoom(b.accumulatedDelta/1e3,c.offsetX||c.pageX-a(c.target).offset().left,c.offsetY||c.pageY-a(c.target).offset().top))}).on("dblclick",function(c){b.accumulatedDelta=0,b.changeZoom(b.accumulatedDelta/1e3,c.offsetX||c.pageX-a(c.target).offset().left,c.offsetY||c.pageY-a(c.target).offset().top)}),a(this.canvasContainer).drag(function(a,c){a.preventDefault();var d=b.baseShift,e=b.getXYShift();e.x=d.x+c.deltaX,e.y=d.y+c.deltaY,b.doCanvasErase(),b.doCanvasRedraw(),b.launchWorkers(!0)}),a(this.canvasContainer).drag("start",function(c){c.preventDefault(),b.baseShift=a.extend({},b.getXYShift())})},inDom:function(){this.onResize(!0),this.initWorkers().then(this.resolveReady.bind(this)),this.module.controller.initEvents()},onResize:function(a){this.canvasContainer.width(this.width-55),this.canvas.width=this.canvasContainer.width(),this.canvas.height=this.height,a||(this.doCanvasErase(),this.doCanvasRedraw())},doCanvasErase:function(){this.redrawStarted=!1,this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height)},doCanvasRedraw:function(){for(var a=this.getBufferIndices(this.getPxPerCell()),b=a.minXIndexBuffer;b<=a.maxXIndexBuffer;b++)for(var c=a.minYIndexBuffer;c<=a.maxXIndexBuffer;c++)this.doCanvasDrawBuffer(b,c)},getBufferIndices:function(a){var b=this.getPxPerCell(),c=b/a,d=this.getXYShift(),e=0;0>d.x&&(e=Math.floor(-d.x/b/this.squareLoading));var f=0;0>d.y&&(f=Math.floor(-d.y/b/this.squareLoading));var g=Math.min(this.canvasNbX/this.squareLoading-1,(this.canvas.width-d.x)/a/this.squareLoading),h=Math.min(this.canvasNbY/this.squareLoading-1,(this.canvas.height-d.y)/a/this.squareLoading),i={minXIndexBuffer:e,minYIndexBuffer:f,maxXIndexBuffer:Math.ceil(g),maxYIndexBuffer:Math.ceil(h)};if(b>a){var j=Math.ceil(this.canvasNbX/this.squareLoading)-1,k=Math.ceil(this.canvasNbY/this.squareLoading)-1,l=i.maxXIndexBuffer-i.minXIndexBuffer,m=i.maxYIndexBuffer-i.minYIndexBuffer;i.minXIndexBuffer=Math.floor(Math.max(0,i.minXIndexBuffer-l*(c-1))),i.maxXIndexBuffer=Math.floor(Math.min(j,i.maxXIndexBuffer+l*(c-1)-1)),i.minYIndexBuffer=Math.floor(Math.max(0,i.minXIndexBuffer-m*(c-1))),i.maxYIndexBuffer=Math.floor(Math.min(k,i.maxYIndexBuffer+m*(c-1)-1))}return i},getBufferKey:function(a,b,c){return`${a}-${b}-${c}`},doCanvasDrawBuffer:function(a,b){var c=this.getXYShift(),d=this.getPxPerCell(),e=this.getBufferKey(d,a,b);this.buffers[e]&&this.canvasContext.putImageData(this.buffers[e],a*this.squareLoading*d+c.x,b*this.squareLoading*d+c.y)},getPxPerCell:function(a){return this.pxPerCell&&!a?this.pxPerCell:(this.pxPerCell=this.getOriginalPxPerCell(),this.resetZoomPrefetch(this.pxPerCell),this.pxPerCell)},resetZoomPrefetch:function(){var a,b,c;for(b=0;b<this.availableZooms.length;b++)if(this.availableZooms[b]==this.pxPerCell){a=b;break}var d=this.availableZooms.slice(a-2,a).reverse(),e=this.availableZooms.slice(a+1,a+3);for(this.availableZoomsForFetch=[],b=0,c=d.length+e.length;b<c;b++)b%2&&0<d.length||0==e.length?this.availableZoomsForFetch.push(d.shift()):this.availableZoomsForFetch.push(e.shift())},getOriginalPxPerCell:function(){return this.getClosest(this.availableZooms,Math.max(1,Math.min(this.canvas.width/this.canvasNbX,this.canvas.height/this.canvasNbY)))},getClosest:function(a,b){for(var c=!1,d=0;d<a.length;d++)(!c||0>a[d]-b&&b-a[d]<b-c)&&(c=a[d]);return c},changeZoom:function(a,b,c){var d=Math.max(1,this.getClosest(this.availableZooms,this.getOriginalPxPerCell()+this.tanh(a)));if(this.pxPerCell!=d){var e=d/this.pxPerCell,f=this.getXYShift();f.x=b-(b-f.x)*e,f.y=c-(c-f.y)*e,this.pxPerCell=d,this.pxPerCell==this.availableZooms[this.availableZooms.length-1]?(this.max=!0,this.min=!1):this.pxPerCell==this.availableZooms[0]?(this.min=!0,this.max=!1):(this.min=!1,this.max=!1),this.doCanvasErase(),this.launchWorkers(!0),this.doCanvasRedraw()}},tanh:function(a){return a/=15,2.5*this.availableZooms[this.availableZooms.length-1]*a},getXYShift:function(){if(this.xyShift&&!isNaN(this.xyShift.x)&&!isNaN(this.xyShift.y))return this.xyShift;var a=this.getPxPerCell(),b=a*this.canvasNbX,c=a*this.canvasNbY;return this.xyShift={x:Math.floor((this.canvas.width-b)/2),y:Math.floor((this.canvas.height-c)/2)},this.xyShift},blank:{matrix:function(){this.doCanvasErase(),this.gridData=[],this.canvasNbX=0,this.canvasNbY=0}},update:{matrix:function(a){this.canvas&&(a=a.get(),this.gridData=a.data?a.data:a,this.canvasNbX=this.gridData[0].length,this.canvasNbY=this.gridData.length,this.minmaxworker.postMessage(JSON.stringify(this.gridData)))}},initWorkers:function(){var a=f(b.toUrl("src/util/workers/getminmaxmatrix.js")),c=f(b.toUrl("./worker.js")),d=this;return Promise.all([a,c]).then(function(a){var b=a[0];b.addEventListener("message",function(a){d.minValue=a.data.min,d.maxValue=a.data.max,d.doChangeWorkersData(),d.buffers=[],d.buffersDone=[],d.getHighContrast()||(d.minValue=0,d.maxValue=1),d.redoScale(d.minValue,d.maxValue),d.launchWorkers(!0)}),d.minmaxworker=b;var c=a[1];c.postMessage({title:"init",message:{colors:d.getColors(),squareLoading:d.squareLoading,highcontrast:d.getHighContrast()}}),c.addEventListener("message",function(a){var b=a.data,c=b.pxPerCell,e=b.indexX,f=b.indexY;d.buffers[d.getBufferKey(c,e,f)]=b.data,d.getPxPerCell()==c&&d.doCanvasDrawBuffer(e,f),d.launchWorkers()}),d.workers=c})},getCurrentPxPerCellFetch:function(){return this.currentPxFetch?this.currentPxFetch:this.currentPxFetch=this.getPxPerCell()},incrementPxPerCellFetch:function(){return this.currentPxFetch=this.availableZoomsForFetch.shift(),this.currentPxFetch},launchWorkers:function(a){var b;this.cachedPxPerCell=this.pxPerCell,a?(b=this.getPxPerCell(),this.resetZoomPrefetch(b),this.pxPerCell=this.cachedPxPerCell):b=this.getCurrentPxPerCellFetch(),!this.postNextMessageToWorker(b)&&this.incrementPxPerCellFetch()&&this.launchWorkers()},postNextMessageToWorker:function(a){for(var b=this.getBufferIndices(a),c=b.minXIndexBuffer;c<=b.maxXIndexBuffer;c++)for(var d,e=b.minYIndexBuffer;e<=b.maxYIndexBuffer;e++)if(d=this.getBufferKey(a,c,e),"undefined"==typeof this.buffers[d])return this.doPostNextMessageToWorker(a,c,e),!0;var f=Math.ceil(this.canvasNbX/this.squareLoading)-1,g=Math.ceil(this.canvasNbY/this.squareLoading)-1;return!1},doPostNextMessageToWorker:function(a,b,c){if(!this.buffers[this.getBufferKey(a,b,c)]){var d=this.squareLoading,e=this.squareLoading;(b+1)*this.squareLoading>this.canvasNbX&&(d=this.canvasNbX%this.squareLoading),(c+1)*this.squareLoading>this.canvasNbY&&(e=this.canvasNbY%this.squareLoading),this.buffers[this.getBufferKey(a,b,c)]=this.canvasContext.createImageData(d*a,e*a)}this.workers.postMessage({title:"doPx",message:{pxPerCell:a,indexX:b,indexY:c,buffer:this.buffers[this.getBufferKey(a,b,c)],nbValX:d}})},doChangeWorkersData:function(){this.workers.postMessage({title:"changeData",message:{data:JSON.stringify(this.gridData),min:this.minValue,max:this.maxValue}})},getColors:function(){if(!this.colors){var a=this.module.getConfiguration("colors");a?(1===a.length&&a.push([255,255,255,1]),this.colors=a):this.colors=[[0,0,0,1],[255,255,255,1]]}return this.colors},getHighContrast:function(){return this.highContrast||(this.highContrast=this.module.getConfiguration("highContrast",!1))},redoScale:function(a,b){var c=this.getColors();this.scaleCanvas.height=this.scaleContainer.height()-20,this.scaleCanvas.width=40;for(var d=this.scaleCanvas.height-30,f=(b-a)/(c.length-1),g=d/(c.length-1),h=this.scaleCanvasContext.createLinearGradient(0,0,0,d),j=0;j<c.length;j++)h.addColorStop(j/(c.length-1),e.getColor(c[j])),this.scaleCanvasContext.fillText(Math.round(100*(j*f+a))/100+"",5,0>=g*j?15:g*j-5);this.scaleCanvasContext.fillStyle=h,this.scaleCanvasContext.fillRect(28,5,10,d)},erase:function(){this.dom.remove(),this.highContrast=!1,this.colors=!1,this.workers.terminate(),this.workers=[],this.buffers=[]}}),g});