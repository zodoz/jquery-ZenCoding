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

**Element** - HTML element within the DOM.
**Tag** - String representation of an Element type (e.i. div, span, a, etc.)
**ZenCode** - The string formatted in the language specified below to represent a template of the HTML Element(s) to be returned.
**ZenObject** - A JavaScript object representating one or more ZenCode.  The ZenObject must specify a ZenCode in "main".
**data** - The optional JavaScript object or array sent with the ZenObject
**data.functions** = The optional JavaScript object defining functions.

Syntax
======

**E** - *E* is a Tag which will be created into an Element
**E#id** - *id* is the string ID of *E*.  If *E* is not defined, *E* is assumed to be "div".
**E.class** - *class* is the string class name of a class of *E*.  If *E* is not defined, *E* is assumed to be "div".
**E>E2** - *E2* is the child of *E*
**E+E2** - *E2* is a sybling of *E*
**E[attr]** - *attr* is a blank attribute of *E*
**E[attr="value"]** - *attr* is an attribute with value *value* of *E*
**E{value}** - *value* is assigned as the contents of *E*.  If *E* is not devinded, *E* is assumed to be "span".
**(E...)** - groups one or more Tags
**E-event** - *event* is the string representation of an event of *E* which is associated with function *event* in data
**E-event=fn** *event* is the string representation of an event of *E* which is associated with function *fn* in data
**E&data** - *data* is the string of an object within data to be mapped to *E* as *data* via $.data(*data*,*data*)
**E&data=reference** - *reference* is the string of an object within data to be mapped to *E* as *data* via $.data(*data*,*reference*)
**!js!** - The value returned by executing *js* will replace *!js!* in the ZenCode
**!if:js!E** - Creates *E* only if the restult returned by executing *js* is not undefined, null, or flase.
**!for:var!E** - If *var* is a string matching an object in data, then N number of *E* are created using *var* as data where N is the number of elements in *var*.
**!for:index:var!E** - If *var* is a string matching an object in data, then N number of *E* are created using *var* as data and a new accessable object with the same name as the string *index* where N is the number of elements in *var*.
