import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IStatisticRepository } from "../../../application/repositories/interface-statistic-repository";
import { PlayerSchema, PlayerDocument } from "../providers/mongo/schemas/player.schema";

@Injectable()
export class StatisticRepository implements IStatisticRepository {
  constructor(
    @InjectModel(PlayerSchema.name) private playerModel: Model<PlayerDocument>
  ) {}

  async getPlayerStatistics() {
    const topCountryResult = await this.playerModel.aggregate([
      {
        $group: {
          _id: "$country.code",
          avgPoints: { $avg: "$data.points" },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgPoints: -1 } },
      { $limit: 1 }
    ] as any).exec();

    
    const bmiResult = await this.playerModel.aggregate([
      {
        $addFields: {
          bmi: {
            $divide: [
              { $divide: ["$data.weight", 1000] }, 
              { $pow: [{ $divide: ["$data.height", 100] }, 2] }
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          averageBMI: { $avg: "$bmi" }
        }
      }
    ] as any).exec();

    
    const heightsResult = await this.playerModel
      .find({}, { "data.height": 1, _id: 0 })
      .sort({ "data.height": 1 })
      .exec();
    
    const heights = heightsResult.map(p => p.data.height);
    const count = heights.length;
    const median = count > 0 
      ? count % 2 === 0
        ? (heights[Math.floor(count / 2) - 1] + heights[Math.floor(count / 2)]) / 2
        : heights[Math.floor(count / 2)]
      : 0;

    return {
      topWinRatioCountry: {
        country: topCountryResult[0]?._id || 'N/A',
        winRatio: Math.round((topCountryResult[0]?.avgPoints || 0) / 1000) / 1000
      },
      averageBMI: Math.round((bmiResult[0]?.averageBMI || 0) * 100) / 100,
      heightMedian: median
    };
  }
}
