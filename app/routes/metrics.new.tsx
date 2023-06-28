import { Button, Card, Input, Textarea } from "@material-tailwind/react"
import { ActionArgs } from "@remix-run/node"
import { Form, useActionData, useNavigate } from "@remix-run/react"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { NewMetricFormSchema, NewMetric } from "~/models/metric"
import MetricRepo from "~/repos/metric"
import { routes } from "~/routes"
import { handleNew } from "~/handlers/data-handlers"

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const repo = new MetricRepo()
  // can switch here based on the form POSTing to the route
  return await handleNew(NewMetricFormSchema, formData, repo)
}

export default function NewMetric() {
  const actionData = useActionData<typeof action>()
  const nav = useNavigate()
  useEffect(() => {
    if (actionData) {
      if (actionData.success && actionData.entity !== null) {
        toast.success(`Added ${actionData.entity.name}`)
        nav(routes.metrics.index(actionData.entity.id))
      } else {
        actionData.errors.forEach(err => toast.error(err.message))
      }
    }
  }, [actionData])
  return (
    <Card className="p-3 grow h-fit">
    <Form method="POST">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4">
          <div className="w-72">
            <Input label="Name" name="name" />
          </div>
          <Textarea className="h-[300px]" label="Description" name="description" size="lg" />
          <div className="flex justify-between gap-2">
              <ScoreEdit name="score1" label="Score 1" />
              <ScoreEdit name="score2" label="Score 2" />
              <ScoreEdit name="score3" label="Score 3" />
              <ScoreEdit name="score4" label="Score 4" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button type="submit" color="green">Save</Button>
      </div>
    </Form>
    </Card>
  );
}

function ScoreEdit({ name, label }: { name: string, label: string}) {
  return (
    <div className="flex flex-col gap-4 grow">
      <div className="w-72">
        <Input label={label} name={name} />
      </div>
      <div className="grow">
        <Textarea label="Description" size="md" name={`${name}desc`} />
      </div>
    </div>
  )
}
