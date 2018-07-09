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
      <Row>
        <FormattedMessage
          id="createWallet.saveMnemonic.id"
          defaultMessage="Save your {mnemonic}"
          values={{
            mnemonic: (
              <span className={styles.textHightlight}>
                <FormattedMessage id="createWallet.mnemonicWords" defaultMessage="Mnemonic Words" />
              </span>
            ),
          }}
        />
      </Row>
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
        {/* {mnemonic.join(' ')} */}
      </Row>
      <Row type="flex" justify="center">
        <FormattedMessage id="createWallet.mnemonicTip.id" defaultMessage="Write Down Your Mnemonic Words" />
      </Row>
    </div>
  )
}

MnemonicDisplay.propTypes = {
  mnemonic: PropTypes.array,
}

export default MnemonicDisplay
