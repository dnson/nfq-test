import React from 'react'
import {Layout, Breadcrumb} from 'antd'
import withProgressBar from 'components/ProgressBar'
import NFQHeader from 'components/Header'
const {Content} = Layout

export class App extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <Layout className='layout' style={{height: '100%'}}>
        <NFQHeader />
        <Content style={{padding: '0 50px'}}>
          <Breadcrumb style={{margin: '12px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{background: '#fff', padding: 24, minHeight: 280}}
            id='contents'
          >
            {React.Children.toArray(this.props.children)}
          </div>
        </Content>
      </Layout>
    )
  }
}
App.propTypes = {
  children: React.PropTypes.node,
}

export default withProgressBar(App)
