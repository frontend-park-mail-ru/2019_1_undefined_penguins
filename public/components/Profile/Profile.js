import { RENDER_TYPES } from '../../utils/constants.js'
import AjaxModule from '../../modules/ajax.js'

export class ProfileComponent {
  constructor ({
    el = document.body,
    type = RENDER_TYPES.DOM
  } = {}) {
    this._el = el
    this._type = type
    this._avatarName = ''
    this._avatarBlob = ''
  }

  /**
     * Возврат значения data.
     * @return  Значение data
     */
  get data () {
    return this._data
  }

  /**
     * Установка значения data.
     * @param d - Входные данные
     */
  set data (d = []) {
    this._data = d
  }

  /**
     * Рендеринг header.
     * @return   headerSection
     */
  _renderHeader () {
    const headerSection = document.createElement('section')
    headerSection.dataset.sectionName = 'header'

    const goBack = document.createElement('div')
    goBack.id = 'goBack'

    const img = document.createElement('img')
    img.src = '../../images/home.png'
    goBack.appendChild(img)

    const title = document.createElement('div')
    title.id = 'title'
    const text = document.createElement('h2')
    text.textContent = 'Профиль игрока'
    title.appendChild(text)

    headerSection.appendChild(goBack)
    headerSection.appendChild(title)

    return headerSection
  }

  /**
     * Рендеринг тела.
     * @return   mainSection
     */
  _renderBody () {
    const mainSection = document.createElement('section')
    mainSection.dataset.sectionName = 'main_profile'

    const form = document.createElement('form')
    form.classList = 'profile_form'
    form.enctype = 'multipart/form-data'

    const err = document.createElement('span')
    err.classList.add('errorLabel')

    const dataInline = document.createElement('div')
    dataInline.classList = 'data_inline'

    const avatar = document.createElement('img')
    avatar.classList = 'avatar'
    avatar.src = this._data.avatarBlob

    const data = document.createElement('div')
    data.classList = 'data'

    const inputs = [
      {
        name: 'login',
        type: 'text',
        title: 'Логин: ',
        value: this._data.login,
        disabled: false
      },
      {
        name: 'name',
        type: 'text',
        title: 'Имя: ',
        value: this._data.name,
        disabled: false
      },
      {
        name: 'email',
        type: 'email',
        title: 'Email: ',
        value: this._data.email,
        disabled: true
      }
    ]

    inputs.forEach((item) => {
      const inputString = document.createElement('div')
      const label = document.createElement('label')
      label.textContent = item.title

      const input = document.createElement('input')
      input.name = item.name
      input.type = item.type
      input.value = item.value
      input.disabled = item.disabled

      inputString.appendChild(label)
      inputString.appendChild(input)
      data.appendChild(inputString)
    })

    dataInline.appendChild(avatar)
    dataInline.appendChild(data)

    const infoInline = document.createElement('div')
    infoInline.classList = 'data_inline info'

    const info = [
      {
        name: 'Лучший результат:',
        data: this._data.score
      },
      {
        name: 'Последняя игра:',
        data: this._data.lastVisit
      }
    ]

    info.forEach((item) => {
      const div = document.createElement('div')
      div.classList = 'info_block'

      const labelTitle = document.createElement('label')
      labelTitle.textContent = item.name

      const labelInfo = document.createElement('label')
      labelInfo.textContent = item.data

      div.appendChild(labelTitle)
      div.appendChild(labelInfo)
      infoInline.appendChild(div)
    })
    form.appendChild(dataInline)

    const button = document.createElement('input')
    button.name = 'save'
    button.type = 'submit'
    button.value = 'Сохранить'

    const inputAvatar = document.createElement('input')
    inputAvatar.name = 'inputAvatar'
    inputAvatar.type = 'file'
    inputAvatar.accept = 'image/*'
    inputAvatar.classList = 'inputAvatar'

    inputAvatar.addEventListener('change', (event) => {
      event.preventDefault()

      const reader = new FileReader()
      const file = event.target.files[0]

      reader.onloadend = () => {
        this._avatarName = file.name
        this._avatarBlob = reader.result
      }
      reader.readAsDataURL(file)
    }, false)

    form.appendChild(inputAvatar)
    form.appendChild(button)
    form.appendChild(infoInline)

    form.addEventListener('submit', (event) => {
      event.preventDefault()

      const userAvatar = document.getElementsByClassName('inputAvatar')[0].files[0]
      const email = form.elements.email.value
      const login = form.elements.login.value
      const name = form.elements.name.value
      let errorString = 'Вы не ввели следующие поля:\n'

      if (
        email.length === 0 ||
                    login.length === 0 ||
                    name.length === 0
      ) {
        if (email.length === 0) {
          errorString = `${errorString}email\n`
          form.elements.email.classList.add('errorInput')
        }
        if (login.length === 0) {
          errorString = `${errorString}логин\n`
          form.elements.login.classList.add('errorInput')
        }
        if (name.length === 0) {
          errorString = `${errorString}имя\n`
          form.elements.name.classList.add('errorInput')
        }

        err.innerText = errorString
        return
      }

      if ((userAvatar !== undefined) && (userAvatar.size > 70000)) {
        err.innerText = `${errorString}Картинка слишком большая (70Кб)!!`
        return
      }

      let { avatarName } = this._data
      let { avatarBlob } = this._data
      if ((userAvatar !== undefined)) {
        avatarName = this._avatarName
        avatarBlob = this._avatarBlob
      }

      AjaxModule.doPromisePut({
        path: '/me',
        body: {
          email,
          login,
          name,
          avatarName,
          avatarBlob
        }
      })
        .then(
          (res) => {
            if (res.status > 400) {
              throw new Error('Network response was not ok.')
            }
            return res.json()
          }
        )
        .then((res) => {
          if (res.result !== '') {
            avatar.src = res.result
          }
        })
        .catch(() => {
          console.error
        })
    })
    mainSection.appendChild(form)
    mainSection.appendChild(err)

    return mainSection
  }

