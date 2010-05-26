/*
 * FluentZen - jquery plugin for creating DOM elements on the fly
 * Version: 0.1.1a (26/11/09)
 *
 * Author: Kristaps Karlsons <kristaps.karlsons@gmail.com>
 * Usage and info: http://skakri.net/zen
 *
 * Base idea/code by: Sergey Chikuyonok <serge.che@gmail.com>
 * Ported code: Zen Coding for Aptana v0.5.1
 * Google Code: http://code.google.com/p/zen-coding
 * Usage and info: http://chikuyonok.ru
 */

var zen_settings = {
	"variables": {
		"lang": "en",
		"locale": "en-US",
		"charset": "UTF-8",
		"profile": "xhtml",
		"indentation": "\t"
	},
	"html": {
		"abbreviations": {
			"a": '<a href=""></a>',
			"a:link": '<a href="http://|"></a>',
			"a:mail": '<a href="mailto:|"></a>',
			"abbr": '<abbr title=""></abbr>',
			"acronym": '<acronym title=""></acronym>',
			"base": '<base href="" />',
			"bdo": '<bdo dir=""></bdo>',
			"bdo:r": '<bdo dir="rtl"></bdo>',
			"bdo:l": '<bdo dir="ltr"></bdo>',
			"link:css": '<link rel="stylesheet" type="text/css" href="|style.css" media="all" />',
			"link:print": '<link rel="stylesheet" type="text/css" href="|print.css" media="print" />',
			"link:favicon": '<link rel="shortcut icon" type="image/x-icon" href="|favicon.ico" />',
			"link:touch": '<link rel="apple-touch-icon" href="|favicon.png" />',
			"link:rss": '<link rel="alternate" type="application/rss+xml" title="RSS" href="|rss.xml" />',
			"link:atom": '<link rel="alternate" type="application/atom+xml" title="Atom" href="atom.xml" />',
			"meta:utf": '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />',
			"meta:win": '<meta http-equiv="Content-Type" content="text/html;charset=windows-1251" />',
			"meta:compat": '<meta http-equiv="X-UA-Compatible" content="IE=7" />',
			"style": '<style type="text/css"></style>',
			"script": '<script type="text/javascript"><\/script>',
			"script:src": '<script type="text/javascript" src=""><\/script>',
			"img": '<img src="" alt="" />',
			"iframe": '<iframe src="" frameborder="0"></iframe>',
			"embed": '<embed src="" type="" />',
			"object": '<object data="" type=""></object>',
			"param": '<param name="" value="" />',
			"map": '<map name=""></map>',
			"area": '<area shape="" coords="" href="" alt="" />',
			"area:d": '<area shape="default" href="" alt="" />',
			"area:c": '<area shape="circle" coords="" href="" alt="" />',
			"area:r": '<area shape="rect" coords="" href="" alt="" />',
			"area:p": '<area shape="poly" coords="" href="" alt="" />',
			"link": '<link rel="stylesheet" href="" />',
			"form": '<form action=""></form>',
			"form:get": '<form action="" method="get"></form>',
			"form:post": '<form action="" method="post"></form>',
			"label": '<label for=""></label>',
			"input": '<input type="" />',
			"input:hidden": '<input type="hidden" name="" />',
			"input:h": '<input type="hidden" name="" />',
			"input:text": '<input type="text" name="" id="" />',
			"input:t": '<input type="text" name="" id="" />',
			"input:search": '<input type="search" name="" id="" />',
			"input:email": '<input type="email" name="" id="" />',
			"input:url": '<input type="url" name="" id="" />',
			"input:password": '<input type="password" name="" id="" />',
			"input:p": '<input type="password" name="" id="" />',
			"input:datetime": '<input type="datetime" name="" id="" />',
			"input:date": '<input type="date" name="" id="" />',
			"input:datetime-local": '<input type="datetime-local" name="" id="" />',
			"input:month": '<input type="month" name="" id="" />',
			"input:week": '<input type="week" name="" id="" />',
			"input:time": '<input type="time" name="" id="" />',
			"input:number": '<input type="number" name="" id="" />',
			"input:color": '<input type="color" name="" id="" />',
			"input:checkbox": '<input type="checkbox" name="" id="" />',
			"input:c": '<input type="checkbox" name="" id="" />',
			"input:radio": '<input type="radio" name="" id="" />',
			"input:r": '<input type="radio" name="" id="" />',
			"input:range": '<input type="range" name="" id="" />',
			"input:file": '<input type="file" name="" id="" />',
			"input:f": '<input type="file" name="" id="" />',
			"input:submit": '<input type="submit" value="" />',
			"input:s": '<input type="submit" value="" />',
			"input:image": '<input type="image" src="" alt="" />',
			"input:i": '<input type="image" src="" alt="" />',
			"input:reset": '<input type="reset" value="" />',
			"input:button": '<input type="button" value="" />',
			"input:b": '<input type="button" value="" />',
			"select": '<select name="" id=""></select>',
			"option": '<option value=""></option>',
			"textarea": '<textarea name="" id="" cols="30" rows="10"></textarea>',
			"menu:context": '<menu type="context"></menu>',
			"menu:c": '<menu type="context"></menu>',
			"menu:toolbar": '<menu type="toolbar"></menu>',
			"menu:t": '<menu type="toolbar"></menu>',
			"video": '<video src=""></video>',
			"audio": '<audio src=""></audio>',
			"html:xml": '<html xmlns="http://www.w3.org/1999/xhtml"></html>',
			"bq": "<blockquote></blockquote>",
			"acr": "<acronym></acronym>",
			"fig": "<figure></figure>",
			"ifr": "<iframe></iframe>",
			"emb": "<embed></embed>",
			"obj": "<object></object>",
			"src": "<source></source>",
			"cap": "<caption></caption>",
			"colg": "<colgroup></colgroup>",
			"fst": "<fieldset></fieldset>",
			"btn": "<button></button>",
			"optg": "<optgroup></optgroup>",
			"opt": "<option></option>",
			"tarea": "<textarea></textarea>",
			"leg": "<legend></legend>",
			"sect": "<section></section>",
			"art": "<article></article>",
			"hdr": "<header></header>",
			"ftr": "<footer></footer>",
			"adr": "<address></address>",
			"dlg": "<dialog></dialog>",
			"str": "<strong></strong>",
			"prog": "<progress></progress>",
			"fset": "<fieldset></fieldset>",
			"datag": "<datagrid></datagrid>",
			"datal": "<datalist></datalist>",
			"kg": "<keygen></keygen>",
			"out": "<output></output>",
			"det": "<details></details>",
			"cmd": "<command></command>",
			"ol+": "ol>li",
			"ul+": "ul>li",
			"dl+": "dl>dt+dd",
			"map+": "map>area",
			"table+": "table>tr>td",
			"colgroup+": "colgroup>col",
			"colg+": "colgroup>col",
			"tr+": "tr>td",
			"select+": "select>option",
			"optgroup+": "optgroup>option",
			"optg+": "optgroup>option"
		},
		"element_types": {
			"empty": "area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,keygen,command",
			"block_level": "address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,link,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul,h1,h2,h3,h4,h5,h6",
			"inline_level": "a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"
		}
	}
};
var zen_coding = (function(){
	   
		var re_tag = /<\/?[\w:\-]+(?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*\s*(\/?)>$/;
	   
		var TYPE_ABBREVIATION = 'zen-tag',
				TYPE_EXPANDO = 'zen-expando',
	   
				/** Reference to another abbreviation or tag */
				TYPE_REFERENCE = 'zen-reference',
			   
				content_placeholder = '{%::zen-content::%}';
			   
		var default_profile = {
				tag_case: 'lower',
				attr_case: 'lower',
				attr_quotes: 'double',
			   
				// each tag on new line
				tag_nl: 'decide',
			   
				place_cursor: false,
			   
				// indent tags
				indent: true,
			   
				// use self-closing style for writing empty elements, e.g. <br /> or <br>
				self_closing_tag: 'xhtml'
		};
	   
		var profiles = {};
	   
		/**
		 * Проверяет, является ли символ допустимым в аббревиатуре
		 * @param {String} ch
		 * @return {Boolean}
		 */
		function isAllowedChar(ch) {
				var char_code = ch.charCodeAt(0),
						special_chars = '#.>+*:$-_!@';
			   
				return (char_code > 64 && char_code < 91)	   // uppercase letter
								|| (char_code > 96 && char_code < 123)  // lowercase letter
								|| (char_code > 47 && char_code < 58)   // number
								|| special_chars.indexOf(ch) != -1;	 // special character
		}
	   
		/**
		 * Возвращает символ перевода строки, используемый в редакторе
		 * @return {String}
		 */
		function getNewline() {
				return zen_coding.getNewline();
		}
	   
		/**
		 * Split text into lines. Set <code>remove_empty</code> to true to filter
		 * empty lines
		 * @param {String} text
		 * @param {Boolean} [remove_empty]
		 * @return {Array}
		 */
		function splitByLines(text, remove_empty) {
				var nl = getNewline(),
						lines = text.split(new RegExp('\\r?\\n|\\n\\r|\\r|' + nl));
					   
				if (remove_empty) {
						for (var i = lines.length; i >= 0; i--) {
								if (!trim(lines[i]))
										lines.splice(i, 1);
						}
				}
			   
				return lines;
		}
	   
		/**
		 * Trim whitespace from string
		 * @param {String} text
		 * @return {String}
		 */
		function trim(text) {
				return (text || "").replace( /^\s+|\s+$/g, "" );
		}
	   
		function createProfile(options) {
				var result = {};
				for (var p in default_profile)
						result[p] = (p in options) ? options[p] : default_profile[p];
			   
				return result;
		}
	   
		function setupProfile(name, options) {
				profiles[name.toLowerCase()] = createProfile(options || {});
		}
	   
		/**
		 * Helper function that transforms string into hash
		 * @return {Object}
		 */
		function stringToHash(str){
				var obj = {}, items = str.split(",");
				for ( var i = 0; i < items.length; i++ )
						obj[ items[i] ] = true;
				return obj;
		}
	   
		/**
		 * Отбивает текст отступами
		 * @param {String} text Текст, который нужно отбить
		 * @param {String|Number} pad Количество отступов или сам отступ
		 * @return {String}
		 */
		function padString(text, pad, verbose) {
				var pad_str = '', result = '';
				if (typeof(pad) == 'number')
						for (var i = 0; i < pad; i++)
								pad_str += zen_settings.variables.indentation;
				else
						pad_str = pad;
			   
				var lines = splitByLines(text),
						nl = getNewline();
					   
				result += lines[0];
				for (var j = 1; j < lines.length; j++)
						result += nl + pad_str + lines[j];
					   
				return result;
		}
	   
		/**
		 * Check if passed abbreviation is snippet
		 * @param {String} abbr
		 * @param {String} type
		 * @return {Boolean}
		 */
		function isShippet(abbr, type) {
				return getSnippet(type, abbr) ? true : false;
		}
	   
		/**
		 * Проверяет, закачивается ли строка полноценным тэгом. В основном
		 * используется для проверки принадлежности символа '>' аббревиатуре
		 * или тэгу
		 * @param {String} str
		 * @return {Boolean}
		 */
		function isEndsWithTag(str) {
				return re_tag.test(str);
		}
	   
		/**
		 * Returns specified elements collection (like 'empty', 'block_level') from
		 * <code>resource</code>. If collections wasn't found, returns empty object
		 * @param {Object} resource
		 * @param {String} type
		 * @return {Object}
		 */
		function getElementsCollection(resource, type) {
				if (resource && resource.element_types)
						return resource.element_types[type] || {}
				else
						return {};
		}
	   
		/**
		 * Replace variables like ${var} in string
		 * @param {String} str
		 * @param {Object} [vars] Variable set (default is <code>zen_settings.variables</code>)
		 * @return {String}
		 */
		function replaceVariables(str, vars) {
				vars = vars || zen_settings.variables;
				return str.replace(/\$\{([\w\-]+)\}/g, function(str, p1){
						return (p1 in vars) ? vars[p1] : str;
				});
		}
	   
		/**
		 * Тэг
		 * @class
		 * @param {String} name Имя тэга
		 * @param {Number} count Сколько раз вывести тэг (по умолчанию: 1)
		 * @param {String} type Тип тэга (html, xml)
		 */
		function Tag(name, count, type) {
				name = name.toLowerCase();
				type = type || 'html';
			   
				var abbr = getAbbreviation(type, name);
				if (abbr && abbr.type == TYPE_REFERENCE)
						abbr = getAbbreviation(type, abbr.value);
			   
				this.name = (abbr) ? abbr.value.name : name.replace('+', '');
				this.count = count || 1;
				this.children = [];
				this.attributes = [];
				this._attr_hash = {};
				this._abbr = abbr;
				this._res = zen_settings[type];
				this._content = '';
				this.repeat_by_lines = false;
			   
				// add default attributes
				if (this._abbr && this._abbr.value.attributes) {
						var def_attrs = this._abbr.value.attributes;
						if (def_attrs) {
								for (var i = 0; i < def_attrs.length; i++) {
										var attr = def_attrs[i];
										this.addAttribute(attr.name, attr.value);
								}
						}
				}
		}
	   
		Tag.prototype = {
				/**
				 * Добавляет нового потомка
				 * @param {Tag} tag
				 */
				addChild: function(tag) {
						this.children.push(tag);
				},
			   
				/**
				 * Добавляет атрибут
				 * @param {String} name Название атрибута
				 * @param {String} value Значение атрибута
				 */
				addAttribute: function(name, value) {
						var a;
						if (name in this._attr_hash) {
								// attribute already exists, decide what to do
								a = this._attr_hash[name];
								if (name == 'class') {
										// 'class' is a magic attribute
										a.value += ((a.value) ? ' ' : '') + value;
								} else {
										a.value = value;
								}
						} else {
								a = {name: name, value: value};
								this._attr_hash[name] = a
								this.attributes.push(a);
						}
					   
				},
			   

				/**
				 * Проверяет, является ли текущий элемент пустым
				 * @return {Boolean}
				 */
				isEmpty: function() {
						return (this._abbr && this._abbr.value.is_empty) || (this.name in getElementsCollection(this._res, 'empty'));
				},
			   
				/**
				 * Проверяет, является ли текущий элемент строчным
				 * @return {Boolean}
				 */
				isInline: function() {
						return (this.name in getElementsCollection(this._res, 'inline_level'));
				},
			   
				/**
				 * Проверяет, является ли текущий элемент блочным
				 * @return {Boolean}
				 */
				isBlock: function() {
						return (this.name in getElementsCollection(this._res, 'block_level'));
				},
			   
				/**
				 * This function tests if current tags' content contains xHTML tags.
				 * This function is mostly used for output formatting
				 */
				hasTagsInContent: function() {
						return this.getContent() && re_tag.test(this.getContent());
				},
			   
				/**
				 * Проверяет, есть ли блочные потомки у текущего тэга.
				 * Используется для форматирования
				 * @return {Boolean}
				 */
				hasBlockChildren: function() {
						if (this.hasTagsInContent() && this.isBlock()) {
								return true;
						}
					   
						for (var i = 0; i < this.children.length; i++) {
								if (this.children[i].isBlock())
										return true;
						}
					   
						return false;
				},
			   
				/**
				 * Set textual content for tag
				 * @param {String} str Tag's content
				 */
				setContent: function(str) {
						this._content = str;
				},
			   
				/**
				 * Returns tag's textual content
				 * @return {String}
				 */
				getContent: function() {
						return this._content;
				},
			   
				/**
				 * Search for deepest and latest child of current element
				 * @return {Tag|null} Returns null if there's no children
				 */
				findDeepestChild: function() {
						if (!this.children.length)
								return null;
							   
						var deepest_child = this;
						while (true) {
								deepest_child = deepest_child.children[ deepest_child.children.length - 1 ];
								if (!deepest_child.children.length)
										break;
						}
					   
						return deepest_child;
				},
			   
				/**
				 * Transforms and formats tag into string using profile
				 * @param {String} profile Profile name
				 * @return {String}
				 * TODO Function is too large, need refactoring
				 */
				toString: function(profile_name) {
					   
						var result = [],
								profile = (profile_name in profiles) ? profiles[profile_name] : profiles['plain'],
								attrs = '',
								content = '',
								start_tag = '',
								end_tag = '',
								cursor = profile.place_cursor ? '|' : '',
								self_closing = '',
								attr_quote = profile.attr_quotes == 'single' ? "'" : '"',
								attr_name;

						if (profile.self_closing_tag == 'xhtml')
								self_closing = ' /';
						else if (profile.self_closing_tag === true)
								self_closing = '/';
							   
						function allowNewline(tag) {
								return (profile.tag_nl === true || (profile.tag_nl == 'decide' && tag.isBlock()))
						}
							   
						// make attribute string
						for (var i = 0; i < this.attributes.length; i++) {
								var a = this.attributes[i];
								attr_name = (profile.attr_case == 'upper') ? a.name.toUpperCase() : a.name.toLowerCase();
								attrs += ' ' + attr_name + '=' + attr_quote + (a.value || cursor) + attr_quote;
						}
					   
						var deepest_child = this.findDeepestChild();
					   
						// output children
						if (!this.isEmpty()) {
								if (deepest_child && this.repeat_by_lines)
										deepest_child.setContent(content_placeholder);
							   
								for (var j = 0; j < this.children.length; j++) {
//									  
										content += this.children[j].toString(profile_name);
										if (
												(j != this.children.length - 1) &&
												( allowNewline(this.children[j]) || allowNewline(this.children[j + 1]) )
										)
												content += getNewline();
								}
						}
					   
						// define opening and closing tags
						if (this.name) {
								var tag_name = (profile.tag_case == 'upper') ? this.name.toUpperCase() : this.name.toLowerCase();
								if (this.isEmpty()) {
										start_tag = '<' + tag_name + attrs + self_closing + '>';
								} else {
										start_tag = '<' + tag_name + attrs + '>';
										end_tag = '</' + tag_name + '>';
								}
						}
					   
						// formatting output
						if (profile.tag_nl !== false) {
								if (
										this.name &&
										(
												profile.tag_nl === true ||
												this.hasBlockChildren()
										)
								) {
										if (end_tag) { // non-empty tag: add indentation
												start_tag += getNewline() + zen_settings.variables.indentation;
												end_tag = getNewline() + end_tag;
										} else { // empty tag
											   
										}
											   
								}
							   
								if (this.name) {
										if (content)
												content = padString(content, profile.indent ? 1 : 0);
										else if (!this.isEmpty())
												start_tag += cursor;
								}
									   
						}
					   
						// repeat tag by lines count
						var cur_content = '';
						if (this.repeat_by_lines) {
								var lines = splitByLines( trim(this.getContent()) , true);
								for (var j = 0; j < lines.length; j++) {
										cur_content = deepest_child ? '' : content_placeholder;
										if (content && !deepest_child)
												cur_content += getNewline();
											   
										var elem_str = start_tag.replace(/\$/g, j + 1) + cur_content + content + end_tag;
										result.push(elem_str.replace(content_placeholder, trim(lines[j])));
								}
						}
					   
						// repeat tag output
						if (!result.length) {
								if (this.getContent()) {
										var pad = (profile.tag_nl === true || (this.hasTagsInContent() && this.isBlock())) ? 1 : 0;
										content = padString(this.getContent(), pad) + content;
								}
							   
								for (var i = 0; i < this.count; i++)
										result.push(start_tag.replace(/\$/g, i + 1) + content + end_tag);
						}
					   
						var glue = '';
						if (allowNewline(this))
								glue = getNewline();
							   
						return result.join(glue);
				}
		};
	   
		// TODO inherit from Tag
		function Snippet(name, count, type) {
				/** @type {String} */
				this.name = name;
				this.count = count || 1;
				this.children = [];
				this._content = '';
				this.repeat_by_lines = false;
				this.attributes = {'id': '|', 'class': '|'};
				this.value = getSnippet(type, name);
		}
	   
		Snippet.prototype = {
				/**
				 * Добавляет нового потомка
				 * @param {Tag} tag
				 */
				addChild: function(tag) {
						this.children.push(tag);
				},
			   
				addAttribute: function(name, value){
						this.attributes[name] = value;
				},
			   
				isBlock: function() {
						return true;
				},
			   
				/**
				 * Set textual content for snippet
				 * @param {String} str Tag's content
				 */
				setContent: function(str) {
						this._content = str;
				},
			   
				/**
				 * Returns snippet's textual content
				 * @return {String}
				 */
				getContent: function() {
						return this._content;
				},
			   
				/**
				 * Search for deepest and latest child of current element
				 * @return {Tag|null} Returns null if there's no children
				 */
				findDeepestChild: function() {
						if (!this.children.length)
								return null;
							   
						var deepest_child = this;
						while (true) {
								deepest_child = deepest_child.children[ deepest_child.children.length - 1 ];
								if (!deepest_child.children.length)
										break;
						}
					   
						return deepest_child;
				},
			   
				toString: function(profile_name) {
						var content = '',
								profile = (profile_name in profiles) ? profiles[profile_name] : profiles['plain'],
								result = [],
								data = this.value,
								begin = '',
								end = '',
								child_padding = '',
								child_token = '${child}';
					   
						if (data) {
								if (profile.tag_nl !== false) {
										var nl = getNewline();
										data = data.replace(/\n/g, nl);
										// figuring out indentation for children
										var lines = data.split(nl), m;
										for (var j = 0; j < lines.length; j++) {
												if (lines[j].indexOf(child_token) != -1) {
														child_padding =  (m = lines[j].match(/(^\s+)/)) ? m[1] : '';
														break;
												}
										}
								}
							   
								var parts = data.split(child_token);
								begin = parts[0] || '';
								end = parts[1] || '';
						}
					   
						for (var i = 0; i < this.children.length; i++) {
								content += this.children[i].toString(profile_name);
								if (
										i != this.children.length - 1 &&
										(
												profile.tag_nl === true ||
												(profile.tag_nl == 'decide' && this.children[i].isBlock())
										)
								)
										content += getNewline();
						}
					   
						if (child_padding)
								content = padString(content, child_padding);
					   
					   
						// substitute attributes
						begin = replaceVariables(begin, this.attributes);
						end = replaceVariables(end, this.attributes);
							   
						if (this.getContent()) {
								content = padString(this.getContent(), 1) + content;
						}
					   
						// выводим тэг нужное количество раз
						for (var i = 0; i < this.count; i++)
								result.push(begin + content + end);
//							  result.push(begin.replace(/\$(?!\{)/g, i + 1) + content + end);
					   
						return result.join((profile.tag_nl !== false) ? getNewline() : '');
				}
		}
	   
		/**
		 * Returns abbreviation value from data set
		 * @param {String} type Resource type (html, css, ...)
		 * @param {String} abbr Abbreviation name
		 * @return {Object|null}
		 */
		function getAbbreviation(type, abbr) {
				return getSettingsResource(type, abbr, 'abbreviations');
		}
	   
		/**
		 * Returns snippet value from data set
		 * @param {String} type Resource type (html, css, ...)
		 * @param {String} snippet_name Snippet name
		 * @return {Object|null}
		 */
		function getSnippet(type, snippet_name) {
				return getSettingsResource(type, snippet_name, 'snippets');
		}
	   
		/**
		 * Returns resurce value from data set with respect of inheritance
		 * @param {String} type Resource type (html, css, ...)
		 * @param {String} abbr Abbreviation name
		 * @param {String} res_name Resource name ('snippets' or 'abbreviation')
		 * @return {Object|null}
		 */
		function getSettingsResource(type, abbr, res_name) {
				var resource = zen_settings[type];
			   
				if (resource) {
						if (res_name in resource && abbr in resource[res_name])
								return resource[res_name][abbr];
						else if ('extends' in resource) {
								// find abbreviation in ancestors
								for (var i = 0; i < resource['extends'].length; i++) {
										var type = resource['extends'][i];
										if (
												zen_settings[type] &&
												zen_settings[type][res_name] &&
												zen_settings[type][res_name][abbr]
										)
												return zen_settings[type][res_name][abbr];
								}
						}
				}
			   
			   
				return null;
		}
	   
		// create default profiles
		setupProfile('xhtml', {place_cursor: false});
		setupProfile('html', {self_closing_tag: false, place_cursor: false});  
	   
		return {
				expandAbbreviation: function(abbr, type, profile) {
						var tree = this.parseIntoTree(abbr, type || 'html');
						return replaceVariables(tree ? tree.toString(profile) : '');
				},
			   
				/**
				 * Extracts abbreviations from text stream, starting from the end
				 * @param {String} str
				 * @return {String} Abbreviation or empty string
				 */
				extractAbbreviation: function(str) {

						var cur_offset = str.length,
								start_index = -1;
					   
						while (true) {
								cur_offset--;
								if (cur_offset < 0) {
										// дошли до начала строки
										start_index = 0;
										break;
								}
							   
								var ch = str.charAt(cur_offset);
							   
								if (!isAllowedChar(ch) || (ch == '>' && isEndsWithTag(str.substring(0, cur_offset + 1)))) {
										start_index = cur_offset + 1;
										break;
								}
						}
					   
						if (start_index != -1)
								// что-то нашли, возвращаем аббревиатуру
								return str.substring(start_index);
						else
								return '';
				},
			   
				/**
				 * Parses abbreviation into a node set
				 * @param {String} abbr Abbreviation
				 * @param {String} type Document type (xsl, html, etc.)
				 * @return {Tag}
				 */
				parseIntoTree: function(abbr, type) {
						type = type || 'html';
						var root = new Tag('', 1, type),
								parent = root,
								last = null,
								multiply_elem = null,
								res = zen_settings[type],
								re = /([\+>])?([a-z@\!][a-z0-9:\-]*)(#[\w\-\$]+)?((?:\.[\w\-\$]+)*)(\*(\d*))?(\+$)?/ig;
					   
						if (!abbr)
								return null;
					   
						// replace expandos
						abbr = abbr.replace(/([a-z][\w\:\-]*)\+$/i, function(str){
								var a = getAbbreviation(type, str);
								return a ? a.value : str;
						});
					   
						abbr = abbr.replace(re, function(str, operator, tag_name, id, class_name, has_multiplier, multiplier, has_expando){
								var multiply_by_lines = (has_multiplier && !multiplier);
								multiplier = multiplier ? parseInt(multiplier) : 1;
							   
								if (has_expando)
										tag_name += '+';
							   
								var current = isShippet(tag_name, type) ? new Snippet(tag_name, multiplier, type) : new Tag(tag_name, multiplier, type);
								if (id)
										current.addAttribute('id', id.substr(1));
							   
								if (class_name)
										current.addAttribute('class', class_name.substr(1).replace(/\./g, ' '));
							   
							   
								// dive into tree
								if (operator == '>' && last)
										parent = last;
									   
								parent.addChild(current);
							   
								last = current;
							   
								if (multiply_by_lines)
										multiply_elem = current;
							   
								return '';
						});
					   
						root.last = last;
						root.multiply_elem = multiply_elem;
					   
						// empty 'abbr' string means that abbreviation was successfully expanded,
						// if not — abbreviation wasn't valid
						return (!abbr) ? root : null;
				},
			   
				/**
				 * Отбивает текст отступами
				 * @param {String} text Текст, который нужно отбить
				 * @param {String|Number} pad Количество отступов или сам отступ
				 * @return {String}
				 */
				padString: padString,
				setupProfile: setupProfile,
				getNewline: function(){
						return '\n';
				},

				/**
				 * Wraps passed text with abbreviation. Text will be placed inside last
				 * expanded element
				 * @param {String} abbr Abbreviation
				 * @param {String} text Text to wrap
				 * @param {String} [type] Document type (html, xml, etc.). Default is 'html'
				 * @param {String} [profile] Output profile's name. Default is 'plain'
				 * @return {String}
				 */
				wrapWithAbbreviation: function(abbr, text, type, profile) {
						var tree = this.parseIntoTree(abbr, type || 'html');
						if (tree) {
								var repeat_elem = tree.multiply_elem || tree.last;
								repeat_elem.setContent(text);
								repeat_elem.repeat_by_lines = !!tree.multiply_elem;
								return tree.toString(profile);
						} else {
								return null;
						}
				},
			   
				splitByLines: splitByLines,
			   
				settings_parser: (function(){
						/**
						 * Unified object for parsed data
						 */
						function entry(type, key, value) {
								return {
										type: type,
										key: key,
										value: value
								};
						}
					   
						/** Regular expression for XML tag matching */
						var re_tag = /^<(\w+\:?[\w\-]*)((?:\s+[\w\:\-]+\s*=\s*(['"]).*?\3)*)\s*(\/?)>/,
								re_attrs = /([\w\-]+)\s*=\s*(['"])(.*?)\2/g;
					   
						/**
						 * Make expando from string
						 * @param {String} key
						 * @param {String} value
						 * @return {Object}
						 */
						function makeExpando(key, value) {
								return entry(TYPE_EXPANDO, key, value);
						}
					   
						/**
						 * Make abbreviation from string
						 * @param {String} key Abbreviation key
						 * @param {String} tag_name Expanded element's tag name
						 * @param {String} attrs Expanded element's attributes
						 * @param {Boolean} is_empty Is expanded element empty or not
						 * @return {Object}
						 */
						function makeAbbreviation(key, tag_name, attrs, is_empty) {
								var result = {
										name: tag_name,
										is_empty: Boolean(is_empty)
								};
							   
								if (attrs) {
										var m;
										result.attributes = [];
										while (m = re_attrs.exec(attrs)) {
												result.attributes.push({
														name: m[1],
														value: m[3]
												});
										}
								}
							   
								return entry(TYPE_ABBREVIATION, key, result);
						}
					   
						/**
						 * Parses all abbreviations inside object
						 * @param {Object} obj
						 */
						function parseAbbreviations(obj) {
								for (var key in obj) {
										var value = obj[key], m;
									   
										key = trim(key);
										if (key.substr(-1) == '+') {
												// this is expando, leave 'value' as is
												obj[key] = makeExpando(key, value);
										} else if (m = re_tag.exec(value)) {
												obj[key] = makeAbbreviation(key, m[1], m[2], m[4] == '/');
										} else {
												// assume it's reference to another abbreviation
												obj[key] = entry(TYPE_REFERENCE, key, value);
										}
									   
								}
						}
					   
						return {
								/**
								 * Parse user's settings
								 * @param {Object} settings
								 */
								parse: function(settings) {
										for (var p in settings) {
												if (p == 'abbreviations')
														parseAbbreviations(settings[p]);
												else if (p == 'extends') {
														var ar = settings[p].split(',');
														for (var i = 0; i < ar.length; i++)
																ar[i] = trim(ar[i]);
														settings[p] = ar;
												}
												else if (typeof(settings[p]) == 'object')
														arguments.callee(settings[p]);
										}
								},
							   
								extend: function(parent, child) {
										for (var p in child) {
												if (typeof(child[p]) == 'object' && parent.hasOwnProperty(p))
														arguments.callee(parent[p], child[p]);
												else
														parent[p] = child[p];
										}
								},
							   
								/**
								 * Create hash maps on certain string properties
								 * @param {Object} obj
								 */
								createMaps: function(obj) {
										for (var p in obj) {
												if (p == 'element_types') {
														for (var k in obj[p])
																obj[p][k] = stringToHash(obj[p][k]);
												} else if (typeof(obj[p]) == 'object') {
														arguments.callee(obj[p]);
												}
										}
								},
							   
								TYPE_ABBREVIATION: TYPE_ABBREVIATION,
								TYPE_EXPANDO: TYPE_EXPANDO,
							   
								/** Reference to another abbreviation or tag */
								TYPE_REFERENCE: TYPE_REFERENCE
						}
				})()
		}
	   
})();


if ('zen_settings' in this) {
		// first we need to expand some strings into hashes
		zen_coding.settings_parser.createMaps(zen_settings);
		if ('my_zen_settings' in this) {
				// we need to extend default settings with user's
				zen_coding.settings_parser.createMaps(my_zen_settings);
				zen_coding.settings_parser.extend(zen_settings, my_zen_settings);
		}
	   
		// now we need to parse final set of settings
		zen_coding.settings_parser.parse(zen_settings);
}

/*
 * HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * HTMLParser(htmlString, {
 *	 start: function(tag, attrs, unary) {},
 *	 end: function(tag) {},
 *	 chars: function(text) {},
 *	 comment: function(text) {}
 * });
 */

(function(){

		// Regular Expressions for parsing tags and attributes
		var startTag = /^<([\w\:]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
				endTag = /^<\/([\w\:]+)[^>]*>/,
				attr = /([\w\-:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
			   
		// Empty Elements - HTML 4.01
		var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

		// Block Elements - HTML 4.01
		var block = makeMap("address,applet,blockquote,button,center,dd,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");

		// Inline Elements - HTML 4.01
		var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

		// Elements that you can, intentionally, leave open
		// (and which close themselves)
		var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

		// Attributes that have their values filled in disabled="disabled"
		var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

		// Special Elements (can contain anything)
		// serge.che: parsing data inside <scipt> elements is a "feature"
//	  var special = makeMap("script,style");
		var special = makeMap("style");
	   

		var HTMLParser = this.HTMLParser = function( html, handler ) {
				var index, chars, match, stack = [], last = html;
				stack.last = function(){
						return this[ this.length - 1 ];
				};
			   
				var ix = 0;
			   
				while ( html && !handler.stop ) {
						chars = true;

						// Make sure we're not in a script or style element
						if ( !stack.last() || !special[ stack.last() ] ) {

								// Comment
								if ( html.indexOf("<!--") == 0 ) {
										index = html.indexOf("-->");
	   
										if ( index >= 0 ) {
												if ( handler.comment )
														handler.comment( html.substring( 4, index ), ix, ix + index + 3 );
												html = html.substring( index + 3 );
												ix += index + 3;
												chars = false;
										}
								// doctype declaration
								} else if ( html.indexOf("<!DOCTYPE") == 0 ) {
										index = html.indexOf(">");
	   
										if ( index >= 0 ) {
												html = html.substring( index + 1 );
												ix += index + 1;
												chars = false;
										}
	   
								// end tag
								} else if ( html.indexOf("</") == 0 ) {
										match = html.match( endTag );
	   
										if ( match ) {
												html = html.substring( match[0].length );
												match[0].replace( endTag, parseEndTag );
												ix += match[0].length;
												chars = false;
										}
	   
								// start tag
								} else if ( html.indexOf("<") == 0 ) {
										match = html.match( startTag );
	   
										if ( match ) {
												html = html.substring( match[0].length );
												match[0].replace( startTag, parseStartTag );
												ix += match[0].length;
												chars = false;
										}
								}

								if ( chars ) {
										index = html.indexOf("<");
									   
										var text = index < 0 ? html : html.substring( 0, index );
										html = index < 0 ? "" : html.substring( index );
									   
										if (index > -1)
												ix += index;
									   
										if ( handler.chars )
												handler.chars( text );
								}

						} else {
								var end_tag = '</' + stack.last() + '>',
										end_tag_ix = html.indexOf(end_tag);
									   
								if (end_tag_ix != -1) {
										if ( handler.chars )
												handler.chars( html.substring(0, end_tag_ix) );
									   
										ix += end_tag_ix + end_tag.length;
										html = html.substring(end_tag_ix + end_tag.length);	
								}
							   
								parseEndTag( "", stack.last() );
						}

						if ( html == last )
								throw "Parse Error: " + html;
						last = html;
				}
			   
				// Clean up any remaining tags
				parseEndTag();

				function parseStartTag( tag, tagName, rest, unary ) {
						if ( block[ tagName ] ) {
								while ( stack.last() && inline[ stack.last() ] ) {
										parseEndTag( "", stack.last() );
								}
						}

						if ( closeSelf[ tagName ] && stack.last() == tagName ) {
								parseEndTag( "", tagName );
						}

						unary = empty[ tagName ] || !!unary;

						if ( !unary )
								stack.push( tagName );
					   
						if ( handler.start ) {
								var attrs = [];
	   
								rest.replace(attr, function(match, name) {
										var value = arguments[2] ? arguments[2] :
												arguments[3] ? arguments[3] :
												arguments[4] ? arguments[4] :
												fillAttrs[name] ? name : "";
									   
										attrs.push({
												name: name,
												value: value,
												escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
										});
								});
	   
								if ( handler.start )
										handler.start( tagName, attrs, unary, ix, ix + tag.length );
						}
				}

				function parseEndTag( tag, tagName ) {
						// If no tag name is provided, clean shop
						if ( !tagName )
								var pos = 0;
							   
						// Find the closest opened tag of the same type
						else
								for ( var pos = stack.length - 1; pos >= 0; pos-- )
										if ( stack[ pos ] == tagName )
												break;
					   
						if ( pos >= 0 ) {
								// Close all the open elements, up the stack
								for ( var i = stack.length - 1; i >= pos; i-- )
										if ( handler.end )
												handler.end( stack[ i ], ix, ix + tag.length );
							   
								// Remove the open elements from the stack
								stack.length = pos;
						}
				}
		};
	   
		HTMLParser.startTag = startTag;
		HTMLParser.endTag = endTag;


		function makeMap(str){
				var obj = {}, items = str.split(",");
				for ( var i = 0; i < items.length; i++ )
						obj[ items[i] ] = true;
				return obj;
		}
})();
(function($) {
		$.fn.zen = function(input) {
				$(this).append(zen_coding.expandAbbreviation(input, 'html', 'xhtml'));
				get = input.replace(/([.[*:+][a-zA-Z0-9]*)|(#.*\$[a-zA-Z0-9]*)/g,'').replace(/>/g,' ');

				return $(this).find(get.toString());
		};
})(jQuery);