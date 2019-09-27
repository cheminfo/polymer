'use strict';define(["require","modules/default/defaultview","src/util/util","src/util/api","src/util/domdeferred","src/util/datatraversing","src/util/typerenderer","jqgrid"],function(require,Default,Util,API,DomDeferred,Traversing,Renderer,JQGrid){"use strict";function View(){}function getIDForCell(a,b){return`${a}_${b}`.replace(/[^\w\d_]/g,"_")}return Util.loadCss("components/jqgrid_edit/css/ui.jqgrid.css"),$.extend(!0,View.prototype,Default,{init:function(){var lastTr,that=this,actionsOut=this.module.actions_out();if(actionsOut)for(var i=0;i<actionsOut.length;i++)("onToggleOn"===actionsOut[i].event||"onToggleOff"===actionsOut[i].event)&&(this.hasToggleAction=!0);this.uniqId=`${Util.getNextUniqueId()}_`,this.dom=$("<div class=\"ci-displaylist-list\"></div>"),this.domTable=$("<table />").attr("id",this.uniqId).css({width:"100%"}),this.dataSize=0,this.currentPage=1,this.dom.on("mouseover","tr.jqgrow",function(a){that.module.getConfigurationCheckbox("highlightLine","Yes")&&$(this).addClass("ci-highlight"),this!==lastTr&&that.module.controller.lineHover(that.elements,$(this).attr("id").replace(that.uniqId,"")),lastTr=a.currentTarget}).on("mouseout","tr.jqgrow",function(){that.module.getConfigurationCheckbox("highlightLine","Yes")&&$(this).removeClass("ci-highlight"),this===lastTr&&(that.module.controller.lineOut(that.elements,$(this).attr("id").replace(that.uniqId,"")),lastTr=null)});var filter=this.module.getConfiguration("filterRow");eval(`that.filter = function(jqGrid, source, rowId) { try { \n ${filter}\n } catch(_) { console.log(_); } }`),this.module.getDomContent().html(this.dom)},exportToTabDelimited:function(){if(this.jpaths){for(var a=[],b=0,c=this.elements.length,d=[],e=0;e<this.jpaths.length;e++)d.push(this.jpaths[e].name);for(a.push(d.join("\t"));b<c;b++){var f=[];for(let a=0;a<this.jpaths.length;a++)Traversing.getValueFromJPath(this.elements[b],this.jpaths[a].jpath).done(function(a){f.push(a)});a.push(f.join("\t"))}return a.join("\r\n")}},unload:function(){this.jqGrid("GridDestroy"),this.jqGrid=!1,this.module.getDomContent().empty()},inDom:function(){var a,b,c=this,d=[],e=[],f=0,g=this.module.getConfiguration("colsjPaths");if("object"==typeof g)for(b=g.length;f<b;f++)a="none"!==g[f].editable&&"false"!==g[f].editable&&""!==g[f].editable,d.push(g[f].name),e.push({name:g[f].name,index:g[f].name,title:!1,width:g[f].width||150,editable:a,editoptions:"select"==g[f].editable?{value:g[f].options}:{},edittype:!!a&&g[f].editable,_jpath:g[f].jpath,sortable:!0,sorttype:g[f].number[0]?"float":"text"});var h=this.module.getConfiguration("nbLines")||20;this.domTable=$("<table />").attr("id",this.uniqId).appendTo(this.dom),this.domPaging=$("<div />",{id:`pager${this.uniqId}`}).appendTo(this.dom),$(this.domTable).jqGrid({colNames:d,colModel:e,editable:!0,sortable:!0,loadonce:!1,datatype:"local",gridview:!0,scrollerbar:!0,height:"100%",forceFit:!0,shrinkToFit:!0,cellsubmit:"clientArray",cellEdit:!0,rowNum:h,rowList:[2,10,20,30,100],pager:`#pager${this.uniqId}`,formatCell:function(a,b,c){return $(c).text()},resizeStop:function(){c.domTable.children().children().eq(0).children().each(function(a){g[a].width=$(this).width()})},rowattr:function(){if(arguments[1]._backgroundColor)return{style:`background-color: ${arguments[1]._backgroundColor}`}},beforeSaveCell:function(a,b,d,f,g){return-1<c.jpaths[g].number.indexOf("number")&&(d=parseFloat(d)),c.module.model.dataSetChild(c.elements[a.replace(c.uniqId,"")],e[g]._jpath,d),c.applyFilterToRow(a.replace(c.uniqId,""),a),`<div id="${getIDForCell(a,b)}">${d}</div>`},loadComplete:function(){if(c.jqGrid)for(var a,b=c.jqGrid("getDataIDs"),d=0,e=b.length;d<e;d++)a=b[d].replace(c.uniqId,""),c.applyFilterToRow(a,b[d]),c.tableElements[a]._inDom.notify()},viewrecords:!0,onSelectRow:function(a,b){c.hasToggleAction&&(b?($(`#${a}`).addClass("bg-orange").removeClass("ui-widget-content ui-state-highlight"),c.module.controller.onToggleOn(c.elements,a.replace(c.uniqId,""))):($(`#${a}`).removeClass("bg-orange"),c.module.controller.onToggleOff(c.elements,a.replace(c.uniqId,"")))),c.module.controller.lineClick(c.elements,a.replace(c.uniqId,""))},onSortCol:function(){for(var a=c.jqGrid("getDataIDs"),b=0,d=a.length;b<d;b++)c.tableElements[b]._inDom.notify()}}),this.jqGrid=$(this.domTable).jqGrid.bind(this.domTable),this.resolveReady()},applyFilterToRow:function(a,b){this.filter&&this.filter(this.jqGrid,this.elements[a],b)},onResize:function(){this.jqGrid&&(this.jqGrid("setGridWidth",this.width),this.jqGrid("setGridHeight",this.height-26-27))},blank:{list:function(){this.currentPage=this.jqGrid("getGridParam","page"),API.killHighlight(this.module.getId()),this.jqGrid("clearGridData"),$(this.domTable).trigger("reloadGrid")}},update:{list:function a(b){var a=b.get(),c=this.module.getConfiguration("colsjPaths"),d=[];if(this.jpaths=c,this.elements=a,this.module.data=b,!!c){this.buildElements(a,d,c),this.gridElements=d,this.tableElements=d;for(var e=[],f=0,g=d.length;f<g;f++)e.push(d[f]);this.dataSize!=g&&(this.currentPage=1,this.dataSize=g),this.jqGrid("setGridParam",{datatype:"local",data:e,page:this.currentPage}),$(this.domTable).trigger("reloadGrid"),this.module.model.getjPath("list",[0])}}},buildElements:function(a,b,c){for(var d=this,e=0,f=a.length;e<f;e++)b.push(this.buildElement(a.get(e),d.uniqId+e,c))},buildElement:function(a,b,c,d){var e={},f=0,g=c.length;for(d||this.listenFor(a,c,b),e.id=b+"",e.__source=a,API.listenHighlight(a,function(a){$(`#${b}`)[a?"addClass":"removeClass"]("ci-highlight")},!1,this.module.getId()),e._inDom=$.Deferred();f<g;f++){var h=getIDForCell(e.id,c[f].name);(function(b,d){e._inDom.progress(function(){Renderer.render($(`#${d}`),a,c[b].jpath)})})(f,h),e[c[f].name]=`<div id="${h}">`}var i=this.module.getConfiguration("colorjPath");if(i){var k=a.getChildSync(i);k&&(e._backgroundColor=k+"")}return e},listenFor:function(a,b,c){var d=this,e=$("body");this.module.model.dataListenChange(a,function(){d.jqGrid("setRowData",c,d.buildElement(this,c,b,!0));var a=e.scrollTop(),f=$(`tr#${c}`,d.domTable).get(0);f&&(f.scrollIntoView(),e.scrollTop(a))},"list")},onActionReceive:{addRow:function(a){this.elements=this.elements||[],this.elements.push(a),this.module.data=this.elements;var b=this.module.getConfiguration("colsjPaths"),c=this.elements.length-1,d=this.buildElement(a,this.uniqId+c,b);this.gridElements.push(d),this.jqGrid("addRowData",d.id,d)},removeRow:function(a){this.elements=this.elements||[];for(var b,c,d=0,e=this.gridElements.length;d<e;d++)if(this.gridElements[d].__source==a){b=this.gridElements[d].id,c=d;break}this.jqGrid("delRowData",b),this.elements.splice(c,0,1),this.gridElements.splice(c,0,1)},addColumn:function(a){var b=this.module,c=a.split(".");c=c.pop();for(var d=b.getConfiguration("colsjPaths"),e=0;e<d.length;e++)if(a===d[e].jpath)return;d.push({name:c,editable:!1,jpath:a,number:!1}),this.module.reload()},removeColumn:function(a){for(var b=this.module,c=b.getConfiguration("colsjPaths"),d=0,e=c.length;d<e;d++)if(c[d].jpath==a){c.splice(d,1),this.module.reload();break}}}}),View});