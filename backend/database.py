
import sqlite3
from pathlib import Path

# O banco fica na pasta principal do projeto, fora de backend.
CAMINHO_BANCO = Path(__file__).resolve().parent.parent / "reservas.db"


def conectar():
    conn = sqlite3.connect(CAMINHO_BANCO, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def criar_tabela():
    with conectar() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS reservas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                laboratorio TEXT NOT NULL,
                responsavel TEXT NOT NULL,
                data TEXT NOT NULL,
                turno TEXT NOT NULL,
                finalidade TEXT NOT NULL,
                quantidade_alunos INTEGER NOT NULL DEFAULT 1,
                status TEXT NOT NULL,
                data_criacao TEXT NOT NULL
            )
        """)

        colunas = {
            coluna["name"]
            for coluna in conn.execute(
                "PRAGMA table_info(reservas)"
            ).fetchall()
        }

        if "quantidade_alunos" not in colunas:
            conn.execute("""
                ALTER TABLE reservas
                ADD COLUMN quantidade_alunos INTEGER NOT NULL DEFAULT 1
            """)
