<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <div>
		<div class="flex justify-between">
      <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <span class="text-sm text-gray-500" :id="`${id}-optional`">{{ optional }}</span>
    </div>
    
    <div class="relative mt-1 rounded-md shadow-sm">
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<component :is="inputType" class="h-5 w-5 text-gray-400" aria-hidden="true"></component>
				<ClockIcon v-if="type === 'datetime-local'" class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input :type="type" :name="name" :id="id" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" :class="(icon) ? ((type === 'datetime-local') ? 'pl-14' : 'pl-10') : 'pl-0'" :placeholder="placeholder" :disabled="disabled" />
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ExclamationCircleIcon v-if="success === false" class="h-5 w-5 text-red-500" aria-hidden="true" />
				<CheckIcon  v-if="success === true" class="h-5 w-5 text-green-500" aria-hidden="true" />
      </div>
    </div>
		<p v-if="description" class="mt-2 text-sm text-gray-500" :id="`${id}-description`">{{ description }}</p>
		<p v-if="error" class="mt-2 text-sm text-red-600" :id="`${id}-error`">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted, onUpdated } from 'vue'
import { 
	SwatchIcon, 
	CalendarDaysIcon, 
	CalendarIcon,
	ClockIcon,
	EnvelopeIcon,
	DocumentIcon,
	PhotoIcon,
	CalculatorIcon,
	KeyIcon,
	LockClosedIcon, LockOpenIcon,
	MagnifyingGlassIcon,
	PhoneIcon,
	LinkIcon,
	ExclamationCircleIcon,
	CheckIcon
} from '@heroicons/vue/24/solid'
import { match } from 'assert';

export interface Props {
	id?: string,
	type?: string,
	name?: string,
	value: string | number | Array<any> | Object,
	min?: string | number | Array<any> | Object,	
	max?: string | number | Array<any> | Object,
	placeholder?: string,
	disabled?: boolean,
	label?: string,
	description?: string,
	optional?: string,
	icon?: Object,
	iconPosition?: string,
}

const props = withDefaults(defineProps<Props>(), {
	id: Math.random().toString(),
	type: 'text',
	iconPosition: 'left',
})

const id = ref(props.id)
const success = ref(true)
const error = ref(false)

const inputType = ref(null) as any
switch(props.type) {
	case 'color':
		inputType.value = SwatchIcon
		break;
		case 'date':
		// inputType.value = CalendarDaysIcon
		inputType.value = CalendarIcon
		break;
	case 'datetime-local':
		// inputType.value = CalendarIcon
		inputType.value = CalendarIcon
		break;
	case 'email':
		inputType.value = EnvelopeIcon
		break;
	case 'file':
		inputType.value = DocumentIcon
		break;
	case 'image':
		inputType.value = PhotoIcon
		break;
	case 'month':
		inputType.value = CalendarDaysIcon
		break;
	case 'number':
		inputType.value = CalculatorIcon
		break;
	case 'password':
		// inputType.value = KeyIcon
		// inputType.value = LockClosedIcon
		inputType.value = LockOpenIcon
		break;			
	case 'search':
		inputType.value = MagnifyingGlassIcon
		break;
	case 'tel':
		inputType.value = PhoneIcon
		break;
	case 'time':
		inputType.value = ClockIcon
		break;
	case 'url':
		inputType.value = LinkIcon
		break;
	case 'week':
		inputType.value = CalendarIcon
		break;
	default: 
		inputType.value = ''
}

</script>
