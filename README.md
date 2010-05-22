Introduction
============

This project is based on the core idea of [Zen Coding](http://code.google.com/p/zen-coding/), but while Zen Coding it aimed at creating skeleton codes, this project is aimed at creating full HTML based on a CSS like template.

So first it might be good to mention a few difference from Zen Coding:

 * E\*N and E\*N$ are not included because they are not useful for the purpose of dynamically creating HTML code based on a template.  Also, their functionality can be implemented in a different form, which I believe feels more natural.
 * filters are not included as the purpose is only to generate HTML code.

Other than those two items, the rest of the syntax in Zen Coding should be the same.

Now for some new stuff:

 * **!...!** - Everything contained within exclamation points is interperted as javascript code, and the restult of which is used in its place in the final HTML.
 * **!for:...!E** - This tells the next items to loop through an array, and use its values instead of the data as a whole.
 * **E{...}** - Everything within '{' and '}' are the contents of E.

Usage
=====

**$.zc(ZenCode)** - returns the HTML string represented by the ZenCode string

**$.zc(ZenObject)** - returns the HTML string represented by the ZenObject.main while using the rest of ZenObject for references.

**$.zc(ZenCode, data)** - return the HTML string represented by the ZenCode template using the given data.

**$.zc(ZenObject, data)** - Same as **$.zc(ZenObject)** except that it also references data for javascript parsing.

Examples
========

Please refer to the [wiki](http://wiki.github.com/zodoz/jquery-ZenCoding/) for examples.
