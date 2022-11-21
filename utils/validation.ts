const password_pattern = /^(?=.+\d)(?=.+[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;
const email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const url_pattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
const phone_pattern = /^[0-9]{10,10}$/;

const Validation = {
  required: (v: any) => (!Array.isArray(v) && !(typeof v == "object") && !(typeof v == "string") && v != null) || (Array.isArray(v) && !!v.length) || (typeof v == "string" && !!v.length) || (typeof v == "object" && !!v && !!Object.keys(v).length) || "This field should not be left blank.",
  password: (v: string) => !v || password_pattern.test(v) || "Password must be 9 characters including one uppercase letter, one special character and alphanumeric characters",
  email: (v: string) => email_pattern.test(v) || "The Email must be a valid email address",
  url: (v: string) => url_pattern.test(v) || "The URL must be a valid url address",
  password_confirmation: (cp: string, p: string) => cp == p || "Password and confirm password must be same",
  phone: (v: string) => phone_pattern.test(v) || "The Phone must be a valid"
};

export default Validation;
