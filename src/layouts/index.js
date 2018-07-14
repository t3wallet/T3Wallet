/* global navigator */
import React from 'react'
import withRouter from 'umi/withRouter'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { LocaleProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import { ANT_LANGPACKAGE, LANGPACKAGE, chooseLang } from '../locales'
import App from './app'

class Index extends React.Component {
  // Change user's language is a sync opetration so it's safe
  UNSAFE_componentWillMount () {
    this._initLang()
    this._init()
  }

  render () {
    const { i18n, children } = this.props
    return (
      <LocaleProvider locale={ANT_LANGPACKAGE[i18n]}>
        <IntlProvider
          locale={i18n}
          messages={LANGPACKAGE[i18n]}
        >
          <App>
            {children}
          </App>
        </IntlProvider>
      </LocaleProvider>
    )
  }

  _init () {
    const { dispatch } = this.props
    dispatch({
      type: 'global/setNetworkProvider',
      payload: 'https://rpc.tezrpc.me/',
    })
  }

  _initLang () {
    const { dispatch } = this.props
    const locale = chooseLang(navigator.language.replace('-', '_'))
    dispatch({
      type: 'global/changeLang',
      payload: locale,
    })
  }
}

Index.propTypes = {
  children: PropTypes.element.isRequired,
  i18n: PropTypes.string,
  dispatch: PropTypes.func,
}


const mapStateToProps = (state) => {
  return {
    i18n: state.global.i18n,
  }
}

export default withRouter(connect(mapStateToProps)(Index))
