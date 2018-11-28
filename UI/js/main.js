const cancelOrder = element => {
  element.parentElement.parentElement.hidden = true;
};

const showMenu = element => {
  let drpContent = document.getElementById("drp-conent");

  if (drpContent.style.display == "block") {
    element.innerHTML = `<img src="../assets/icons/down-arrow.svg" alt=">>" srcset="" class="md-icon">`;
    drpContent.style.display = "none";
  } else {
    element.innerHTML = `<img src="../assets/icons/up-arrow.svg" alt=">>" srcset="" class="md-icon">`;
    drpContent.style.display = "block";
  }
};

const setUser = async () => {
  const user = await JSON.parse(
    localStorage.getItem("user")
  );
  $("#user-names").append(
    `<p>${user.first_name || ""}</p>`
  );
  $("#user-names").append(`<p>${user.last_name || ""}</p>`);
};

$(document).ready(setUser());

$(async () => {
  const token = await localStorage.getItem("token");
  fetch("/api/v1/current", {
    method: "GET",
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.status === 401) {
        window.location = "../pages/Login.html";
      }
    })
    .catch(err => {
      window.location = "../pages/Login.html";
    });
});

document
  .querySelector("#lg-logout")
  .addEventListener("click", async () => {
    await localStorage.setItem("token", null);
    await localStorage.setItem("user", null);
    window.location = "../pages/Login.html";
  });
