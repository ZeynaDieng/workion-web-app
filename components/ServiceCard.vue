<template>
  <NuxtLink 
    :to="`/services/${service.slug}`"
    class="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200"
  >
    <div class="text-center">

      <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors">
        <img :src="service.icon?.fullUrl" alt="Icon" class="w-full h-full object-contain">
      </div>
      

      <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
        {{ service.name }}
      </h3>
      

      <p v-if="service.description" class="text-sm text-gray-600 mt-2 line-clamp-2">
        {{ service.description }}
      </p>
      
      <div class="mt-3 text-sm text-gray-500">
        {{ service.providersCount || 0 }} prestataires
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  service: {
    id: string
    name: string
    slug: string
    icon?: {
      fullUrl: string
    }
    description?: string
    providersCount?: number
  }
}

defineProps<Props>()
</script>
