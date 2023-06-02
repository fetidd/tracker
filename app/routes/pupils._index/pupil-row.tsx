import { Link } from "@remix-run/react";
import { Tag } from "~/components";
import { Pupil } from "~/models/pupil";

export default function PupilRow({ pupil }: PupilRowProps) {
  if (pupil.active) {
    return (
      <li
        key={pupil.id}
        className="snap-start cursor-pointer break-inside-avoid-column"
      >
        <Link to={`/pupils/${pupil.id}`}>
          <div className="h-[42px] hover:bg-slate-100 w-full flex gap-5 flex-no-wrap rounded items-center px-2">
            <span>{`${pupil.firstNames} ${pupil.lastName}`}</span>
            <div className="hidden lg:flex justify-start items-center space-x-1 w-[200px]">
              {pupil.mat && (
                <Tag id="mat" color="Purple" text="MAT" />
              )}
              {pupil.eal && (
                <Tag id="eal" color="Yellow" text="EAL" />
              )}
              {pupil.aln && (
                <Tag id="aln" color="Orange" text="ALN" />
              )}
              {pupil.fsm && (
                <Tag id="fsm" color="Green" text="FSM" />
              )}
              {pupil.lac && (
                <Tag id="lac" color="Blue" text="LAC" />
              )}
            </div>
          </div>
        </Link>
      </li>
    );
  } else {
    return (
      <Link to={`/pupils/${pupil.id}`}>
        <li
          key={pupil.id}
          className="snap-start cursor-pointer break-inside-avoid-column"
        >
          <div className="h-[42px] flex justify-between flex-no-wrap rounded items-center px-2">
            <span className="text-slate-200">{`${pupil.firstNames} ${pupil.lastName}`}</span>
          </div>
        </li>
      </Link>
    );
  }
}

interface PupilRowProps {
  pupil: Pupil;
}
