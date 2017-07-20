/*
 *
 * AddressDetail
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {createStructuredSelector} from 'reselect'
import styled from 'styled-components'
import {fetchAddressAction} from './actions'
import AddressDetailForm from './AddressDetailForm'
const FormWrapper = styled.div`
  .gmnoprint {
    display: none
  }
`
export class AddressDetail extends React.PureComponent {// eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.fetchAddress({id: this.props.params.id});
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
          <AddressDetailForm id={this.props.params.id} />
        </FormWrapper>
      </div>
    );
  }
}

AddressDetail.propTypes = {
  fetchAddress: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    fetchAddress: (payload) => dispatch(fetchAddressAction.initiate({payload}))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetail);
