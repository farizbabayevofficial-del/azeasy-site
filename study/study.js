// Online pre-test and post-test of the AzEasier efficacy study (docs/research/efficacy-protocol.md).
// The page holds the questions only, never the answer key: it sends the chosen letters to study_submit and the
// owner scores them offline. Code and PIN come from the slip the partner hands out; nobody signs in.
(function () {
  'use strict';

  var T = {
    en: {
      heading: 'Azerbaijani test', choose: 'Choose your language', code: 'Your code (on your paper)', pin: 'PIN (8 digits)', start: 'Start',
      unknown: 'This code does not exist. Check it and try again.', wrong: 'Wrong PIN. Check it and try again.',
      locked: 'Too many tries. Wait up to an hour, then try again.', closed: 'This study is closed.',
      done: 'You have taken both tests. Thank you!', wait: 'The second test opens on {date}. Come back then with the same code.',
      network: 'No connection. Check the internet and try again.', failed: 'Something went wrong. Try again, or write to {contact}.',
      before: 'Before you start',
      consent: [
        'The study is run by Finalingua SASU (France), publisher of AzEasier, with your school or centre.',
        'You take two tests of about 25 minutes, now and after a few weeks, and use the AzEasier app with free Premium in between.',
        'We keep your code, your test answers, your language and the e-mail you use in the app (to open Premium). If you allow usage statistics in the app, we also count your time in the app and the lessons you do. We never ask your name.',
        'Your e-mail is deleted when the report is published, at the latest 6 months after the last test. Scores under your code are kept 2 years, then deleted.',
        'Your school or centre receives group results only, never your own score.',
        'Taking part is voluntary. You can stop at any time, without giving a reason, by writing to {contact}; your data is then deleted. You can also ask to see, correct or delete your data, and complain to the CNIL (cnil.fr).'
      ],
      adult: 'I am 18 or older.', part: 'I agree to take part in the study.',
      data: 'I agree that my data is processed as described above.',
      email: 'E-mail you use (or will use) in the AzEasier app', next: 'Next',
      intro: 'Test {n}', introText: [
        '40 questions, about 25 minutes. Answer alone, without a dictionary or the app.',
        'The first 12 questions are listening: use headphones or a quiet room.',
        'If you do not know, tap “I don’t know”. That is better than a guess.'
      ], begin: 'Begin',
      listening: 'Listen and choose the word you hear.', vocabulary: 'What does this word mean?',
      reading: 'What does this sentence mean?', play: 'Listen',
      tag: { listening: 'Listening', vocabulary: 'Vocabulary', reading: 'Reading' }, playsLeft: 'You can listen {n} more time(s).',
      dunno: 'I don’t know', of: 'Question {i} of {n}', finish: 'Send my answers', sending: 'Sending…',
      thanks1: 'Thank you! Test 1 is done.',
      after1: 'Now install AzEasier (App Store or Google Play), create your account with the same e-mail and practise about 15 minutes a day. Your teacher will tell you when to take test 2: same link, same code, same PIN. Keep your paper.',
      thanks2: 'Thank you! Test 2 is done. Your teacher will receive the group results.'
    },
    ru: {
      heading: 'Тест по азербайджанскому', choose: 'Выберите язык', code: 'Ваш код (на листке)', pin: 'PIN (8 цифр)', start: 'Начать',
      unknown: 'Такого кода нет. Проверьте его и попробуйте снова.', wrong: 'Неверный PIN. Проверьте и попробуйте снова.',
      locked: 'Слишком много попыток. Подождите до часа и попробуйте снова.', closed: 'Исследование закрыто.',
      done: 'Вы прошли оба теста. Спасибо!', wait: 'Второй тест откроется {date}. Возвращайтесь с тем же кодом.',
      network: 'Нет соединения. Проверьте интернет и попробуйте снова.', failed: 'Что-то пошло не так. Попробуйте снова или напишите на {contact}.',
      before: 'Перед началом',
      consent: [
        'Исследование проводит Finalingua SASU (Франция), издатель AzEasier, вместе с вашей школой или центром.',
        'Вы проходите два теста примерно по 25 минут — сейчас и через несколько недель, а между ними занимаетесь в AzEasier с бесплатным Premium.',
        'Мы храним ваш код, ответы на тесты, язык и e-mail, который вы используете в приложении (чтобы открыть Premium). Если вы разрешите статистику в приложении, мы также учитываем время в приложении и пройденные уроки. Ваше имя мы не спрашиваем.',
        'E-mail удаляется после публикации отчёта, не позднее 6 месяцев после последнего теста. Баллы под кодом хранятся 2 года, затем удаляются.',
        'Школа или центр получает только результаты группы, никогда — ваш личный балл.',
        'Участие добровольное. Можно прекратить в любой момент без объяснений, написав на {contact}; тогда ваши данные удаляются. Вы также можете запросить доступ к данным, их исправление или удаление и подать жалобу в CNIL (cnil.fr).'
      ],
      adult: 'Мне 18 лет или больше.', part: 'Я согласен(на) участвовать в исследовании.',
      data: 'Я согласен(на) на обработку моих данных, как описано выше.',
      email: 'E-mail, который вы используете (или будете использовать) в AzEasier', next: 'Далее',
      intro: 'Тест {n}', introText: [
        '40 вопросов, около 25 минут. Отвечайте сами, без словаря и без приложения.',
        'Первые 12 вопросов — на слух: используйте наушники или тихую комнату.',
        'Если не знаете ответа, нажмите «Не знаю». Это лучше, чем угадывать.'
      ], begin: 'Начать',
      listening: 'Послушайте и выберите слово, которое слышите.', vocabulary: 'Что значит это слово?',
      reading: 'Что значит это предложение?', play: 'Слушать',
      tag: { listening: 'Аудирование', vocabulary: 'Лексика', reading: 'Чтение' }, playsLeft: 'Можно прослушать ещё {n} раз(а).',
      dunno: 'Не знаю', of: 'Вопрос {i} из {n}', finish: 'Отправить ответы', sending: 'Отправка…',
      thanks1: 'Спасибо! Тест 1 пройден.',
      after1: 'Теперь установите AzEasier (App Store или Google Play), создайте аккаунт с тем же e-mail и занимайтесь около 15 минут в день. Преподаватель скажет, когда проходить тест 2: та же ссылка, тот же код, тот же PIN. Сохраните листок.',
      thanks2: 'Спасибо! Тест 2 пройден. Преподаватель получит результаты группы.'
    },
    fr: {
      heading: 'Test d’azerbaïdjanais', choose: 'Choisissez votre langue', code: 'Votre code (sur votre papier)', pin: 'PIN (8 chiffres)', start: 'Commencer',
      unknown: 'Ce code n’existe pas. Vérifiez-le et réessayez.', wrong: 'PIN incorrect. Vérifiez-le et réessayez.',
      locked: 'Trop d’essais. Attendez jusqu’à une heure, puis réessayez.', closed: 'Cette étude est close.',
      done: 'Vous avez passé les deux tests. Merci !', wait: 'Le second test ouvre le {date}. Revenez alors avec le même code.',
      network: 'Pas de connexion. Vérifiez internet et réessayez.', failed: 'Un problème est survenu. Réessayez ou écrivez à {contact}.',
      before: 'Avant de commencer',
      consent: [
        'L’étude est menée par Finalingua SASU (France), éditeur d’AzEasier, avec votre école ou centre.',
        'Vous passez deux tests d’environ 25 minutes, maintenant et dans quelques semaines, et utilisez l’application AzEasier avec le Premium offert entre les deux.',
        'Nous gardons votre code, vos réponses, votre langue et l’e-mail utilisé dans l’application (pour ouvrir le Premium). Si vous autorisez les statistiques dans l’application, nous comptons aussi votre temps et les leçons faites. Nous ne demandons jamais votre nom.',
        'Votre e-mail est supprimé à la publication du rapport, au plus tard 6 mois après le dernier test. Les scores sous code sont gardés 2 ans, puis supprimés.',
        'Votre école ou centre reçoit seulement des résultats de groupe, jamais votre score.',
        'La participation est libre. Vous pouvez arrêter à tout moment, sans justification, en écrivant à {contact} ; vos données sont alors supprimées. Vous pouvez aussi demander à voir, corriger ou effacer vos données, et saisir la CNIL (cnil.fr).'
      ],
      adult: 'J’ai 18 ans ou plus.', part: 'J’accepte de participer à l’étude.',
      data: 'J’accepte que mes données soient traitées comme décrit ci-dessus.',
      email: 'E-mail utilisé (ou à utiliser) dans l’application AzEasier', next: 'Suivant',
      intro: 'Test {n}', introText: [
        '40 questions, environ 25 minutes. Répondez seul, sans dictionnaire ni application.',
        'Les 12 premières questions sont à l’écoute : prenez des écouteurs ou une pièce calme.',
        'Si vous ne savez pas, touchez « Je ne sais pas ». C’est mieux qu’au hasard.'
      ], begin: 'Commencer',
      listening: 'Écoutez et choisissez le mot entendu.', vocabulary: 'Que veut dire ce mot ?',
      reading: 'Que veut dire cette phrase ?', play: 'Écouter',
      tag: { listening: 'Écoute', vocabulary: 'Vocabulaire', reading: 'Lecture' }, playsLeft: 'Encore {n} écoute(s) possible(s).',
      dunno: 'Je ne sais pas', of: 'Question {i} sur {n}', finish: 'Envoyer mes réponses', sending: 'Envoi…',
      thanks1: 'Merci ! Le test 1 est fait.',
      after1: 'Installez maintenant AzEasier (App Store ou Google Play), créez votre compte avec le même e-mail et pratiquez environ 15 minutes par jour. Votre enseignant vous dira quand passer le test 2 : même lien, même code, même PIN. Gardez votre papier.',
      thanks2: 'Merci ! Le test 2 est fait. Votre enseignant recevra les résultats du groupe.'
    },
    tr: {
      heading: 'Azerbaycan Türkçesi testi', choose: 'Dilinizi seçin', code: 'Kodunuz (kâğıdınızda)', pin: 'PIN (8 rakam)', start: 'Başla',
      unknown: 'Bu kod yok. Kontrol edip tekrar deneyin.', wrong: 'PIN yanlış. Kontrol edip tekrar deneyin.',
      locked: 'Çok fazla deneme. En fazla bir saat bekleyip tekrar deneyin.', closed: 'Bu araştırma kapandı.',
      done: 'İki testi de tamamladınız. Teşekkürler!', wait: 'İkinci test {date} tarihinde açılır. O zaman aynı kodla gelin.',
      network: 'Bağlantı yok. İnterneti kontrol edip tekrar deneyin.', failed: 'Bir sorun oldu. Tekrar deneyin veya {contact} adresine yazın.',
      before: 'Başlamadan önce',
      consent: [
        'Araştırmayı AzEasier’in yayıncısı Finalingua SASU (Fransa), okulunuz veya merkeziniz ile birlikte yürütür.',
        'Biri şimdi, biri birkaç hafta sonra olmak üzere yaklaşık 25 dakikalık iki test yaparsınız; arada AzEasier uygulamasını ücretsiz Premium ile kullanırsınız.',
        'Kodunuzu, test cevaplarınızı, dilinizi ve uygulamada kullandığınız e-postayı (Premium’u açmak için) saklarız. Uygulamada kullanım istatistiklerine izin verirseniz uygulamadaki sürenizi ve derslerinizi de sayarız. Adınızı asla sormayız.',
        'E-postanız rapor yayımlandığında, en geç son testten 6 ay sonra silinir. Kod altındaki puanlar 2 yıl saklanır, sonra silinir.',
        'Okulunuz veya merkeziniz yalnızca grup sonuçlarını alır, kendi puanınızı asla görmez.',
        'Katılım gönüllüdür. İstediğiniz zaman gerekçe göstermeden {contact} adresine yazarak bırakabilirsiniz; verileriniz o zaman silinir. Verilerinizi görmeyi, düzeltmeyi veya silmeyi isteyebilir, CNIL’e (cnil.fr) şikâyette bulunabilirsiniz.'
      ],
      adult: '18 yaşında veya daha büyüğüm.', part: 'Araştırmaya katılmayı kabul ediyorum.',
      data: 'Verilerimin yukarıda anlatıldığı gibi işlenmesini kabul ediyorum.',
      email: 'AzEasier uygulamasında kullandığınız (veya kullanacağınız) e-posta', next: 'İleri',
      intro: 'Test {n}', introText: [
        '40 soru, yaklaşık 25 dakika. Sözlük veya uygulama olmadan, tek başınıza cevaplayın.',
        'İlk 12 soru dinleme: kulaklık kullanın veya sessiz bir odada olun.',
        'Bilmiyorsanız “Bilmiyorum”a dokunun. Tahmin etmekten iyidir.'
      ], begin: 'Başla',
      listening: 'Dinleyin ve duyduğunuz kelimeyi seçin.', vocabulary: 'Bu kelime ne demek?',
      reading: 'Bu cümle ne demek?', play: 'Dinle',
      tag: { listening: 'Dinleme', vocabulary: 'Kelime', reading: 'Okuma' }, playsLeft: '{n} kez daha dinleyebilirsiniz.',
      dunno: 'Bilmiyorum', of: 'Soru {i} / {n}', finish: 'Cevaplarımı gönder', sending: 'Gönderiliyor…',
      thanks1: 'Teşekkürler! Test 1 tamam.',
      after1: 'Şimdi AzEasier’i (App Store veya Google Play) yükleyin, aynı e-postayla hesabınızı oluşturun ve günde yaklaşık 15 dakika çalışın. Test 2’nin ne zaman olduğunu öğretmeniniz söyleyecek: aynı bağlantı, aynı kod, aynı PIN. Kâğıdınızı saklayın.',
      thanks2: 'Teşekkürler! Test 2 tamam. Öğretmeniniz grup sonuçlarını alacak.'
    }
  };
  var CONTACT = 'azeasier@finalingua.com';
  var PLAYS = 2;
  var app = document.getElementById('app');
  var config = window.AZEASIER_VERIFY_CONFIG || {};
  var state = { lang: pickLang(), code: '', pin: '', test: 0, form: '', items: [], index: 0, answers: {}, started: 0, plays: {} };
  var forms = null;

  function pickLang() {
    var fromUrl = new URLSearchParams(location.search).get('lang');
    if (T[fromUrl]) return fromUrl;
    var nav = (navigator.language || 'en').slice(0, 2);
    return T[nav] ? nav : 'en';
  }
  function t(key, fill) {
    var text = T[state.lang][key];
    if (text === undefined) return '';
    Object.keys(fill || {}).forEach(function (k) { text = text.split('{' + k + '}').join(fill[k]); });
    function contact(line) { return line.split('{contact}').join(CONTACT); }
    if (typeof text === 'string') return contact(text);
    return Array.isArray(text) ? text.map(contact) : text;
  }
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'on') Object.keys(attrs.on).forEach(function (e) { node.addEventListener(e, attrs.on[e]); });
      else if (k === 'text') node.textContent = attrs.text;
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function show(nodes) {
    app.replaceChildren.apply(app, nodes);
    document.documentElement.lang = state.lang;
    window.scrollTo(0, 0);
  }
  function save() {
    try {
      localStorage.setItem('azeasier-study-' + state.code + '-' + state.test,
        JSON.stringify({ index: state.index, answers: state.answers, started: state.started, plays: state.plays,
          email: state.email || '' }));
    } catch (e) { /* private window: no resume, the test still works */ }
  }
  function restore() {
    try {
      var saved = JSON.parse(localStorage.getItem('azeasier-study-' + state.code + '-' + state.test) || 'null');
      if (saved) {
        state.index = saved.index; state.answers = saved.answers; state.started = saved.started;
        state.plays = saved.plays || {}; state.email = saved.email || '';
      }
    } catch (e) { /* nothing saved */ }
  }
  function forget() {
    try { localStorage.removeItem('azeasier-study-' + state.code + '-' + state.test); } catch (e) { /* nothing */ }
  }
  function rpc(name, body) {
    return fetch(String(config.url || '').replace(/\/$/, '') + '/rest/v1/rpc/' + name, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: config.publishableKey,
                 Authorization: 'Bearer ' + config.publishableKey },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    });
  }

  function langPicker() {
    var names = { en: 'English', ru: 'Русский', fr: 'Français', tr: 'Türkçe' };
    return el('div', { class: 'chips', role: 'group', 'aria-label': t('choose') }, Object.keys(names).map(function (code) {
      return el('button', { type: 'button', class: 'chip', 'aria-pressed': String(code === state.lang), lang: code, text: names[code],
        on: { click: function () { state.lang = code; login(); } } });
    }));
  }
  function field(id, label, input) {
    return el('div', { class: 'field' }, [el('label', { for: id, text: label }), input]);
  }
  function banner(message) {
    return el('p', { class: 'banner', role: 'alert', text: message || '' });
  }
  function actions(button) {
    return el('div', { class: 'actions' }, [button]);
  }
  function speaker() {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    [['path', 'M4 9h4l5-4v14l-5-4H4z', 'currentColor', 'none'],
     ['path', 'M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12', 'none', 'currentColor']].forEach(function (d) {
      var shape = document.createElementNS(ns, d[0]);
      shape.setAttribute('d', d[1]);
      shape.setAttribute('fill', d[2]);
      shape.setAttribute('stroke', d[3]);
      shape.setAttribute('stroke-width', '2');
      shape.setAttribute('stroke-linecap', 'round');
      svg.appendChild(shape);
    });
    return svg;
  }

  function login(message) {
    var code = el('input', { type: 'text', id: 'code', class: 'code', autocomplete: 'off', autocapitalize: 'characters',
      spellcheck: 'false', maxlength: '12', value: state.code });
    var pin = el('input', { type: 'text', id: 'pin', inputmode: 'numeric', autocomplete: 'off', maxlength: '12', value: state.pin });
    var go = el('button', { type: 'submit', class: 'primary', text: t('start') });
    var form = el('form', { on: { submit: function (e) {
      e.preventDefault();
      state.code = code.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      state.pin = pin.value.replace(/\D/g, '');
      go.disabled = true;
      rpc('study_check', { p_code: state.code, p_pin: state.pin }).then(function (r) {
        if (!r.ok) return login(t(r.reason, { date: r.from || '' }) || t('failed'));
        state.test = r.test; state.form = r.form;
        state.items = forms.forms[r.form];
        state.index = 0; state.answers = {}; state.plays = {}; state.started = Date.now(); state.email = '';
        restore();
        if (state.test === 1 && !state.email) consent(); else intro();
      }).catch(function () { login(t('network')); });
    } } }, [
      el('div', { class: 'card' }, [field('code', t('code'), code), field('pin', t('pin'), pin)]),
      banner(message), actions(go)
    ]);
    show([el('h1', { text: t('heading') }), el('p', { class: 'eyebrow', text: t('choose') }), langPicker(), form]);
  }

  function consent() {
    var boxes = ['adult', 'part', 'data'].map(function (key) {
      var input = el('input', { type: 'checkbox', id: 'box-' + key });
      return { key: key, input: input, row: el('label', { class: 'box', for: 'box-' + key }, [input, el('span', { text: t(key) })]) };
    });
    var email = el('input', { type: 'email', id: 'email', autocomplete: 'email', value: state.email || '' });
    var go = el('button', { type: 'submit', class: 'primary', text: t('next'), disabled: 'disabled' });
    function update() {
      var ok = boxes.every(function (b) { return b.input.checked; }) && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim());
      go.disabled = !ok;
    }
    boxes.forEach(function (b) { b.input.addEventListener('change', update); });
    email.addEventListener('input', update);
    var form = el('form', { on: { submit: function (e) {
      e.preventDefault();
      state.email = email.value.trim();
      save();
      intro();
    } } }, [
      el('div', { class: 'card' }, [field('email', t('email'), email)].concat(boxes.map(function (b) { return b.row; }))),
      actions(go)
    ]);
    show([el('h1', { text: t('before') }),
      el('div', { class: 'card' }, t('consent').map(function (line) { return el('p', { class: 'muted', text: line }); })),
      form]);
  }

  function intro() {
    show([el('p', { class: 'eyebrow', text: t('heading') }), el('h1', { text: t('intro', { n: state.test }) }),
      el('div', { class: 'card' }, [el('ul', {}, t('introText').map(function (line) { return el('li', { text: line }); }))]),
      actions(el('button', { type: 'button', class: 'primary', text: t('begin'), on: { click: question } }))]);
  }

  function question() {
    if (state.index >= state.items.length) return finish();
    var item = state.items[state.index];
    var total = state.items.length;
    var picked = Object.prototype.hasOwnProperty.call(state.answers, item.id) ? state.answers[item.id] : undefined;
    var next = el('button', { type: 'button', class: 'primary', text: state.index === total - 1 ? t('finish') : t('next'),
      on: { click: function () { state.index += 1; save(); question(); } } });
    if (picked === undefined) next.disabled = true;
    var buttons = [];
    function choose(value) {
      state.answers[item.id] = value;
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.value === String(value))); });
      next.disabled = false;
      save();
    }
    item.choices.forEach(function (text, i) {
      buttons.push(el('button', { type: 'button', class: 'choice', 'data-value': String(i), 'aria-pressed': String(picked === i),
        lang: item.section === 'listening' ? 'az' : state.lang, text: item.section === 'listening' ? text : text[state.lang],
        on: { click: function () { choose(i); } } }));
    });
    buttons.push(el('button', { type: 'button', class: 'choice unknown', 'data-value': 'null', 'aria-pressed': String(picked === null),
      text: t('dunno'), on: { click: function () { choose(null); } } }));
    var stem = [];
    if (item.section === 'listening') {
      var left = PLAYS - (state.plays[item.id] || 0);
      var note = el('p', { class: 'muted', text: t('playsLeft', { n: left }) });
      var audio = new Audio(item.audio);
      var play = el('button', { type: 'button', class: 'play', 'aria-label': t('play'), on: { click: function () {
        if ((state.plays[item.id] || 0) >= PLAYS) return;
        state.plays[item.id] = (state.plays[item.id] || 0) + 1;
        save();
        audio.currentTime = 0;
        audio.play();
        var rest = PLAYS - state.plays[item.id];
        note.textContent = t('playsLeft', { n: rest });
        if (rest <= 0) play.disabled = true;
      } } }, [speaker()]);
      if (left <= 0) play.disabled = true;
      stem = [el('div', { class: 'listen' }, [play, el('div', {}, [el('strong', { text: t('play') }), note])])];
    } else {
      stem = [el('p', { class: 'prompt', lang: 'az', text: item.prompt })];
    }
    var fill = el('div');
    fill.style.width = Math.round(100 * state.index / total) + '%';
    show([el('div', { class: 'progress', role: 'progressbar', 'aria-label': t('of', { i: state.index + 1, n: total }),
        'aria-valuemin': '0', 'aria-valuemax': String(total), 'aria-valuenow': String(state.index) }, [fill]),
      el('p', { class: 'muted', text: t('of', { i: state.index + 1, n: total }) }),
      el('p', { class: 'eyebrow', text: t('tag')[item.section] }),
      el('h1', { text: t(item.section) })].concat(stem, [el('div', { class: 'choices' }, buttons), actions(next)]));
  }

  function finish(message) {
    var go = el('button', { type: 'button', class: 'primary', text: t('finish'), on: { click: send } });
    show([el('h1', { text: t('finish') }), banner(message), actions(go)]);
    function send() {
      go.disabled = true;
      go.textContent = t('sending');
      rpc('study_submit', {
        p_code: state.code, p_pin: state.pin, p_test: state.test, p_answers: state.answers, p_lang: state.lang,
        p_email: state.email || null, p_adult: state.test === 1, p_consent_study: state.test === 1,
        p_consent_data: state.test === 1, p_seconds: Math.round((Date.now() - state.started) / 1000)
      }).then(function (r) {
        if (!r.ok) return finish(t(r.reason, { date: r.from || '' }) || t('failed'));
        forget();
        state.pin = '';
        var mark = el('div', { class: 'done', 'aria-hidden': 'true', text: '✓' });
        show(state.test === 1
          ? [mark, el('h1', { text: t('thanks1') }), el('div', { class: 'card' }, [el('p', { text: t('after1') })])]
          : [mark, el('h1', { text: t('thanks2') })]);
      }).catch(function () { finish(t('network')); });
    }
    if (!message) send();
  }

  fetch('forms.json').then(function (r) { return r.json(); }).then(function (data) {
    forms = data;
    login();
  }).catch(function () { show([banner(t('network'))]); });
})();
