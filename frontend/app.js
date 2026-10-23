
const API = "http://127.0.0.1:8000/api/reservas";

const $ = (id) => document.getElementById(id);
let cache = [];

function dados() {
  return {
    laboratorio: $("laboratorio").value.trim(),
    responsavel: $("responsavel").value.trim(),
    data: $("data").value,
    turno: $("turno").value,
    finalidade: $("finalidade").value.trim(),
    quantidade_alunos: Number($("quantidade-alunos").value),
    status: $("status").value,
  };
}

function mensagem(texto, ok = true) {
  $("msg").textContent = texto;
  $("msg").style.color = ok ? "#16803a" : "#c23321";
}

async function listar() {
  try {
    const q = new URLSearchParams();
    if ($("fstatus").value) {
      q.set("status_reserva", $("fstatus").value);
    }
    if ($("busca").value.trim()) {
      q.set("laboratorio", $("busca").value.trim());
    }

    const url = q.toString() ? `${API}?${q.toString()}` : API;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`Erro ao listar: ${resposta.status}`);
    }

    cache = await resposta.json();

    $("lista").innerHTML = cache.map((x) => `
      <tr>
        <td>${x.laboratorio}</td>
        <td>${x.data}</td>
        <td>${x.turno}</td>
        <td>${x.quantidade_alunos ?? "-"}</td>
        <td>${x.status}</td>
        <td>
          <button type="button" onclick="editar(${x.id})">Editar</button>
          <button type="button" onclick="excluir(${x.id})">Excluir</button>
        </td>
      </tr>
    `).join("");
  } catch (erro) {
    console.error(erro);
    mensagem("Não foi possível carregar as reservas.", false);
  }
}

window.editar = (id) => {
  const reserva = cache.find((x) => x.id === id);
  if (!reserva) {
    mensagem("Reserva não encontrada na lista.", false);
    return;
  }

  $("id").value = reserva.id;
  $("laboratorio").value = reserva.laboratorio;
  $("responsavel").value = reserva.responsavel;
  $("data").value = reserva.data;
  $("turno").value = reserva.turno;
  $("finalidade").value = reserva.finalidade;
  $("quantidade-alunos").value = reserva.quantidade_alunos ?? "";
  $("status").value = reserva.status;

  window.scrollTo(0, 0);
};

window.excluir = async (id) => {
  if (!confirm(`Deseja excluir a reserva ${id}?`)) return;

  try {
    const resposta = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    if (resposta.status === 204) {
      mensagem("Reserva excluída com sucesso.");
      await listar();
    } else {
      const erro = await resposta.json();
      mensagem(
        `${resposta.status}: ${JSON.stringify(erro.detail)}`,
        false
      );
    }
  } catch (erro) {
    console.error(erro);
    mensagem("Não foi possível conectar à API.", false);
  }
};

$("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = $("id").value;

  try {
    const resposta = await fetch(id ? `${API}/${id}` : API, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados()),
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      mensagem(
        `${resposta.status}: ${JSON.stringify(erro.detail)}`,
        false
      );
      return;
    }

    mensagem(id ? "Reserva atualizada." : "Reserva criada.");
    e.target.reset();
    $("id").value = "";
    await listar();
  } catch (erro) {
    console.error(erro);
    mensagem("Não foi possível conectar à API.", false);
  }
});

$("cancelar").onclick = () => {
  $("form").reset();
  $("id").value = "";
  mensagem("Formulário limpo.");
};

$("filtrar").onclick = listar;

listar();
