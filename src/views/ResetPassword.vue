<template>
  <div>
    <div class="container" v-if="showLinkError">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h3 class="card-title text-center">Invalid link</h3>
              <h6
                class="card-title text-center"
              >Your password reset link is invalid or is expired. Please head to the password reset page to request another link.</h6>
              <div class="custom-control custom-checkbox mb-3 text-center" style="padding:0">
                <v-btn
                  to="/forgot-password"
                  color="success"
                  :outlined="true"
                  v-on:click="redirect"
                  style="text-decoration:none"
                >Request new link</v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h3 class="card-title text-center">Change Password</h3>
              <h6 class="card-title text-center">Please enter a new password</h6>
              <form
                class="form-signin"
                @submit.prevent="submit"
                oninput="password2.setCustomValidity(password2.value != password.value ? 'Passwords do not match.' : '')"
              >
                <div class="form-label-group">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    class="form-control"
                    placeholder="Enter your new password"
                    required
                    autofocus
                  />
                </div>
                <div class="form-label-group">
                  <input
                    name="password2"
                    id="password2"
                    type="password"
                    class="form-control"
                    placeholder="Confirm your new password"
                    required
                    autofocus
                  />
                </div>
                <div class="custom-control custom-checkbox mb-3 text-center" style="padding:0">
                  <v-btn
                    color="success"
                    :outlined="true"
                    type="submit"
                    style="margin:0; text-decoration:none"
                  >Reset Password</v-btn>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api.js";
export default {
  data() {
    return {
      showLinkError: false
    };
  },
  methods: {
    submit() {
      api.resetPassword(this);
    }
  }
};
</script>
<style scoped>
.form-label-group {
  margin: 35px 10px;
}
h3 {
  margin: 20px 15px;
}
button {
  margin: 15px 15px;
}
</style>