type DetailsRowProps = {
  label: string,
  value: any
}

export function DetailsRow({label, value}: DetailsRowProps) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

type DetailsHeaderProps = {
  level: number,
  value: any
}

export function DetailsHeader({ value }: DetailsHeaderProps) {
  return (
    <div className="w-full">
      <span className={`text-3xl`}>{value}</span>
    </div>
  )
}

type DetailsTextProps = {
  text: string
}

export function DetailsText({text}: DetailsTextProps) {
  return (
    <div>
      {text.split("\n").map((t, i) => <p key={i}>{t}</p>)}
    </div>
  )
}