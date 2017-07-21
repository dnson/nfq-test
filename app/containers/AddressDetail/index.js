/*
 *
 * AddressDetail
 *
 */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {createStructuredSelector} from 'reselect'
import styled from 'styled-components'
import makeSelectAddressDetail, {makeSelectGeoCode} from './selectors'
import {fetchAddressAction} from './actions'
import AddressDetailForm from './AddressDetailForm'
const FormWrapper = styled.div`
  .gmnoprint {
    display: none;
  }
`
export class AddressDetail extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.fetchAddress({id: this.props.params.id})
  }
  render() {
    return (
      <div>
        <Helmet
          title='AddressDetail'
          meta={[
            {name: 'description', content: 'Description of AddressDetail'},
          ]}
        />
        <FormWrapper>
          <AddressDetailForm
            address={this.props.address}
            id={this.props.params.id}
            geoCode={this.props.geoCode}
          />
        </FormWrapper>
      </div>
    )
  }
}

AddressDetail.propTypes = {
  fetchAddress: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  geoCode: PropTypes.object.isRequired,
}

const mapStateToProps = createStructuredSelector({
  address: makeSelectAddressDetail(),
  geoCode: makeSelectGeoCode(),
})

function mapDispatchToProps(dispatch) {
  return {
    fetchAddress: payload => dispatch(fetchAddressAction.initiate({payload})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetail)
