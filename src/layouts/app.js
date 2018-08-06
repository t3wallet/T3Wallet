/* global window */
import React from 'react'
import NProgress from 'nprogress'
import { connect } from 'dva'
import { Layout } from 'antd'
import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'
import config from 'config'
import {
  Header, Footer, Menu,
} from 'components/Layout'
import PropTypes from 'prop-types'
import './app.less'

let lastHref

const { Content } = Layout

const App = ({
  children, dispatch, global, loading, location,
}) => {
  const {
    languages, i18n, networkProviders, blockHead,
  } = global
  const { logo, menu } = config
  /* NProgress listener */
  const { href } = window.location
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  const headerProps = {
    languages,
    i18n,
    networkProviders,
    blockHead,
    changeLang (lang) {
      dispatch({
        type: 'global/changeLang',
        payload: lang,
      })
    },
    setNetworkProvider (index) {
      dispatch({
        type: 'global/setNetworkProvider',
        payload: index,
      })
    },
  }

  const menuProps = {
    location,
    menu,
  }

  return (
    <div className="body">
      <Helmet>
        <title>
          T3wallet.io -- Your Trusted Tezos Wallet
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
      </Helmet>
      <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
        <Header {...headerProps} />
        <Menu {...menuProps} />
        <Content>
          { children }
        </Content>
        <Footer />
      </Layout>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  global: PropTypes.object,
  loading: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    global: state.global,
    loading: state.loading,
  }
}

export default withRouter(connect(mapStateToProps)(App))
