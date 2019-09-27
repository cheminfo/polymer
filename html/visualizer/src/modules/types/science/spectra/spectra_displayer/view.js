'use strict';function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}function _arrayWithHoles(a){if(Array.isArray(a))return a}define(["jquery","modules/default/defaultview","jsgraph","json-chart","src/util/api","src/util/color","src/util/debug","src/util/util"],function(a,b,c,d,e,f,g,h){"use strict";function i(){}function j(a,b){if(Array.isArray(a)){var c,d,e,f=1/0,g=-Infinity,h=20;if("number"==typeof a[0]){if(a.length<2*h-1)return"discrete";for(d=0,e=a.length-2;d<e;d+=2)c=a[d+2]-a[d],c>g&&(g=c),c<f&&(f=c)}else if(Array.isArray(a[0])&&2===a.length){if("automass"===b)return k({x:a[0],y:a[1]})?"continuous":"discrete";if(a[0].length<h)return"discrete";for(let b=0;b<a[0].length-1;b++)c=a[0][b+1]-a[0][b],c>g&&(g=c),c<f&&(f=c)}else{if(a.length<h)return"discrete";for(d=0,e=a.length-1;d<e;d++)c=a[d+1][0]-a[d][0],c>g&&(g=c),c<f&&(f=c)}return .9>Math.abs(f/g)?"discrete":"continuous"}}function k(a){let b=a.x,c=a.y;if(100>b.length)return!1;else{let a=b[1]-b[0];for(let d=0;d<b.length-1;d++){let e=b[d+1]-b[d],f=e/a;if((.1<Math.abs(e)||.5>f||2<f)&&0!==c[d]&&0!==c[d+1])return!1;a=e}}return!0}const l={shape:"circle",cx:0,cy:0,r:3,height:"5px",width:"5px",stroke:"transparent",fill:"black"},m={x:"xAxis",y:"yAxis",xy:"both"};return a.extend(!0,i.prototype,b,{init(){this.series={},this.seriesDrawn={},this.annotations={},this.dom=a("<div />"),this.module.getDomContent().html(this.dom),this.seriesActions=[],this.colorId=0,this.colors=["red","blue","green","black"],this.deferreds={},this.onchanges={},this.highlightOptions=Object.assign({fill:"black"},h.evalOptions(this.module.getConfiguration("highlightOptions"))),this.serieHiddenState=new Map},inDom(){var b=new Promise(b=>{var d=this.module.getConfiguration,e=this.module.getConfigurationCheckbox,f=d("graphurl");if(f)a.getJSON(f,{},a=>{a.options.onMouseMoveData=(a,b)=>{this.module.controller.sendAction("mousetrack",b)},b(new c(this.dom.get(0),a.options,a.axis))});else{var g={close:{top:!1,right:!1,bottom:!1,left:!1},plugins:{},mouseActions:[]};g.plugins.drag={},g.mouseActions.push({plugin:"drag",shift:!0,ctrl:!1});var h=d("zoom");let a;if(a="x"===h?"gradualX":"y"===h?"gradualY":"gradualXY",g.plugins.zoom={},g.mouseActions.push({plugin:"zoom",type:"dblclick",options:{mode:"total"}}),g.mouseActions.push({plugin:"zoom",type:"dblclick",shift:!0,options:{mode:a}}),g.plugins.peakPicking={},h&&"none"!==h){var i={};i.zoomMode="x"===h?"x":"y"===h?"y":"xy",e("independantYZoom","yes")&&(i.axes="serieSelected"),g.plugins.zoom=i,g.mouseActions.push({plugin:"zoom",shift:!1,ctrl:!1})}var j=d("wheelAction");if(j&&"none"!==j){var k={baseline:"zoomYMousePos"==j?"mousePosition":d("wheelbaseline",0)};k.direction="zoomX"===j?"x":"y",g.mouseActions.push({plugin:"zoom",type:"mousewheel",options:k})}g.mouseActions.push({callback:(a,b)=>{this.module.controller.sendActionFromEvent("onMouseWheel","mouseEvent",b),this.module.controller.sendActionFromEvent("onMouseWheel","wheelDelta",a)},type:"mousewheel"}),g.mouseActions.push({callback:(a,b)=>{this.module.controller.sendActionFromEvent("onMouseWheelShift","mouseEvent",b),this.module.controller.sendActionFromEvent("onMouseWheelShift","wheelDelta",a)},shift:!0,type:"mousewheel"});const f=e("mouseTracking","track");f&&(g.mouseMoveData=!0,g.mouseMoveDataOptions={useAxis:d("trackingAxis")});const s=e("selectScatter","yes");s&&(g.plugins.selectScatter={},g.mouseActions.push({plugin:"selectScatter",alt:!0}));var l={nbTicksPrimary:d("xnbTicksPrimary",5)};"timestamptotime"==d("xaxismodification")?l.type="time":"valtotime"==d("xaxismodification")?l.unitModification="time":"valtotime:min.sec"==d("xaxismodification")&&(l.unitModification="time:min.sec"),g.mouseMoveDataOptions={useAxis:d("trackingAxis")};var m=new c(this.dom.get(0),g,{bottom:[l]});this.graph=m;var n=m.getXAxis(0,l);this.xAxis=n,n.flip(d("flipX",!1)).setPrimaryGrid(d("vertGridMain",!1)).setSecondaryGrid(d("vertGridSec",!1)).setPrimaryGridColor("#DADADA").setSecondaryGridColor("#F0F0F0").setGridLinesStyle().setLabel(d("xLabel","")).forceMin(d("minX",!1)).forceMax(d("maxX",!1)).setAxisDataSpacing(d("xLeftSpacing",0),d("xRightSpacing",0)),d("displayXAxis",!0)||n.hide();const t=a=>{let b=_slicedToArray(a,2),c=b[0],d=b[1];this.module.model.setXBoundaries(c,d)};n.on("zoom",t).on("zoomOutFull",t),e("FitYToAxisOnFromTo","rescale")&&n.on("zoom",function(){o.scaleToFitAxis(this)}),this.numberOfYAxes=0;var o=this.getYAxis(0);this.yAxis=o;var p=d("legend","none");if("none"!==p){var q=m.makeLegend({backgroundColor:"rgba( 255, 255, 255, 0.8 )",frame:!0,frameWidth:"1",frameColor:"rgba( 100, 100, 100, 0.5 )",movable:e("legendOptions","movable"),isSerieHideable:e("legendOptions","isSerieHideable"),isSerieSelectable:e("legendOptions","isSerieSelectable")});q.setAutoPosition(p)}if(f){const a={useAxis:d("trackingAxis"),mode:"individual"},b=e("mouseTracking","legend");b&&Object.assign(a,{legend:!0,legendType:"common"}),m.trackingLine(a),m.on("mouseMoveData",(a,b)=>{this.module.model.trackData=b,this.module.controller.sendActionFromEvent("onTrackMouse","trackData",b),this.module.controller.sendActionFromEvent("onTrackMouse","mouseEvent",a),this.module.controller.sendActionFromEvent("onTrackMouse","dataAndEvent",{data:b,event:a}),this.module.controller.createDataFromEvent("onTrackMouse","trackData",b)}),m.on("click",a=>{this.module.model.trackData&&(this.module.controller.sendActionFromEvent("onTrackClick","trackData",this.module.model.trackData),this.module.controller.sendActionFromEvent("onTrackClick","mouseEvent",a[3]),this.module.controller.sendActionFromEvent("onTrackClick","dataAndEvent",{data:this.module.model.trackData,event:a[3]}),this.module.controller.createDataFromEvent("onTrackClick","trackData",this.module.model.trackData))})}if(s){var r=m.getPlugin("selectScatter");r.on("selectionEnd",a=>{const b=r.options.serie;var c=[],d=b.infos;d&&(c=a.map(a=>d[a])),this.module.controller.onScatterSelection(c)})}m.draw(!0),b(m)}});b.then(a=>{this.graph=a,this.xAxis=a.getXAxis(0),this.yAxis=a.getYAxis(0),a.on("shapeMouseOver",a=>{this.module.controller.createDataFromEvent("onMouseOverShape","shapeProperties",a.getProperties()),this.module.controller.createDataFromEvent("onMouseOverShape","shapeInfos",a.getData()),e.highlight(a.getData(),1)}),a.on("shapeMouseOut",a=>{e.highlight(a.getData(),0)}),a.on("shapeResized",a=>{this.module.model.dataTriggerChange(a.getData())}),a.on("shapeMoved",a=>{this.module.model.dataTriggerChange(a.getData())}),a.on("shapeClicked",a=>{this.module.controller.createDataFromEvent("onShapeClick","shapeProperties",a.getProperties()),this.module.controller.createDataFromEvent("onShapeClick","shapeInfos",a.getData()),this.module.controller.sendActionFromEvent("onShapeClick","shapeInfos",a.getData()),this.module.controller.sendActionFromEvent("onShapeClick","dataAndEvent",{data:a.getData(),event:event})}),a.on("shapeSelected",a=>{this.module.controller.sendActionFromEvent("onShapeSelect","selectedShape",a.getData())}),a.on("shapeUnselected",a=>{this.module.controller.sendActionFromEvent("onShapeUnselect","shapeInfos",a.getData())}),this.onResize(),this.resolveReady()}).catch(a=>{g.error("Error loading the graph",a)})},getYAxis(a){if(this.numberOfYAxes>a)return this.graph.getYAxis(a);for(var b,c,d=this.module.getConfiguration,e=this.numberOfYAxes;e<=a;e++){if(c={nbTicksPrimary:d("ynbTicksPrimary",5)},b=this.graph.getYAxis(e,c),0===e){b.setPrimaryGrid(d("horGridMain",!1)).setSecondaryGrid(d("horGridSec",!1)).setPrimaryGridColor("#DADADA").setSecondaryGridColor("#F0F0F0").setGridLinesStyle().setLabel(d("yLabel","")),d("displayYAxis",!0)||b.hide();const a=a=>{let b=_slicedToArray(a,2),c=b[0],d=b[1];this.module.model.setYBoundaries(c,d)};b.on("zoom",a).on("zoomOutFull",a)}else b.setPrimaryGrid(!1).setSecondaryGrid(!1).setGridLinesStyle().hide();b.flip(d("flipY",!1)).forceMin(d("minY",!1)).forceMax(d("maxY",!1)).setAxisDataSpacing(d("yBottomSpacing",0),d("yTopSpacing",0)),this.numberOfYAxes++}return b},onResize(){this.graph&&this.graph.resize(this.width,this.height)},shouldAutoscale(a){return!this.seriesDrawn[a]&&(this.seriesDrawn[a]=!0,!0)},redraw(a,b){var c;a?c="both":(c=this.module.getConfiguration("fullOut"),b&&"once"===c&&(this.shouldAutoscale(b)?c="both":c="none")),this.fullOut(c)},fullOut(a){"both"===a?this.graph.autoscaleAxes():"xAxis"===a?this.xAxis.setMinMaxToFitSeries():"yAxis"===a?this.yAxis.setMinMaxToFitSeries():void 0,this.graph.draw(),this.graph.updateLegend();var b=this.xAxis.getCurrentMin(),c=this.xAxis.getCurrentMax(),d=this.yAxis.getCurrentMin(),e=this.yAxis.getCurrentMax();this.module.model.setXBoundaries(b,c),this.module.model.setYBoundaries(d,e)},getSerieOptions(a,b,c){let d=this.module.getConfiguration("plotinfos"),f={},g={trackMouse:!0};if(b=b||[],d)for(var h=0,k=d.length;h<k;h++)if(a==d[h].variable){var l=d[h].plotcontinuous;l.startsWith("auto")&&(l=j(c,l)),d[h].markers[0]&&(g.markersIndependent=!1),g.lineToZero="discrete"==l,g.strokeWidth=parseInt(d[h].strokewidth,10);var m=d[h].peakpicking[0];m&&(f.peakPicking=!0)}return g.onMouseOverMarker=(a,c,d)=>{e.highlightId(b[a],1),this.module.controller.onMouseOverMarker(d,c)},g.onMouseOutMarker=(a,c,d)=>{e.highlightId(b[a],0),this.module.controller.onMouseOutMarker(d,c)},g.onToggleMarker=(a,b,c)=>{this.module.controller.onClickMarker(a,b,c)},g.overflowY=this.module.getConfigurationCheckbox("overflow","overflowY"),g.overflowX=this.module.getConfigurationCheckbox("overflow","overflowX"),{options:g,others:f}},setSerieParameters(a,b,c,d){var g=this.module.getConfiguration("plotinfos");const h=this.module.getConfiguration("stackVerticalSpacing");var j=!1;if(a.autoAxis(),a.hidden=!!this.serieHiddenState.get(b),g){const c=new Set;for(var k of g)c.add(k.axis?+k.axis:0);const e=Math.min(...c),i=c.size||1;for(var m=0,n=g.length;m<n;m++)if(b==g[m].variable){j=!0;const b=(g[m].axis?+g[m].axis:0)-e;var l=this.getYAxis(b);if(l.setSpan(b*h||0,1-h*(i-1-b)),a.setYAxis(l),g[m].adaptTo&&"none"!==g[m].adaptTo+""){var o=this.getYAxis(+g[m].adaptTo);l.adaptTo(o,0,0)}var p=d?d:g[m].plotcolor;a.setLineColor(f.getColor(p),!1,!0);var q=parseFloat(g[m].strokewidth);isNaN(q)&&(q=1),a.setLineWidth(q),a.setLineStyle(parseInt(g[m].strokestyle,10)||1,!1,!0),g[m].markers[0]&&a.showMarkers&&(a.showMarkers(),a.setMarkers([{type:parseInt(g[m].markerShape,10),zoom:g[m].markerSize,strokeColor:f.getColor(p),fillColor:f.getColor(p),points:"all"}])),g[m].degrade&&a.degrade(g[m].degrade),g[m].tracking&&"yes"===g[m].tracking[0]&&a.allowTrackingLine({useAxis:this.module.getConfiguration("trackingAxis")})}}j||a.setYAxis(this.getYAxis(0)),c&&e.listenHighlight({_highlight:c},(b,d)=>{for(var e,f=0,g=d.length;f<g;f++){e=d[f];for(var h,l=0,m=c.length;l<m;l++)if(h=c[l],Array.isArray(h))for(var n=0;n<h.length;n++)h[n]==e&&a.toggleMarker(l,!!b,!0);else h==e&&a.toggleMarker(l,!!b,!0)}},!1,this.module.getId())},registerSerieEvents(a,b){a.on("hide",()=>{this.serieHiddenState.set(b,!0)}),a.on("show",()=>{this.serieHiddenState.set(b,!1)})},blank:{xyArray(a){this.removeSerie(a)},xArray(a){this.removeSerie(a)},series_xy1d(a){this.removeSerie(a)},jcamp(a){this.removeSerie(a)},chart(a){this.removeSerie(a)},annotations(a){this.removeAnnotations(a)}},update:{chart(a,b){this.series[b]=this.series[b]||[],this.removeSerie(b),a=d.check(a.get());var e=new Set,g=a.data;for(let d=0;d<g.length;d++){var h=g[d];0==d&&a.axis&&(a.axis[h.xAxis]&&this.xAxis.setLabel(a.axis[h.xAxis].label),a.axis[h.yAxis]&&this.yAxis.setLabel(a.axis[h.yAxis].label));var k=h.defaultStyle||{},m=h.defaultStyles||{},n=b;e.has(n)&&(n+=`-${d}`),e.add(n);var o=h.label||n,p=[],q=[],r=[];switch(h.type+""){case"zone":if(h.yMin&&h.yMax)for(var s=0,i=h.yMax.length;s<i;s++)p.push(h.x?h.x[s]:s),p.push(h.yMin[s],h.yMax[s]);break;case"contour":p=h.contourLines;break;default:if(h.y)for(var s=0,i=h.y.length;s<i;s++)q.push(h.x?h.x[s]:s),r.push(h.y[s]);}var t=(h.type||"line")+"";"color"==t&&(t="line.color");var u=!1;Array.isArray(h.color)&&(u=!0,t="line.color");let j=this.getSerieOptions(b,h._highlight,[q,r]);var v=this.graph.newSerie(n,j.options,t);if(this.registerSerieEvents(v,n),j.others.peakPicking&&this.graph.getPlugin("peakPicking").setSerie(v),!v)throw new Error(`The serie of type ${t} was not created !`);if(v.setLabel(o),"line"==t||null==t||"scatter"==t||"line.color"==t){var w=c.newWaveform();w.setData(r,q),this.normalize(w,b),j.useSlots&&w.aggregate(),v.setWaveform(w);for(let a of["selected","unselected"]){let b=Object.assign({lineWidth:"selected"===a?2:1,lineColor:"black",lineStyle:0},"unselected"===a?k:void 0,(m||{})[a],"unselected"===a?h.style:void 0,(h.styles||{})[a]);v.setStyle(b,a)}}else v.setData(p);if(u){let a=h.color;if(!Array.isArray(a))throw new Error("Serie colors must be an array");v.setColors(a)}if(h.info&&(v.infos=h.info),v.autoAxis(),"scatter"==t){let a=[];Array.isArray(h.styles)?a=h.styles:"object"==typeof h.styles&&(a=h.styles);let b=new Set(Object.keys(m).concat(Object.keys(a)));for(const c of b)v.setMarkerStyle(Object.assign({},l,k,m[c]||{}),a[c]||[],c);if(this.module.getConfigurationCheckbox("selectScatter","yes")){var x=this.graph.getPlugin("selectScatter");console.log("xxxxx",v),x.setSerie(v)}}else if(h.style)v.setStyle(h.style);else{var y=k.lineColor||(1<g.length?f.getNextColorRGB(d,g.length):null);this.setSerieParameters(v,b,h._highlight,y)}this.series[b].push(v)}this.redraw(!1,b)},xyArray(a,b){if(this.series[b]=this.series[b]||[],this.removeSerie(b),!!a){let f=a.get(),g=this.getSerieOptions(b,null,f),h=this.graph.newSerie(b,g.options);this.registerSerieEvents(h,b),g.others.peakPicking&&this.graph.getPlugin("peakPicking").setSerie(h);let i=[],j=[],k=c.newWaveform();for(var d=0,e=f.length;d<e;d+=2)i.push(f[d]),j.push(f[d+1]);k.setData(j,i),this.normalize(k,b),g.useSlots&&k.aggregate(),h.setWaveform(k),this.setSerieParameters(h,b),this.series[b].push(h),this.redraw(!1,b)}},xArray(a,b){var d=a.get();this.series[b]=this.series[b]||[],this.removeSerie(b);var e=this.module.getConfiguration("minX",0),f=this.module.getConfiguration("maxX",d.length-1),g=(f-e)/(d.length-1),h=c.newWaveform();h.setData(d),h.rescaleX(e,(f-e)/(d.length-1));let i=this.getSerieOptions(b,null,[null,[d]]);var j=this.graph.newSerie(b,i.options);this.registerSerieEvents(j,b),i.others.peakPicking&&this.graph.getPlugin("peakPicking").setSerie(j),this.normalize(h,b),i.useSlots&&h.aggregate(),j.setWaveform(h),this.setSerieParameters(j,b),this.series[b].push(j),this.redraw(!1,b)},annotations(a,b){this.annotations[b]=this.annotations[b]||[];const c=a.get();for(let d,f=0;f<c.length;f++){d=c[f],d.selectOnClick=!0;let a=this.graph.newShape(d.type+"",d,!1,d.properties);if(!a)return;this.annotations[b][f]=a,a.autoAxes(),e.listenHighlight(d,b=>{b?a.highlight(this.highlightOptions):a.unHighlight()},!1,this.module.getId()+b),this.module.model.dataListenChange(c.traceSync([f]),()=>{a.redraw()},"annotations"),a.draw(),a.redraw()}},jcamp(b,d){function e(a){if("rejected"!=h.state()){if(g.deferreds[d]=!1,g.series[d]=g.series[d]||[],g.series[d]=[],a.contourLines)f=g.graph.newSerie(d,g.getSerieOptions(d).options,"contour"),g.registerSerieEvents(f,d),f.setData(a.contourLines),g.setSerieParameters(f,d),g.series[d].push(f);else{a=a.spectra;for(var b,e=0,j=a.length;e<j;e++){b=a[e].data[a[e].data.length-1];let h=[],i=[];if(b.x&&b.y)h=b.x,i=b.y;else if(Array.isArray(b[0]))h=b[0],i=b[1];else for(var e=0;e<b.length;e+=2)h.push(b[e]),i.push(b[e+1]);let j=g.getSerieOptions(d,null,b);f=g.graph.newSerie(d,j.options),g.registerSerieEvents(f,d),j.others.peakPicking&&g.graph.getPlugin("peakPicking").setSerie(f);var k=c.newWaveform();k.setData(i,h),g.normalize(k,d),j.useSlots&&k.aggregate(),f.setWaveform(k),g.setSerieParameters(f,d),g.series[d].push(f);break}}g.redraw(!1,d)}}var f,g=this;if(this.graph){this.deferreds[d]&&this.deferreds[d].reject(),this.deferreds[d]=a.Deferred();var h=this.deferreds[d],i=b._options||{},j=b.get(),k=DataObject.getType(j);"string"===k?require(["jcampconverter"],a=>{a.convert(j+"",i,!0).then(e)}):e(j)}},series_xy1d(a,b){require(["src/util/color"],c=>{for(var d=c.getDistinctColors(a.length),e=0,f=a.length;e<f;e++){var g=this.getSerieOptions(b,null,a[e].data),h=this.graph.newSerie(a[e].name,g.options);this.graph.registerSerieEvents(h,a[e].name),h.autoAxis(),this.series[b].push(h),a[e].data&&h.setData(a[e].data),h.setLineWidth(a[e].lineWidth||g.strokeWidth||1),h.setLineColor(a[e].lineColor||`rgb(${d[e].join()})`,!1,!0),h.setLineWidth(3,"selected"),h.extendStyles()}this.redraw()})}},setOnChange(a,b,c){this.onchanges[b]&&this.onchanges[b].obj.unbindChange(this.onchanges[b].id),this.onchanges[b]={obj:c,id:a}},removeAnnotations(a){if(e.killHighlight(this.module.getId()+a),this.annotations[a])for(var b=0;b<this.annotations[a].length;b++)this.annotations[a][b]&&this.annotations[a][b].kill();this.annotations[a]=[]},removeSerie(a){if(this.series[a])for(var b=0;b<this.series[a].length;b++)this.series[a][b].kill(!0);this.series[a]=[]},makeSerie(a,b,c){var d=this.graph.newSerie(a.name);this.registerSerieEvents(d,a.name),a.onChange(()=>{d.setData(a.data),this.graph.draw()}),this.onActionReceive.removeSerieByName.call(this,a.name||{}),d.setData(a.data),this.seriesActions.push([b,d,a.name]),this.setSerieParameters(d,c),a.lineColor&&d.setLineColor(a.lineColor,!1,!0),a.lineWidth&&d.setLineWidth(a.lineWidth),this.redraw()},onActionReceive:{fromToX(a){this.xAxis.zoom(a.from,a.to),this.graph.draw()},fromToY(a){this.yAxis.zoom(a.from,a.to),this.graph.draw()},addSerie(a){if(this.colorId++,a.name)this.makeSerie(a,a,a.name);else for(var b in a)this.makeSerie(a[b],a)},removeSerie(a){for(var b=0,c=this.seriesActions.length;b<c;b++)this.seriesActions[b][0]==a&&(this.seriesActions[b][1].kill(),this.seriesActions.splice(b,1))},removeSerieByName(a){for(var b=0;b<this.seriesActions.length;b++)this.seriesActions[b][2]==a&&(this.seriesActions[b][1].kill(),this.seriesActions.splice(b,1),b--)},selectSerie(a){const b=this.graph.getSerie(a.valueOf());b&&b.select("selected")},unselectSerie(a){const b=this.graph.getSerie(a.valueOf());b&&b.unselect()},toggleGrid(){let a=!this.xAxis.options.primaryGrid;this.xAxis.setPrimaryGrid(a),this.xAxis.setSecondaryGrid(a),this.yAxis.setPrimaryGrid(a),this.yAxis.setSecondaryGrid(a),this.graph.redraw()},fullOut(a){this.fullOut(m[a+""])},exportSVG(){this.doSVGExport()}},doSVGExport(){const a=this.getSVGString();a&&this.module.controller.exportSVG(a)},getSVGElement(){const a=this.dom.find("svg");return a[0]},getSVGString(){const a=new XMLSerializer,b=this.getSVGElement();return b?"<?xml version=\"1.0\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">"+a.serializeToString(b):void 0},normalize(a,b){var c,d,e=this.module.getConfiguration("plotinfos");if(e){var f="";for(c=0,d=e.length;c<d;c++)b==e[c].variable&&(f=e[c].normalize);f&&a.normalize(f)}}}),i});