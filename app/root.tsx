import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import type { LinksFunction } from "@vercel/remix";
import { buildParams, fetchApi } from "./lib/fetchApi";
import TierList from "./components/TierList";
import NavBar from "./components/NavBar";
import { json } from '@vercel/remix';
import NavBar2 from "./components/NavBar2";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async () => {
  const urlSearchParams = new URLSearchParams(buildParams())
  const url2 = `https://app.wzstats.gg/wz2/weapons/meta/weapons-and-tier-lists/?${urlSearchParams}`
  const data = await fetchApi(url2);
  const attachments = await fetchApi("https://app.wzstats.gg/wz2/weapons/builds/wzstats/with-attachments/?game=wz2")
  const attachments2 = await fetchApi("https://app.wzstats.gg/wz2/weapons/builds/wzstats/with-attachments/?game=mw3")
  return json({ data, attachments: { builds: [...attachments.builds, ...attachments2.builds] } });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="container">
          {/* <NavBar /> */}
          <div className="content">
            <NavBar2 />
            <TierList />
            <Outlet />
          </div>
          <ScrollRestoration />
        </div>
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
}
