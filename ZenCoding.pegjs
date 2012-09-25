start
  = ZenDefinitionGroup

ZenDefinitionGroup
  = ContinueDef? "(" ContinueDef?
        def:MultipleZenDefinitions
      ContinueDef? ")" ContinueDef?
      {
        return def;
      }
    / MultipleZenDefinitions

MultipleZenDefinitions
  = ContinueDef? def:ZenDefinition ContinueDef? "+" 
      defs:ZenDefinitionGroup
      {
        var allDefs;
        if(def.length>0) {
          allDefs = def;
        } else {
          allDefs = [def];
        }
        for(var i=0; i<defs.length; i++) {
          allDefs.push(defs[i]);
        }
        return allDefs;
      } //sibling
    / ContinueDef? def:ZenDefinition ContinueDef?
      {
        if(def.length>0) {
          return def;
        } else {
          return [def];
        }
      }

ZenDefinition
  = ContinueDef? el:HTMLElement? id:CSSId? classes:CSSClass*
      attrs:CSSAttributes? val:ZenValue? child:ZenChild?// EOL
    {
      var ret = { "element": el || "div" };
      if(id !== undefined) {
        ret.id = id;
      }
      if(classes.length > 0) {
        ret.classes = classes;
      }
      if(attrs.length > 0) {
        ret.attributes = attrs;
      }
      if(val !== undefined && val != "") {
        ret.value = val
      }
      if(child !== undefined && child.length>0) {
        ret.children = child;
      }
      console.log("reting ZenDef", ret);
      return ret;
    }

ZenChild
  = ContinueDef? ">" def:ZenDefinitionGroup { return def; }

ZenValue
  = ContinueDef? "{" str:ZenValueString? "}" { return str; }

ZenValueString
  = chars:ZenStringCharacter+ { return chars.join(""); }

ZenStringCharacter
  = !("}" / "\\") char_:. { return char_; }
    //had to use str cuz `return "}";` wouldn't compile.
    / str:"\\}" { return str[1]; }
    / "\\!" { return "\\!"; }
    / LineContinuation

CSSId
  = ContinueDef? "#" id:CSSident { return id; }

CSSClass "CSSClass"
  = ContinueDef? "." clazz:CSSident { return clazz; }

CSSAttributes
  = ContinueDef? "[" attrs:CSSAttributeList ContinueDef? "]" { return attrs; }

CSSAttributeList
  = attr:CSSAttribute otherAttrs:(ContinueDef? "," _? CSSAttribute)* {
      if(attr === undefined) {
        return [];
      }
      var attrArray = [attr];
      if(otherAttrs.length > 0) {
        for(var i=0; i<otherAttrs.length; i++) {
          attrArray.push(otherAttrs[i][3]);
        }
      }
      return attrArray;
    }

CSSAttribute
  = ContinueDef? name:CSSident value:("=" ContinueDef? StringLiteral)? {
      var ret = {
        "name": name,
        "value": value[2]
      };

      return ret;
    }

CSSident
  = [-]? firstChar:CSSnmstart rest:CSSnmchar* { return firstChar+rest.join(""); }

CSSnmstart
  = [_a-z]i

CSSnmchar
  = [_a-z0-9-]i

// {{{1Copied StringLiteral from PEG.js javascript example
StringLiteral "string"
  = parts:('"' DoubleStringCharacters? '"' / "'" SingleStringCharacters? "'") {
      return parts[1];
    }

DoubleStringCharacters
  = chars:DoubleStringCharacter+ { return chars.join(""); }

SingleStringCharacters
  = chars:SingleStringCharacter+ { return chars.join(""); }

DoubleStringCharacter
  = !('"' / "\\" / EOL) char_:. { return char_;     }
  / "\\" sequence:EscapeSequence                         { return sequence;  }
  / LineContinuation

SingleStringCharacter
  = !("'" / "\\" / EOL) char_:. { return char_;     }
  / "\\" sequence:EscapeSequence                         { return sequence;  }
  / LineContinuation

LineContinuation
  = "\\" sequence:EOL { return sequence; }

EscapeSequence
  = CharacterEscapeSequence
  / "0" ![0-9] { return "\0"; }
  / HexEscapeSequence
  / UnicodeEscapeSequence

CharacterEscapeSequence
  = SingleEscapeCharacter
  / NonEscapeCharacter

SingleEscapeCharacter
  = char_:['"\\bfnrtv] {
      return char_
        .replace("b", "\b")
        .replace("f", "\f")
        .replace("n", "\n")
        .replace("r", "\r")
        .replace("t", "\t")
        .replace("v", "\x0B") // IE does not recognize "\v".
    }

EscapeCharacter
  = SingleEscapeCharacter
  / [0-9]
  / "x"
  / "u"

HexEscapeSequence
  = "x" h1:HexDigit h2:HexDigit {
      return String.fromCharCode(parseInt("0x" + h1 + h2));
    }

UnicodeEscapeSequence
  = "u" h1:HexDigit h2:HexDigit h3:HexDigit h4:HexDigit {
      return String.fromCharCode(parseInt("0x" + h1 + h2 + h3 + h4));
    }

NonEscapeCharacter
  = (!EscapeCharacter / EOL) char_:. { return char_; }

HexDigit
  = [0-9a-fA-F]
