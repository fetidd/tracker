import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components";
import PupilRow from "./pupil-row";
import { LoaderArgs, json } from "@remix-run/node";
import { useState } from "react";
import { db } from "~/db/db.server";

export async function loader(_args: LoaderArgs) {
  let pupils = await db.pupil.findMany();
  return json({
    pupils: pupils,
  });
}

export default function PupilsIndex() {
  const [showInactive, setShowInactive] = useState(false);
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
            checked={showInactive}
            onChange={(_ev) => {
              setShowInactive(!showInactive);
            }}
          />
          <Button text="Filter" handler={() => {}} color="Gray" />
          <Button text="Refresh" handler={(_ev) => {}} color="Gray" />
        </div>
      </div>
      <div className="overflow-y-auto [max-height:calc(90vh-60px)] px-5 pt-5 scrollbar rounded-md bg-white">
        <ul className="sm:columns-2 2xl:columns-3 snap-y">
          {data.pupils
            .filter((p) => (showInactive ? true : p.active))
            .map((p) => (
              <PupilRow key={p.id} pupil={p} />
            ))}
        </ul>
      </div>
    </>
  );
}
