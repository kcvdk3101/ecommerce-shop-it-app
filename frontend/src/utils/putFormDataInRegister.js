export default function putFormDataInRegister(
  user,
  avatar
) {
  let formData = new FormData();
  formData.set("firstName", user.firstName);
  formData.set("lastName", user.lastName);
  formData.set("email", user.email);
  formData.set("password", user.password);
  formData.set("confirmPassword", user.confirmPassword);
  formData.set("avatar", avatar);

  return formData;
}
