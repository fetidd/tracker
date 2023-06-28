import { Card } from "@material-tailwind/react";
import { css } from "~/style";

export default function MetricRecords() {

  return (
    <Card className={css.outletCard}>
      <div className={css.scrollingDiv}>
        <table className={css.table}>

        </table>
      </div>
    </Card>
  )
}