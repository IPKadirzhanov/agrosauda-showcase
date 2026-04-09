

# Маска ввода для телефона (+7) и БИН/ИИН (12 цифр)

## Что нужно сделать

### 1. Компонент PhoneInput
Создать `src/components/PhoneInput.tsx` — переиспользуемый компонент ввода телефона:
- Префикс `+7` всегда отображается и не удаляется
- При вводе цифр автоматически форматируется в `+7-XXX-XXX-XX-XX`
- Максимум 12 цифр (включая 7)
- Принимает только цифры
- Визуально совместим с текущим `Input` компонентом

### 2. Компонент BinIinInput
Создать `src/components/BinIinInput.tsx` — поле для БИН/ИИН:
- Принимает только цифры
- Ровно 12 цифр
- Показывает счётчик или ошибку если не 12

### 3. Замена полей на всех страницах

| Файл | Что меняется |
|---|---|
| `src/pages/AuthPage.tsx` | Заменить `<Input type="tel">` на `<PhoneInput>` |
| `src/pages/BusinessAuthPage.tsx` | Заменить phone `<Input>` на `<PhoneInput>`, binIin `<Input>` на `<BinIinInput>` |
| `src/pages/SellPage.tsx` | Заменить `<input type="tel">` на `<PhoneInput>` |

### 4. Логика форматирования

```text
Телефон:
  Ввод: 7479481318
  Отображение: +7-747-948-13-18
  Хранение в state: +77479481318 (чистые цифры с +)

БИН/ИИН:
  Ввод: только цифры, maxLength=12
  Валидация: ровно 12 цифр при submit
```

### Затрагиваемые файлы
- `src/components/PhoneInput.tsx` — **новый**
- `src/components/BinIinInput.tsx` — **новый**
- `src/pages/AuthPage.tsx` — замена поля телефона
- `src/pages/BusinessAuthPage.tsx` — замена полей телефона и БИН/ИИН
- `src/pages/SellPage.tsx` — замена поля телефона

