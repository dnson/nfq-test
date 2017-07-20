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
import {fetchAddressAction} from './actions';
import {makeSelectAddresses} from './selectors'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action'
  },
]

class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.fetchAddress();
  }
  render() {
    return <Table columns={columns} dataSource={this.props.addresses.data} />
  }
}

HomePage.propTypes = {
  fetchAddress: PropTypes.func.isRequired,
  addresses: PropTypes.object.isRequired
}
const mapStateToProps = createStructuredSelector(
  {
    addresses: makeSelectAddresses()
  }
)
function mapDispatchToProps(dispatch) {
  return {
    fetchAddress: (payload) => dispatch(fetchAddressAction.initiate({payload}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
