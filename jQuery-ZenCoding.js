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
		if(data !== undefined)
			var functions = data.functions;
		var el = createHTMLBlock(ZenCode,data,functions);
		return el;
	};

	var doLog = false;

	var regZenTagDfn =
			/*
			 * (
			 *   [#\.@]?[\w!]+          # tag names, ids, classes, and references
			 *   |
			 *   \[                     # attributes
			 *     ([!\w-]+             # attribute name
			 *       (="([^"]|\\")+")?  # attribute value
			 *      {0,})+              # allow spaces, and look for 1+ attributes
			 *   \]
			 *   |
			 *   \~[\w$]+=[\w$]+         # events in form -event=function
			 *   |
			 *   &[\w$\+(=[\w$]+)?      # data in form &data[=variable]
			 * ){0,}                    # 0 or more of the above
			 * (\{                      # contents
			 *   ([^\}]
			 *   |
			 *   \\\})+                 # find all before }, but include \}
			 * \})?
			 */
			/([#\.\@]?[\w!-]+|\[([\w!?=:"']+(="([^"]|\\")+")? {0,})+\]|\~[\w$]+=[\w$]+|&[\w$]+(=[\w$]+)?){0,}(\{([^\}]|\\\})+\})?/i,
		regTag = /(\w+)/i,	//finds only the first word, must check for now word
		regId = /#([\w!]+)/i,	//finds id name
		regTagNotContent = /((([#\.]?[\w-]+)?(\[([\w!]+(="([^"]|\\")+")? {0,})+\])?)+)/i,
		regClasses = /(\.[\w-]+)/gi,	//finds all classes
		regClass = /\.([\w-]+)/i,	//finds the class name of each class

		//finds reference objects
		regReference = /(@[\w$_][\w$_\d]+)/i,

		//finds attributes within '[' and ']' of type name or name="value"
		regAttrDfn = /(\[([\w!]+(="([^"]|\\")+")? {0,})+\])/i,
		regAttrs = /([\w!]+(="([^"]|\\")+")?)/gi,	//finds each attribute
		regAttr = /([\w!]+)(="(([^"]|\\")+)")?/i,	//finds individual attribute and value

		//finds content within '{' and '}' while ignoring '\}'
		regCBrace = /\{(([^\}]|\\\})+)\}/i,
		//regExclamations = /([^\\]|^)!(?!for)(([^!]|\\!)+)!/ig,	//finds js within '!'
		//regExclamation = /!(?!for)(([^!]|\\!)+)!/i,	//finds js within '!'
		regExclamation = /(?:([^\\]|^))!(?!for|if)([^!]|\\!)+!/gim,
		
		//finds events in form of -event=function
		regEvents = /\~[\w$]+(=[\w$]+)?/gi,
		regEvent = /\~([\w$]+)=([\w$]+)/i,
		
		//find data in form &data or &dataname=data
		regDatas = /&[\w$]+(=[\w$]+)?/gi,
		regData = /&([\w$]+)(=([\w$]+))?/i;

	/*
	 * Parses multiple ZenCode references.  The initial ZenCode must be
	 * declared as ZenObject.main
	 */
	function parseReferences(ZenCode, ZenObject) {
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
	function createHTMLBlock(ZenObject,data,functions,indexes) {
		if($.isPlainObject(ZenObject))
			var ZenCode = ZenObject.main;
		else {
			var ZenCode = ZenObject;
			ZenObject = {
				main: ZenCode
			};
		}
		var origZenCode = ZenCode;
		if(indexes === undefined)
			indexes = {};
		// Take care of !for:...! and !if:...! structure and if $.isArray(data)
		if(ZenCode.charAt(0)=='!' || $.isArray(data)) {
			if($.isArray(data))
				var forScope = ZenCode;
			else {
				var obj = parseEnclosure(ZenCode,'!');
				obj = obj.substring(obj.indexOf(':')+1,obj.length-1);
				var forScope = parseVariableScope(ZenCode);
			}
			while(forScope.charAt(0) == '@')
				forScope = parseVariableScope(
					'!for:!'+parseReferences(forScope, ZenObject));
			var zo = ZenObject;
			zo.main = forScope;
			var el = $();
			if(ZenCode.substring(0,5)=="!for:" || $.isArray(data)) {  //!for:...!
				if(!$.isArray(data) && obj.indexOf(':')>0) {
					var indexName = obj.substring(0,obj.indexOf(':'));
					obj = obj.substr(obj.indexOf(':')+1);
				}
				var arr = $.isArray(data)?data:data[obj];
				var zc = zo.main;
				if($.isArray(arr) || $.isPlainObject(arr)) {
					$.map(arr, function(value, index) {
						zo.main = zc;
						if(indexName!==undefined) {
							indexes[indexName] = index;
						}
						if(!$.isPlainObject(value))
							value = {value:value};
						var next = createHTMLBlock(zo,value,functions,indexes);
						if(el.length == 0)
							el = next;
						else {
							$.each(next, function(index,value) {
								el.push(value);
							});
						}
					});
				}
				if(!$.isArray(data))
					ZenCode = ZenCode.substr(obj.length+6+forScope.length);
				else
					ZenCode = '';
			} else if(ZenCode.substring(0,4)=="!if:") {  //!if:...!
				var result = parseContents('!'+obj+'!',data,indexes);
				if(result!='undefined' || result!='false' || result!='')
					el = createHTMLBlock(zo,data,functions,indexes);
				ZenCode = ZenCode.substr(obj.length+5+forScope.length);
			}
			ZenObject.main = ZenCode;
		}
		// Take care of nested groups
		else if(ZenCode.charAt(0)=='(') {
			var paren = parseEnclosure(ZenCode,'(',')');
			var inner = paren.substring(1,paren.length-1);
			ZenCode = ZenCode.substr(paren.length);
			var zo = ZenObject;
			zo.main = inner;
			var el = createHTMLBlock(zo,data,functions,indexes);
		}
		// Everything left should be a regular block
		else {
			var blocks = ZenCode.match(regZenTagDfn);
			var block = blocks[0];	//actual block to create
			if(block.length == 0) {
				return '';
			}
			if(block.indexOf('@') >= 0) {
				ZenCode = parseReferences(ZenCode,ZenObject);
				var zo = ZenObject;
				zo.main = ZenCode;
				return createHTMLBlock(zo,data,functions,indexes);
			}
			block = parseContents(block,data,indexes);
			var blockClasses = parseClasses(block);
			if(regId.test(block))
				var blockId = regId.exec(block)[1];
			var blockAttrs = parseAttributes(block,data);
			var blockTag = block.charAt(0)=='{'?'span':'div';	//default
			if(ZenCode.charAt(0)!='#' && ZenCode.charAt(0)!='.' &&
					ZenCode.charAt(0)!='{')
				blockTag = regTag.exec(block)[1];	//otherwise
			if(block.search(regCBrace) != -1) {
				var blockHTML = block.match(regCBrace)[1];
			}
			blockAttrs = $.extend(blockAttrs, {
				id: blockId,
				'class': blockClasses,
				html: blockHTML
			});
			var el = $('<'+blockTag+'>', blockAttrs);
			el = bindEvents(block, el, functions);
			el = bindData(block, el, data);
			ZenCode = ZenCode.substr(blocks[0].length);
			ZenObject.main = ZenCode;
		}

		// Recurse based on '+' or '>'
		if(ZenCode.length > 0) {
			// Create children
			if(ZenCode.charAt(0) == '>') {
				if(ZenCode.charAt(1) == '(') {
					var zc = parseEnclosure(ZenCode.substr(1),'(',')');
					ZenCode = ZenCode.substr(zc.length+1);
				} else if(ZenCode.charAt(1) == '!') {
					var obj = parseEnclosure(ZenCode.substr(1),'!');
					var forScope = parseVariableScope(ZenCode.substr(1));
					var zc = obj+forScope;
					ZenCode = ZenCode.substr(zc.length+1);
				} else {
					var len = Math.max(ZenCode.indexOf('+'),ZenCode.length);
					var zc = ZenCode.substring(1, len);
					ZenCode = ZenCode.substr(len);
				}
				var zo = ZenObject;
				zo.main = zc;
				var els = $(
					createHTMLBlock(zo,data,functions,indexes)
				);
				els.appendTo(el);
			}
			// Create siblings
			if(ZenCode.charAt(0) == '+') {
				var zo = ZenObject;
				zo.main = ZenCode.substr(1);
				var el2 = createHTMLBlock(zo,data,functions,indexes);
				$.each(el2, function(index,value) {
					el.push(value);
				});
			}
		}
		var ret = el;
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
		//var blocks = ZenBlock.match(regExclamations);
		html = html.replace(regExclamation, function(str, str2) {
			var begChar = '';
			if(str.charAt(0) == '!')
				str = str.substring(1,str.length-1);
			else {
				begChar = str.charAt(0);
				str = str.substring(2,str.length-1);
			}
			var fn = new Function('data','indexes',
				'var r=undefined;'+
				'with(data){try{r='+str+';}catch(e){}}'+
				'with(indexes){try{if(r===undefined)r='+str+';}catch(e){}}'+
				'return r;');
			var val = unescape(fn(data,indexes));
			//var val = fn(data,indexes);
			return begChar+val;
		});
		html = html.replace(/\\./g,function (str) {
			return str.charAt(1);
		});
		return unescape(html);
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
		if(ZenCode.charAt(0) == '(') {
			return parseEnclosure(ZenCode,'(',')');
		}
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
	 * Binds the appropiate function to the event specified by
	 * -event=function
	 * Or in the case of 
	 * -event
	 * binds function.event to event.
	 */
	function bindEvents(ZenCode, el, functions) {
		if(ZenCode.search(regEvents) == 0)
			return el;
		var bindings = ZenCode.match(regEvents);
		if(bindings === null)
			return el;
		for(var i=0;i<bindings.length;i++) {
			var split = regEvent.exec(bindings[i]);
			if(split[2] === undefined)
				var fn = functions[split[1]];
			else
				var fn = functions[split[2]];
			$(el).bind(split[1],fn);
		}
		return el;
	}

	/*
	 * Binds the appropiate data to the element specified by
	 * -data=value
	 * Or in the case of
	 * -data
	 * binds data.data to data on the element.
	 */
	function bindData(ZenCode, el, data) {
		if(ZenCode.search(regDatas) == 0)
			return el;
		var datas = ZenCode.match(regDatas);
		if(datas === null)
			return el;
		for(var i=0;i<datas.length;i++) {
			var split = regData.exec(datas[i]);
			if(split[3] === undefined)
				$(el).data(split[1],data[split[1]]);
			else
				$(el).data(split[1],data[split[3]]);
		}
		return el;
	}

	function log(obj) {
		if(doLog)
			console.log(obj);
	}
 })(jQuery);
