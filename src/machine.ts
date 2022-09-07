import { createMachine, interpret } from "xstate";

// This machine is completely decoupled from Svelte
export const windows = createMachine(
  {
    id: "windows",
    initial: "off",
    states: {
      off: {
        on: { STARTUP: "on" },
      },
      on: {
        initial: "ok",
        on: {
          FORCE_SHUT: "#windows.off",
        },
        states: {
          ok: {
            initial: "notShuttingDown",
            after: {
              BLUE_SCREEN_DELAY: "#windows.on.blueScreen",
            },
            states: {
              notShuttingDown: {
                initial: "sleep",
                on: {
                  SHUT_DOWN: {
                    target: "#windows.on.ok.shuttingDown",
                    cond: "isNotBlueScreen",
                  },
                },
                states: {
                  sleep: {
                    on: {
                      TOGGLE_SLEEP: "active",
                    },
                  },
                  active: {
                    on: {
                      TOGGLE_SLEEP: "sleep",
                    },
                  },
                },
              },
              shuttingDown: {
                after: {
                  3000: "#windows.off",
                },
              },
            },
          },
          blueScreen: {},
        },
      },
    },
  },
  {
    delays: {
      BLUE_SCREEN_DELAY: () => {
        const delay = Math.max(Math.round(Math.random() * 10_000), 2000);
        console.log(`will bluescreen in ${delay}ms`);
        return delay;
      },
    },
    guards: {
      isNotBlueScreen: (_context, _event, { state }) => {
        return state.value["on"] !== "blueScreen";
      },
    },
  }
);

export const windowsService = interpret(windows).start();
