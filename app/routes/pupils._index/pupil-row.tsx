import { Link } from "@remix-run/react";
import { Tag } from "~/components";
import Pupil from "~/models/pupil";

export default function PupilRow({ pupil }: PupilRowProps) {
  if (pupil.active) {
    return (
      <li
        key={pupil.id}
        className="snap-start cursor-pointer break-inside-avoid-column"
      >
        <Link to={`/pupils?id=${pupil.id}`}>
          <div className="h-[42px] hover:bg-slate-100 w-full flex gap-5 flex-no-wrap rounded items-center px-2">
            <span>{`${pupil.first_names} ${pupil.last_name}`}</span>
            <div className="hidden lg:flex justify-start items-center space-x-1 w-[200px]">
              {pupil.more_able_and_talented && (
                <Tag id="mat" color="Purple" text="MAT" />
              )}
              {pupil.english_as_additional_language && (
                <Tag id="eal" color="Yellow" text="EAL" />
              )}
              {pupil.additional_learning_needs && (
                <Tag id="aln" color="Orange" text="ALN" />
              )}
              {pupil.free_school_meals && (
                <Tag id="fsm" color="Green" text="FSM" />
              )}
              {pupil.looked_after_child && (
                <Tag id="lac" color="Blue" text="LAC" />
              )}
            </div>
          </div>
        </Link>
      </li>
    );
  } else {
    return (
      <Link to={`/pupils?id=${pupil.id}`}>
        <li
          key={pupil.id}
          className="snap-start cursor-pointer break-inside-avoid-column"
        >
          <div className="h-[42px] flex justify-between flex-no-wrap rounded items-center px-2">
            <span className="text-slate-200">{`${pupil.first_names} ${pupil.last_name}`}</span>
          </div>
        </li>
      </Link>
    );
  }
}

interface PupilRowProps {
  pupil: Pupil;
}
