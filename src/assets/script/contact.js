function submitData(e) {
  e.preventDefault();
  const name = document.getElementById("exampleInputName").value;
  const email = document.getElementById("exampleInputEmail").value;
  const phoneNumber = document.getElementById("exampleInputNumber").value;
  const subject = document.getElementById("select").value;
  const message = document.getElementById("floatingTextarea2").value;

  if (
    name == "" ||
    email == "" ||
    phoneNumber == "" ||
    subject == "" ||
    message == ""
  ) {
    return alert("input field ada yang belum terisi!");
  }

  console.log(name);
  console.log(email);
  console.log(phoneNumber);
  console.log(subject);
  console.log(message);

  let a = document.createElement("a");
  a.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(
    `${message}, nama saya ${name}, kontak saya di ${email}`
  )}`;
  a.click();
}
