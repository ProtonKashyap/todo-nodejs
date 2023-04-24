document
  .getElementById("newsletterSignupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const body = JSON.stringify({
      _csrf: form.elements._csrf.value,
      name: form.elements.name.value,
      email: form.elements.email.value,
    });
    const header = { "Content-Type": "Application/json" };
    const container = document.getElementById("newsletterSignupFormContainer");
    fetch("/api/newsletter-signup", {
      method: "POST",
      body: body,
      headers: header,
    })
      .then(function (res) {
        if (res.status < 200 || res.status >= 300)
          throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then(function (json) {
        container.innerHTML = "<b>Thank You for signing up</b>";
      })
      .catch(function (err) {
        container.innerHTML -
          "<b>We are sorry ,we had a problem signing you up</b>";
      });
  });
