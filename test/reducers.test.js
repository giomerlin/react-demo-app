import * as actions from "../src/actions";
import { receiveQuestions } from "../src/actions";
import { questionsReducer } from "../src/reducers";

const questions = [
  {
    id: "q1",
    text: "This is the first question",
    subtitle: "This is the subtitle",
    answers: [
      { id: 1, text: "Option 1" },
      { id: 2, text: "Option 2" },
      { id: 3, text: "Option 3" },
    ],
  },
];

describe("Questions reducer", () => {
  it("Should update the state", () => {
    expect(questionsReducer(undefined, {})).toEqual({});

    let currentState = questionsReducer({}, actions.getAllQuestions());

    expect(currentState).toEqual({
      loading: true,
      items: [],
    });

    currentState = questionsReducer(
      currentState,
      receiveQuestions({ response: { questions } })
    );

    expect(currentState).toEqual({
      loading: false,
      items: questions,
    });
  });
});
