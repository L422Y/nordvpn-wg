<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">NordVPN Config Generator</h1>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <button
        @click="generateConfigs"
        :disabled="isLoading"
        class="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
    >
      {{ isLoading ? 'Generating...' : 'Generate Configs' }}
    </button>

    <div v-if="configs && configs.length > 0" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Generated Configurations</h2>
      <div class="space-y-4">
        <div v-for="config in configs" :key="config.filename" class="border rounded-md p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium">{{ config.filename }}</h3>
            <button
                @click="downloadConfig(config)"
                class="text-blue-500 hover:text-blue-700"
            >
              Download
            </button>
          </div>
          <pre class="bg-gray-50 p-4 rounded-md text-sm overflow-x-auto">{{ config.config }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ConfigFile {
    filename: string
    config: string
}

const configs = ref<ConfigFile[]>([])
const isLoading = ref(false)
const error = ref('')

async function generateConfigs() {
    error.value = ''
    isLoading.value = true

    try {
        const response = await fetch('/api/nordvpn-config')
        if (!response.ok) {
            throw new Error('Failed to generate configs')
        }

        configs.value = await response.json()
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
        isLoading.value = false
    }
}

function downloadConfig(config: ConfigFile) {
    const blob = new Blob([config.config], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = config.filename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
}
</script>
