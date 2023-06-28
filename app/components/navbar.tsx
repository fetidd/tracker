import { ArrowDownTrayIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Button,
  Card,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Metric } from "@prisma/client";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { APP_VERSION } from "~/constant";
import { routes } from "~/routes";
 
export default function Navbar({ metrics }: NavbarProps) {
  return (
      <Card className="sticky inset-0 z-10 h-max max-w-full py-2 px-4 m-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10 text-blue-gray-900">
            <Typography as="a" href={routes.index()} className="mr-4 cursor-pointer py-1.5 font-medium flex gap-2 items-baseline" variant="h3">Tracker<Typography className="text-gray-400">{APP_VERSION}</Typography></Typography>
            <ul className="flex gap-8">
              <Typography className="text-lg" as="li"><Link to={routes.pupils.index()}>Learners</Link></Typography>
              {metrics.slice(undefined, 5).map(metric => {
                return <Typography key={metric.id} className="text-lg" as="li"><Link to={routes.metrics.index(metric.id)}>{metric.name}</Link></Typography>
              })}
              {metrics.length > 5 && <ExtraMetricsMenu metrics={metrics.slice(5)} />}
              <Typography className="text-sm" as="li"><Link to={routes.metrics.new()}>Add new metric</Link></Typography>
            </ul>
          </div>
          <div>
            <Button className="justify-self-end" variant="gradient">Log out</Button>
          </div>
        </div>
      </Card>
  );
}

interface NavbarProps {
  metrics: Metric[]
}


function ExtraMetricsMenu({ metrics }: ExtraMetricsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <Menu open={isOpen} handler={setIsOpen}>
      <MenuHandler><ChevronDownIcon className="w-5 cursor-pointer" /></MenuHandler>
      <MenuList>
        {metrics.map(metric => <MenuItem key={metric.id} onClick={closeMenu}><Link to={routes.metrics.index(metric.id)}><Typography as="li">{metric.name}</Typography></Link></MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}

interface ExtraMetricsMenuProps {
  metrics: Metric[]
}