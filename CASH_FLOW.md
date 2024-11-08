# Tipos de Transações de Caixa (`CashTransaction`)

#### 1. Abertura de Caixa (`OPENING`)

> **Descrição**: Registrada ao abrir o caixa, com o valor inicial depositado para iniciar o turno.

- **Campos**:
  - `amount`: Valor inicial de abertura.
  - `description`: "Abertura de caixa".
- **Necessidade**: Criação automática no início do turno para registrar o saldo inicial.

#### 2. Venda (`SALE`)

> **Descrição**: Registro de cada venda realizada que envolva transações em dinheiro ou - equivalentes diretamente no caixa.

- **Campos**:
  - `amount`: Valor da venda.
  - `description`: "Venda - [Descrição do produto ou serviço]".
- **Necessidade**: Criação automática ao registrar uma venda, associando o pagamento em dinheiro ao caixa.

#### 3. Recebimento (`RECEIPT`)

> **Descrição**: Registro de recebimentos de pagamentos em dinheiro não associados a uma - venda direta, como pagamentos de contas ou dívidas por clientes.

- **Campos**:
  - `amount`: Valor do recebimento.
  - `description`: "Recebimento de [descrição]".
- **Necessidade**: Útil para registrar dinheiro recebido que não seja diretamente relacionado a uma venda.

#### 4. Sangria (`WITHDRAWAL`)

> **Descrição**: Registro de retirada de valores para reduzir o dinheiro em caixa e mantê-lo em um nível seguro.

- **Campos**:
  - amount: Valor retirado.
  - description: "Sangria - [Motivo]".
- **Necessidade**: Criação para registrar uma saída que mantém o saldo do caixa controlado, - especialmente em locais com altos valores de caixa.

#### 5. Suprimento de Caixa (`SUPPLY`)

> **Descrição**: Registro de entradas de dinheiro externas ao caixa, como reposição de troco ou reforço de caixa.

- **Campos**:
  - `amount`: Valor do suprimento.
  - `description`: "Suprimento de caixa".
- **Necessidade**: Criação quando é necessário aumentar o valor em caixa para manter troco ou fluxo operacional.

#### 6. Ajuste de Saldo (`ADJUSTMENT_IN` e `ADJUSTMENT_OUT`)

> **Descrição**: Registro de ajustes manuais para corrigir discrepâncias no saldo do caixa. Pode ser uma entrada (ADJUSTMENT_IN) para adicionar fundos ao caixa ou uma saída (ADJUSTMENT_OUT) para remover excessos.

- **Campos**:
  - `amount`: Valor do ajuste (positivo ou negativo, dependendo do tipo).
  - `description`: "Ajuste de saldo - [Motivo da correção]".
- **Necessidade**: Criação para corrigir erros de contagem ou para compensar discrepâncias.

### Resumo dos Tipos de Transação

| Tipo de Transação   | Código           | Descrição                                              |
| ------------------- | ---------------- | ------------------------------------------------------ |
| Abertura de Caixa   | `OPENING`        | Abertura com valor inicial do caixa                    |
| Fechamento de Caixa | `CLOSING`        | Fechamento com saldo final do caixa                    |
| Venda               | `SALE`           | Registro de uma venda realizada em dinheiro            |
| Recebimento         | `RECEIPT`        | Registro de dinheiro recebido fora do fluxo de vendas  |
| Sangria             | `WITHDRAWAL`     | Retirada de dinheiro para controle de valores no caixa |
| Suprimento de Caixa | `SUPPLY`         | Reforço de caixa com dinheiro externo                  |
| Ajuste de Saldo     | `ADJUSTMENT_IN`  | Correção adicionando dinheiro para ajustar o saldo     |
| Ajuste de Saldo     | `ADJUSTMENT_OUT` | Correção removendo dinheiro para ajustar o saldo       |

#### Explicação

Esses tipos de transações cobrem todos os fluxos possíveis que um caixa normalmente precisa para manter o controle exato do saldo e das movimentações. Cada um deles serve para facilitar a auditoria e a rastreabilidade, assegurando que o saldo em caixa seja sempre condizente com o valor real e que quaisquer discrepâncias sejam devidamente documentadas.
