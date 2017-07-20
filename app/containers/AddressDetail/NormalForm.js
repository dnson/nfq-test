import React, {PropTypes} from 'react'
import {Form, Input, Col} from 'antd'
import styled from 'styled-components'

const FormItem = Form.Item

const Wrapper = styled(Col)`
  padding-top: 15px
`
const NormalForm = ({
  form,
  formItemLayout,
  streetName,
  ward,
  district,
  city,
  country,
}) =>
  <Wrapper xs={24} md={12}>
    <FormItem {...formItemLayout} label='Street Name'>
      {form.getFieldDecorator('streetName', {
        initialValue: streetName,
      })(<Input placeholder='Street Name' id='streetName' />)}
    </FormItem>

    <FormItem {...formItemLayout} label='Ward' hasFeedback>
      {form.getFieldDecorator('ward', {
        initialValue: ward,
      })(<Input placeholder='Ward' id='validating' />)}
    </FormItem>

    <FormItem {...formItemLayout} label='District' hasFeedback>
      {form.getFieldDecorator('district', {
        initialValue: district,
      })(<Input placeholder='District' />)}
    </FormItem>

    <FormItem {...formItemLayout} label='City' hasFeedback>
      {form.getFieldDecorator('city', {
        initialValue: city,
      })(<Input placeholder='City' />)}
    </FormItem>

    <FormItem {...formItemLayout} label='Country' hasFeedback>
      {form.getFieldDecorator('country', {
        initialValue: country,
      })(<Input placeholder='Country' />)}
    </FormItem>
  </Wrapper>

NormalForm.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  streetName: PropTypes.string,
  ward: PropTypes.string,
  district: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
}

export default NormalForm
