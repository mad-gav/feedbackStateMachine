import { Machine, assign } from "xstate";

// Available variables:
// - Machine
// - interpret
// - assign
// - send
// - sendParent
// - spawn
// - raise
// - actions
// - XState (all XState exports)

const isNoOrImprove = (context, event) => {
  debugger;
  if (
    context.initialFeedback === "useful_no" ||
    context.initialFeedback === "improve"
  ) {
    return true;
  }
};

const isYes = (context, event) => {
  if (context.initialFeedback === "useful_yes") return true;
};

export function submit(values) {
  console.log("Submitting", values);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return Math.random() < 0.4 || values.one === "error"
        ? reject()
        : resolve();
    }, 1000);
  });
}

export const feedbackMachine = Machine({
  id: "feedback-machine",
  initial: "idle",
  context: {
    initialFeedback: null
  },
  states: {
    idle: {
      on: {
        SUBMIT: [
          {
            target: "submitting",
            actions: assign({ initialFeedback: (_ctx, e) => e.value })
          }
        ]
      }
    },
    submitting: {
      invoke: {
        id: "submitinitial",
        src: ctx => submit(ctx),
        onDone: [
          {
            target: "initialsuccess",
            actions: assign({
              initialFeedback: (context, event) => event.value
            }),
            cond: isYes
          },
          {
            target: "formpanelopened",
            actions: assign({
              initialFeedback: (context, event) => event.value
            }),
            cond: isNoOrImprove
          }
        ],
        onError: {
          target: "initialerror",
          actions: assign({ error: (context, event) => event.value })
        }
      }
    },
    initialerror: {},
    initialsuccess: {},
    formpanelopened: {},
    formpanelerror: {},
    opened: {
      on: {
        CLOSE: "closed",
        CHANGE: {
          actions: assign({ rating: (ctx, e) => e.value })
        }
      }
    },
    closed: {
      on: {
        CLICK_BUTTON: "opened"
      }
    }
  },
  on: {
    RESET: "idle" // explicit self-transition
  }
});

// const formFeedbackNeeded = (context, event) => {
//   return context.initialFeedback === "useful_yes" || "no ";
// };

// export const feedbackMachine = Machine({
//   id: "feedback-machine",
//   initial: "closed",
//   context: {
//     initialFeedback: null
//   },
//   states: {
//     idle: {
//       on: {
//         YES: "submitting",
//         NO: "submitting",
//         improve: "submitting"
//       }
//     },
//     submitting: {
//       invoke: {
//         id: "submitinitial",
//         // src: (context, event) => fetchUser(context.userId),
//         onDone: {
//           target: "formpanelopened",
//           actions: assign({ feedback: (context, event) => event.data }),
//           cond: formFeedbackNeeded
//         },
//         onError: {
//           target: "initialerror",
//           actions: assign({ error: (context, event) => event.data })
//         }
//       }
//     },
//     initialerror: {},
//     formpanelopened: {},
//     formpanelerror: {},
//     opened: {
//       on: {
//         CLOSE: "closed",
//         CHANGE: {
//           actions: assign({ rating: (ctx, e) => e.value })
//         }
//       }
//     },
//     closed: {
//       on: {
//         CLICK_BUTTON: "opened"
//       }
//     }
//   }
// });
