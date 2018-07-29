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
    <Row type="flex" justify="center" className={styles.container}>
      <Row type="flex" className={styles.inputWordsContainer}>
        {inputWords.map((word, index) => {
          return (
            <Button size="large" className={styles.inputWordCell} key={index} onClick={() => onInputWordClick(word)}>
              <span>
                {`${index + 1}. `}
              </span>
              {word}
              <Icon type="close" style={{ color: 'grey' }} />
            </Button>
          )
        })}
      </Row>
      <Row type="flex" justify="center" style={{ width: '70%' }}>
        {leftWords.map((word, index) => {
          return (
            <Button size="large" className={styles.leftWordCell} key={index} onClick={() => onLeftWordClick(word)}>
              {word}
            </Button>
          )
        })}
      </Row>
    </Row>
  )
}

MnemonicVerify.propTypes = {
  inputWords: PropTypes.array,
  leftWords: PropTypes.array.isRequired,
  onInputWordClick: PropTypes.func.isRequired,
  onLeftWordClick: PropTypes.func.isRequired,
}

export default MnemonicVerify
