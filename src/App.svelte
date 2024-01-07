<script lang="ts">
  import "./global.css";
  import { fly } from "svelte/transition";
  import { windowsService } from "./machine";
  import StateDisplay from "./lib/StateDisplay.svelte";
  import StateControls from "./lib/StateControls.svelte";

  const addAbsoluteClass = (e) => {
    (e.target as HTMLElement).classList.add("absolute");
  };

  $: messages = [
    {
      message: "goodbye 🙋‍♂️",
      condition: $windowsService.value?.["on"]?.["ok"] === "shuttingDown",
    },
    {
      message: "aïe aïe aïe 😵",
      condition: $windowsService.value?.["on"] === "blueScreen",
    },
    {
      message: "ron piche ron piche 😴",
      condition: $windowsService.value?.["on"]?.["ok"]?.["running"] === "sleep",
    },
  ];
</script>

<main>
  <div class="mx-auto max-w-4xl p-8">
    <h1
      class="text-center text-3xl font-light text-brand-600 text-shadow-brand-600 dark:text-shadow-lg"
    >
      XState testing
    </h1>
    <div class="mt-10 grid grid-flow-row-dense gap-6 sm:grid-cols-2">
      <StateControls />
      <div class="sm:col-start-1 sm:row-start-1">
        <StateDisplay />
        {#each messages as { message, condition }}
          {#if condition}
            <p
              class="mt-6"
              in:fly={{ y: 100 }}
              out:fly={{ y: -50 }}
              on:outrostart={addAbsoluteClass}
            >
              {message}
            </p>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</main>
