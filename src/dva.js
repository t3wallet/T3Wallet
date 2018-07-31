import { message } from 'antd'

// onError & initialState hook
export function config () {
  return {
    onError (err) {
      err.preventDefault()
      message.error(err.message)
    },
    initialState: {
      global: {
        i18n: 'en',
      },
    },
  }
}
