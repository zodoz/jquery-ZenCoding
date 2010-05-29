//TODO: What if data is only a single array, string, number, etc.
//TODO: Allow for setting jQuery events (like click), and storing data
	/* Allowing events:
	 *
	 * E-event=function
	 */
//TODO: Allow Zen within {...}?
	/* Zen within {...} should probably be done as:
	 *
	 * span.info>(
	 *  a{link}+
	 *  {pure text}+
	 *  tag
	 * )
	 */
(function($) {

	/*
	 * Calling conventions:
	 *
	 * $.zc( ZenCode | ZenObject [, data] )
	 *
	 * ZenCode: string to be parsed into HTML
	 * ZenObject: Collection of ZenCode and ZenObjects.  ZenObject.main must
	 * be defined
	 */
 	$.zc = function(ZenCode,data,bLog) {
		if(bLog!==undefined)
			doLog = bLog;
		if($.isPlainObject(ZenCode))
			ZenCode = parseReferences(ZenCode);
		var functions = data.functions;
		var el = createHTMLBlock(ZenCode,data,functions);
		return el;
	};

	var doLog = false;

	var regZenTagDfn =
			/*
			 * (
			 *   (
			 *     ([#\.]?\w+)?         # tag names, ids, and classes
			 *
			 *     (\[                  # attributes within '[' and ']'
			 *       (\w+(="
			 *       	([^"]|\\")+
			 *       ")? ?)+            # in form of 'attr' or 'attr="value"'
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
			//((([#\.]?[\w!]+)?(\[(\w+(="([^"]|\\")+")? ?)+\])?)+(\{([^\\}]|\\\})+\})?)/i,	//old but worked...  doesn't have -event=function
			/([#\.]?[\w!]+|\[(\w+(="([^"]|\\")+")? ?)+\]|-[\w$]+=[\w$]+|\{([^\\}]|\\\})+\})+/i,
		regTag = /(\w+)/i,	//finds only the first word, must check for now word
		regId = /#([\w!]+)/i,	//finds id name
		regTagNotContent = /((([#\.]?\w+)?(\[(\w+(="([^"]|\\")+")? ?)+\])?)+)/i,
		regClasses = /(\.\w+)/gi,	//finds all classes
		regClass = /\.(\w+)/i,	//finds the class name of each class

		//finds reference objects
		regReference = /(@[\w$_][\w$_\d]+)/gi,

		//finds attributes within '[' and ']' of type name or name="value"
		regAttrDfn = /(\[(\w+(="([^"]|\\")+")? ?)+\])/i,
		regAttrs = /(\w+(="([^"]|\\")+")?)/gi,	//finds each attribute
		regAttr = /(\w+)(="(([^"]|\\")+)")?/i,	//finds individual attribute and value

		//finds content within '{' and '}' while ignoring '\}'
		regCBrace = /\{(([^\\}]|\\\})+)\}/i,
		regExclamation = /!(?!for)(([^!]|\\!)+)!/gi;	//finds js within '!'

	/*
	 * Parses multiple ZenCode references.  The initial ZenCode must be
	 * declared as ZenObject.main
	 */
	function parseReferences(ZenObject) {
		var ZenCode = ZenObject.main;
		ZenCode = ZenCode.replace(regReference, function(str) {
			str = str.substr(1);
			var fn = new Function('objs','reparse',
				'var r="";'+
				'with(objs){try{'+
					'if($.isPlainObject('+str+'))'+
						'r=reparse('+str+');'+
					'else '+
						'r='+str+';'+
				'}catch(e){}}'+
				'return r;');
			return fn(ZenObject,parseReferences);
		});
		return ZenCode;
	}

	/*
	 * The magic happens here.
	 *
	 * This is the recursive function to break up, parse, and create every
	 * element.
	 */
	function createHTMLBlock(ZenCode,data,functions,indexes) {
		var origZenCode = ZenCode;
		// Take care of nested groups
		if(ZenCode.charAt(0)=='(') {
			var paren = parseEnclosure(ZenCode,'(',')');
			var inner = paren.substring(1,paren.length-1);
			ZenCode = ZenCode.substr(paren.length);
			var el = createHTMLBlock(inner,data,functions,indexes);
		}
		// Take care of !for:...! and !if:...! structure
		else if(ZenCode.charAt(0)=='!') {
			var obj = parseEnclosure(ZenCode,'!');
			obj = obj.substring(obj.indexOf(':')+1,obj.length-1);
			var forScope = parseVariableScope(ZenCode);
			var el = '';
			if(ZenCode.substring(0,5)=="!for:") {  //!for:...!
				if(obj.indexOf(':')>0) {
					var indexName = obj.substring(0,obj.indexOf(':'));
					if(indexes === undefined)
						indexes = {};
					obj = obj.substr(obj.indexOf(':')+1);
				}
				$.map(data[obj], function(value, index) {
					if(indexName!==undefined) {
						indexes[indexName] = index;
					}
					if(!$.isPlainObject(value))
						value = {value:value};
					var next = createHTMLBlock(forScope,value,functions,indexes);
					el = outerHTML($([outerHTML(el), outerHTML(next)].join('')));
				});
				ZenCode = ZenCode.substr(obj.length+6+forScope.length);
			} else if(ZenCode.substring(0,4)=="!if:") {  //!if:...!
				var result = parseContents('!'+obj+'!',data,indexes);
				if(result!='undefined' || result!='false' || result!='')
					el = createHTMLBlock(forScope,data,functions,indexes);
				ZenCode = ZenCode.substr(obj.length+5+forScope.length);
			}
		}
		// Everything left should be a regular block
		else {
			/*if(ZenCode.length<=0)
				return '';*/
			var blocks = ZenCode.match(regZenTagDfn);
			if(blocks.length < 1)	//no more blocks to match
				return;
			var block = blocks[0];	//actual block to create
			block = parseContents(block,data,indexes);
			var blockClasses = parseClasses(block);
			if(regId.test(block))
				var blockId = regId.exec(block)[1];
			var blockAttrs = parseAttributes(block,data);
			var blockTag = 'div';	//default
			if(ZenCode.charAt(0)!='#' && ZenCode.charAt(0)!='.')
				blockTag = regTag.exec(block)[1];	//otherwise
			if(block.search(regCBrace) != -1)
				var blockHTML = block.match(regCBrace)[1];
			blockAttrs = $.extend(blockAttrs, {
				id: blockId,
				'class': blockClasses,
				html: blockHTML
			});
			var el = $('<'+blockTag+'>', blockAttrs);
			ZenCode = ZenCode.substr(blocks[0].length);
		}

		// Recurse based on '+' or '>'
		if(ZenCode.length > 0) {
			// Create siblings
			if(ZenCode.charAt(0) == '+') {
				var el2 = createHTMLBlock(ZenCode.substr(1),data,functions,indexes);
				var el = $([outerHTML(el), outerHTML(el2)].join(''));
			}
			// Create children
			else if(ZenCode.charAt(0) == '>') {
				var els = $(
					createHTMLBlock(ZenCode.substr(1),data,functions,indexes)
				);
				els.appendTo(el);
			}
		}
		var ret = outerHTML(el);
		return ret;
	}

	/*
	 * parses classes out of a single css element definition
	 * returns as a space delimited string of classes
	 */
	function parseClasses(ZenBlock) {
		ZenBlock = ZenBlock.match(regTagNotContent)[0];
		if(ZenBlock.search(regClasses) == -1)
			return undefined;
		var classes = ZenBlock.match(regClasses);
		var clsString = '';
		for(var i=0;i<classes.length;i++) {
			clsString += ' '+regClass.exec(classes[i])[1];
		}
		return $.trim(clsString);
	}

	/*
	 * parses attributes out of a single css element definition
	 * returns as a space delimited string of attributes and their values
	 */
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
				attrs[parts[1]] = parseContents(parts[3],data);
		}
		return attrs;
	}

	/*
	 * There are actually three forms of this function:
	 *
	 * parseEnclosure(ZenCode,open) - use open as both open and close
	 * parseEnclosure(ZenCode,open,close) - specify both
	 * parseEnclosure(ZenCode,open,close,count) - specify initial count
	 */
	function parseEnclosure(ZenCode,open,close,count) {
		if(close===undefined)
			close = open;
		var index = 1;
		if(count === undefined)
			count = ZenCode.charAt(0)==open?1:0;
		if(count==0)
			return;
		for(;count>0 && index<ZenCode.length;index++) {
			if(ZenCode.charAt(index)==close && ZenCode.charAt(index-1)!='\\')
				count--;
			else if(ZenCode.charAt(index)==open && ZenCode.charAt(index-1)!='\\')
				count++;
		}
		var ret = ZenCode.substring(0,index);
		return ret;
	}

	/*
	 * Converts !...! into its javascript equivelant.
	 */
	function parseContents(ZenBlock, data, indexes) {
		if(indexes===undefined)
			indexes = {};
		/*if(ZenBlock.search(regCBrace) == -1)
			return ZenBlock;*/
		var html = ZenBlock;
		if(data===undefined)
			return html;
		html = html.replace(regExclamation, function(str) {
			str = str.substring(1,str.length-1);
			var fn = new Function('data','indexes',
				'var r=undefined;'+
				'with(data){try{r='+str+';}catch(e){}}'+
				'with(indexes){try{if(r===undefined)r='+str+';}catch(e){}}'+
				'return r;');
			return fn(data,indexes);
		});
		return html;
	}

	/*
	 * Parses the scope of a !for:...!
	 *
	 * The scope of !for:...! is:
	 *   If the tag has no children, then only immeiately following tag
	 *   Tag and its children
	 */
	function parseVariableScope(ZenCode) {
		if(ZenCode.substring(0,5)!="!for:" &&
				ZenCode.substring(0,4)!="!if:")
			return undefined;
		var forCode = parseEnclosure(ZenCode,'!');
		ZenCode = ZenCode.substr(forCode.length);
		var tag = ZenCode.match(regZenTagDfn)[0];
		ZenCode = ZenCode.substr(tag.length);
		if(ZenCode.length==0 || ZenCode.charAt(0)=='+') {
			return tag;
		}
		else if(ZenCode.charAt(0)=='>') {
			var rest = '';
			rest = parseEnclosure(ZenCode.substr(1),'(',')',1);
			return tag+'>'+rest;
		}
		return undefined;
	}

	/*
	 * jQuery has no way to "unwrap" itself from the containing element,
	 * so this method "wraps" the element in a <div>, and then gets the
	 * contained HTML, thus retrieving the HTML for the contained element.
	 *
	 * It is cludgy, and proably a time hog.  More testing is needed to see
	 * if there is a better/faster way.
	 */
	function outerHTML(el) {
		return $('<div>').append($(el)).html();
	}

	function log(obj) {
		if(doLog)
			console.log(obj);
	}
 })(jQuery);
