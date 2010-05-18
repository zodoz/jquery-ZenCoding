$().ready(function() {
	$('#area').val('');
	var count=0;
	function test(ZenCode) {
		var area = $('#area');
		area.append(
			$('<div id="test('+ZenCode+')"></div>').append($.zc(ZenCode))
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
	test('tag+tag2');
	test('tag>tag2+tag3');
});
