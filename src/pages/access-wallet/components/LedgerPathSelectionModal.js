import React from 'react'
import {
  Modal, Button, Form, Icon, Input, message,
} from 'antd'
import {
  intlShape,
  injectIntl,
  defineMessages,
  FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'

const messages = defineMessages({
  title: {
    id: 'accessWallet.selectHDPath',
    defaultMessage: 'Select HD Wallet Derivation Path',
  },
  confirm: {
    id: 'confirm',
    defaultMessage: 'Confirm',
  },
  cancel: {
    id: 'cancel',
    defaultMessage: 'Cancel',
  },
})

const FormItem = Form.Item

const LedgerPathSelectionModal = ({
  visible,
  asciiArtVisible,
  intl,
  onClose,
  onConfirm,
  form,
}) => {
  const { formatMessage } = intl
  const { getFieldDecorator, validateFieldsAndScroll } = form
  const handleSubmit = () => {
    validateFieldsAndScroll((errors, { path }) => {
      if (errors) {
        message.error('Please check you input.')
        return
      }
      onConfirm({ path })
    })
  }
  let asciiArt
  if (asciiArtVisible) {
    asciiArt = (
      <pre style={{ fontSize: '3px', margin: ' 0 auto', fontFamily: 'Courier New, Monospace' }}>
        {`
        
                                                                                                                                                             ██╗               ██████╗ ██╗   ██╗███████╗██╗  ██╗  
                                                                                                                                                            ██╔╝               ██╔══██╗██║   ██║██╔════╝██║  ██║  
                              █████╗█████╗█████╗                                                          █████╗█████╗█████╗                               ██╔╝█████╗█████╗    ██████╔╝██║   ██║███████╗███████║  
                              ╚════╝╚════╝╚════╝                                                          ╚════╝╚════╝╚════╝                               ╚██╗╚════╝╚════╝    ██╔═══╝ ██║   ██║╚════██║██╔══██║  
                                                                                                                                                            ╚██╗               ██║     ╚██████╔╝███████║██║  ██║  
                                                                                                                                                             ╚═╝               ╚═╝      ╚═════╝ ╚══════╝╚═╝  ╚═╝  
                                                                                                                                                                                                                  
                                                                                                                                                                                              ██████╗ ███╗   ██╗  
                                                                                                                                                                                             ██╔═══██╗████╗  ██║  
        █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗                                           ██║   ██║██╔██╗ ██║  
        ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                           ██║   ██║██║╚██╗██║  
                                                                                                                                                                                             ╚██████╔╝██║ ╚████║  
                                                                                                                                                                                              ╚═════╝ ╚═╝  ╚═══╝  
                                                                                                                                                                                                                  
        ██╗       ██╗  ██╗                      ██████╗ ██████╗  ██████╗ ██╗   ██╗██╗██████╗ ███████╗                      ██╗   ██╗          ██╗                ██╗     ███████╗██████╗  ██████╗ ███████╗██████╗ 
        ██║       ╚██╗██╔╝                      ██╔══██╗██╔══██╗██╔═══██╗██║   ██║██║██╔══██╗██╔════╝                      ╚██╗ ██╔╝          ██║                ██║     ██╔════╝██╔══██╗██╔════╝ ██╔════╝██╔══██╗
        ██║        ╚███╔╝                       ██████╔╝██████╔╝██║   ██║██║   ██║██║██║  ██║█████╗                         ╚████╔╝           ██║                ██║     █████╗  ██║  ██║██║  ███╗█████╗  ██████╔╝
        ██║        ██╔██╗                       ██╔═══╝ ██╔══██╗██║   ██║╚██╗ ██╔╝██║██║  ██║██╔══╝                          ╚██╔╝            ██║                ██║     ██╔══╝  ██║  ██║██║   ██║██╔══╝  ██╔══██╗
        ██║       ██╔╝ ██╗                      ██║     ██║  ██║╚██████╔╝ ╚████╔╝ ██║██████╔╝███████╗                         ██║             ██║                ███████╗███████╗██████╔╝╚██████╔╝███████╗██║  ██║
        ╚═╝       ╚═╝  ╚═╝                      ╚═╝     ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚═╝╚═════╝ ╚══════╝                         ╚═╝             ╚═╝                ╚══════╝╚══════╝╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝
                                                                                                                                                                                                                  
        ██╗                         ██████╗ ██╗   ██╗██████╗ ██╗     ██╗ ██████╗    ██╗  ██╗███████╗██╗   ██╗██████╗                          ██╗                                                                 
        ██║                         ██╔══██╗██║   ██║██╔══██╗██║     ██║██╔════╝    ██║ ██╔╝██╔════╝╚██╗ ██╔╝╚════██╗                         ██║                                                                 
        ██║                         ██████╔╝██║   ██║██████╔╝██║     ██║██║         █████╔╝ █████╗   ╚████╔╝   ▄███╔╝                         ██║                                                                 
        ██║                         ██╔═══╝ ██║   ██║██╔══██╗██║     ██║██║         ██╔═██╗ ██╔══╝    ╚██╔╝    ▀▀══╝                          ██║                                                                 
        ██║                         ██║     ╚██████╔╝██████╔╝███████╗██║╚██████╗    ██║  ██╗███████╗   ██║     ██╗                            ██║                                                                 
        ╚═╝                         ╚═╝      ╚═════╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝    ╚═╝  ╚═╝╚══════╝   ╚═╝     ╚═╝                            ╚═╝                                                                 
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  
        █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗                                                                
        ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                                                
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  
        `}
      </pre>
    )
  } else {
    asciiArt = <div />
  }
  return (
    <Modal
      title={(
        <span>
          <Icon
            type="check-circle-o"
            style={{ marginRight: '8px', color: 'green' }}
          />
          {formatMessage(messages.title)}
        </span>
      )}
      centered
      visible={visible}
      onCancel={() => {
        onClose()
      }}
      wrapClassName="vertical-center-modal"
      footer={[
        <Button key="cancel" type="default" onClick={onClose}>
          <FormattedMessage {...messages.cancel} />
        </Button>,
        <Button key="confirm" type="primary" onClick={handleSubmit}>
          <FormattedMessage {...messages.confirm} />
        </Button>,
      ]}
    >
      <div>
        <Form onSubmit={onConfirm}>
          <FormItem>
            {getFieldDecorator('path', {
              rules: [{ required: true, message: 'Path Required' }],
              initialValue: "44'/1729'/0'/0'",
            })(
              <Input
                prefix={
                  <Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="44'/1729'/0'/0'"
              />
            )}
          </FormItem>
          <div>{asciiArt}</div>
        </Form>
      </div>
    </Modal>
  )
}

LedgerPathSelectionModal.propTypes = {
  form: PropTypes.object,
  visible: PropTypes.bool,
  asciiArtVisible: PropTypes.bool,
  intl: intlShape.isRequired,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
}

export default Form.create()(injectIntl(LedgerPathSelectionModal))
