(function($) {
 	$.zc = function(ZenCode) {
		console.log("-----starting: "+ZenCode);
		var el = createHTMLBlock(ZenCode);
		console.log("-------ending: "+ZenCode);
		return el;
	};

	//TODO: implement filters, implement E*N and E*N$
	function createHTMLBlock(ZenCode) {
		var regBlock = /((\w+)(\[(\w+(="\w+")? ?)+\])?[#.]?)+/i,
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
		var blockTag = regTag.exec(block)[1];
		blockAttrs = $.extend(blockAttrs, {
			id: blockId,
			class: blockClasses
		});
		var el = $('<'+blockTag+'>', blockAttrs);
		ZenCode = ZenCode.substr(blocks[0].length);
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

	function outerHTML(el) {
		return $('<div>').append($(el)).html();
	}
 })(jQuery);
