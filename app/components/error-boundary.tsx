import { isRouteErrorResponse, useRouteError } from '@remix-run/react'

export function ErrorBoundaryInner() {
  const routeError = useRouteError()
  if (isRouteErrorResponse(routeError)) {
      return (
        <div>
          <p>{JSON.stringify(routeError.data)}</p>
        </div>
      )
  }
  return <></>
}
