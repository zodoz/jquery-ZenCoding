(function($) {
 	$.zc = function(ZenCode) {
		return createHTMLBlock(ZenCode);
	};

	function createHTMLBlock(ZenCode) {
		var regBlock = /((\w+)[#.]?)+/gi,
			regTag = /(\w+)/i,
			regId = /#(\w+)/i,
			regClass = /\.(\w+)/i;
		var blocks = ZenCode.match(regBlock);
		console.log(blocks);
		if(blocks.length < 1)	//no more blocks to match
			return;
		var block = blocks[0];	//actual block to create
		if(regId.test(block))
			var blockId = regId.exec(block)[1];
		var blockClasses = getClasses(block);
		var blockTag = regTag.exec(block)[1];
		var el = $('<'+blockTag+'/>', {
			id: blockId,
			class: blockClasses
		});
		ZenCode = ZenCode.substr(blocks[0].length);
		if(ZenCode.length > 0) {
			console.log(ZenCode);
			if(ZenCode[0] == '+') {
				//el.after(createHTMLBlock(ZenCode.substr(1)));
				var el2 = createHTMLBlock(ZenCode.substr(1));
				console.log('before insert');
				var el = $([el, el2]);
				console.log(el);
				console.log('after insert');
				//el2.insertAfter(el);
			}
			else if(ZenCode[0] == '>')
				//el.append(createHTMLBlock(ZenCode.substr(1)));
				createHTMLBlock(ZenCode.substr(1)).appendTo(el);
		}
		console.log(el);
		console.log('returning');
		return el;
	}

	function getClasses(ZenBlock) {
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
 })(jQuery);
