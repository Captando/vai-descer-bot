# 🔧 Bot Discord - "Vai Descer"

Bem-vindo ao projeto "Vai Descer", um bot divertido para Discord, criado por Victor Silva (✒ Captando - [captando.com.br](https://captando.com.br)). Este bot toca uma música e segue o usuário-alvo entre os canais de voz do servidor.

---

## ⚙ **Funcionalidades**

1. **Reprodução de áudio**: O bot toca uma música especial ao entrar em um canal de voz.
2. **Seguir o alvo**: O bot detecta automaticamente quando o usuário-alvo muda de canal e o acompanha.
3. **Comandos personalizados**:
    - `!descer`: Faz o bot entrar no canal de voz do usuário-alvo e iniciar a música.
    - `!vaidescer @usuario`: Define o alvo que o bot irá seguir e tocar a música.
    - `!desce`: Para a música e desconecta o bot do canal de voz.
    - `!descendo`: Mostra para qual usuário o bot está configurado para seguir.

---

## ⚡ **Instruções de Instalação**

### Requisitos
- Node.js (v16 ou superior).
- Um token de bot para Discord (disponível no portal de desenvolvedores do Discord).

### Passos
1. Clone este repositório:
   ```bash
   git clone https://github.com/Captando/vai-descer-bot.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd vai-descer-bot
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure seu token no arquivo `index.js`:
   ```javascript
   client.login('Seu-Token-Aqui');
   ```
5. Inicie o bot:
   ```bash
   node index.js
   ```

---

## ⚖ **Comandos Disponíveis**

### Geral
- `!descer`
    - O bot entra no canal de voz e começa a reproduzir a música.
- `!vaidescer @usuario`
    - Define o usuário-alvo para o bot seguir.
- `!desce`
    - Para a reprodução e desconecta o bot do canal de voz.
- `!descendo`
    - Exibe o usuário atual que o bot está configurado para seguir.

### Automatizações
- O bot detecta movimentações do usuário-alvo entre canais de voz e entra automaticamente para continuar a reprodução da música.

---

## 🔨 **Estrutura do Projeto**

- **`index.js`**: Arquivo principal contendo toda a lógica do bot.
- **`public/musica.mp3`**: Arquivo de áudio reproduzido pelo bot.

---

## ⚛ **Licença**

Este projeto foi desenvolvido por Victor Silva (✒ Captando - [captando.com.br](https://captando.com.br)) e está disponível sob licença MIT. Utilize e adapte conforme necessário, mantendo os devidos créditos ao autor.

---

Para mais projetos e soluções em automação, visite [captando.com.br](https://captando.com.br) ou entre em contato pelo WhatsApp: [wa.me/5562999486145](https://wa.me/5562999486145).

