export type Movie = {
  id: string
  title: string
  publishingYear: number
  posterUrl: string | null
}

export type Paginated<T> = {
  data: T[]
  page: number
  pageSize: number
  total: number
}
