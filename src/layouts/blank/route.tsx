import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

import BlankLayout from './index'

type PrivateRouteProps = {
  exact: RouteProps['exact']
  path: RouteProps['path']
  component: React.ElementType
}

const BlankRoute: React.FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <BlankLayout>
        <Component {...props} />
      </BlankLayout>
    )} />
  )
}

export default BlankRoute