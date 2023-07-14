import { sortPupils } from "~/utils/functions"

describe("utils/functions", () => {
  test("sortPupils", () => {
    let tests = [
      [{firstNames: "Ben", lastName: "Davies"}, {firstNames: "Ben", lastName: "Jones"}, -1],
      [{firstNames: "Ben", lastName: "Yippidybeepboop"}, {firstNames: "Ben", lastName: "Jones"}, 1],
      [{firstNames: "Ben", lastName: "Jones"}, {firstNames: "Ben", lastName: "Jones"}, 0],
      [{firstNames: "Ben", lastName: "Jones"}, {firstNames: "Ben", lastName: "Jones"}, 0],
      [{firstNames: "Ben", lastName: "Jones"}, {firstNames: "Peter", lastName: "Jones"}, -1],
      [{firstNames: "Ben", lastName: "Jones"}, {firstNames: "Aaron", lastName: "Jones"}, 1],
    ]
    for (let [pupilA, pupilB, expected] of tests) {
      expect(sortPupils(pupilA, pupilB)).toBe(expected)
    }
  })
})