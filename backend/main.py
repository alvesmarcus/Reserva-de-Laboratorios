
from contextlib import asynccontextmanager
from typing import Literal

from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware

import database
import services
from models import ReservaEntrada, ReservaAtualizacao, ReservaSaida


@asynccontextmanager
async def lifespan(app: FastAPI):
    database.criar_tabela()
    yield


app = FastAPI(
    title="Sistema de Reservas de Laboratórios",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


def tratar_erro(exc):
    if isinstance(exc, services.ReservaNaoEncontrada):
        raise HTTPException(status_code=404, detail=str(exc))
    if isinstance(exc, services.ConflitoReserva):
        raise HTTPException(status_code=409, detail=str(exc))


@app.post(
    "/api/reservas",
    response_model=ReservaSaida,
    status_code=201,
)
def criar(dados: ReservaEntrada):
    try:
        return services.criar_reserva(dados)
    except (services.ConflitoReserva, services.ReservaNaoEncontrada) as exc:
        tratar_erro(exc)


@app.get("/api/reservas", response_model=list[ReservaSaida])
def listar(
    status_reserva: Literal["confirmada", "pendente", "cancelada"] | None = None,
    laboratorio: str | None = None,
):
    return services.listar_reservas(status_reserva, laboratorio)


@app.get("/api/reservas/{reserva_id}", response_model=ReservaSaida)
def obter(reserva_id: int):
    try:
        return services.obter_reserva(reserva_id)
    except services.ReservaNaoEncontrada as exc:
        tratar_erro(exc)


@app.put("/api/reservas/{reserva_id}", response_model=ReservaSaida)
def atualizar(reserva_id: int, dados: ReservaAtualizacao):
    try:
        return services.atualizar_reserva(reserva_id, dados)
    except (services.ConflitoReserva, services.ReservaNaoEncontrada) as exc:
        tratar_erro(exc)


@app.delete("/api/reservas/{reserva_id}", status_code=204)
def excluir(reserva_id: int):
    try:
        services.excluir_reserva(reserva_id)
        return Response(status_code=204)
    except services.ReservaNaoEncontrada as exc:
        tratar_erro(exc)


@app.get("/api/status")
def status():
    return {"status": "online"}
