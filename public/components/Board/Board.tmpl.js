;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['components/Board/Board.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var data=__fest_context;__fest_buf+=("<div class=\"board__header\"><div class=\"board__header__home\"><img src=\"\/images\/home.svg\" class=\"board__header__home-button js-board__header__home-button\"/></div><div class=\"board__header__logo\"><h1 class=\"board__header__title\">Penguins Wars</h1></div></div><div class=\"leaders-content\"><p class=\"leaders__board__header\">Таблица лидеров</p><table cellpadding=\"0\" cellspacing=\"0\" class=\"leaders__table\"><thead class=\"table__board__header\"><tr class=\"table__header\"><th class=\"table__header__field\" width=\"15%\">№</th><th class=\"table__header__field\">Логин</th><th class=\"table__header__field\" width=\"15%\">Очки</th><th class=\"table__header__field\" width=\"25%\">Кол-во игр</th></tr></thead><tbody class=\"table__body\">");var i,v,__fest_to0,__fest_iterator0;try{__fest_iterator0=data || [];__fest_to0=__fest_iterator0.length;}catch(e){__fest_iterator0=[];__fest_to0=0;__fest_log_error(e.message);}for(i=0;i<__fest_to0;i++){v=__fest_iterator0[i];__fest_buf+=("<tr class=\"table__row\"><td class=\"table__row__field\">");try{__fest_buf+=(__fest_escapeHTML(data[0].Page*6+i-5))}catch(e){__fest_log_error(e.message + "27");}__fest_buf+=(".</td><td class=\"table__row__field\">");try{__fest_buf+=(__fest_escapeHTML(v.login))}catch(e){__fest_log_error(e.message + "28");}__fest_buf+=("</td><td class=\"table__row__field\">");try{__fest_buf+=(__fest_escapeHTML(v.score))}catch(e){__fest_log_error(e.message + "29");}__fest_buf+=("</td><td class=\"table__row__field\">");try{__fest_buf+=(__fest_escapeHTML(v.count))}catch(e){__fest_log_error(e.message + "30");}__fest_buf+=("</td></tr>");}__fest_buf+=("</tbody></table><div class=\"leaders__buttons\">");try{__fest_if=data[0].Page===1}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<img src=\"\/images\/prev_disabled.svg\" class=\"leaders__button js-button-prev\"/>");}else{__fest_buf+=("<img src=\"\/images\/prev.svg\" class=\"leaders__button js-button-prev\"/>");}__fest_buf+=("<div class=\"leaders__page-number\">");try{__fest_buf+=(__fest_escapeHTML(data[0].Page))}catch(e){__fest_log_error(e.message + "44");}__fest_buf+=("</div>");try{__fest_if=data[0].Right===true}catch(e){__fest_if=false;__fest_log_error(e.message);}if(__fest_if){__fest_buf+=("<img src=\"\/images\/next.svg\" class=\"leaders__button js-button-next\"/>");}else{__fest_buf+=("<img src=\"\/images\/next_disabled.svg\" class=\"leaders__button js-button-next\"/>");}__fest_buf+=("</div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();