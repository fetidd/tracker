import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components";
import PupilRow from "./pupil-row";
import { LoaderArgs, json } from "@remix-run/node";
import { useContext } from "react";
import { db } from "~/db/db.server";
import { AppStateContext, AppStateMutationFnContext } from "~/app-state";

export async function loader(_args: LoaderArgs) {
  let pupils = await db.pupil.findMany();
  return json({
    pupils: pupils,
  });
}

export default function PupilsIndex() {
  const ctx = useContext(AppStateContext)
  const mutate = useContext(AppStateMutationFnContext)
  if (mutate == null) {
    throw new Error("missing mutate function in PupilsIndex")
  }
  let data = useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex gap-2 justify-between">
        <Link to="/pupils/new">
          <Button color="Green" text="Add pupil" />
        </Link>
        <div className="flex items-center gap-3">
          <label htmlFor="show-inactive-checkbox">Show inactive</label>
          <input
            type="checkbox"
            id="show-inactive-checkbox"
            checked={ctx.showInactive}
            onChange={(ev) => {
              mutate({property: "showInactive", mutation: ev.target.checked});
            }}
          />
          <Button text="Filter" handler={() => {}} color="Gray" />
          <Button text="Refresh" handler={(_ev) => {}} color="Gray" />
        </div>
      </div>
      <div className="overflow-y-auto [max-height:calc(90vh-60px)] px-5 pt-5 scrollbar rounded-md bg-white">
        <ul className="sm:columns-2 2xl:columns-3 snap-y">
          {data.pupils
            .filter((p) => (ctx.showInactive ? true : p.active))
            .map(p => {return {...p, start_date: new Date(p.start_date), end_date: p.end_date ? new Date(p.end_date): undefined}}) // TODO this is gonna be a pain in the ass, whats a better way? basically the object in the loader has the dates as strings
            .map((p) => (
              <PupilRow key={p.id} pupil={p} />
            ))}
        </ul>
      </div>
    </>
  );
}
