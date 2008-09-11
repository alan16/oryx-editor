/** * Copyright (c) 2006 * Martin Czuchra, Nicolas Peters, Daniel Polak, Willi Tscheschner * * Permission is hereby granted, free of charge, to any person obtaining a * copy of this software and associated documentation files (the "Software"), * to deal in the Software without restriction, including without limitation * the rights to use, copy, modify, merge, publish, distribute, sublicense, * and/or sell copies of the Software, and to permit persons to whom the * Software is furnished to do so, subject to the following conditions: * * The above copyright notice and this permission notice shall be included in * all copies or substantial portions of the Software. * * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER * DEALINGS IN THE SOFTWARE. **/if(!ORYX.Plugins)	ORYX.Plugins = new Object();ORYX.Plugins.Arrangement = Clazz.extend({	facade: undefined,	construct: function(facade) {		this.facade = facade;		// Z-Ordering		this.facade.offer({			'name':ORYX.I18N.Arrangement.btf,			'functionality': this.setToTop.bind(this),			'group': ORYX.I18N.Arrangement.groupZ,			'icon': ORYX.PATH + "images/shape_move_front.png",			'description': ORYX.I18N.Arrangement.btfDesc,			'index': 1,			'minShape': 1});					this.facade.offer({			'name':ORYX.I18N.Arrangement.btb,			'functionality': this.setToBack.bind(this),			'group': ORYX.I18N.Arrangement.groupZ,			'icon': ORYX.PATH + "images/shape_move_back.png",			'description': ORYX.I18N.Arrangement.btbDesc,			'index': 2,			'minShape': 1});		this.facade.offer({			'name':ORYX.I18N.Arrangement.bf,			'functionality': this.setForward.bind(this),			'group': ORYX.I18N.Arrangement.groupZ,			'icon': ORYX.PATH + "images/shape_move_forwards.png",			'description': ORYX.I18N.Arrangement.bfDesc,			'index': 3,			'minShape': 1});		this.facade.offer({			'name':ORYX.I18N.Arrangement.bb,			'functionality': this.setBackward.bind(this),			'group': ORYX.I18N.Arrangement.groupZ,			'icon': ORYX.PATH + "images/shape_move_backwards.png",			'description': ORYX.I18N.Arrangement.bbDesc,			'index': 4,			'minShape': 1});		// Aligment		this.facade.offer({			'name':ORYX.I18N.Arrangement.ab,			'functionality': this.alignShapes.bind(this, [ORYX.CONFIG.EDITOR_ALIGN_BOTTOM]),			'group': ORYX.I18N.Arrangement.groupA,			'icon': ORYX.PATH + "images/shape_align_bottom.png",			'description': ORYX.I18N.Arrangement.abDesc,			'index': 1,			'minShape': 2});		this.facade.offer({			'name':ORYX.I18N.Arrangement.am,			'functionality': this.alignShapes.bind(this, [ORYX.CONFIG.EDITOR_ALIGN_MIDDLE]),			'group': ORYX.I18N.Arrangement.groupA,			'icon': ORYX.PATH + "images/shape_align_middle.png",			'description': ORYX.I18N.Arrangement.amDesc,			'index': 2,			'minShape': 2});		this.facade.offer({			'name':ORYX.I18N.Arrangement.at,			'functionality': this.alignShapes.bind(this, [ORYX.CONFIG.EDITOR_ALIGN_TOP]),			'group': ORYX.I18N.Arrangement.groupA,			'icon': ORYX.PATH + "images/shape_align_top.png",			'description': ORYX.I18N.Arrangement.atDesc,			'index': 3,			'minShape': 2});		this.facade.offer({			'name':ORYX.I18N.Arrangement.al,			'functionality': this.alignShapes.bind(this, [ORYX.CONFIG.EDITOR_ALIGN_LEFT]),			'group': ORYX.I18N.Arrangement.groupA,			'icon': ORYX.PATH + "images/shape_align_left.png",			'description': ORYX.I18N.Arrangement.alDesc,			'index': 4,			'minShape': 2});		this.facade.offer({			'name':ORYX.I18N.Arrangement.ac,			'functionality': this.alignShapes.bind(this, [ORYX.CONFIG.EDITOR_ALIGN_CENTER]),			'group': ORYX.I18N.Arrangement.groupA,			'icon': ORYX.PATH + "images/shape_align_center.png",			'description': ORYX.I18N.Arrangement.acDesc,			'index': 5,			'minShape': 2});		this.facade.offer({			'name':ORYX.I18N.Arrangement.ar,			'functionality': this.alignShapes.bind(this, [ORYX.CONFIG.EDITOR_ALIGN_RIGHT]),			'group': ORYX.I18N.Arrangement.groupA,			'icon': ORYX.PATH + "images/shape_align_right.png",			'description': ORYX.I18N.Arrangement.arDesc,			'index': 6,			'minShape': 2});					this.facade.registerOnEvent('arrangement.setToTop', 	this.setToTop.bind(this)	);		this.facade.registerOnEvent('arrangement.setToBack', 	this.setToBack.bind(this)	);		this.facade.registerOnEvent('arrangement.setForward', 	this.setForward.bind(this)	);		this.facade.registerOnEvent('arrangement.setBackward', 	this.setBackward.bind(this)	);								},	setToTop: function() {		// Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.		var tmpElem =  this.facade.getSelection().sortBy( function(value, index) {			var t = $A(value.node.parentNode.childNodes);			return t.indexOf(value.node);		});		// Sortiertes Array wird nach oben verschoben.		tmpElem.each( function(value) {			value.node.parentNode.appendChild(value.node);		});	},	setToBack: function() {		// Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.		var tmpElem =  this.facade.getSelection().sortBy( function(value, index) {			var t = $A(value.node.parentNode.childNodes);			return t.indexOf(value.node);		});		tmpElem = tmpElem.reverse();		// Sortiertes Array wird nach unten verschoben.		tmpElem.each( function(value) {			value.node.parentNode.insertBefore(value.node, value.node.parentNode.firstChild);		});	},	setBackward: function() {		// Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.		var tmpElem =  this.facade.getSelection().sortBy( function(value, index) {			var t = $A(value.node.parentNode.childNodes);			return t.indexOf(value.node);		});		// Reverse the elements		tmpElem = tmpElem.reverse();		// Get all DOM-Nodes		var nodes = tmpElem.collect(function(value) {return value.node});		// Delete all Nodes who are the next Node in the nodes-Array		var compactNodes = nodes.findAll(function(node) {return !nodes.member(node.previousSibling)});				// Sortiertes Array wird nach eine Ebene nach oben verschoben.		compactNodes.each( function(node) {			if(node.previousSibling === null) { return; }			node.parentNode.insertBefore(node, node.previousSibling);		});	},	setForward: function() {		// Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.		var tmpElem =  this.facade.getSelection().sortBy( function(value, index) {			var t = $A(value.node.parentNode.childNodes);			return t.indexOf(value.node);		});		// Get all DOM-Nodes		var nodes = tmpElem.collect(function(value) {return value.node});		// Delete all Nodes who are the next Node in the nodes-Array		var compactNodes = nodes.findAll(function(node) {return !nodes.member(node.nextSibling)});				// Sortiertes Array wird eine Ebene nach unten verschoben.		compactNodes.each( function(node) {			var nextNode = node.nextSibling					if(nextNode === null) { return; }			node.parentNode.insertBefore(nextNode, node);		});	},	alignShapes: function(way) {		var elements = this.facade.getSelection();		// Set the elements to all Top-Level elements		elements = this.facade.getCanvas().getShapesWithSharedParent(elements);		// Get only nodes		elements = elements.findAll(function(value) {			return (value instanceof ORYX.Core.Node)		});		// Delete all attached intermediate events from the array		elements = elements.findAll(function(value) {			var d = value.getIncomingShapes()			return d.length == 0 || !elements.include(d[0])		});		if(elements.length < 2) { return; }		// get bounds of all shapes.		var bounds = elements[0].bounds.clone();		elements.each(function(shape) {		        bounds.include(shape.bounds.clone());		});		var commandClass = ORYX.Core.Command.extend({			construct: function(elements, bounds, way, facade){				this.elements = elements;				this.bounds = bounds;				this.way = way;				this.facade = facade;				this.orgPos = [];			},						execute: function(){				// align each shape according to the way that was specified.				this.elements.each(function(shape, index) {					this.orgPos[index] = shape.bounds.upperLeft();					switch (this.way) {						// align the shapes in the requested way.						case ORYX.CONFIG.EDITOR_ALIGN_BOTTOM:			                shape.bounds.moveTo({								x: shape.bounds.upperLeft().x,								y: this.bounds.b.y - shape.bounds.height()							}); break;						        case ORYX.CONFIG.EDITOR_ALIGN_MIDDLE:			                shape.bounds.moveTo({								x: shape.bounds.upperLeft().x,								y: (this.bounds.a.y + this.bounds.b.y - shape.bounds.height()) / 2							}); break;						        case ORYX.CONFIG.EDITOR_ALIGN_TOP:			                shape.bounds.moveTo({								x: shape.bounds.upperLeft().x,								y: this.bounds.a.y							}); break;						        case ORYX.CONFIG.EDITOR_ALIGN_LEFT:			                shape.bounds.moveTo({								x: this.bounds.a.x,								y: shape.bounds.upperLeft().y							}); break;						        case ORYX.CONFIG.EDITOR_ALIGN_CENTER:			                shape.bounds.moveTo({								x: (this.bounds.a.x + this.bounds.b.x - shape.bounds.width()) / 2,								y: shape.bounds.upperLeft().y							}); break;						        case ORYX.CONFIG.EDITOR_ALIGN_RIGHT:			                shape.bounds.moveTo({								x: this.bounds.b.x - shape.bounds.width(),								y: shape.bounds.upperLeft().y							}); break;					}					shape.update()				}.bind(this));						this.facade.updateSelection();			},			rollback: function(){				this.elements.each(function(shape, index) {					shape.bounds.moveTo(this.orgPos[index]);					shape.update();				}.bind(this));								this.facade.updateSelection();			}		})				var command = new commandClass(elements, bounds, parseInt(way), this.facade);				this.facade.executeCommands([command]);		}});