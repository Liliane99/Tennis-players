import { IStatisticRepository } from "../../repositories/interface-statistic-repository";
import { ApplicationError, ErrorType } from "../../exceptions/application-error";

export class GetStatisticsUsecase {
    constructor(private readonly statisticRepository: IStatisticRepository) {}

    async execute() {
        try {
            return await this.statisticRepository.getPlayerStatistics();
        } catch (error) {
            if (error instanceof Error) {
                throw new ApplicationError(
                    'Failed to retrieve player statistics',
                    ErrorType.BUSINESS,
                    error
                );
            }
            throw error;
        }
    }
}
