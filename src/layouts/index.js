/* global navigator */
import React from 'react'
import withRouter from 'umi/withRouter'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { LocaleProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import ReactTimeout from 'react-timeout'
import { ANT_LANGPACKAGE, LANGPACKAGE, chooseLang } from '../locales'
import App from './app'

class Index extends React.Component {
  // Change user's language is a sync opetration so it's safe
  UNSAFE_componentWillMount () {
    this._init()
  }

  componentDidMount () {
    const { setInterval } = this.props
    setInterval(this._refreshBlock, 20000)
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
    const locale = chooseLang(navigator.language.replace('-', '_'))
    dispatch({ type: 'global/changeLang', payload: locale })
    dispatch({ type: 'global/setNetworkProvider', payload: 0 })
  }

  _refreshBlock () {
    const { dispatch } = this.props
    dispatch({
      type: 'global/getBlockHead',
    })
  }
}

Index.propTypes = {
  children: PropTypes.element.isRequired,
  i18n: PropTypes.string,
  dispatch: PropTypes.func,
  setInterval: PropTypes.func,
}


const mapStateToProps = (state) => {
  return {
    i18n: state.global.i18n,
  }
}

export default withRouter(connect(mapStateToProps)(ReactTimeout(Index)))
