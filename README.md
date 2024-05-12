<p align="center"><img src="public/capturas/logo.png" width="400"></p>

<p>Application made with Vue 3 using Quasar Framework that contains responsive web interface, PWA and exported in APK using Apache Cordova and capacitor. The application is connected to an API made in Laravel.<a href="https://laravel-api-server.up.railway.app" target="_blank">https://laravel-api-server.up.railway.app</a></p>

<span>Application made with Vue 3 consists of the creation of a CRUD and authentication system that come from a games API and the development of styles using Quasar Framework. The application made with Vue 3 contains the following functionalities:</span>

<ul>
<li>I use the Vue3 version with the composition API.</li>
<li>Style development with Quasar Framework.</li>
<li>VUEX.</li>
<li>AXIOS.</li>
<li>Keep-alive.</li>
<li>Vue-router.</li>
<li>PWA (Progressive Web Apps).</li>
<li>SPA (Single Page Application).</li>
<li>Application exported in APK using Apache Cordova.</li>
<li>Application exported in APK using Capacitor.</li>
<li>Electron.</li>
<li>The project contains the files to implement it in Docker.</li>
<li>Vue-validate.</li>
<li>Helpers.</li>
<li>Watchers.</li>
<li>Props.</li>
<li>Slots.</li>
<li>Emits.</li>
<li>Websockets with Pusher.</li>
<li>End to end tests with CYPRESS.</li>
<li>Unit tests with JEST.</li>
<li>The application is connected to a games API made in Laravel: <a href="https://github.com/JAVI-CC/Laravel-API-Server" target="_blank">https://github.com/JAVI-CC/Laravel-API-Server</a></li>
</ul>

<h2>Demo</h2>
<a href="https://vue-api-client.vercel.app/" target="_blank">https://vue-api-client.vercel.app</a><br>
<span>User: admin@email.com</span><br>
<span>Password: 12345678</span>

<h2>Start the app in the development mode</h2>
<pre><code>$ yarn && quasar dev -m pwa</code></pre>

<h2>Start the app in the production mode</h2>
<pre><code>$ yarn && quasar build -m pwa</code></pre>

<h2>Export the app in APK apache cordova in the development mode</h2>
<pre><code>$ yarn && quasar dev -m cordova -T android</code></pre>

<h2>Export the app in APK apache cordova in the production mode</h2>
<pre><code>$ yarn && quasar build -m cordova -T android</code></pre>

<h2>Export the app in APK capactior in the production mode</h2>
<pre><code>$ yarn && quasar build -m capacitor -T android -d</code></pre>

<h2>Start the app in the electron mode</h2>
<pre><code>$ yarn && quasar dev -m electron</code></pre>

<h2>Export the app in EXE electron in the production mode</h2>
<pre><code>$ yarn && quasar build -m electron</code></pre>

<h2>Start the websockets with Pusher in the development mode (Optional)</h2>
<pre><code>1. In your <a href="https://pusher.com/" target="_blank">Pusher account</a> create a channel called: <strong>juegos-api</strong></code></pre>
<pre><code>2. Enter the file: <strong>development.env</strong></code></pre>
<pre><code>3. fill in the following credentials:
<br><strong>PUSHER_APP_KEY=</strong>{App Keys in the channel juegos-api key}
<br><strong>PUSHER_APP_CLUSTER=</strong>{App Keys in the channel juegos-api cluster}
</code></pre>

<h2>Start the websockets with Pusher in the production mode (Optional)</h2>
<pre><code>1. In your <a href="https://pusher.com/" target="_blank">Pusher account</a> create a channel called: <strong>juegos-api</strong></code></pre>
<pre><code>2. Enter the file: <strong>production.env</strong></code></pre>
<pre><code>3. fill in the following credentials:
<br><strong>PUSHER_APP_KEY=</strong>{App Keys in the channel juegos-api key}
<br><strong>PUSHER_APP_CLUSTER=</strong>{App Keys in the channel juegos-api cluster}
</code></pre>

<h2>Start Jest unit tests</h2>
<pre><code>$ yarn && [ yarn test:unit || quasar test --unit jest ]</code></pre>

<h2>Start Cypress end to end tests</h2>
<pre><code>$ yarn && yarn cypress:open</code></pre>

<hr>

<h3>Show get all registries API SERVER:</h3>
<p align="center"><img src="public/capturas/captura1.png"></p>

<h3>Login form:</h3>
<p align="center"><img src="public/capturas/captura2.png"></p>

<h3>Create or update registrer sending it to the API SERVER:</h3>
<p align="center"><img src="public/capturas/captura3.png"></p>

<h3>Application web responsive:</h3>
<p align="center"><img src="public/capturas/captura4.png"></p>

<h2>Deploy to Docker <g-emoji class="g-emoji" alias="whale" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f433.png">🐳</g-emoji></h2>

<h4>Setup:</h4>
<pre>
<code>$ git clone https://github.com/JAVI-CC/VUE3-API-client.git
$ cd VUE3-API-client
$ cd VUE3-API-client
$ cp development.env.example development.env
$ cp production.env.example production.env
$ docker-compose up -d</code>
</pre>

<h4>Running mode dev:</h4>
<pre>
<code>$ docker compose up</code>
</pre>

<h4>Running mode build:</h4>
<pre>
<code>$ docker compose up -d</code>
<code>$ docker compose exec app quasar build -m pwa</code>
</pre>

<h4>Running mode prod:</h4>
<span>It is about creating a new container that contains the application once the build is done on the nginx web server listening on port <code>:85->80/tcp</code>
</span>
<div class="highlight highlight-source-shell"><pre>├── vue-quasar-crud-template-app-prod
</pre></div><pre>
<code>$ docker compose -f docker-compose.prod.yml up -d</code>
</pre>

<br>

<p>In case you are using your IDE to develop the application and it does not detect the files it contains within the <strong>node_modules folder</strong>, you have to copy the files from the node_modules folder of the container to the host machine with the following command.</p>
<pre>
<code>$ docker compose cp app:/src/node_modules .</code>
</pre>

<span>Once you have the containers deployed, you can access the APP at </span> <a href="http://localhost:9000" target="_blank">http://localhost:9000</a>
