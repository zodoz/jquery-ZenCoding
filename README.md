Introduction
============

This project is based on the core idea of [Zen Coding](http://code.google.com/p/zen-coding/), which is to use standard CSS Search Strings to create HTML.  However, the language of what was "CSS Search Strings" has been significantly modified so that it can operate as a powerful templating engine using jQuery to do all DOM manipulations.

Usage
=====

**$.zc(ZenCode)** - returns the HTML string represented by the ZenCode string

**$.zc(ZenObject)** - returns the HTML string represented by the ZenObject.main while using the rest of ZenObject for references.

**$.zc(ZenCode, data)** - return the HTML string represented by the ZenCode template using the given data.

**$.zc(ZenObject, data)** - Same as **$.zc(ZenObject)** except that it also references data for javascript parsing.

Examples
========

Please refer to the [wiki](http://wiki.github.com/zodoz/jquery-ZenCoding/) for examples.  Further language specifications are below.

Definitions
===========

**Element** - A DOM Element.<br>
**Tag** - String representation of an Element type (e.i. div, span, a, etc.)<br>
**ZenCode** - A string formatted in the language specified below to represent a template of the HTML Element(s) to be created.<br>
**ZenObject** - A JavaScript object representating one or more ZenCode(s).  Every ZenObject must specify a ZenCode in "main".<br>
**data** - An optional JavaScript object or array sent with the ZenObject<br>
**data.functions** - An optional JavaScript object defining functions.<br>

Syntax
======

**E** - ***E*** is a Tag which will be created into an Element<br>
**E#id** - ***id*** is the string ID of ***E***.  If ***E*** is not defined, ***E*** is assumed to be "div".<br>
**E.class** - ***class*** is the string class name of a class of ***E***.  If ***E*** is not defined, ***E*** is assumed to be "div".<br>
**E>E2** - ***E2*** is the child of ***E***<br>
**E+E2** - ***E2*** is a sibling of ***E***<br>
**E[attr]** - ***attr*** is a blank attribute of ***E***<br>
**E[attr="value"]** - ***attr*** is an attribute with value ***value*** of ***E***<br>
**E{value}** - ***value*** is assigned as the contents of ***E***.  If ***E*** is not definded, ***E*** is assumed to be "span".<br>
**(E...)** - group one or more Tags<br>
**E~event** - ***event*** is the string representation of an event of ***E*** which is associated with function ***event*** in data<br>
**E~event=fn** - ***event*** is the string representation of an event of ***E*** which is associated with function ***fn*** in data<br>
**E&data** - ***data*** is the string of an object within data to be mapped to ***E*** as ***data*** via $.data(***data***,***data***)<br>
**E&data=reference** - ***reference*** is the string of an object within data to be mapped to ***E*** as ***data*** via $.data(***data***,***reference***)<br>
**@reference** - When using a ZenObject M, ***reference*** should be a string representation of a ZenCode N within M which will replace the ***@reference*** in the running ZenCode.<br>
**!js!** - The value returned by executing ***js*** will replace ***!js!*** in the ZenCode<br>
**!if:js!E** - Creates ***E*** only if the restult returned by executing ***js*** is not undefined, null, or flase.<br>
**!for:var!E** - If ***var*** is a string matching an object in data, then N number of ***E*** are created using ***var*** as data where N is the number of elements in ***var***.<br>
**!for:index:var!E** - If ***var*** is a string matching an object in data, then N number of ***E*** are created using ***var*** as data and a new accessable object with the same name as the string ***index*** where N is the number of elements in ***var***.<br>
