import { AppStateMutation, AppStateSchema, mutateAppState } from "~/app-state"

describe("app-state", () => {
  test("mutateAppState", () => {
    let tests: [any, AppStateMutation, any][] = [
      [{}, {property: "showInactive", mutation: true}, {showInactive: true}],
      [{}, {property: "showInactive", mutation: false}, {}],
      [{}, {property: "pupilFilter", mutation: "ben jones"}, {pupilFilter: "ben jones"}],
      [{pupilFilter: "ben jones"}, {property: "pupilFilter", mutation: "ben"}, {pupilFilter: "ben"}],
    ]
    for (let [stateBefore, mut, stateAfter] of tests) {
      let initState = AppStateSchema.parse(stateBefore)
      let expState = AppStateSchema.parse(stateAfter)
      expect(mutateAppState(initState, mut)).toStrictEqual(expState)
    }
  })
})