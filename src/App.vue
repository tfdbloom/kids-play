<template>
  <nav>
    <router-link to="weekdays">
      Week days
    </router-link>
  </nav>

  <router-view />
</template>

<style lang="scss">
html {
  font-size: 62.5%;
  line-height: 1.5;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

*:focus:not(:focus-visible) {
  outline: none;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.6rem;
  background-color: #f8f8f8;
}
</style>
