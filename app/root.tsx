import { LinksFunction, V2_MetaFunction, json } from "@remix-run/node";
import stylesheet from "~/tailwind.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Navbar } from "./components";
import { APP_VERSION } from "./constant";
import { useReducer } from "react";
import { AppStateContext, AppStateMutationFnContext, mutateAppState } from "./app-state";
import { Toaster } from "react-hot-toast";
import MetricRepo from "./repos/metric";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: V2_MetaFunction = () => {
  return [{ title: `Tracker v${APP_VERSION}` }];
};

export async function loader() {
  const repo = new MetricRepo()
  let metrics = await repo.read()
  return json({
    metrics: metrics
  })
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  const [ctx, mutate] = useReducer(mutateAppState, {
    showInactive: false,
    pupilFilter: "",
  }) 
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-blue-gray-100">
        <Toaster />
        <AppStateContext.Provider value={ctx}>
          <AppStateMutationFnContext.Provider value={mutate}>
            <div className="h-[99vh] w-[100vw] overflow-hidden">
              <Navbar metrics={data.metrics}/>
              <Outlet />
            </div>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </AppStateMutationFnContext.Provider>
        </AppStateContext.Provider>
      </body>
    </html>
  );
}
