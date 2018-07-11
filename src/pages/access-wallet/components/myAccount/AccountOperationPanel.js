import React from 'react'
import {
  Card, Form, Button, Input, Icon,
} from 'antd'
import PropTypes from 'prop-types'
import TransferForm from './TransferForm'

const operations = [{
  key: 'transfer',
  tab: 'Transfer',
}, {
  key: 'delegate',
  tab: 'Delegate',
}]

// const content = {
//   Transfer: <div>
//     <Form onSubmit={this.handleSubmit}>
//       <Form.Item>
// hi
//       </Form.Item>
//     </Form>
//   </div>,
//   Delegate: <p>
// Set Delegation
//   </p>,
// }

class AccountCollapse extends React.Component {
    state = {
      activeTabKey: 'transfer',
    }

    onTabChange = (key, type) => {
      this.setState({ [type]: key })
    }

    onFormSubmit = (e) => {
      e.preventDefault()
    }


    render () {
      const { transferFormFields } = this.props
      const { activeTabKey } = this.state
      const content = {
        transfer: (
          // <Form onSubmit={e => this.handleSubmit(e)} className="login-form" layout="vertical">
          //   <FormItem>
          //     {getFieldDecorator('To Address', {
          //       rules: [{ required: true, message: 'Please input your username!' }],
          //     })(
          //       <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          //     )}
          //   </FormItem>
          //   <FormItem>
          //     {getFieldDecorator('Amount to Send', {
          //       rules: [{ required: true, message: 'Please input your Password!' }],
          //     })(
          //       <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          //     )}
          //   </FormItem>
          //   <FormItem>
          //     {getFieldDecorator('Amount to Send', {
          //       rules: [{ required: true, message: 'Please input your Password!' }],
          //     })(
          //       <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          //     )}
          //     <Button type="primary" htmlType="submit" className="login-form-button">
          //       Log in
          //     </Button>
          //   </FormItem>
          // </Form>
          <TransferForm transferFormFields={transferFormFields} />
        ),
        delegate: (
          <div>
delegate
          </div>
        ),
      }
      return (
        <div>
          <Card
            style={{ width: '100%' }}
            tabList={operations}
            activeTabKey={activeTabKey}
            onTabChange={(key) => { this.onTabChange(key, 'activeTabKey') }}
          >
            {content[activeTabKey]}
          </Card>
        </div>
      )
    }
}

AccountCollapse.propTypes = {
  form: PropTypes.object,
  transferFormFields: PropTypes.object,
}


export default AccountCollapse
