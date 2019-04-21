;(function () {
  var x = Function('return this')(); if (!x.fest)x.fest = {}; x.fest['components/Board/Board.tmpl'] = function (__fest_context) {
    'use strict'; var __fest_self = this; var __fest_buf = ''; var __fest_chunks = []; var __fest_chunk; var __fest_attrs = []; var __fest_select; var __fest_if; var __fest_iterator; var __fest_to; var __fest_fn; var __fest_html = ''; var __fest_blocks = {}; var __fest_params; var __fest_element; var __fest_debug_file = ''; var __fest_debug_line = ''; var __fest_debug_block = ''; var __fest_element_stack = []; var __fest_short_tags = { 'area': true, 'base': true, 'br': true, 'col': true, 'command': true, 'embed': true, 'hr': true, 'img': true, 'input': true, 'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true, 'wbr': true }; var __fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g; var __fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/; var __fest_htmlchars = /[&<>"]/g; var __fest_htmlchars_test = /[&<>"]/; var __fest_jshash = { '"': '\\"', '\\': '\\\\', '/': '\\/', '\n': '\\n', '\r': '\\r', '\t': '\\t', '\b': '\\b', '\f': '\\f', "'": "\\'", '<': '\\u003C', '>': '\\u003E' }; var __fest_htmlhash = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }; var __fest_escapeJS = function __fest_escapeJS (value) {
      if (typeof value === 'string') {
        if (__fest_jschars_test.test(value)) {
          return value.replace(__fest_jschars, __fest_replaceJS)
        }
      }

      return value == null ? '' : value
    }; var __fest_replaceJS = function __fest_replaceJS (chr) {
      return __fest_jshash[chr]
    }; var __fest_escapeHTML = function __fest_escapeHTML (value) {
      if (typeof value === 'string') {
        if (__fest_htmlchars_test.test(value)) {
          return value.replace(__fest_htmlchars, __fest_replaceHTML)
        }
      }

      return value == null ? '' : value
    }; var __fest_replaceHTML = function __fest_replaceHTML (chr) {
      return __fest_htmlhash[chr]
    }; var __fest_extend = function __fest_extend (dest, src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dest[key] = src[key]
        }
      }
    }; var __fest_param = function __fest_param (fn) {
      fn.param = true
      return fn
    }; var i18n = __fest_self && typeof __fest_self.i18n === 'function' ? __fest_self.i18n : function (str) { return str }; var ___fest_log_error; if (typeof __fest_error === 'undefined') { ___fest_log_error = (typeof console !== 'undefined' && console.error) ? function () { return Function.prototype.apply.call(console.error, console, arguments) } : function () {} } else { ___fest_log_error = __fest_error };function __fest_log_error (msg) { ___fest_log_error(msg + '\nin block "' + __fest_debug_block + '" at line: ' + __fest_debug_line + '\nfile: ' + __fest_debug_file) } function __fest_call (fn, params, cp) { if (cp) for (var i in params) if (typeof params[i] === 'function' && params[i].param)params[i] = params[i](); return fn.call(__fest_self, params) } var data = __fest_context; __fest_buf += ('<div class="header"><div class="header__home"><img src="\/images\/home.svg" class="header__home-button js-header__home-button"/></div><div class="header__logo"><h1 class="header__title">Penguins Wars</h1></div></div><div class="leaders-content"><p class="leaders__header">Таблица лидеров</p><table cellpadding="0" cellspacing="0" class="leaders__table"><tbody class="table__body">'); var i, v, __fest_to0, __fest_iterator0; try { __fest_iterator0 = data || []; __fest_to0 = __fest_iterator0.length } catch (e) { __fest_iterator0 = []; __fest_to0 = 0; __fest_log_error(e.message) } for (i = 0; i < __fest_to0; i++) { v = __fest_iterator0[i]; __fest_buf += ('<tr class="table__row"><td>'); try { __fest_buf += (__fest_escapeHTML(v.Page * 3 + i - 2)) } catch (e) { __fest_log_error(e.message + '25') }__fest_buf += ('.</td><td>'); try { __fest_buf += (__fest_escapeHTML(v.login)) } catch (e) { __fest_log_error(e.message + '26') }__fest_buf += ('</td><td>'); try { __fest_buf += (__fest_escapeHTML(v.score)) } catch (e) { __fest_log_error(e.message + '27') }__fest_buf += ('</td></tr>') }__fest_buf += ('</tbody></table><div class="leaders__buttons"><img src="\/images\/prev.svg" class="leaders__button js-button-prev leaders__button__disabled"/><div class="leaders__page-number">'); try { __fest_buf += (__fest_escapeHTML(data[0].Page)) } catch (e) { __fest_log_error(e.message + '34') }__fest_buf += ('</div><img src="\/images\/next.svg" class="leaders__button js-button-next"/></div></div>'); __fest_to = __fest_chunks.length; if (__fest_to) { __fest_iterator = 0; for (;__fest_iterator < __fest_to; __fest_iterator++) { __fest_chunk = __fest_chunks[__fest_iterator]; if (typeof __fest_chunk === 'string') { __fest_html += __fest_chunk } else { __fest_fn = __fest_blocks[__fest_chunk.name]; if (__fest_fn) __fest_html += __fest_call(__fest_fn, __fest_chunk.params, __fest_chunk.cp) } } return __fest_html + __fest_buf } else { return __fest_buf }
  }
})()
