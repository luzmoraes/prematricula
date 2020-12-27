import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

import BlankLayout from './index'

type PrivateRouteProps = {
  exact: RouteProps['exact']
  path: RouteProps['path']
  component: React.ElementType
  showHeader?: boolean
}

const BlankRoute: React.FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      return (
      <BlankLayout >
        <Component {...props} showHeader={rest.showHeader ? true : false} />
      </BlankLayout>
    )
    }} />
  )
}

export default BlankRoute