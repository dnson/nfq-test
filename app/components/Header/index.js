import React, {PropTypes} from 'react'
import {Layout, Menu} from 'antd'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {makeSelectNotification} from 'containers/App/selectors'

const {Header} = Layout

class NFQHeader extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Header>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          style={{lineHeight: '64px'}}
        >
          <Menu.Item key='home'>
            <Link to='/'>Home</Link>
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification(),
})

NFQHeader.propTypes = {
  notification: PropTypes.object,
}

export default connect(mapStateToProps)(NFQHeader)
