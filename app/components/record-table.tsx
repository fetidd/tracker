import { Card } from "@material-tailwind/react"
import { Link } from "@remix-run/react"
import { ExpandedRecord } from "~/models/expanded-record"
import { routes } from "~/routes"
import { css } from "~/style"

const BASE_CSS = "flex justify-between gap-2 border-2 rounded-md p-2"
const SCORE_CSS = [
  "border-red-400 bg-red-100",
  "border-orange-400 bg-orange-100",
  "border-yellow-400 bg-yellow-100",
  "border-green-400 bg-green-100",
]

type RecordTableProps = {
	records: ExpandedRecord[]
}

export default function RecordTable({ records }: RecordTableProps) {
  return (
    <Card className={css.outletCard}>
      <div className={css.scrollingDiv}>
        <div className="flex flex-col gap-2 mx-2">
        {records.map(rec => (
          <Link key={rec.id} to={routes.records.details(rec.id)}>
            <div className={`${BASE_CSS} ${SCORE_CSS[rec.score - 1]}`}>
              <span className="min-w-[150px]">{`${rec.pupil.firstNames} ${rec.pupil.lastName}`}</span>
              <span>{rec.note}</span>
              <span>{rec.createdAt.toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </Card>
  )
}
