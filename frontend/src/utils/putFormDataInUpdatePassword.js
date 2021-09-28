export default function putFormDataInUpdatePassword(oldPassword, newPassword) {
  let formData = new FormData()

  formData.set("oldPassword", oldPassword);
  formData.set("newPassword", newPassword);

  return formData
}