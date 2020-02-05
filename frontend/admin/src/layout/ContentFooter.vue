<template>
  <footer class="footer px-4">
    <div class="row align-items-center ">
      <div class="col-12 justify-content-lg-end">
        <div class="copyright text-center text-muted">
          © {{year}} Sparktrend.net
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
