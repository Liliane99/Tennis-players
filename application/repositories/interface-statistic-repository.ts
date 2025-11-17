export interface IStatisticRepository {
    getPlayerStatistics(): Promise<{
        topWinRatioCountry: {
            country: string;
            winRatio: number;
        };
        averageBMI: number;
        heightMedian: number;
    }>;
}