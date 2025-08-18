import { createApp, type App } from "vue";

const withSetup = <T>(composable: () => T): [T, App<Element>] => {
  let result: T | undefined;
  const app = createApp({
    setup() {
      result = composable()

      return () => {}
    }
  })

  app.mount(document.createElement('div'))
  if (result === undefined) { throw new Error('Composable function did not return a value');  }
  return [result, app] as const
};

export default withSetup;
