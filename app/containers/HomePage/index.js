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
import {Table, Button, Row, Col} from 'antd'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import styled from 'styled-components'
import {push} from 'react-router-redux'
import {CSVLink} from 'components/ReactCSV'
import remove from 'lodash/remove'
import indexOf from 'lodash/indexOf'
import {fetchAddressesAction, updateAddressesAction} from './actions'
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

const Wrapper = styled.div`
  .add-more {
    margin-bottom: 10px
    margin-left: 10px
  }
`

const ButtonGroupWrapper = styled(Col)`
  text-align: right
`

class HomePage extends React.PureComponent {
  state = {
    selectedRowKeys: [],
  }
  // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.fetchAddress()
  }

  _onEditclick = () => {
    const row = this.state.selectedRowKeys[0]
    const url = `/addresses/${row}/edit`
    this.props.redirect(url)
  }

  _onAddclick = () => {
    const url = `/addresses/new`
    this.props.redirect(url)
  }

  _onDeleteclick = () => {
    const addresses = {
      ...this.props.addresses
    }
    const {selectedRowKeys} = this.state
    remove(addresses.data, (address) =>
      indexOf(selectedRowKeys, address.id) != -1
    )
    selectedRowKeys.forEach((key) => {
      addresses.origin[key] = null
    })
    this.props.updateAddresses(addresses.origin)
  }

  render() {
    const rowSelection = {
      onChange: selectedRowKeys => {
        this.setState({
          selectedRowKeys: [...selectedRowKeys],
        })
      },
    }
    const {selectedRowKeys} = this.state
    return (
      <Wrapper>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <h2>Address List</h2>
          </Col>
        </Row>
        <Row gutter={16}>
          <ButtonGroupWrapper xs={24} md={24}>
            <Button className='add-more'>
              <CSVLink data={this.props.addresses.data || []}>
                Export to CSV
              </CSVLink>
            </Button>
            <Button onClick={this._onAddclick} className='add-more'>
              Add
            </Button>
            <Button
              onClick={this._onEditclick}
              disabled={
                selectedRowKeys.length === 0 || selectedRowKeys.length > 1
              }
              className='add-more'
            >
              Edit
            </Button>
            <Button
              className='add-more'
              onClick={this._onDeleteclick}
              disabled={selectedRowKeys.length === 0}
            >
              Delete
            </Button>
          </ButtonGroupWrapper>
        </Row>
        <Table
          columns={columns}
          rowSelection={rowSelection}
          dataSource={this.props.addresses.data}
        />
      </Wrapper>
    )
  }
}

HomePage.propTypes = {
  fetchAddress: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  addresses: PropTypes.object.isRequired,
  updateAddresses: PropTypes.func.isRequired,
}
const mapStateToProps = createStructuredSelector({
  addresses: makeSelectAddresses(),
})
function mapDispatchToProps(dispatch) {
  return {
    redirect: url => dispatch(push(url)),
    updateAddresses: payload => dispatch(updateAddressesAction.initiate({payload})),
    fetchAddress: payload =>
      dispatch(fetchAddressesAction.initiate({payload})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
