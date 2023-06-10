import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
  const routeError = useRouteError()
  if (isRouteErrorResponse(routeError)) {
    const errors = routeError.data.map((e: any) => {
      return (
        <div>
          <p>{e.message}</p>
        </div>
      )
    })
    return <><p>errors</p>{errors}</>
  }
}

export default function Pupils() {
  return (
    <>
      <Outlet />
    </>
  )
}
