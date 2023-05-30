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
import { Menu, Navbar } from "./components";
import { APP_VERSION } from "./constant";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: V2_MetaFunction = () => {
  return [{ title: `Tracker v${APP_VERSION}` }];
};

export const loader = async () => {
  return json({
    loggedIn: true,
  });
};

export default function App() {
  const { loggedIn } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
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
      </body>
    </html>
  );
}
