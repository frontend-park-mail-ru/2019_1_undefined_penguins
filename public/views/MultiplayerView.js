import BaseView from './BaseView.js'

export default class MultiplayerView extends BaseView {
  constructor (el) {
    super(el)
  }

  show () {
    super.show()
  }

  render () {
    this.el.innerHTML = ''
    // TODO: ПОТОМ НОРМАЛЬНО СДЕЛАЕМ
    const mainSection = document.createElement('div')
    mainSection.dataset.sectionName = 'main'
    const title = document.createElement('h1')
    title.textContent = 'Здесь будет игра в режиме Multiplayer'
    title.style = 'color: white; display: flex; align-items: center; justify-content: center; font-size: 50px;'
    mainSection.appendChild(title)
    this.el.appendChild(mainSection)
  }
}
