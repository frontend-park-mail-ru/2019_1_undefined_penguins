import { RENDER_TYPES } from '../../utils/constants.js';
import { makeSafe } from '../../utils/safe.js';

export class BoardComponent {
	constructor({
		el = document.body,
		type = RENDER_TYPES.DOM,
	} = {}) {
		this._el = el;
		this._type = type;
	}
	/**
	 * Возврат значения data.
	 * @return  Значение data
	 */
	get data() {
		return this._data;
	}
	/**
	 * Установка значения data.
	 * @param d - Входные данные
	 */
	set data(d = []) {
		this._data = d;
	}
	/**
	 * Рендеринг страницы с помощью DOM
	 */
	_renderDOM() {
		const table = document.createElement('table');
		const thead = document.createElement('thead');
		thead.innerHTML = `
			<tr>
				<th>Email</th>
				<th>Score</th>
			</th>
		`;
    const tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);
    table.border = 1;
    table.cellSpacing = table.cellPadding = 0;

    this._data.forEach(function ({
      email = 'test@mail.ru',
      score = 100500,
    } = {}) {
      const tr = document.createElement('tr');
      const tdEmail = document.createElement('td');
      const tdScore = document.createElement('td');

      tr.classList.add('table__row');

      tdEmail.innerHTML = makeSafe(email);
      tdScore.textContent = score;

      tr.appendChild(tdEmail);
      tr.appendChild(tdScore);

      tbody.appendChild(tr);

			this._el.appendChild(table);
		}.bind(this));
	}
	/**
	 * Рендеринг страницы с помощью HTML-вставок
	 */
	_renderString() {
		this._el.innerHTML = `
			<table border="1" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Email</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					${this._data
    .map(({
      email = 'test@mail.ru',
      score = 100500,
    } = {}) => `
								<tr class="table__row">
									<td>${email}</td>
									<td>${score}</td>
								</tr>
							`)
    .join('\n')
}
				</tbody>
			</table>
		`;
  }

	/**
	 * Рендеринг страницы с помощью шаблонизатора
	 */
	__renderTmpl() {
		this._el.innerHTML = window.fest['components/Board/Board.tmpl'](this._data);
	}
  
	/**
	 * Рендеринг страницы 
	 */
	render() {
		switch(this._type) {
			case RENDER_TYPES.DOM:
				this._renderDOM();
				break;
			case RENDER_TYPES.STRING:
				this._renderString();
				break;
			case RENDER_TYPES.TMPL:
				this.__renderTmpl();
				break;
		}
  }
}
