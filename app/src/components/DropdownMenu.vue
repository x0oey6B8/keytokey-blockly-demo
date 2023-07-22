<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ChevronDown from "./icons/ChevronDown.vue"

defineProps<Props>();

const isMenuOpen = ref(false);

onMounted(() => {
    window.addEventListener('click', event => {
        if (event?.target) {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown')) {
                isMenuOpen.value = false;
            }
        }
    });
})

function toggleDropdown() {
    isMenuOpen.value = !isMenuOpen.value;
}

function clicked(item: IDropDownMenuItem) {
    if (item) {
        item.clicked();
    }
    isMenuOpen.value = false;
}

export interface Props {
    items: IDropDownMenuItem[]
}

export interface IDropDownMenuItem {
    header: string,
    enabled: boolean,
    clicked: () => void
}
</script>

<template>
    <div class="dropdown">
        <button class="dropbtn" @click="toggleDropdown">
            <slot name="button"></slot>
            <ChevronDown class="svg"></ChevronDown>
        </button>
        <div class="dropdown-content" v-if="isMenuOpen">
            <a 
            v-for="item in items"
            @click="clicked(item)" 
            :class="{ 'disabled-link': !item.enabled }">
                {{ item.header }}
            </a>
        </div>
    </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
    display: flex;
    align-items: center;
}

.dropdown-content {
  position: absolute;
  background-color: #383838;
  width: auto;
  max-width: 200px;
  white-space: nowrap;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 4px 0;
  left: 0;
  top: 100%;
  z-index: 1;
  border-radius: 0 0 5px 5px;
}

.dropdown-content a {
  color: #E7E7E7;
  padding: 8px 16px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 200;
  display: block;
}

.disabled-link {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
}

.dropdown-content a:hover {
  background-color: #717171;
  cursor: pointer;
}

.svg {
    margin-top: 3px;
    width: 18px;
    height: 18px;
    fill: white;
}
</style>
