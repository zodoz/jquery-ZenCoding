$().ready(function() {
	$('#area').val('');
	var count=0;
	function test(ZenCode,data) {
		var area = $('#area');
		area.append(
			$('<div id=\'test('+ZenCode+')\'></div>').append($.zc(ZenCode,data))
		);
	}
	/*
	- tag
	- tag#id
	- tag.class
	- tag.class.class2
	- tag#id.class???
	- tag.class#id???
	- tag>tag2
	- tag#id>tag2
	- tag.class>tag2
	- tag>tag2#id
	- tag>tag2.class
	- tag#id>tag2#id
	- tag#id>tag2.class
	- tag.class>tag2#id
	- tag.class+tag2.class
	- tag+tag2
	- tag#id+tag2
	- tag.class+tag2
	- tag+tag2#id
	- tag+tag2.class
	- tag#id+tag2#id
	- tag#id+tag2.class
	- tag.class+tag2#id
	- tag.class+tag2.class
	*/

	test('tag');
	test('tag#id');
	test('tag.class');
	test('tag.class.class2');
	test('tag#id.class.class2');
	test('tag>tag2+tag3');
	test('tag+tag2');
	test('head>link');
	test('span[title="Hello" rel]');
	test('span[title="hello" rel]#name.one.two');
	test('(div#page>(div#header>ul#nav>li>a)+(h1>span)+p+p)+div#footer');
	test('#page>(div#header>ul#nav>li>a)+(h1>span)+p+p+#footer');

	var data = {
		contacts: [
			{
				name: 'Bob',
				email: 'bob@s.com',
				bio: 'Some stuff Bob does.'
			}, {
				name: 'Jill',
				email: 'jill@s.com',
				bio: 'Some stuff Jill does.'
			}
		]
	};
	var zenContacts =
		'#comment{There are !contacts.length! contacts:}'+
		'+!for:contacts!'+
			'.contact>'+
				'(.name{!name!}'+
				'+.email>a.email[href="mailto:!email!"]{email}'+
				'+.info{!bio!})';
	test(zenContacts,data);
});
