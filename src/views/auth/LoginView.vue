<template>
  <div class="flex items-center justify-center w-full min-h-screen">
    <div class="w-full p-5 rounded shadow md:p-10 md:border md:w-5/12 lg:w-4/12">
      <h1 class="text-2xl font-semibold">Welcome to Invuentory</h1>
      <form class="mt-10 space-y-5">
        <div>
          <label for="email" class="font-light">Email</label>
          <input type="email" name="email" id="email" class="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label for="password" class="font-light">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            class="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          class="w-full px-5 py-3 text-white rounded bg-cyan-800 hover:bg-cyan-700"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
