(function($) {
 	$.zc = function(ZenCode) {
		var el = createHTMLBlock(ZenCode);
		return el;
	};

	var rootEls = '';

	function decodeZen(ZenCode) {
		var origZen = ZenCode;	//debugging purposes
		if(ZenCode[0]=='(') {
			
		}
	}

	//TODO: should filters, and E*N and E*N$ be implemented?
	function createHTMLBlock(ZenCode) {
		var origZenCode = ZenCode;
		if(ZenCode[0]=='(') {
			var paren = parseParen(ZenCode);
			var inner = paren.substr(1,paren.length-2);
			ZenCode = ZenCode.substr(paren.length,ZenCode.length-1);
			var el = createHTMLBlock(inner);
		} else {
			//var regBlock = /((\w+)(\[(\w+(="\w+")? ?)+\])?[#.]?)+/i,
			var regBlock = /(([#\.]?\w+)?(\[(\w+(="\w+")? ?)+\])?)+/i,
				regTag = /(\w+)/i,
				regId = /#(\w+)/i,
				regClass = /\.(\w+)/i;
			var blocks = ZenCode.match(regBlock);
			if(blocks.length < 1)	//no more blocks to match
				return;
			var block = blocks[0];	//actual block to create
			if(regId.test(block))
				var blockId = regId.exec(block)[1];
			var blockClasses = parseClasses(block);
			var blockAttrs = parseAttributes(block);
			var blockTag = 'div';	//default
			if(ZenCode[0]!='#' && ZenCode!='.')
				blockTag = regTag.exec(block)[1];	//otherwise
			blockAttrs = $.extend(blockAttrs, {
				id: blockId,
				class: blockClasses
			});
			var el = $('<'+blockTag+'>', blockAttrs);
			ZenCode = ZenCode.substr(blocks[0].length);
		}
		if(ZenCode.length > 0) {
			if(ZenCode[0] == '+') {
				var el2 = createHTMLBlock(ZenCode.substr(1));
				var el = $([outerHTML(el), outerHTML(el2)].join(''));
			}
			else if(ZenCode[0] == '>') {
				var els = $(createHTMLBlock(ZenCode.substr(1)));
				els.appendTo(el);
			}
		}
		var ret = outerHTML(el);
		return ret;
	}

	//parses classes out of a single css element definition
	function parseClasses(ZenBlock) {
		var regClasses = /(\.\w+)/gi,
			regClass = /\.(\w+)/i;
		if(ZenBlock.search(regClasses) == -1)
			return undefined;
		var classes = ZenBlock.match(regClasses);
		var clsString = '';
		for(var i=0;i<classes.length;i++) {
			clsString += ' '+regClass.exec(classes[i])[1];
		}
		return clsString.trim();
	}

	//parses attributes out of a single css element definition
	function parseAttributes(ZenBlock) {
		var regAttrDfn = /(\[(\w+(="\w+")? ?)+\])/i,
			regAttrs = /(\w+(="\w+")?)/gi,
			regAttr = /(\w+)(="(\w+)")?/i;
		if(ZenBlock.search(regAttrDfn) == -1)
			return undefined;
		var attrStrs = ZenBlock.match(regAttrDfn);
		var attrStrs = attrStrs[0].match(regAttrs);
		//var attrStrs = regAttrs.exec(attrStrs[0]);
		var attrs = {};
		for(var i=0;i<attrStrs.length;i++) {
			var parts = regAttr.exec(attrStrs[i]);
			attrs[parts[1]] = '';
			if(parts[3] !== undefined)
				attrs[parts[1]] = parts[3];
		}
		return attrs;
	}

	//returns an entire parenthetical expression taking accout for
	//internal parentheses.
	function parseParen(ZenCode) {
		var parenCount = ZenCode[0]=='('?1:0, index = 1;
		if(parenCount==0)
			return;
		for(;parenCount>0;index++) {
			if(ZenCode[index]=='(')
				parenCount++;
			else if(ZenCode[index]==')')
				parenCount--;
		}
		var ret = ZenCode.substr(0,index);
		return ret;
	}

	function outerHTML(el) {
		return $('<div>').append($(el)).html();
	}

	function log(obj) {
		console.log(obj);
	}
 })(jQuery);
