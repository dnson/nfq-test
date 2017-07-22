import {Form, Button, Switch, Row, Col} from 'antd'
import {connect} from 'react-redux'
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {updateAddressAction} from './actions'
import NormalForm from './NormalForm'
import Map from './GoogleMapForm'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 5},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
  },
}

class AddressDetailForm extends React.PureComponent {
  static propTypes = {
    updateAddress: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    address: PropTypes.object,
    geoCode: PropTypes.object,
    id: PropTypes.string,
  }

  _onSubmit = e => {
    const {updateAddress, form, id} = this.props

    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        updateAddress({
          ...values,
          id,
        })
      }
    })
  }
  render() {
    const {form, address, geoCode} = this.props
    return (
      <Form onSubmit={this._onSubmit}>
        <Row gutter={16}>
          <FormItem {...formItemLayout} label='Using Google Map'>
            {form.getFieldDecorator('switch', {initialValue: false})(
              <Switch />,
            )}
          </FormItem>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            {form.getFieldValue('switch') === true &&
              <Map geoCode={geoCode} {...address} />}
          </Col>
        </Row>
        <Row gutter={16}>
          <NormalForm
            {...address}
            form={form}
            formItemLayout={formItemLayout}
          />
        </Row>
  
        <FormItem wrapperCol={{span: 12, offset: 6}}>
          <Button>
            <Link to='/'>Back</Link>
          </Button>
          <Button type='primary' htmlType='submit' style={{marginLeft: 8}} >
            Submit
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedAddressDetailForm = Form.create()(AddressDetailForm)

function mapDispatchToProps(dispatch) {
  return {
    updateAddress: payload =>
      dispatch(updateAddressAction.initiate({payload})),
  }
}
export default connect(null, mapDispatchToProps)(WrappedAddressDetailForm)
