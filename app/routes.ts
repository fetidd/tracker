const pupils = {
  index: () => `/pupils`,
  new: () => `/pupils/new`,
  details: (id: number) => `/pupils/${id}`,
  records: (id: number) => `/pupils/${id}/records`
}

const metrics = {
  index: (id: number) => `/metrics/${id}`,
  new: () => `/metrics/new`,
  manage: (id: number) => `/metrics/${id}/manage`,
  records: (id: number) => `/metrics/${id}/records`,
}

const records = {
  index: () => `/records`,
  new: () => `/records/new`,
  details: (id: number) => `/records/${id}`
}

export const routes = {
  index: () => "/",
  pupils: pupils,
  metrics: metrics,
  records: records
}
