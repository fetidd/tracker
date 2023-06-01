import { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Menu, Navbar } from "./components";
import { APP_VERSION } from "./constant";
import {  useReducer } from "react";
import { AppStateContext, AppStateMutationFnContext, mutateAppState } from "./app-state";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: V2_MetaFunction = () => {
  return [{ title: `Tracker v${APP_VERSION}` }];
};

export default function App() {
  const [ctx, mutate] = useReducer(mutateAppState, {
    showInactive: false
  }) 
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppStateContext.Provider value={ctx}>
          <AppStateMutationFnContext.Provider value={mutate}>
            <div id="app">
              <Navbar />
              <Menu />
              <div id="outlet" className="p-3">
                <Outlet />
              </div>
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
