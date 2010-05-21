(function($) {
 	$.zc = function(ZenCode,data) {
		var el = createHTMLBlock(ZenCode,data);
		return el;
	};

	var regZenTagDfn =
			/*
			 * (
			 *   (
			 *     ([#\.]?\w+)?         # tag names, ids, and classes
			 *
			 *     (\[                  # attributes within '[' and ']'
			 *       (\w+(="\w+")? ?)+  # in form of 'attr' or 'attr="value"'
			 *     \])?                 # with an optional space
			 *
			 *   )+                     # one or more of these make up a tag
			 * 
			 *   (\{                    # string contents enclosed in '{' and '}'
			 *     (                    # with js expressions surrounded by '!'
			 *       [^\\}]             # find anything that is not a '\' or '}'
			 *       |                  # or
			 *       \\\}               # '\}' specifically
			 *     )+
			 *   \})?
			 * )
			 */
			/((([#\.]?\w+)?(\[(\w+(="[\w:!]+")? ?)+\])?)+(\{([^\\}]|\\\})+\})?)/i,
		regTag = /(\w+)/i,	//finds only the first word, must check for now word
		regId = /#(\w+)/i,	//finds id name
		regClasses = /(\.\w+)/gi,	//finds all classes
		regClass = /\.(\w+)/i,	//finds the class name of each class

		//finds attributes within '[' and ']' of type name or name="value"
		regAttrDfn = /(\[(\w+(="[\w:!]+")? ?)+\])/i,
		regAttrs = /(\w+(="[\w:!]+")?)/gi,	//finds each attribute
		regAttr = /(\w+)(="([\w:!]+)")?/i,	//finds individual attribute and value

		//finds content within '{' and '}' while ignoring '\}'
		regCBrace = /\{(([^\\}]|\\\})+)\}/i,
		regExclamation = /!(([^!]|\\!)+)!/gi;	//finds js within '!'

	//TODO: should filters, and E*N and E*N$ be implemented?
	function createHTMLBlock(ZenCode,data,indexes) {
		var origZenCode = ZenCode;
		if(ZenCode[0]=='(') {	//nested group
			var paren = parseEnclosure(ZenCode,'(',')');
			var inner = paren.substring(1,paren.length-1);
			ZenCode = ZenCode.substring(paren.length,ZenCode.length-1);
			var el = createHTMLBlock(inner,data);
		} else if(ZenCode[0]=='!') {	//!for:...!
			var obj = parseEnclosure(ZenCode,'!');
			obj = obj.substring(5,obj.length-1);
			if(obj.indexOf(':')>0) {
				var indexName = obj.substring(0,obj.indexOf(':'));
				if(indexes === undefined)
					indexes = {};
				obj = obj.substr(obj.indexOf(':')+1);
			}
			var forScope = parseForScope(ZenCode);
			var el = '';
			$.map(data[obj], function(value, index) {
				if(indexName!==undefined) {
					indexes[indexName] = index;
				}
				if(!$.isPlainObject(value))
					value = {value:value};
				var next = createHTMLBlock(forScope,value,indexes);
				el = outerHTML($([outerHTML(el), outerHTML(next)].join('')));
			});
			ZenCode = ZenCode.substr(obj.length+6+forScope.length);
		} else {
			var blocks = ZenCode.match(regZenTagDfn);
			if(blocks.length < 1)	//no more blocks to match
				return;
			var block = blocks[0];	//actual block to create
			if(regId.test(block))
				var blockId = regId.exec(block)[1];
			var blockClasses = parseClasses(block);
			var blockAttrs = parseAttributes(block,data);
			var blockTag = 'div';	//default
			if(ZenCode[0]!='#' && ZenCode[0]!='.')
				blockTag = regTag.exec(block)[1];	//otherwise
			blockAttrs = $.extend(blockAttrs, {
				id: blockId,
				class: blockClasses,
				html: parseContents(block,data,indexes)
			});
			var el = $('<'+blockTag+'>', blockAttrs);
			ZenCode = ZenCode.substr(blocks[0].length);
		}
		if(ZenCode.length > 0) {
			if(ZenCode[0] == '+') {
				var el2 = createHTMLBlock(ZenCode.substr(1),data);
				var el = $([outerHTML(el), outerHTML(el2)].join(''));
			}
			else if(ZenCode[0] == '>') {
				var els = $(createHTMLBlock(ZenCode.substr(1),data));
				els.appendTo(el);
			}
		}
		var ret = outerHTML(el);
		return ret;
	}

	//parses classes out of a single css element definition
	function parseClasses(ZenBlock) {
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
	function parseAttributes(ZenBlock, data) {
		if(ZenBlock.search(regAttrDfn) == -1)
			return undefined;
		var attrStrs = ZenBlock.match(regAttrDfn);
		var attrStrs = attrStrs[0].match(regAttrs);
		var attrs = {};
		for(var i=0;i<attrStrs.length;i++) {
			var parts = regAttr.exec(attrStrs[i]);
			attrs[parts[1]] = '';
			if(parts[3] !== undefined)
				attrs[parts[1]] = parseContents('{'+parts[3]+'}',data);
		}
		return attrs;
	}

	//returns an entire parenthetical expression taking accout for
	//internal parentheses.
	function parseEnclosure(ZenCode,open,close,parenCount) {
		if(close===undefined)
			close = open;
		var index = 1;
		if(parenCount === undefined)
			parenCount = ZenCode[0]==open?1:0;
		if(parenCount==0)
			return;
		for(;parenCount>0 && index<ZenCode.length;index++) {
			if(ZenCode[index]==close && ZenCode[index-1]!='\\')
				parenCount--;
			else if(ZenCode[index]==open && ZenCode[index-1]!='\\')
				parenCount++;
		}
		var ret = ZenCode.substring(0,index);
		return ret;
	}

	function parseContents(ZenBlock, data, indexes) {
		if(indexes===undefined)
			indexes = {};
		if(ZenBlock.search(regCBrace) == -1)
			return '';
		var html = ZenBlock.match(regCBrace)[1];
		if(data===undefined)
			return html;
		html = html.replace(regExclamation, function(str) {
			str = str.substring(1,str.length-1);
			var fn = new Function('data','indexes',
				'var r="";'+
				'with(data){try{r='+str+';}catch(e){}}'+
				'with(indexes){try{r='+str+';}catch(e){}}'+
				'return r;');
			return fn(data,indexes);
		});
		return html;
	}

	function parseForScope(ZenCode) {
		if(ZenCode.substring(0,5)!="!for:")
			return undefined;
		var forCode = parseEnclosure(ZenCode,'!');
		ZenCode = ZenCode.substr(forCode.length);
		var tag = ZenCode.match(regZenTagDfn)[0];
		ZenCode = ZenCode.substr(tag.length);
		if(ZenCode.length==0 || ZenCode[0]=='+') {
			return tag;
		}
		else if(ZenCode[0]=='>') {
			var rest = '';
			rest = parseEnclosure(ZenCode.substr(1),'(',')',1);
			return tag+'>'+rest;
		}
		return undefined;
	}

	function outerHTML(el) {
		return $('<div>').append($(el)).html();
	}

	function log(obj) {
		console.log(obj);
	}
 })(jQuery);
