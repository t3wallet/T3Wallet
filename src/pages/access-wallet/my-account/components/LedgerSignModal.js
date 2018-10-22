import React from 'react'
import { Modal, Button, Icon } from 'antd'
import {
  intlShape, injectIntl, defineMessages, FormattedMessage,
} from 'react-intl'
import PropTypes from 'prop-types'

const messages = defineMessages({
  title: {
    id: 'myAccount.signOnLedger',
    defaultMessage: 'Please sign Transaction on Ledger.',
  },
  cancel: {
    id: 'myAccount.cancel',
    defaultMessage: 'Cancel',
  },
})

const LedgerSignModal = ({
  visible, onClose, intl,
}) => {
  const { formatMessage } = intl
  return (
    <Modal title={(
      <span>
        <Icon type="check-circle-o" style={{ marginRight: '8px', color: 'green' }} />
        {formatMessage(messages.title)}
      </span>
    )}
      visible={visible}
      onCancel={() => {
        onClose()
      }}
      wrapClassName="vertical-center-modal"
      footer={[<Button key="submit"
        type="primary"
        onClick={() => {
          onClose()
        }}
      >
        <FormattedMessage {...messages.cancel} />
      </Button>]}
    >
      <div>
        <pre style={{ fontSize: '3px', margin: ' 0 auto', fontFamily: 'Courier New, Monospace' }}>
          {`
                                                                                                                                                                                      ██╗               ██████╗ ██╗   ██╗███████╗██╗  ██╗
                                                                                                                                                                                     ██╔╝               ██╔══██╗██║   ██║██╔════╝██║  ██║
                                █████╗█████╗█████╗                                                                                █████╗█████╗█████╗                                ██╔╝█████╗█████╗    ██████╔╝██║   ██║███████╗███████║
                                ╚════╝╚════╝╚════╝                                                                                ╚════╝╚════╝╚════╝                                ╚██╗╚════╝╚════╝    ██╔═══╝ ██║   ██║╚════██║██╔══██║
                                                                                                                                                                                     ╚██╗               ██║     ╚██████╔╝███████║██║  ██║
                                                                                                                                                                                      ╚═╝               ╚═╝      ╚═════╝ ╚══════╝╚═╝  ╚═╝

                                                                                                                                                                                                                     ██████╗ ███╗   ██╗  
                                                                                                                                                                                                                    ██╔═══██╗████╗  ██║  
            █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗                                            ██║   ██║██╔██╗ ██║  
            ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                            ██║   ██║██║╚██╗██║  
                                                                                                                                                                                                                    ╚██████╔╝██║ ╚████║  
                                                                                                                                                                                                                     ╚═════╝ ╚═╝  ╚═══╝  

            ██╗        ██╗  ██╗                             ██████╗ ██████╗ ███╗   ██╗███████╗██╗██████╗ ███╗   ███╗                            ██╗   ██╗            ██╗                ██╗     ███████╗██████╗  ██████╗ ███████╗██████╗ 
            ██║        ╚██╗██╔╝                            ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔══██╗████╗ ████║                            ╚██╗ ██╔╝            ██║                ██║     ██╔════╝██╔══██╗██╔════╝ ██╔════╝██╔══██╗
            ██║         ╚███╔╝                             ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██████╔╝██╔████╔██║                             ╚████╔╝             ██║                ██║     █████╗  ██║  ██║██║  ███╗█████╗  ██████╔╝
            ██║         ██╔██╗                             ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██╔══██╗██║╚██╔╝██║                              ╚██╔╝              ██║                ██║     ██╔══╝  ██║  ██║██║   ██║██╔══╝  ██╔══██╗
            ██║        ██╔╝ ██╗                            ╚██████╗╚██████╔╝██║ ╚████║██║     ██║██║  ██║██║ ╚═╝ ██║                               ██║               ██║                ███████╗███████╗██████╔╝╚██████╔╝███████╗██║  ██║
            ╚═╝        ╚═╝  ╚═╝                             ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝                               ╚═╝               ╚═╝                ╚══════╝╚══════╝╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝

            ██╗                        ████████╗██████╗  █████╗ ███╗   ██╗███████╗ █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗                                    ██╗                                                                 
            ██║                        ╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║                                    ██║                                                                 
            ██║                           ██║   ██████╔╝███████║██╔██╗ ██║███████╗███████║██║        ██║   ██║██║   ██║██╔██╗ ██║                                    ██║                                                                 
            ██║                           ██║   ██╔══██╗██╔══██║██║╚██╗██║╚════██║██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║                                    ██║                                                                 
            ██║                           ██║   ██║  ██║██║  ██║██║ ╚████║███████║██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║                                    ██║                                                                 
            ╚═╝                           ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝                                    ╚═╝                                                                 



            █████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗                                                                 
            ╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝                                                                 



            `}
        </pre>
      </div>
    </Modal>
  )
}

LedgerSignModal.propTypes = {
  visible: PropTypes.bool,
  opHash: PropTypes.string,
  intl: intlShape.isRequired,
  onClose: PropTypes.func,
  opType: PropTypes.string,
}


export default injectIntl(LedgerSignModal)
