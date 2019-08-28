"use strict";define(["modules/default/defaultcontroller"],function(a){"use strict";function b(){}function c(a){return 0!==a.length}return $.extend(!0,b.prototype,a),b.prototype.moduleInformation={name:"Pie chart jit",description:"Display a pie chart based on jit",author:"Micha\xEBl Zasso",date:"16.01.2014",license:"MIT",cssClass:"pie_chart_jit"},b.prototype.references={chart:{type:["chart","object"],label:"A json describing a chart"},yArray:{type:"array",label:"1D Y array"}},b.prototype.variablesIn=["chart","yArray"],b.prototype.configurationStructure=function(){return{groups:{group:{options:{type:"list"},fields:{sliceOffset:{type:"text",title:"Slice offset",default:1},updateHeights:{type:"checkbox",title:"Slice height proportional to value ?",options:{updateHeights:"Yes (Only for mono-serie pies)"}}}}}}},b.prototype.configFunctions={updateHeights:c,showLabels:c},b.prototype.configAliases={sliceOffset:["groups","group",0,"sliceOffset",0],updateHeights:["groups","group",0,"updateHeights",0],showLabels:["groups","group",0,"showLabels",0],labelColor:["groups","group",0,"labelColor",0]},b});