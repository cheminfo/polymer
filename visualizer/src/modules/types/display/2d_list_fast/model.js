"use strict";define(["modules/default/defaultmodel","src/util/datatraversing"],function(a,b){"use strict";function c(){}return $.extend(!0,c.prototype,a,{getValue:function(){return this.dataValue},getjPath:function(){var a=[],c=this.module.view.list;return c?(c=c[0],b.getJPathsFromElement(c,a),a):a}}),c});