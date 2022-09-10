<template>
  <div class="page-wrap">
    <div class="session-form-hold">
      <base-card>
        <v-card-text class="text-center">
          <img
            class="px-14 py-8"
            src="~/assets/im-logo.svg"
            alt="Influence Marketing"
          />

          <h6 class="text--disabled font-weight-medium mb-10">
            Sign in to your account
          </h6>
          <v-form
            ref="form"
            @submit.prevent="login()"
            @keyup.native.enter="login"
          >
            <v-text-field
              v-model="email"
              label="Email"
              :rules="[Validation.required]"
            />

            <v-text-field
              v-model="password"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordShow ? 'text' : 'password'"
              name="input-10-2"
              label="Password"
              :rules="[Validation.required]"
              @click:append="passwordShow = !passwordShow"
            />

            <v-btn class="mb-4" block color="primary" dark @click="login()">
              Sign In
            </v-btn>
          </v-form>
        </v-card-text>
      </base-card>
    </div>
    <loading-overlay :show="Api.Auth.loading" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Validation from "@/utils/validation";
import { Api } from "@/store";

@Component
export default class Login extends Vue {
  Api = Api;
  Validation = Validation;

  email: string = "";
  password: string = "";

  passwordShow = false;

  login() {
    if (this.formValidate())
      Api.Auth.login({
        email: this.email,
        password: this.password,
      }).then((response) => {
        if (response.access_token) this.$router.push("/Auth");
      });
  }

  formValidate() {
    return (this.$refs.form as any).validate();
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  background-color: #242939 !important;
  display: flex;
  align-items: center;
  padding: 40px 1rem;
  height: 100%;
  min-height: 100vh;
}

.session-form-hold {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
