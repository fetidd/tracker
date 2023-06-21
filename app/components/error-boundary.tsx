import { isRouteErrorResponse, useRouteError } from '@remix-run/react'
import { Fragment } from 'react'

export function ErrorBoundaryInner() {
  const routeError = useRouteError()
  if (isRouteErrorResponse(routeError)) {
    const errors = routeError.data.map((e: any) => {
      return (
        <div>
          <p>{e.message}</p>
        </div>
      )
    })
    return <Fragment><p>errors</p>{errors}</Fragment>
  }
}
