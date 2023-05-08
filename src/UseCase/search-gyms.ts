import { GymsRepository } from '@/repositories/prisma/gyms-repository'
import { Gym } from '@prisma/client'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}
export class SearchGymUseCase {
  constructor(private gymrepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymrepository.searchManyByQuery(query, page)

    return { gyms }
  }
}
