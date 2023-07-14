import { Pupil } from "~/models/pupil"
import { ExpandedRecord, generateExpandedRecords } from "~/models/expanded-record"
import { Metric } from "~/models/metric"
import { Record } from "~/models/record"

describe("expanded-record", () => {
  test("generateExpandedRecords", () => {
    let tests: [Record[], Pupil[], Metric[], ExpandedRecord[]][] = [[[], [], [], []],
      [
        [{id: 1, pupilId: 1, metricId: 1, score: 1, note: "", createdAt: new Date("2021-01-01")}], 
        [{id: 1, firstNames: "first1", lastName: "last1", year: 1, startDate: new Date("2020-01-01"), endDate: null, active: true, gender: "male", eal: false, aln: false, mat: false, lac: false, fsm: false, notes: ""}],
        [{id: 1, name: "metric1", score1: "sc1", score2: "sc2", score3: "sc3", score4: "sc4"}],
        [{id: 1, pupil: {id: 1, firstNames: "first1", lastName: "last1", year: 1, startDate: new Date("2020-01-01"), endDate: null, active: true, gender: "male", eal: false, aln: false, mat: false, lac: false, fsm: false, notes: ""}, metric: {id: 1, name: "metric1", score1: "sc1", score2: "sc2", score3: "sc3", score4: "sc4"}, score: 1, note: "", createdAt: new Date("2021-01-01")}]
      ],
      [
        [
          {id: 1, pupilId: 1, metricId: 1, score: 1, note: "", createdAt: new Date("2021-01-01")},
          {id: 2, pupilId: 1, metricId: 2, score: 1, note: "", createdAt: new Date("2021-01-02")},
          {id: 3, pupilId: 1, metricId: 2, score: 1, note: "", createdAt: new Date("2021-01-03")},
          {id: 4, pupilId: 2, metricId: 1, score: 1, note: "", createdAt: new Date("2021-01-04")},
          {id: 5, pupilId: 2, metricId: 2, score: 1, note: "", createdAt: new Date("2021-01-05")},
        ], 
        [
          {id: 1, firstNames: "first1", lastName: "last1", year: 1, startDate: new Date("2020-01-01"), endDate: null, active: true, gender: "male", eal: false, aln: false, mat: false, lac: false, fsm: false, notes: ""},
          {id: 2, firstNames: "first2", lastName: "last2", year: 1, startDate: new Date("2020-01-01"), endDate: null, active: true, gender: "male", eal: false, aln: false, mat: false, lac: false, fsm: false, notes: ""},
          {id: 3, firstNames: "first3", lastName: "last3", year: 1, startDate: new Date("2020-01-01"), endDate: null, active: true, gender: "male", eal: false, aln: false, mat: false, lac: false, fsm: false, notes: ""},
        ],
        [
          {id: 1, name: "metric1", score1: "sc1", score2: "sc2", score3: "sc3", score4: "sc4"},
          {id: 2, name: "metric2", score1: "sc1", score2: "sc2", score3: "sc3", score4: "sc4"},
          {id: 3, name: "metric3", score1: "sc1", score2: "sc2", score3: "sc3", score4: "sc4"},
        ],
        [
          {id: 1, pupil: {id: 1, firstNames: "first1", lastName: "last1", year: 1, startDate: new Date("2020-01-01"), endDate: null, active: true, gender: "male", eal: false, aln: false, mat: false, lac: false, fsm: false, notes: ""}, metric: {id: 1, name: "metric1", score1: "sc1", score2: "sc2", score3: "sc3", score4: "sc4"}, score: 1, note: "", createdAt: new Date("2021-01-01")},
          {id: 2, pupil: {id: 1, firstNames: "first1", lastName: "last1", year: 1, startDate: new Date("2020-01-01"), endDate: null, active: true, gender: "male", eal: false, aln: false, mat: false, lac: false, fsm: false, notes: ""}, metric: {id: 2, name: "metric2", score1: "sc1", score2: "sc2", score3: "sc3", score4: "sc4"}, score: 1, note: "", createdAt: new Date("2021-01-02")},
          {id: 3, pupil: {id: 1, firstNames: "first1", lastName: "last1", year: 1, startDate: new Date("2020-01-01"), endDate: null, active: true, gender: "male", eal: false, aln: false, mat: false, lac: false, fsm: false, notes: ""}, metric: {id: 2, name: "metric2", score1: "sc1", score2: "sc2", score3: "sc3", score4: "sc4"}, score: 1, note: "", createdAt: new Date("2021-01-03")},
          {id: 4, pupil: {id: 2, firstNames: "first2", lastName: "last2", year: 1, startDate: new Date("2020-01-01"), endDate: null, active: true, gender: "male", eal: false, aln: false, mat: false, lac: false, fsm: false, notes: ""}, metric: {id: 1, name: "metric1", score1: "sc1", score2: "sc2", score3: "sc3", score4: "sc4"}, score: 1, note: "", createdAt: new Date("2021-01-04")},
          {id: 5, pupil: {id: 2, firstNames: "first2", lastName: "last2", year: 1, startDate: new Date("2020-01-01"), endDate: null, active: true, gender: "male", eal: false, aln: false, mat: false, lac: false, fsm: false, notes: ""}, metric: {id: 2, name: "metric2", score1: "sc1", score2: "sc2", score3: "sc3", score4: "sc4"}, score: 1, note: "", createdAt: new Date("2021-01-05")},
        ]
      ],
    ]
    for (let [records, pupils, metrics, expected] of tests) {
      expect(generateExpandedRecords(records, pupils, metrics)).toStrictEqual(expected)
    }
  })
})
