import React from 'react'
import PropTypes from 'prop-types'
import {
  Row, Button, Icon,
} from 'antd'
import styles from './MnemonicVerify.less'


const MnemonicVerify = ({
  inputWords, leftWords, onInputWordClick, onLeftWordClick,
}) => {
  return (
    <div className={styles.container}>
      <Row type="flex" className={styles.inputWordsContainer}>
        {inputWords.map((word) => {
          return (
            <Button size="large" className={styles.inputWordCell} key={word} onClick={() => onInputWordClick(word)}>
              {word}
              <Icon type="close" style={{ color: 'grey' }} />
            </Button>
          )
        })}
      </Row>
      <br />
      <br />
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
