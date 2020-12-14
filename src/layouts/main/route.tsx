import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import MainLayout from './index'

import { isAuthenticated } from '../../services/auth'

type PrivateRouteProps = {
  exact: RouteProps['exact']
  path: RouteProps['path']
  component: React.ElementType
}

const MainPrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  ...routeProps
}) => {
  return (
    <Route
      {...routeProps}
      render={(props) =>
        isAuthenticated() ? (
          <MainLayout>
            <Component {...props} />
          </MainLayout>
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  )
}

export default MainPrivateRoute