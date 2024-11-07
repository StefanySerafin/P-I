// Cadastro do usuário e confirmação de password iguais para cadastro


document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita o envio padrão do formulário

  const nome = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;
  const confirmSenha = document.getElementById('confirm-password').value; // Captura o valor da confirmação

  const aviso = document.getElementById('senha-aviso'); // Captura o elemento de aviso

  // Verifica se as senhas são iguais
  if (senha !== confirmSenha) {
      aviso.style.display = 'block'; // Exibe a mensagem de aviso
      return; // Impede o envio do formulário
  } else {
      aviso.style.display = 'none'; // Oculta a mensagem se as senhas são iguais
  }

  try {
      const response = await fetch('http://localhost:3000/cadastro', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();
      
      if (response.ok) {
          alert('Cadastro realizado com sucesso!');
      } else {
          alert(data.error);
      }
  } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar. Tente novamente.');
  }
});
