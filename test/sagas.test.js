import { runSaga } from "redux-saga";
import { call, put } from "redux-saga/effects";
import * as actions from "../src/actions";
import { getAllQuestions } from "../src/sagas";
import { api } from "../src/services";

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

const delay = (t) => new Promise((res) => setTimeout(() => res(), t));

describe("Test getAllQuestions", () => {
  it("Should test the full plan", () => {
    const generator = getAllQuestions();

    const payload = {
      response: questions,
    };

    let next = generator.next(payload);

    expect(next.value).toMatchObject(call(api.getQuestions));

    //TODO: Invoke the delay
    generator.next(payload);

    next = generator.next();

    expect(next.value).toMatchObject(put(actions.receiveQuestions(payload)));
  });

  it("Execute the request", async () => {
    const requestQuestions = jest
      .spyOn(api, "getQuestions")
      .mockImplementation(() => Promise.resolve({ response: questions }));

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action);
        },
      },
      getAllQuestions
    );

    await delay(2000);

    expect(requestQuestions).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      actions.receiveQuestions({ response: questions }),
    ]);

    requestQuestions.mockClear();
  });
});
