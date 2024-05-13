<template>
  <div class="p-5 bg-gray-200 rounded">
    <div class="flex space-x-3">
      <div class="relative flex-grow bg-green-400">
        <div class="absolute top-0 bottom-0 left-0 flex items-center px-3">
          <span class="icon-[mdi--search] text-lg"></span>
        </div>
        <input
          type="search"
          class="w-full py-2 pl-10 pr-3 bg-white rounded"
          placeholder="Search by email, name or other attributes"
        />
      </div>
      <button class="px-5 text-white rounded bg-primary-10 hover:bg-primary-9">Add User</button>
      <button class="px-3 rounded hover:bg-gray-300">
        <span class="icon-[mdi--reload] text-xl"></span>
      </button>
    </div>
  </div>
</template>
