export default function putFormDataInRegister(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  avatar
) {
  let formData = new FormData();
  formData.set("firstName", firstName);
  formData.set("lastName", lastName);
  formData.set("email", email);
  formData.set("password", password);
  formData.set("confirmPassword", confirmPassword);
  formData.set("avatar", avatar);

  return formData;
}
