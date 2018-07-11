import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
} from 'antd'
import { FormattedMessage } from 'react-intl'
import styles from './MnemonicDisplay.less'


const MnemonicDisplay = ({ mnemonic }) => {
  return (
    <div className={styles.containerStyle}>
      <Row type="flex" justify="center">
        <p>
          {mnemonic.map((word, key) => {
            return (
              <span key={key} className={styles.wordCell}>
                {`${word} `}
              </span>
            )
          })}
        </p>
      </Row>
      <Row type="flex" justify="center" align="center">
        <FormattedMessage id="createWallet.writeDownTip" defaultMessage="Write Down Your Mnemonic Words" />
      </Row>
    </div>
  )
}

MnemonicDisplay.propTypes = {
  mnemonic: PropTypes.array,
}

export default MnemonicDisplay
