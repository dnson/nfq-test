/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, {PropTypes} from 'react'
import {Table} from 'antd'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {fetchAddressesAction} from './actions'
import {makeSelectAddresses} from './selectors'
const columns = [
  {
    title: 'Street Name',
    dataIndex: 'streetName',
    key: 'streetName',
  },
  {
    title: 'Ward',
    dataIndex: 'ward',
    key: 'ward',
  },
  {
    title: 'District',
    dataIndex: 'district',
    key: 'district',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
]

class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.fetchAddress()
  }
  render() {
    return <Table columns={columns} dataSource={this.props.addresses.data} />
  }
}

HomePage.propTypes = {
  fetchAddress: PropTypes.func.isRequired,
  addresses: PropTypes.object.isRequired,
}
const mapStateToProps = createStructuredSelector({
  addresses: makeSelectAddresses(),
})
function mapDispatchToProps(dispatch) {
  return {
    fetchAddress: payload =>
      dispatch(fetchAddressesAction.initiate({payload})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
