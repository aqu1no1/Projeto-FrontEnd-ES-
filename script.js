// cadastro e login e conversor de velocidade
document.addEventListener("DOMContentLoaded", () => {
  const toSignupBtn = document.getElementById("toSignup");
  const toLoginBtn = document.getElementById("toLogin");
  const loginForm = document.querySelector(".login");
  const signupForm = document.querySelector(".signup");

  loginForm.style.display = "flex";
  signupForm.style.display = "none";

  toSignupBtn.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
  });

  toLoginBtn.addEventListener("click", () => {
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
  });

  const signupFormElement = document.querySelector(".signup");
  const loginFormElement = document.querySelector(".login");

  signupFormElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = signupFormElement.querySelectorAll("input, select");
    const nome = inputs[0].value.trim();
    const endereco = inputs[1].value.trim();
    const estado = inputs[2].value;
    const cidade = inputs[3].value.trim();
    const email = inputs[4].value.trim();
    const telefone = inputs[5].value.trim();
    const senha = inputs[6].value.trim();
    const confirmarSenha = inputs[7].value.trim();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExistente = users.some((user) => user.email === email);
    if (emailExistente) {
      alert("Este e-mail já está cadastrado!");
      return;
    }

    const user = {
      username: nome,
      email,
      endereco,
      estado,
      cidade,
      telefone,
      senha,
      date: new Date().toLocaleDateString("pt-BR"),
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Cadastro realizado com sucesso!");

    signupFormElement.reset();
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
  });

  loginFormElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginFormElement
      .querySelector('input[type="email"]')
      .value.trim();
    const senha = loginFormElement
      .querySelector('input[type="password"]')
      .value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const usuario = users.find((u) => u.email === email && u.senha === senha);

    if (usuario) {
      alert(`Bem-vindo, ${usuario.username}!`);
      window.location.href = "/navBarPages/admin.html";
    } else {
      alert("Email ou senha incorretos!");
    }
  });
});

// Conversor de Velocidade
function converterVelocidade() {
  const tipo = document.getElementById("tipoConversao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const resultado = document.getElementById("resultado");

  if (isNaN(valor)) {
    resultado.textContent = "Insira um valor numérico válido.";
    return;
  }

  let convertido, texto;

  if (tipo === "msToKmh") {
    convertido = valor * 3.6;
    texto = `${valor} m/s equivalem a ${convertido.toFixed(2)} km/h.`;
  } else if (tipo === "kmhToMs") {
    convertido = valor / 3.6;
    texto = `${valor} km/h equivalem a ${convertido.toFixed(2)} m/s.`;
  } else {
    texto = "Selecione um tipo de conversão de velocidade.";
  }

  resultado.innerHTML = `<strong>${texto}</strong><br>`;
}
