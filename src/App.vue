<template>
  <div class="contain">
    <div v-if="loading" class="loading">
      <div class="warningTable">
        <p class="loadingIcon"><i class="fas fa-cog fa-spin fa-5x"></i></p>
        <p class="warning">Loading...</p>
      </div>
    </div>
    <app-links></app-links>
    <transition name="fade" mode="out-in">
       <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import Links from './components/RouterLink';
export default {
  data() {
    return {
      productPage:'appProducts'
    };
  },
  components: {
    appLinks: Links,
  },
  computed:{
    loading() {
      return this.$store.state.loading
    }
  }
};
</script>

<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-family: sans-serif;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

body{
  min-height: 100vh;
}

.contain {
  position: relative;
  overflow-x: hidden;
}

.loading{
  position: absolute;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
}

body:-webkit-scrollbar { 
    display: none; 
}

::-webkit-scrollbar { 
    display: none; 
}

.loadingIcon{
  color: #ffffff;
}

.warningTable{
  width: 40vh;
  height: 300px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.7);
  margin-top: 200px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.warning {
  font-size: 2rem;
  color: #ffffff;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  animation: fade-in 0.5s linear normal;
}

.fade-leave {
  /* opacity: 1; */
}

.fade-leave-active {
  animation: fade-out 0.5s linear normal;
  opacity: 0;
}

@keyframes fade-in {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    transform: translateY(0px);
    opacity: 1;
  }
  to {
    transform: translateY(10px);
    opacity: 0;
  }
}

</style>
