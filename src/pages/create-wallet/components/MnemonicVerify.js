import React from 'react'
import PropTypes from 'prop-types'
import {
  Row, Button,
} from 'antd'
import { FormattedMessage } from 'react-intl'
import styles from './MnemonicVerify.less'


const MnemonicVerify = ({
  inputWords, leftWords, onInputWordClick, onLeftWordClick,
}) => {
  return (
    <div className={styles.containerStyle}>
      <Row>
        <FormattedMessage
          id="createWallet.verifyMnemonic.id"
          defaultMessage="Verify your {mnemonic}"
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
        {inputWords.map((word) => {
          return (
            <Button size="large" className={styles.inputWordCell} key={word} onClick={() => onInputWordClick(word)}>
              {word}
            </Button>
          )
        })}
      </Row>
      <Row type="flex" justify="center">
        {leftWords.map((word) => {
          return (
            <Button size="large" className={styles.leftWordCell} key={word} onClick={() => onLeftWordClick(word)}>
              {word}
            </Button>
          )
        })}
      </Row>
    </div>
  )
}

MnemonicVerify.propTypes = {
  inputWords: PropTypes.array,
  leftWords: PropTypes.array.isRequired,
  onInputWordClick: PropTypes.func.isRequired,
  onLeftWordClick: PropTypes.func.isRequired,
}

export default MnemonicVerify
