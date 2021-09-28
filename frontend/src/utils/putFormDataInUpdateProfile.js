export default function putFormDataInUpdateProfile(firstName, lastName, email, avatar) {
  let formData = new FormData();
  formData.set("firstName", firstName);
  formData.set("lastName", lastName);
  formData.set("email", email);
  formData.set("avatar", avatar);

  return formData
}