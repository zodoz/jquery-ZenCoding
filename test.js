$().ready(function() {
	$('#area').val('');
	var count=0;
	function test(ZenCode,data,answer) {
		if(typeof data == 'string') {
			answer = data;
			data = undefined;
		}
		var area = $('#area');
		var debug = answer===undefined;
		var zc = $.zc(ZenCode,data,debug);
		var ZenMain = $.isPlainObject(ZenCode)?ZenCode.main:ZenCode;
		if(answer !== undefined) {
			var result = compareElements(zc,answer);
			if(result.result)
				pass = '<font color="green">pass</font>';
			else
				pass = getFailCode(zc,answer);
			area.append(
				$('<div>test: "'+ZenMain+'" -> '+pass+'</div>'));
		} else {
			console.log('debug = on');
			area.append(
				$("<div>").append(zc));
		}
	}

	function htmlEncode(str) {
		return str.replace(/\>/g,'&gt;').replace(/\</g,'&lt;');
	}

	function getFailCode(str,answer) {
		var res = compareElements(str,answer);
		str = htmlEncode(res.el1);
		answer = htmlEncode(res.el2);
		return '<font color="red">fail</font>: <br>'+str+'<br>'+answer;
	}

	function compareElements(el1, el2) {
		el1 = $(el1), el2 = $(el2);
		var strEl1 = $('<div>').append($(el1.clone()[0].normalize())).html();
		var strEl2 = $('<div>').append($(el2.clone()[0].normalize())).html();
		return {
			result: (strEl1 == strEl2),
			el1: strEl1,
			el2: strEl2
		}
	}

	test('tag','<tag></tag>');
	test('tag#id','<tag id="id"></tag>');
	test('tag.class','<tag class="class"></tag>');
	test('tag.class.class2','<tag class="class class2"></tag>');
	test('tag#id.class.class2','<tag class="class class2" id="id"></tag>');
	test('tag>tag2+tag3','<tag><tag2></tag2><tag3></tag3></tag>');
	test('tag+tag2','<tag></tag><tag2></tag2>');
	//test('head>link','<head><link></head>');  //test passes in chrome, but the tester fails becuase $('<head>') in chrome results in nothing for some reason...?
	console.log('test1');
	test('#page>.content>p+.test',
		'<div id="page"><div class="content"><p></p><div class="test">'+
		'</div></div></div>');
	test('span[title="Hello" rel]','<span rel="" title="Hello"></span>');
	test('span[title="Hello" rel]#name.one.two',
		'<span class="one two" id="name" rel="" title="Hello"></span>');
	test('(div#page>(div#header>ul#nav>li>a)+(h1>span)+p+p)+div#footer',
		'<div id="page">'+
			'<div id="header">'+
				'<ul id="nav">'+
					'<li><a></a></li>'+
				'</ul>'+
			'</div>'+
			'<h1><span></span></h1>'+
			'<p></p><p></p>'+
		'</div>'+
		'<div id="footer"></div>');
	test('#page>(div#header>ul#nav>li>a)+(h1>span)+p+p+#footer',
		'<div id="page">'+
			'<div id="header">'+
				'<ul id="nav">'+
					'<li><a></a></li>'+
				'</ul>'+
			'</div>'+
			'<h1><span></span></h1>'+
			'<p></p><p></p>'+
			'<div id="footer"></div>'+
		'</div>');

	var data = {
		contacts: [
			{
				name: 'Bob',
				email: 'bob@s.com',
				bio: 'Some stuff Bob does.',
				children: ["boy","girl"]
			}, {
				name: 'Jill',
				email: 'jill@s.com',
				bio: 'Some stuff Jill does.',
				children: []
			}
		],
		list: ['one','two','three']
	};
	var zenContacts =
		'#comment{There are !contacts.length! contacts:}'+
		'+!for:contacts!'+
			'.contact>'+
				'(.name{!name!}'+
				'+(.email>a.email[href="mailto:!email!"]{email})'+
				'+.info{!bio!})'+
		'+.message{hi!}'+
		'+ul>!for:i:list!li{!(i+1)!. !value!}';

	var answer =
		'<div id="comment">There are 2 contacts:</div>'+
		'<div class="contact">'+
			'<div class="name">Bob</div>'+
			'<div class="email">'+
				'<a class="email" href="mailto:bob@s.com">email</a>'+
			'</div>'+
			'<div class="info">Some stuff Bob does.</div>'+
		'</div>'+
		'<div class="contact">'+
			'<div class="name">Jill</div>'+
			'<div class="email">'+
				'<a class="email" href="mailto:jill@s.com">email</a>'+
			'</div>'+
			'<div class="info">Some stuff Jill does.</div>'+
		'</div>'+
		'<div class="message">hi!</div>'+
		'<ul>'+
			'<li>1. one</li>'+
			'<li>2. two</li>'+
			'<li>3. three</li>'+
		'</ul>';
	test(zenContacts,data,answer);

	var ZenContactList = {
		main: '#msg{Test of referencing:}+@contacts',
		contacts: zenContacts
	};
	var answer = '<div id="msg">Test of referencing:</div>'+answer;
	console.log('first reference test');
	test(ZenContactList,data,answer);

	var ZenContactList2 = {
		main: '#msg2{Another Test:}+@contacts',
		contacts: ZenContactList
	};
	var answer = '<div id="msg2">Another Test:</div>'+answer;
	test(ZenContactList2,data,answer);

	var zen =
		'.contacts>'+
			'!if:contacts.length>0!ul>!for:contacts!li'+
				'{!name!}'+// !children?"has children:":""!}'+
			'>!if:children!ul>!for:children!li{!value!}';
	var answer =
		'<div class="contacts">'+
			'<ul>'+
				'<li>Bob'+
					'<ul>'+
						'<li>boy</li>'+
						'<li>girl</li>'+
					'</ul>'+
				'</li>'+
				'<li>Jill</li>'+
			'</ul>'+
		'</div>';
	test(zen,data,answer);

	var data = {
		contacts: [
			{
				name: 'Bob',
				email: 'bob@s.com',
				bio: 'Some stuff Bob does.',
				children: [
					{
						name: 'Cody',
						gender: 'male'
					}, {
						name: 'Julie',
						gender: 'female'
					}
				]
			}
		]
	};
	var Zen =
		'ul>!for:contacts!li{!name!}>'+
			'!if:children.length>0!ul>!for:children!li.!gender!{!name!}';
	var answer =
		'<ul>'+
			'<li>Bob'+
				'<ul>'+
					'<li class="male">Cody</li>'+
					'<li class="female">Julie</li>'+
				'</ul>'+
			'</li>'+
		'</ul>';
	test(Zen,data,answer);

	var zen =
		'.div>('+
			'a[href="#"]{link}'+
			'+{ to somewhere.}'+
		')';
	test(zen,data);

	var testfn = function(evt) {
		console.log('running test function');
		console.log(evt);
	}
	var zen = 'div[style="cursor:pointer"]-click=testfn{click me!}-dblclick=testfn';
	var data = {
		functions: {
			testfn: testfn
		}
	};
	test(zen,data);

	var zen = ".person{!value!}"
	var data = ['Mike','Will','Chris'];
	test(zen,data);

	var zen = '#databind&test=test1{test1}+#databind2&test2{test2}';
	var data = {
		test1: 'hello',
		test2: 'hello2'
	};
	test(zen,data);
	console.log($('#databind').data('test'));
	console.log($('#databind2').data('test2'));//*/

	var zen = {
		main: '@recurse',
		recurse: '!for:replies!.reply{!msg!}>@recurse'
	};
	var data = {
		replies: [
			{
				msg: 'msg1',
				replies: [
					{
						msg: 'hello msg1',
					}, {
						msg: 'hi again msg1'
					}
				]
			}, {
				msg: 'msg2',
				replies: [
					{
						msg: 'hello msg2',
					}, {
						msg: 'hi again msg2'
					}
				]
			}
		]
	};
	test(zen,data);
});
