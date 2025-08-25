# vue_project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

Чтобы установить расширение нужно зайти в управление расширениями в хроме, включить в правом верхнем углу режим разработчика, нажать загрузить распакованное расширение и выбрать эту папку

Сейчас расширение обращается к api по адресу http://localhost:3000, чтобы изменить адрес на https://forbiddengdz.ru нужно в файлах src\config.js и background.js изменить значение константы API_URL, а потом пересобрать расширение командой npm run build

Протестировать расширение можно на форме https://docs.google.com/forms/d/e/1FAIpQLSdMox9XIqkHWlGCTSI24nYFUwluG3q4HeHl77aM6HFAenxwwQ/viewform?usp=dialog
сначала выберите любые ответы и отправьте форму, потом заново зайдите в нее и откройте расширение, там должны появиться правильные ответы