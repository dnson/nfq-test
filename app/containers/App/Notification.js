import {notification, Icon} from 'antd'
import React from 'react'

const openNotification = ({message, description}) => {
  notification.open({
    message,
    style: {
      top: 50
    },
    description,
    icon: <Icon type='smile-circle' style={{color: '#108ee9'}} />
  })
}

export default openNotification
