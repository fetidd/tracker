const pupils = {
  index: () => `/pupils`,
  new: () => `/pupils/new`,
  details: (id: number) => `/pupils/${id}`
}

const metrics = {
  index: () => `/metrics`,
  new: () => `/metrics/new`,
  details: (id: number) => `/metrics/${id}`
}

export const routes = {
  pupils: pupils,
  metrics: metrics,
}
