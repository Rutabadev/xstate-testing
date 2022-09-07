<script lang="ts">
  import { crawlToLastChild } from "../utils";
  import { windowsService } from "../machine";

  /**
   * Returns the state with the last child wrapped in a styled span
   * @param state
   */
  const beautifyState = (state, classes) => {
    return JSON.stringify(state, null, 2).replace(
      new RegExp(`(${crawlToLastChild($windowsService.value)})`, "g"),
      `<span class="${classes}">$1</span>`
    );
  };

  $: myState = beautifyState(
    $windowsService.value,
    "text-brand-400 dark:text-brand-600"
  );
</script>

<div>
  <p>Current state :</p>
  <pre
    class="mt-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-400">{@html myState}</pre>
</div>
