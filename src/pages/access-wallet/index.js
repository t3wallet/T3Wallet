import React from 'react'
import { connect } from 'dva'
import { Card } from 'antd'
import { Page } from 'components'
import styles from './index.less'

class AccessWallet extends React.Component {
  render () {
    const { loading } = this.props
    return (
      <Page loading={loading} className={styles.dashboard}>
        <Card loading={loading} title="Card title">
          Whatever content
        </Card>
      </Page>
    )
  }
}

AccessWallet.propTypes = {
}

export default connect()(AccessWallet)
