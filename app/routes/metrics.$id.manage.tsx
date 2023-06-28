import { Button, Card, Input, Textarea } from "@material-tailwind/react";
import { Metric } from "@prisma/client";
import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { handleFetchOne, handleUpdate } from "~/handlers/data-handlers";
import { MetricUpdateFormSchema, MetricUpdate } from "~/models/metric";
import MetricRepo from "~/repos/metric";
import { routes } from "~/routes";

export async function loader({ params }: LoaderArgs) {
  const metricId = parseInt(params.id!)
  const repo = new MetricRepo()
  let res = await handleFetchOne<Metric>(metricId, repo)
  return res
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const repo = new MetricRepo()
  // can switch here based on the form POSTing to the route
  return await handleUpdate<Metric, MetricUpdate>(MetricUpdateFormSchema, formData, repo)
}

function ScoreEdit({ score, desc, name, label }: {score: string, desc: string, name: string, label: string}) {
  return (
    <div className="flex flex-col gap-4 grow">
      <div className="w-72">
        <Input label={label} name={name} defaultValue={score}/>
      </div>
      <div className="grow">
        <Textarea label="Description" size="md" name={`${name}desc`} defaultValue={desc}/>
      </div>
    </div>
  )
}

export default function MetricManage() {
  const metric: Metric = useLoaderData<typeof loader>()
  const nav = useNavigate()
  const actionData = useActionData<typeof action>()
  useEffect(() => {
    if (actionData?.entity) {      
      toast.success("Successfully updated!")
      nav(routes.metrics.index(metric.id))
    } else if (actionData?.errors) {
      actionData.errors.forEach(e => toast.error(e.message))
    }
  }, [actionData])
  return (
    <Card className="p-3 grow h-fit">
    <Form method="POST">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4">
          <div className="w-72">
            <Input label="Name" name="name" defaultValue={metric.name}/>
          </div>
          <Textarea className="h-[300px]" label="Description" name="description" size="lg" defaultValue={metric.description}/>
          <div className="flex justify-between gap-2">
              <ScoreEdit score={metric.score1} desc={metric.score1desc} name="score1" label="Score 1" />
              <ScoreEdit score={metric.score2} desc={metric.score2desc} name="score2" label="Score 2" />
              <ScoreEdit score={metric.score3} desc={metric.score3desc} name="score3" label="Score 3" />
              <ScoreEdit score={metric.score4} desc={metric.score4desc} name="score4" label="Score 4" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button type="submit" color="green">Save</Button>
        <Link to={routes.metrics.index(metric.id)}><Button>Cancel</Button></Link>
      </div>
      <input type="hidden" name="id" value={metric.id} />
    </Form>
    </Card>
  )
}