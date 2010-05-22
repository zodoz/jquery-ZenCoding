$().ready(function() {
	$('#area').val('');
	var count=0;
	function test(ZenCode,data,answer) {
		if(typeof data == 'string') {
			answer = data;
			data = undefined;
		}
		var area = $('#area');
		/*area.append(
			$('<div id=\'test('+ZenCode+')\'></div>').append($.zc(ZenCode,data))
		);*/
		var zc = $.zc(ZenCode,data);
		if(answer !== undefined) {
			if(zc==answer)
				pass = '<font color="green">pass</font>';
			else
				pass = getFailCode(zc,answer);
			area.append(
				$('<div>test: "'+ZenCode+'" -> '+pass+'</div>'));
		} else
			area.append(
				$("<div id='test("+ZenCode+")'>"+$.zc(ZenCode,data,true)+'</div>'));
	}

	function htmlEncode(str) {
		return str.replace(/\>/g,'&gt;').replace(/\</g,'&lt;');
	}

	function getFailCode(str,answer) {
		str = htmlEncode(str);
		answer = htmlEncode(answer);
		return '<font color="red">fail</font>: <br>'+str+'<br>'+answer;
	}

	test('tag','<tag></tag>');
	test('tag#id','<tag id="id"></tag>');
	test('tag.class','<tag class="class"></tag>');
	test('tag.class.class2','<tag class="class class2"></tag>');
	test('tag#id.class.class2','<tag class="class class2" id="id"></tag>');
	test('tag>tag2+tag3','<tag><tag2></tag2><tag3></tag3></tag>');
	test('tag+tag2','<tag></tag><tag2></tag2>');
	test('head>link','<head><link></head>');
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
				children: [
					{
						name: 'boy'
					}, {
						name: 'girl'
					}
				]
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
	test(zenContacts,data,answer);//*/
});
