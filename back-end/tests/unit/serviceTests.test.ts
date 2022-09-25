import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import recommendationFactory from "../factory/recomendationFactory";
describe("Test Insert Function", () => {
  it("Insert New Recommendation, Correct Data Format.", async () => {
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return;
      });

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return;
      });

    const createData = recommendationFactory.allowedRecomendation();

    await recommendationService.insert(createData);

    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });

  it("Insert Recommendation Already existent.", async () => {
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return;
      });

    const createData = recommendationFactory.allowedRecomendation();

    const result = recommendationService.insert(createData);
    expect(result).rejects.toStrictEqual({
      type: "conflict",
      message: "Recommendations names must be unique",
    });
    expect(recommendationRepository.findByName).toBeCalled();
  });
});

describe("Test Upvote Function", () => {
  it("Try Upvote Correct Id, expect function toBeCalled", async () => {
    const recommendation = {
      ...recommendationFactory.allowedRecomendation(),
      id: 1,
      score: 10,
    };

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(null);

    await recommendationService.upvote(recommendation.id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("Try Upvote a Nonexistent Id", () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(undefined);

    const result = recommendationService.upvote(1);

    expect(result).rejects.toStrictEqual({
      type: "not_found",
      message: "",
    });
    expect(recommendationRepository.find).toBeCalled();
  });
});

describe("test Downvote Function", () => {
  it("Test Downvote Correct Id, expect function toBeCalled", async () => {
    const recommendation = {
      ...recommendationFactory.allowedRecomendation(),
      id: 1,
      score: 15,
    };
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommendation);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce({ ...recommendation, score: 14 });

    await recommendationService.downvote(1);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("Test Downvote Recommendation score < -5, expect to try exclude Recommendation", async () => {
    const recommendation = {
      ...recommendationFactory.allowedRecomendation(),
      id: 1,
      score: -5,
    };
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recommendation);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce({ ...recommendation, score: -6 });
    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {
        return;
      });

    await recommendationService.downvote(recommendation.id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).toBeCalled();
  });
});
