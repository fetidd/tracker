import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components";
import PupilRow from "./pupil-row";
import { LoaderArgs, json } from "@remix-run/node";
import { db } from "~/db/db.server";
import { useAppState } from "~/app-state";
import { pupilFromJson } from "~/models/pupil";

export async function loader(_args: LoaderArgs) {
  let pupils = await db.Pupil.findMany();
  return json({
    pupils: pupils,
  });
}

export default function PupilsIndex() {
  const [app, mutate] = useAppState()
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
            checked={app.showInactive}
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
            .filter((p) => (app.showInactive ? true : p.active))
            .map(pupilFromJson)
            .map((p) => (
              <PupilRow key={p.id} pupil={p} />
            ))}
        </ul>
      </div>
    </>
  );
}
