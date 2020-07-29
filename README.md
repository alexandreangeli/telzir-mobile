Aplicativo do projeto Telzir feito em React Native com Typescript, para cálculo dos preços de ligações entre uma origem e um destino com e sem plano;<br />

O usuário escolhe uma cidade origem, uma cidade destino, insere o tempo de uma ligação, e escolhe um plano ofericado pela Telzir;<br />

Após preencher essas informações e clicar em calcular, o app mostra se com o plano a ligação ficaria mais barata (valor em verde) ou mais cara (valor em vermelho) do que sem plano;<br />

O cálculo é feito com base no desafio: "Com o novo produto FaleMais da Telzir o cliente adquire um plano e pode falar de graça até um determinado tempo (em minutos) e só paga os minutos excedentes. Os minutos excedentes tem um acréscimo de 10% sobre a tarifa normal do minuto. Os planos são FaleMais 30 (30 minutos), FaleMais 60 (60 minutos) e FaleMais 120 (120 minutos).";<br />

As cidades disponíveis para consulta são buscadas por uma requisição enviada para a API do projeto telzir-api;<br />

Como o projeto foi desenvolvido em uma máquina sem Xcode, o aplicativo foi desenvolvido apenas para Android, e pode ser visualizado em um emulador pelo Android Studio;<br />

Uma apk do aplicativo pode ser encontrado para download na URL https://mega.nz/file/LcZyBI7Y#_gAoL6KjGMK9WNbwJfxHxUJLi1iL5k_24fSVvJmJXqQ;<br />

## Scripts Disponíveis

### `npm install`

Necessário para instalar todos os pacotes utilizados pelo projeto;<br />

### `npm run android`

Roda o aplicativo em modo de desenvolvimento em um emulador do Android Studio;<br />
Caso haja algum problema, acesse a pasta android, rode o comando ./gradlew clean , e tente novamente;<br />

### `npm run ios`

Roda o aplicativo em modo de desenvolvimento em um emulador do Xcode (não recomendado, pois o app foi feito apenas para android);<br />

### `npm start`

Inicia o servidor react-native, mas não instala o aplicativo em nenhum emulador;<br />

### `npm run apk-android`

Cria um arquivo apk do projeto para ser instalado em um celular. O arquivo se encontrará no caminho raizDoProjeto/android/app/build/outputs/apk/debug/app-debug.apk;<br />

## Screenshots

### `Splash Screen`

[![telzir-app-splash.jpg](https://i.postimg.cc/Mpf02tdm/telzir-app-splash.jpg)](https://postimg.cc/21mLndp1)

### `Home`

[![telzir-app-home.jpg](https://i.postimg.cc/J0q8hbxT/telzir-app-home.jpg)](https://postimg.cc/MfvNPfhR)

### `Resultado`

[![telzir-app-resultado.jpg](https://i.postimg.cc/NG7Bbct1/telzir-app-resultado.jpg)](https://postimg.cc/Z0RGKXCR)
