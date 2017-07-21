/*
 *
 * AddAddress
 *
 */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {createStructuredSelector} from 'reselect'
import styled from 'styled-components'
import AddressDetailForm from 'containers/AddressDetail/AddressDetailForm'
import makeSelectAddressDetail from 'containers/AddressDetail/selectors'
const FormWrapper = styled.div`
  .gmnoprint {
    display: none;
  }
`
export class AddAddress extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title='AddAddress'
          meta={[{name: 'description', content: 'Description of AddAddress'}]}
        />
        <FormWrapper>
          <AddressDetailForm address={this.props.address} />
        </FormWrapper>
      </div>
    )
  }
}

AddAddress.propTypes = {
  address: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  address: makeSelectAddressDetail(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress)
