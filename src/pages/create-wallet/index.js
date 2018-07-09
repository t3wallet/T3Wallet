import React from 'react'
import { connect } from 'dva'
import {
  Card, Button, Steps, message,
} from 'antd'
import { Page } from 'components'
import PropTypes from 'prop-types'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import { MnemonicDisplay, MnemonicVerify } from './components'
import styles from './index.less'

const messages = defineMessages({
  title: {
    id: 'tabs.createWallet',
    defaultMessage: 'Create Wallet',
    desciption: 'create wallet card title',
  },
  desciption: {
    id: 'createWallet.description',
    defaultMessage: "We don't store your key, keep them safe",
  },
  next: {
    id: 'createWallet.nextStep',
    defaultMessage: 'Next',
  },
  prev: {
    id: 'createWallet.prevStep',
    defaultMessage: 'Previous step',
  },
  confirm: {
    id: 'createWallet.confirm',
    defaultMessage: 'Confirm',
  },
})

class CreateWallet extends React.Component {
  _next = () => {
    const { dispatch, curStep } = this.props
    dispatch({ type: 'createWallet/updateStep', step: curStep + 1 })
  }

  _prev = () => {
    const { dispatch, curStep } = this.props
    dispatch({ type: 'createWallet/updateStep', step: curStep - 1 })
  }


  render () {
    const {
      dispatch, loading, intl, steps, curStep, mnemonic, inputWords, leftWords,
    } = this.props
    const { formatMessage } = intl

    const nnemonicVerifyProps = {
      inputWords,
      leftWords,
      onInputWordClick (word) {
        dispatch({
          type: 'createWallet/removeInputWord',
          payload: word,
        })
      },
      onLeftWordClick (word) {
        dispatch({
          type: 'createWallet/removeLeftWord',
          payload: word,
        })
      },
    }

    return (
      <Page loading={loading} className={styles.cardContaner}>
        <Card loading={loading} bordered={false} title={formatMessage(messages.title)}>
          <div className="steps-action">
            {
              curStep === 0
              && (
                <Button type="primary" icon="file-add" size="large" className={styles.button} onClick={() => this._createWallet()}>
                  <FormattedMessage id={messages.title.id} defaultMessage={messages.title.defaultMessage} />
                </Button>
              )
            }
            {
              curStep === 1
              && (
                <div>
                  <MnemonicDisplay mnemonic={mnemonic} />
                  <Button type="primary" className={styles.button} onClick={() => this._next()}>
                    <FormattedMessage id={messages.next.id} defaultMessage={messages.next.defaultMessage} />
                  </Button>
                </div>
              )
            }
            {
              curStep === steps.length - 1
              && (
                <div>
                  <MnemonicVerify {...nnemonicVerifyProps} />
                  <Button type="primary" className={styles.button} onClick={() => message.success('Processing complete!')}>
                    <FormattedMessage id={messages.confirm.id} defaultMessage={messages.confirm.defaultMessage} />
                  </Button>
                </div>
              )
            }
            {
              curStep > 0 && curStep !== steps.length - 1
              && (
                <Button style={{ marginLeft: 8 }} onClick={() => this._prev()}>
                  <FormattedMessage id={messages.prev.id} defaultMessage={messages.prev.defaultMessage} />
                </Button>
              )
            }
          </div>
          <FormattedMessage id={messages.desciption.id} defaultMessage={messages.desciption.defaultMessage} />
          <Steps current={curStep}>
            {steps.map(item => <Steps.Step key={item.title} title={item.title} />)}
          </Steps>
        </Card>
      </Page>
    )
  }

  _createWallet = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'createWallet/createWallet',
    })
  }
}

CreateWallet.propTypes = {
  loading: PropTypes.bool,
  intl: intlShape.isRequired,
  steps: PropTypes.array,
  curStep: PropTypes.number,
  dispatch: PropTypes.func,
  mnemonic: PropTypes.array,
  inputWords: PropTypes.array,
  leftWords: PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    createWallet: state.createWallet,
    curStep: state.createWallet.curStep,
    steps: state.createWallet.steps,
    mnemonic: state.createWallet.mnemonic,
    inputWords: state.createWallet.inputWords,
    leftWords: state.createWallet.leftWords,
  }
}

export default connect(mapStateToProps)(injectIntl(CreateWallet))
