<script lang="ts">
  import { windowsService } from "../machine";
</script>

<div class="space-y-4">
  <p>Available actions :</p>
  <div class="flex flex-wrap gap-4">
    {#each $windowsService.nextEvents.filter((state) => !state.includes("xstate")) as action}
      <button
        class="select-none rounded border-2 border-gray-400 bg-gray-300 px-2 py-0.5 text-gray-900 outline-none ring-brand-400 focus-visible:ring-2 active:translate-y-px active:bg-gray-400/60 dark:border-gray-600 dark:bg-gray-400  dark:ring-brand-500 dark:active:bg-gray-500"
        on:click={() => windowsService.send(action)}
      >
        {action}
      </button>
    {/each}
  </div>
</div>
