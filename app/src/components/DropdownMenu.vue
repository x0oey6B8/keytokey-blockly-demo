<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';
import ChevronDown from "./icons/ChevronDown.vue"

defineProps<Props>();

const isMenuOpen = ref(false);
const dropdown = ref(null);
const dropdownContent = ref(null);
onMounted(() => {
    window.addEventListener('click', event => {
        if (dropdown?.value && event?.target) {
            const t = event.target as HTMLElement;
            const d = dropdown.value as HTMLElement;
            if (!d.contains(t)) {
                isMenuOpen.value = false;
            }
        }
    });
})

function toggleDropdown() {
    isMenuOpen.value = !isMenuOpen.value;
    if (isMenuOpen.value) {
        // 描画終了後、メニューの横幅がウィンドウの範囲外に出る場合はメニューの位置を調整する
        nextTick(() => {
            adjustMenuItemsPosition();
        });
    }
}

function adjustMenuItemsPosition() {
    if (!dropdownContent?.value) {
        return;
    }

    // メニュー
    const content = dropdownContent.value as HTMLElement;
    // メニューの境界情報
    const rect = content.getBoundingClientRect();
    // ウィンドウの横幅（documentを使用）
    const maxWidth = document.documentElement.clientWidth;
    // メニューの右端がウィンドウの幅を超える場合
    if (rect.right > maxWidth) {
        // 超えた幅を計算
        const overflowWidth = rect.right - maxWidth;
        // メニューの位置を調整
        content.style.left = -(overflowWidth) + "px";
    }
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
    <div class="dropdown" ref="dropdown">
        <button class="dropbtn" @click="toggleDropdown">
            <slot name="button"></slot>
            <ChevronDown class="svg"></ChevronDown>
        </button>
        <div class="dropdown-content" v-if="isMenuOpen" ref="dropdownContent">
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
  /* max-width: 200px; */
  white-space: nowrap;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 4px 0;
  left: 0;
  top: 100%;
  z-index: 100;
  border-radius: 0 0 5px 5px;
  user-select: none;
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