  _renderTmpl () {
    this._el.innerHTML = window.fest['components/Profile/Profile.tmpl'](this._data)
  }

  /**
     * Рендеринг страницы.
     */
  render () {
    switch (this._type) {
      case RENDER_TYPES.DOM:
        const head = this._renderHeader()
        const body = this._renderBody()
        this._el.appendChild(head)
        this._el.appendChild(body)
            	break
      case RENDER_TYPES.TMPL:
        this._renderTmpl()

        const inputAvatar = this._el.getElementsByClassName('inputAvatar')[0]
        inputAvatar.addEventListener('change', (event) => {
          event.preventDefault()

          const reader = new FileReader()
          const file = event.target.files[0]

          reader.onloadend = () => {
            this._avatarName = file.name
            this._avatarBlob = reader.result
          }
          reader.readAsDataURL(file)
        }, false)

        const form = this._el.getElementsByTagName('form')[0]

        form.addEventListener('submit', (event) => {
          event.preventDefault()

          const userAvatar = document.getElementsByClassName('inputAvatar')[0].files[0]
          const email = form.elements.email.value
          const login = form.elements.login.value
          const name = form.elements.name.value

          if (
            email.length === 0 ||
                            login.length === 0 ||
                            name.length === 0
          ) {
            let errorString = 'Вы не ввели следующие поля:\n'
            if (email.length === 0) {
              errorString = `${errorString}email\n`
              form.elements.email.classList.add('errorInput')
            }
            if (login.length === 0) {
              errorString = `${errorString}логин\n`
              form.elements.login.classList.add('errorInput')
            }
            if (name.length === 0) {
              errorString = `${errorString}имя\n`
              form.elements.name.classList.add('errorInput')
            }

            err.innerText = errorString
            return
          }

          if ((userAvatar !== undefined) && (userAvatar.size > 70000)) {
            err.innerText = `${errorString}Картинка слишком большая (70Кб)!!`
            return
          }

          let { avatarName } = this._data
          let { avatarBlob } = this._data
          if ((userAvatar !== undefined)) {
            avatarName = this._avatarName
            avatarBlob = this._avatarBlob
          }

          AjaxModule.doPromisePut({
            path: '/me',
            body: {
              email,
              login,
              name,
              avatarName,
              avatarBlob
            }
          })
            .then(
              (res) => {
                if (res.status > 400) {
                  throw new Error('Network response was not ok.')
                }
                return res.json()
              }
            )
            .then((res) => {
              if (res.result !== '') {
                const avatar = this._el.getElementsByClassName('avatar')[0]
                avatar.src = res.result
              }
            })
            .catch(() => {
              console.error
              application.innerHTML = ''
            })
        })
        break
    }
  }
}