// end StringLiteral rules }}}1

HTMLElement
  = HTML5Element   //prefer HTML5 elements over HTML4
    / HTML4Element

/*
 * The below is all tags defined in:
 * http://dev.w3.org/html5/markup/elements.html
 */
HTML5Element
 = "a"i
 / "abbr"i
 / "address"i
 / "area"i
 / "article"i
 / "aside"i
 / "audio"i
 / "b"i
 / "base"i
 / "bdi"i
 / "bdo"i
 / "blockquote"i
 / "body"i
 / "br"i
 / "button"i     //group buttons
 / "canvas"i
 / "caption"i
 / "cite"i
 / "code"i
 / "col"i
 / "colgroup"i
 / "command"i   //group commands
 / "datalist"i
 / "dd"i
 / "del"i
 / "details"i
 / "dfn"i
 / "div"i
 / "dl"i
 / "dt"i
 / "em"i
 / "embed"i
 / "fieldset"i
 / "figcaption"i
 / "figure"i
 / "footer"i
 / "form"i
 / "h1"i
 / "h2"i
 / "h3"i
 / "h4"i
 / "h5"i
 / "h6"i
 / "head"i
 / "header"i
 / "hgroup"i
 / "hr"i
 / "html"i
 / "i"i
 / "iframe"i
 / "img"i
 / "input"i     //group inputs
 / "ins"i
 / "kbd"i
 / "keygen"i
 / "label"i
 / "legend"i
 / "li"i
 / "link"i
 / "map"i
 / "mark"i
 / "menu"i
 / "meta"i      //group metas
 / "meter"i
 / "nav"i
 / "noscript"i
 / "object"i
 / "ol"i
 / "optgroup"i
 / "option"i
 / "output"i
 / "p"i
 / "param"i
 / "pre"i
 / "progress"i
 / "q"i
 / "rp"i
 / "rt"i
 / "ruby"i
 / "s"i
 / "samp"i
 / "script"i
 / "section"i
 / "select"i
 / "small"i
 / "source"i
 / "span"i
 / "strong"i
 / "style"i
 / "sub"i
 / "summary"i
 / "sup"i
 / "table"i
 / "tbody"i
 / "td"i
 / "textarea"i
 / "tfoot"i
 / "th"i
 / "thead"i
 / "time"i
 / "title"i
 / "tr"i
 / "track"i
 / "u"i
 / "ul"i
 / "var"i
 / "video"i
 / "wbr"i

/*
 * TODO: there are tags in HTML4 absent in HTML5. Should this language
 *       be HTMLx agnostic, go with only one, or support all valid tags?
 *
 * The below is all tags defined in:
 * http://www.w3.org/TR/html4/index/elements.html
 */
HTML4Element //all tags defined in HTML4
  = "A"i
  / "ABBR"i
  / "ACRONYM"i
  / "ADDRESS"i
  / "APPLET"i
  / "AREA"i
  / "B"i
  / "BASE"i
  / "BASEFONT"i
  / "BDO"i
  / "BIG"i
  / "BLOCKQUOTE"i
  / "BODY O O"i
  / "BR"i
  / "BUTTON"i
  / "CAPTION"i
  / "CENTER"i
  / "CITE"i
  / "CODE"i
  / "COL"i
  / "COLGROUP"i
  / "DD"i
  / "DEL"i
  / "DFN"i
  / "DIR"i
  / "DIV"i
  / "DL"i
  / "DT"i
  / "EM"i
  / "FIELDSET"i
  / "FONT"i
  / "FORM"i
  / "FRAME"i
  / "FRAMESET"i
  / "H1"i
  / "H2"i
  / "H3"i
  / "H4"i
  / "H5"i
  / "H6"i
  / "HEAD O O"i
  / "HR"i
  / "HTML O O"i
  / "I"i
  / "IFRAME"i
  / "IMG"i
  / "INPUT"i
  / "INS"i
  / "ISINDEX"i
  / "KBD"i
  / "LABEL"i
  / "LEGEND"i
  / "LI"i
  / "LINK"i
  / "MAP"i
  / "MENU"i
  / "META"i
  / "NOFRAMES"i
  / "NOSCRIPT"i
  / "OBJECT"i
  / "OL"i
  / "OPTGROUP"i
  / "OPTION"i
  / "P"i
  / "PARAM"i
  / "PRE"i
  / "Q"i
  / "S"i
  / "SAMP"i
  / "SCRIPT"i
  / "SELECT"i
  / "SMALL"i
  / "SPAN"i
  / "STRIKE"i
  / "STRONG"i
  / "STYLE"i
  / "SUB"i
  / "SUP"i
  / "TABLE"i
  / "TBODY  O O"i
  / "TD"i
  / "TEXTAREA"i
  / "TFOOT"i
  / "TH"i
  / "THEAD"i
  / "TITLE"i
  / "TR"i
  / "TT"i
  / "U"i
  / "UL"i
  / "VAR"i

EOL
  = "\r\n" / "\n" / "\r"

_
  = "\t" / " "

/* Continue ZenDefinitions when encountering whitespace or newlines followed by
 * whitespace (for instance a \n\t sequence).
 */
ContinueDef
  = _* EOL _*
    / _* EOL ContinueDef
    / _+
