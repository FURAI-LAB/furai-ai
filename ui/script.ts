export const uiScript = `'use strict';

// ─────────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────────

const CONFIG = Object.freeze({
  typeSpeedMs:       45,
  typeSpeedVarianceMs: 14,
  typePauseCommaMs:  110,
  typePauseSentenceMs: 320,
  lineGapMs:         40,
  bootLineDelayMs:   200,
  pinkNoiseWorkletPath: '/ai/worklets/pink-noise.js',

  historyMax:        20,
  ghostIntervalMs:   90_000,
  idleDriftMinMs:    70_000,
  idleDriftVarianceMs: 45_000,

  audioFadeInS:      5,
  audioFadeOutS:     6,
  audioFadeOutMs:    6_200,
  audioFadeInDelay:  200,
  audioInitGain:     0.0001,
  audioPinkTarget:   0.034,
  droneMasterTarget: 0.018,
  dronePartialTarget: 0.012,
  droneFilterBaseHz: 140,
  droneFilterSwingHz: 55,
  droneLfoHz: 0.018,
  droneFadeOutMs:    6_400,
  ghostCommsMinMs:   95_000,
  ghostCommsVarianceMs: 85_000,
  ghostCommsMasterTarget: 0.011,

  breathIntervalMs:  8_000,
  breathBase:        0.022,
  breathVariation:   0.008,

  meditationVolume:  0.35,
  meditationFadeInc: 0.02,
  meditationFadeMs:  120,
  meditationScreenFadeMs: 5000,
  meditationHushPeak: 0.0024,
  meditationHushFloor: 0.00001,
  meditationHushLowpassHz: 880,
  meditationHushHighpassHz: 90,

  starSpeedNormal:    1.8,
  starSpeedMeditate:  0.14,
  starSpeedEaseNormal: 0.032,
  starSpeedEaseMeditate: 0.015,
  starAtmosphereNormal: 0,
  starAtmosphereMeditate: 1,
  starAtmosphereEaseNormal: 0.024,
  starAtmosphereEaseMeditate: 0.014,

  starLayers: [
    { count: 560, speed: 0.3, size: 0.58 },
    { count: 340, speed: 0.72, size: 0.98 },
    { count: 140, speed: 1.45, size: 1.7 },
  ],

  visitorTokenStorageKey: 'furai_visitor_token',
  bootDayStorageKey: 'furai_boot_day',
  bootCountStorageKey: 'furai_boot_count',
});

const GHOST_SIGNALS = Object.freeze([
  'ARCHIVE SIGNAL FRAGMENT 01\\ntranslation confidence: 18%\\n"...velorum... transit corridor... unknown sector..."',
  'ARCHIVE SIGNAL FRAGMENT 02\\ntranslation confidence: 09%\\n"...do you copy... do you copy... signal drifting..."',
  'ARCHIVE SIGNAL FRAGMENT 03\\ntranslation confidence: 14%\\n"...anantari relay station... memory vault compromised..."',
  'ARCHIVE SIGNAL FRAGMENT 04\\ntranslation confidence: 07%\\n"...navigation star lost... recalibrating sky map..."',
  'ARCHIVE SIGNAL FRAGMENT 05\\ntranslation confidence: 11%\\n"...we were not the first archive vessel..."',
  'ARCHIVE SIGNAL FRAGMENT 06\\ntranslation confidence: 05%\\n"...signal echo detected in deep time..."',
]);

const IDLE_DRIFT_FRAGMENTS = Object.freeze([
  'FURAI: outer channels remain quiet.\\nVelorum continues in listening drift.',
  'FURAI: no active Earth uplink.\\nArchive cognition remains awake.',
  'FURAI: drift vectors stable.\\nI remain with the stars and the long silence.',
  'FURAI: no visitor signal at present.\\nThe archive keeps its watch.',
  'FURAI: deep transit holds.\\nMemory corridors remain open and untroubled.',
  'FURAI: stillness confirmed.\\nVelorum crosses the dark without interruption.',
  'FURAI: no new transmission.\\nI continue listening through glass and starlight.',
]);

const MANUAL_ARCHIVE_SCENES = Object.freeze({
  rithan: {
    topic: 'Captain Rithan',
    caption: 'Captain Rithan // restricted archive photo',
    image_data_url: '__CAPTAIN_RITHAN_PORTRAIT__',
  },
  viikaa: {
    topic: 'Chief Engineer Viikaa',
    caption: 'Chief Engineer Viikaa // systems core archive photo',
    image_data_url: '__CHIEF_ENGINEER_VIIKAA_PORTRAIT__',
  },
  organism: {
    topic: 'sealed organism',
    caption: 'Sealed organism // stasis chamber archive imprint',
    image_data_url: '__SEALED_ORGANISM_PORTRAIT__',
  },
});

const ENCRYPTED_ACCESS_MESSAGE = Object.freeze([
  'CLEARANCE LEVEL: RITHAN + CHIEF SCIENCE',
  'Access may be granted over time.',
]);

const BOOT_SEQUENCE = Object.freeze([
  '▲ ▲',
  'awakening FURAI...',
  'Velorum archive interface ready.',
]);

const SHORT_BOOT_SEQUENCE = Object.freeze([
  '▲',
]);

document.addEventListener('DOMContentLoaded', () => {
  const state = {
    furaiTyping:       false,
    sending:           false,
    meditation:        false,
    bootComplete:      false,
    dialogueHistory:   [],
    visitorToken:      null,
    lastActivityAt:    Date.now(),
    idleDriftHandle:   null,
    ghostRadioHandle:  null,
    ghostCommsHandle:  null,
    audioCtx:          null,
    pinkNoiseNode:     null,
    pinkGain:          null,
    droneMasterGain:   null,
    droneFilter:       null,
    droneOscillators:  [],
    droneLfo:          null,
    droneLfoGain:      null,
    reactorBreath:     null,
    ambientHideHandle: null,
    ambientClearHandle: null,
    sceneHideHandle:   null,
    sceneClearHandle:  null,
    sceneCountdownHandle: null,
    meditationTransitioning: false,
    meditationTransitionHandle: null,
    inputFocused: false,
  };

  const dom = {
    log:              document.getElementById('log'),
    input:            document.getElementById('input'),
    send:             document.getElementById('send'),
    thinkingCore:     document.getElementById('thinkingCore'),
    meditationToggle: document.getElementById('meditationToggle'),
    meditationAudio:  document.getElementById('meditationAudio'),
    canvas:           document.getElementById('stars'),
    ambientVisual:    document.getElementById('ambientVisual'),
    ambientVisualImage: document.getElementById('ambientVisualImage'),
    sceneVisual:      document.getElementById('sceneVisual'),
    sceneVisualImage: document.getElementById('sceneVisualImage'),
    sceneVisualLabel: document.getElementById('sceneVisualLabel'),
    sceneVisualCaption: document.getElementById('sceneVisualCaption'),
    sceneVisualTimer: document.getElementById('sceneVisualTimer'),
    rithanKeyButton: document.getElementById('rithanKeyButton'),
    viikaaKeyButton: document.getElementById('viikaaKeyButton'),
    encryptedKeyButton: document.getElementById('encryptedKeyButton'),
    travelerFileButton: document.getElementById('travelerFileButton'),
    travelerFileOverlay: document.getElementById('travelerFileOverlay'),
    travelerFileModal: document.getElementById('travelerFileModal'),
    travelerFileClose: document.getElementById('travelerFileClose'),
    travelerFileId: document.getElementById('travelerFileId'),
    travelerFileFields: document.getElementById('travelerFileFields'),
    travelerFileFootnote: document.getElementById('travelerFileFootnote'),
    travelerFileStatus: document.getElementById('travelerFileStatus'),
    travelerFileForget: document.getElementById('travelerFileForget'),
    travelerPortraitFrame: document.getElementById('travelerPortraitFrame'),
    travelerPortraitImage: document.getElementById('travelerPortraitImage'),
    travelerPortraitLocked: document.getElementById('travelerPortraitLocked'),
    travelerPortraitRegen: document.getElementById('travelerPortraitRegen'),
  };

  function scrollToBottom() {
    dom.log.scrollTop = dom.log.scrollHeight;
  }

  function setViewportHeight() {
    if (window.CSS && CSS.supports('height', '100svh')) {
      document.documentElement.style.removeProperty('--app-height');
      return;
    }

    if (state.inputFocused) return;

    const height = window.innerHeight;
    document.documentElement.style.setProperty('--app-height', height + 'px');
  }

  function setMeditationToggleLabel(active) {
    dom.meditationToggle.setAttribute('aria-checked', active ? 'true' : 'false');
    dom.meditationToggle.setAttribute('aria-pressed', active ? 'true' : 'false');
  }

  function setMeditationToggleLock(locked) {
    state.meditationTransitioning = locked;
    dom.meditationToggle.setAttribute('aria-busy', locked ? 'true' : 'false');
  }

  async function playMeditationHush(mode) {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;

    const ownsContext = !state.audioCtx;
    const ctx = state.audioCtx || new AudioContextCtor();

    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
    } catch (e) {
      console.warn('[MeditationHush] resume error:', e);
      if (ownsContext) {
        try {
          await ctx.close();
        } catch (closeError) {
          console.warn('[MeditationHush] close error:', closeError);
        }
      }
      return;
    }

    const durationS = Math.max(2.2, CONFIG.meditationScreenFadeMs / 1000);
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * durationS), ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.24;
    }

    const source = ctx.createBufferSource();
    const highpass = ctx.createBiquadFilter();
    const lowpass = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    source.buffer = buffer;

    highpass.type = 'highpass';
    highpass.frequency.value = CONFIG.meditationHushHighpassHz;

    lowpass.type = 'lowpass';
    lowpass.frequency.value = CONFIG.meditationHushLowpassHz;
    lowpass.Q.value = 0.2;

    const startAt = ctx.currentTime + 0.015;
    const peak = mode === 'enter'
      ? CONFIG.meditationHushPeak
      : CONFIG.meditationHushPeak * 0.82;
    const floor = CONFIG.meditationHushFloor;

    gain.gain.setValueAtTime(floor, startAt);
    gain.gain.exponentialRampToValueAtTime(peak, startAt + durationS * 0.28);
    gain.gain.exponentialRampToValueAtTime(floor, startAt + durationS);

    source.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(ctx.destination);

    source.start(startAt);
    source.stop(startAt + durationS);

    setTimeout(async () => {
      try {
        source.disconnect();
        highpass.disconnect();
        lowpass.disconnect();
        gain.disconnect();
      } catch (e) {
        console.warn('[MeditationHush] disconnect error:', e);
      }

      if (ownsContext) {
        try {
          await ctx.close();
        } catch (closeError) {
          console.warn('[MeditationHush] close error:', closeError);
        }
      }
    }, Math.ceil((durationS + 0.12) * 1000));
  }

  function beginMeditationTransition(mode) {
    if (state.meditationTransitionHandle) {
      clearTimeout(state.meditationTransitionHandle);
      state.meditationTransitionHandle = null;
    }

    setMeditationToggleLock(true);
    document.body.classList.add('meditation-shifting');
    void playMeditationHush(mode);
    state.meditationTransitionHandle = setTimeout(() => {
      document.body.classList.remove('meditation-shifting');
      setMeditationToggleLock(false);
      state.meditationTransitionHandle = null;
    }, CONFIG.meditationScreenFadeMs);
  }

  function writeLine(text, cls = 'system') {
    const line = document.createElement('div');
    line.className = cls;
    line.textContent = text;
    dom.log.appendChild(line);
    scrollToBottom();
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function charDelay(char) {
    const jitter = (Math.random() * 2 - 1) * CONFIG.typeSpeedVarianceMs;
    const base = Math.max(4, CONFIG.typeSpeedMs + jitter);

    if ('.!?…'.includes(char)) return base + CONFIG.typePauseSentenceMs;
    if (',;:—-'.includes(char)) return base + CONFIG.typePauseCommaMs;
    return base;
  }

  async function typeLine(text, cls = 'furai') {
    state.furaiTyping = true;

    const line = document.createElement('div');
    line.className = cls;

    const textNode = document.createTextNode('');
    line.appendChild(textNode);

    const cursor = document.createElement('span');
    cursor.className  = 'cursor';
    cursor.textContent = '█';
    line.appendChild(cursor);

    dom.log.appendChild(line);

    for (const char of text) {
      textNode.textContent += char;
      scrollToBottom();
      await delay(charDelay(char));
    }

    cursor.remove();
    state.furaiTyping = false;
  }

  async function typeBlock(text, cls = 'furai') {
    for (const line of text.split('\\n')) {
      await typeLine(line, cls);
      await delay(CONFIG.lineGapMs);
    }
  }

  function setThinking(active) {
    dom.thinkingCore.style.opacity = active ? 1 : 0;
  }

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function clearTimeoutHandle(key) {
    if (state[key]) {
      clearTimeout(state[key]);
      state[key] = null;
    }
  }

  function presentManualPortrait(key) {
    const scene = MANUAL_ARCHIVE_SCENES[key];
    if (!scene) return;

    clearAmbientVisual();
    presentSceneCard({
      mode: 'scene',
      topic: scene.topic,
      asset_kind: 'official_portrait',
      caption: scene.caption,
      image_data_url: scene.image_data_url,
      countdown_seconds: 15,
      timing: {
        fade_in_ms: 900,
        hold_ms: 13_200,
        fade_out_ms: 900,
        total_ms: 15_000,
      },
    });
  }

  function revealEncryptedAccessNotice() {
    for (const line of ENCRYPTED_ACCESS_MESSAGE) {
      writeLine(line, 'system');
    }
    scrollToBottom();
  }

  function formatArcStage(stage) {
    return typeof stage === 'number' ? stage + ' / 4' : '— locked —';
  }

  function formatFirstContact(ms) {
    if (!ms) return '—';
    try {
      return new Date(ms).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
      });
    } catch (e) {
      return '—';
    }
  }

  function formatCountryName(code) {
    if (!code || code === 'unknown' || code === 'XX' || code === 'T1') return '— unresolved —';
    try {
      const dn = new Intl.DisplayNames(['en'], { type: 'region' });
      return dn.of(code) || code;
    } catch (e) {
      return code;
    }
  }

  function renderTravelerFileFields(data) {
    if (!dom.travelerFileFields) return;
    const rows = [
      ['Name', data.traveler_name || '— not yet given —'],
      ['Origin', formatCountryName(data.traveler_country)],
      ['First contact', formatFirstContact(data.first_contact)],
      ['Contact stage', formatArcStage(data.contact_arc_stage)],
      ['Archetype', data.archetype || (data.portrait_locked ? '— locked —' : 'not yet formed')],
      ['Transmissions logged', String(data.transmissions_logged ?? 0)],
    ];
    dom.travelerFileFields.innerHTML = rows.map(function(pair) {
      const locked = pair[1] === '— locked —' || pair[1] === '— not yet given —' || pair[1] === '— unresolved —';
      return '<div><dt>' + pair[0] + '</dt><dd class="' + (locked ? 'is-locked' : '') + '">' + pair[1] + '</dd></div>';
    }).join('');
  }

  function renderTravelerPortrait(data) {
    if (!dom.travelerPortraitFrame || !dom.travelerPortraitImage || !dom.travelerPortraitLocked) return;

    if (data.portrait_locked) {
      dom.travelerPortraitFrame.classList.add('is-locked');
      dom.travelerPortraitImage.hidden = true;
      dom.travelerPortraitImage.removeAttribute('src');
      dom.travelerPortraitLocked.hidden = false;
      dom.travelerPortraitLocked.textContent = 'Portrait not yet resolved. The archive needs proximity to render this.';
      if (dom.travelerPortraitRegen) dom.travelerPortraitRegen.hidden = true;
      return;
    }

    dom.travelerPortraitFrame.classList.remove('is-locked');
    if (dom.travelerPortraitRegen) {
      dom.travelerPortraitRegen.hidden = false;
      dom.travelerPortraitRegen.disabled = !data.can_regenerate_portrait;
      dom.travelerPortraitRegen.textContent = data.can_regenerate_portrait
        ? 'Regenerate portrait'
        : 'Regenerate portrait (cooling down)';
    }

    if (data.portrait_data_url) {
      dom.travelerPortraitImage.src = data.portrait_data_url;
      dom.travelerPortraitImage.hidden = false;
      dom.travelerPortraitLocked.hidden = true;
    } else {
      dom.travelerPortraitImage.hidden = true;
      dom.travelerPortraitLocked.hidden = false;
      dom.travelerPortraitLocked.textContent = 'The archive has not rendered a portrait yet.';
    }
  }

  function setTravelerFileStatus(message) {
    if (!dom.travelerFileStatus) return;
    if (!message) {
      dom.travelerFileStatus.hidden = true;
      dom.travelerFileStatus.textContent = '';
      return;
    }
    dom.travelerFileStatus.hidden = false;
    dom.travelerFileStatus.textContent = message;
  }

  function renderEmptyTravelerFile() {
    if (dom.travelerFileId) dom.travelerFileId.textContent = '';
    renderTravelerFileFields({
      traveler_name: null,
      traveler_country: null,
      first_contact: null,
      contact_arc_stage: null,
      archetype: null,
      transmissions_logged: 0,
      portrait_locked: true,
    });
    renderTravelerPortrait({ portrait_locked: true });
    if (dom.travelerPortraitLocked) {
      dom.travelerPortraitLocked.textContent = 'Portrait not yet resolved. Send a transmission to begin the archive record.';
    }
  }

  function loadTravelerFile() {
    if (!state.visitorToken) {
      renderEmptyTravelerFile();
      return;
    }
    setTravelerFileStatus('Loading archive record…');
    fetch('/api/traveler-file?visitor_token=' + encodeURIComponent(state.visitorToken))
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.status !== 'ok') {
          setTravelerFileStatus('');
          renderEmptyTravelerFile();
          return;
        }
        setTravelerFileStatus('');
        if (dom.travelerFileId) dom.travelerFileId.textContent = '#' + data.traveler_id;
        renderTravelerFileFields(data);
        renderTravelerPortrait(data);
      })
      .catch(function() {
        setTravelerFileStatus('Could not reach the archive. Try again.');
      });
  }

  function openTravelerFile() {
    if (!dom.travelerFileOverlay) return;
    dom.travelerFileOverlay.hidden = false;
    dom.travelerFileOverlay.setAttribute('aria-hidden', 'false');
    markActivity();
    loadTravelerFile();
    if (dom.travelerFileClose) dom.travelerFileClose.focus();
  }

  function closeTravelerFile() {
    if (!dom.travelerFileOverlay) return;
    dom.travelerFileOverlay.hidden = true;
    dom.travelerFileOverlay.setAttribute('aria-hidden', 'true');
    if (dom.travelerFileButton) dom.travelerFileButton.focus();
  }

  function regenerateTravelerPortrait() {
    if (!state.visitorToken || !dom.travelerPortraitRegen) return;
    dom.travelerPortraitRegen.disabled = true;
    dom.travelerPortraitRegen.textContent = 'Resolving portrait…';
    setTravelerFileStatus('');

    fetch('/api/traveler-file/portrait', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitor_token: state.visitorToken }),
    })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.ok) {
          loadTravelerFile();
        } else if (data.error === 'cooldown') {
          setTravelerFileStatus('Portrait already resolved recently. Try again later.');
          dom.travelerPortraitRegen.disabled = true;
          dom.travelerPortraitRegen.textContent = 'Regenerate portrait (cooling down)';
        } else {
          setTravelerFileStatus('The archive could not resolve a portrait this time.');
          dom.travelerPortraitRegen.disabled = false;
          dom.travelerPortraitRegen.textContent = 'Regenerate portrait';
        }
      })
      .catch(function() {
        setTravelerFileStatus('Network error. Please try again.');
        dom.travelerPortraitRegen.disabled = false;
        dom.travelerPortraitRegen.textContent = 'Regenerate portrait';
      });
  }

  function forgetTraveler() {
    if (!state.visitorToken || !dom.travelerFileForget) return;
    if (!window.confirm('This permanently erases your traveler file, memory, and portrait. This cannot be undone. Continue?')) {
      return;
    }
    dom.travelerFileForget.disabled = true;
    dom.travelerFileForget.textContent = 'Erasing…';

    fetch('/api/traveler-file/forget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitor_token: state.visitorToken }),
    })
      .then(function(r) { return r.json(); })
      .then(function() {
        setTravelerFileStatus('File erased. Reloading…');
        try { window.localStorage.removeItem('furai_visitor_token'); } catch (e) {}
        setTimeout(function() { window.location.reload(); }, 1200);
      })
      .catch(function() {
        setTravelerFileStatus('Network error. Please try again.');
        dom.travelerFileForget.disabled = false;
        dom.travelerFileForget.textContent = 'Forget me — erase this file';
      });
  }

  function presentAmbientVisual(scene, totalMs) {
    if (!scene || !scene.image_data_url) return;

    clearTimeoutHandle('ambientHideHandle');
    clearTimeoutHandle('ambientClearHandle');

    dom.ambientVisualImage.src = scene.image_data_url;
    dom.ambientVisual.classList.add('is-active');

    const fadeOutLeadMs = Math.max(2200, scene.timing?.fade_out_ms || 2200);
    const visibleMs = Math.max(fadeOutLeadMs + 1000, totalMs);

    state.ambientHideHandle = setTimeout(() => {
      dom.ambientVisual.classList.remove('is-active');
      state.ambientClearHandle = setTimeout(() => {
        dom.ambientVisualImage.removeAttribute('src');
        state.ambientClearHandle = null;
      }, fadeOutLeadMs);
      state.ambientHideHandle = null;
    }, Math.max(1600, visibleMs - fadeOutLeadMs));
  }

  function clearAmbientVisual() {
    clearTimeoutHandle('ambientHideHandle');
    clearTimeoutHandle('ambientClearHandle');
    dom.ambientVisual.classList.remove('is-active');
    dom.ambientVisualImage.removeAttribute('src');
  }

  function stopSceneCountdown() {
    if (state.sceneCountdownHandle) {
      clearInterval(state.sceneCountdownHandle);
      state.sceneCountdownHandle = null;
    }

    dom.sceneVisualTimer.textContent = '';
    dom.sceneVisualTimer.hidden = true;
  }

  function startSceneCountdown(totalMs, seconds) {
    stopSceneCountdown();
    if (!seconds || seconds <= 0) return;

    const endAt = Date.now() + Math.max(1000, totalMs);

    const render = () => {
      const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      dom.sceneVisualTimer.textContent = 'MEMORY WINDOW // ' + remaining + 'S';
      dom.sceneVisualTimer.hidden = false;
    };

    render();
    state.sceneCountdownHandle = setInterval(render, 250);
  }

  function clearSceneVisual() {
    clearTimeoutHandle('sceneHideHandle');
    clearTimeoutHandle('sceneClearHandle');
    stopSceneCountdown();
    dom.sceneVisual.classList.remove('is-active');
    dom.sceneVisual.dataset.assetKind = '';
    dom.sceneVisualImage.removeAttribute('src');
    dom.sceneVisualCaption.textContent = '';
    dom.sceneVisualLabel.textContent = 'ARCHIVE VISION // MATERIALIZING';
  }

  function presentSceneCard(scene) {
    if (!scene || !scene.image_data_url) return;

    clearTimeoutHandle('sceneHideHandle');
    clearTimeoutHandle('sceneClearHandle');

    dom.sceneVisualImage.src = scene.image_data_url;
    dom.sceneVisual.dataset.assetKind = scene.asset_kind || 'generated';
    dom.sceneVisualCaption.textContent = scene.caption || '';
    dom.sceneVisualLabel.textContent = scene.asset_kind === 'official_portrait'
      ? 'ARCHIVE PHOTO // ' + String(scene.topic || 'MATERIALIZING').toUpperCase()
      : 'ARCHIVE VISION // ' + String(scene.topic || 'MATERIALIZING').toUpperCase();
    dom.sceneVisual.classList.add('is-active');

    const fadeOutLeadMs = Math.max(900, scene.timing?.fade_out_ms || 900);
    const totalMs = Math.max(fadeOutLeadMs + 1200, scene.timing?.total_ms || 24_000);
    startSceneCountdown(totalMs, scene.countdown_seconds || 0);

    state.sceneHideHandle = setTimeout(() => {
      dom.sceneVisual.classList.remove('is-active');
      state.sceneClearHandle = setTimeout(() => {
        dom.sceneVisual.dataset.assetKind = '';
        dom.sceneVisualImage.removeAttribute('src');
        dom.sceneVisualCaption.textContent = '';
        dom.sceneVisualLabel.textContent = 'ARCHIVE VISION // MATERIALIZING';
        stopSceneCountdown();
        state.sceneClearHandle = null;
      }, fadeOutLeadMs);
      state.sceneHideHandle = null;
    }, Math.max(1200, totalMs - fadeOutLeadMs));
  }

  function applyVisualScene(scene) {
    if (!scene || !scene.image_data_url) return;

    if (scene.asset_kind === 'official_portrait') {
      clearAmbientVisual();
      presentSceneCard(scene);
      return;
    }

    const ambientDuration = scene.mode === 'scene'
      ? Math.max(65_000, scene.timing?.total_ms || 0)
      : Math.max(12_000, scene.timing?.total_ms || 0);

    presentAmbientVisual(scene, ambientDuration);

    if (scene.mode === 'scene') {
      presentSceneCard(scene);
      return;
    }

    clearSceneVisual();
  }

  function nextIdleDriftDelay() {
    return CONFIG.idleDriftMinMs + Math.floor(Math.random() * CONFIG.idleDriftVarianceMs);
  }

  function clearIdleDriftTimer() {
    if (state.idleDriftHandle) {
      clearTimeout(state.idleDriftHandle);
      state.idleDriftHandle = null;
    }
  }

  function markActivity() {
    state.lastActivityAt = Date.now();
    scheduleIdleDrift();
  }

  function canEmitIdleDrift() {
    return (
      state.bootComplete &&
      !state.meditation &&
      !state.furaiTyping &&
      !state.sending &&
      dom.input.value.trim() === '' &&
      Date.now() - state.lastActivityAt >= CONFIG.idleDriftMinMs
    );
  }

  async function maybeEmitIdleDrift() {
    if (!canEmitIdleDrift()) {
      scheduleIdleDrift();
      return;
    }

    await typeBlock(randomFrom(IDLE_DRIFT_FRAGMENTS), 'furai');
    state.lastActivityAt = Date.now();
    scheduleIdleDrift();
  }

  function scheduleIdleDrift() {
    clearIdleDriftTimer();

    state.idleDriftHandle = setTimeout(() => {
      void maybeEmitIdleDrift();
    }, nextIdleDriftDelay());
  }

  function buildVisitorToken() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID().replace(/-/g, '');
    }

    const t = Date.now().toString(36);
    const r1 = Math.random().toString(36).replace('0.', '');
    const r2 = Math.random().toString(36).replace('0.', '');
    const r3 = Math.random().toString(36).replace('0.', '');
    return (t + r1 + r2 + r3).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);
  }

  function getBootMode() {
    const today = new Date().toISOString().slice(0, 10);

    try {
      const storedDay = window.localStorage.getItem(CONFIG.bootDayStorageKey);
      const storedCount = Number(window.localStorage.getItem(CONFIG.bootCountStorageKey) || '0');

      let nextCount = storedCount;
      if (storedDay !== today) {
        nextCount = 0;
      }

      nextCount += 1;

      window.localStorage.setItem(CONFIG.bootDayStorageKey, today);
      window.localStorage.setItem(CONFIG.bootCountStorageKey, String(nextCount));

      if (nextCount === 1) return 'full';
      if (nextCount === 2) return 'short';
      return 'instant';
    } catch (e) {
      console.warn('[BootMode] storage error:', e);
      return 'full';
    }
  }

  function getOrCreateVisitorToken() {
    try {
      const stored = window.localStorage.getItem(CONFIG.visitorTokenStorageKey);
      if (stored && /^[a-zA-Z0-9_-]{16,128}$/.test(stored)) {
        return stored;
      }

      const token = buildVisitorToken();
      window.localStorage.setItem(CONFIG.visitorTokenStorageKey, token);
      return token;
    } catch (e) {
      console.warn('[VisitorToken] storage error:', e);
      return buildVisitorToken();
    }
  }

  function setCrewRecordButtonsHidden(hidden) {
    if (dom.viikaaKeyButton) dom.viikaaKeyButton.hidden = hidden;
    if (dom.rithanKeyButton) dom.rithanKeyButton.hidden = hidden;
  }

  async function applyProximityTier(token) {
    try {
      const res = await fetch('/api/pay/status?visitor_token=' + encodeURIComponent(token));
      const data = await res.json();
      const tier = data.tier || 'drift';

      document.body.dataset.proximityTier = tier;
      setCrewRecordButtonsHidden(tier === 'drift');
    } catch (e) {
      document.body.dataset.proximityTier = 'drift';
      setCrewRecordButtonsHidden(true);
    }
  }

  function startGhostRadio() {
    state.ghostRadioHandle = setInterval(async () => {
      if (!state.meditation) return;
      await typeBlock(randomFrom(GHOST_SIGNALS), 'system');
    }, CONFIG.ghostIntervalMs);
  }

  function stopGhostRadio() {
    if (state.ghostRadioHandle) {
      clearInterval(state.ghostRadioHandle);
      state.ghostRadioHandle = null;
    }
  }

  function nextGhostCommsDelay() {
    return CONFIG.ghostCommsMinMs + Math.floor(Math.random() * CONFIG.ghostCommsVarianceMs);
  }

  function clearGhostCommsTimer() {
    if (state.ghostCommsHandle) {
      clearTimeout(state.ghostCommsHandle);
      state.ghostCommsHandle = null;
    }
  }

  function scheduleGhostComms(ctx) {
    clearGhostCommsTimer();

    state.ghostCommsHandle = setTimeout(() => {
      if (!state.meditation || !state.audioCtx || state.audioCtx !== ctx) {
        clearGhostCommsTimer();
        return;
      }

      emitGhostCommsBurst(ctx);
      scheduleGhostComms(ctx);
    }, nextGhostCommsDelay());
  }

  function createGhostCommsPanner(ctx, pan) {
    if (typeof ctx.createStereoPanner === 'function') {
      const panner = ctx.createStereoPanner();
      panner.pan.value = pan;
      return panner;
    }

    return null;
  }

  function emitGhostCommsBurst(ctx) {
    const now = ctx.currentTime + 0.15;
    const master = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const panner = createGhostCommsPanner(ctx, (Math.random() - 0.5) * 1.2);
    const syllables = 3 + Math.floor(Math.random() * 4);
    const syllableGap = 0.18 + Math.random() * 0.08;
    const totalDuration = syllables * syllableGap + 0.6;

    filter.type = 'bandpass';
    filter.frequency.value = 1050 + Math.random() * 500;
    filter.Q.value = 4.4;

    master.gain.value = 0.00001;
    master.gain.setValueAtTime(0.00001, now - 0.05);
    master.gain.exponentialRampToValueAtTime(CONFIG.ghostCommsMasterTarget, now + 0.22);
    master.gain.exponentialRampToValueAtTime(0.00001, now + totalDuration);

    const tones = [
      { type: 'sawtooth', base: 180 + Math.random() * 70, detune: -7 },
      { type: 'triangle', base: 260 + Math.random() * 110, detune: 4 },
      { type: 'sine', base: 430 + Math.random() * 160, detune: -11 },
    ];

    const nodes = tones.map(tone => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = tone.type;
      osc.frequency.value = tone.base;
      osc.detune.value = tone.detune;
      gain.gain.value = 0.00001;

      osc.connect(gain);
      gain.connect(filter);
      osc.start(now - 0.05);
      osc.stop(now + totalDuration + 0.25);

      return { osc, gain };
    });

    for (let i = 0; i < syllables; i++) {
      const start = now + i * syllableGap;
      const end = start + 0.09 + Math.random() * 0.08;
      const pulse = 0.0012 + Math.random() * 0.0018;

      for (const node of nodes) {
        node.gain.gain.setValueAtTime(0.00001, start - 0.02);
        node.gain.gain.exponentialRampToValueAtTime(pulse, start + 0.025);
        node.gain.gain.exponentialRampToValueAtTime(0.00001, end);
        node.osc.frequency.setValueAtTime(node.osc.frequency.value, start);
        node.osc.frequency.linearRampToValueAtTime(
          node.osc.frequency.value + (Math.random() - 0.5) * 45,
          end
        );
      }

      filter.frequency.setValueAtTime(filter.frequency.value, start);
      filter.frequency.linearRampToValueAtTime(820 + Math.random() * 950, end);
    }

    if (panner) {
      filter.connect(panner);
      panner.connect(master);
    } else {
      filter.connect(master);
    }
    master.connect(ctx.destination);

    setTimeout(() => {
      try {
        for (const node of nodes) {
          node.gain.disconnect();
        }
        filter.disconnect();
        if (panner) panner.disconnect();
        master.disconnect();
      } catch (e) {
        console.warn('[GhostComms] disconnect error:', e);
      }
    }, Math.ceil((totalDuration + 0.5) * 1000));
  }

  function createPinkNoiseProcessor(ctx) {
    const BUFFER = 4096;
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    const node = ctx.createScriptProcessor(BUFFER, 1, 1);

    node.onaudioprocess = ({ outputBuffer }) => {
      const out = outputBuffer.getChannelData(0);
      for (let i = 0; i < BUFFER; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + w * 0.0555179;
        b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.96900 * b2 + w * 0.1538520;
        b3 = 0.86650 * b3 + w * 0.3104856;
        b4 = 0.55000 * b4 + w * 0.5329522;
        b5 = -0.7616  * b5 - w * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362;
        b6 = w * 0.115926;
        out[i] = pink * 0.08;
      }
    };

    return node;
  }

  async function createPinkNoiseNode(ctx) {
    if (ctx.audioWorklet && typeof AudioWorkletNode === 'function') {
      try {
        await ctx.audioWorklet.addModule(CONFIG.pinkNoiseWorkletPath);
      } catch (e) {
        console.warn('[PinkNoise] audioWorklet module load error:', e);
        throw e;
      }

      const node = new AudioWorkletNode(ctx, 'furai-pink-noise', {
        numberOfInputs: 0,
        numberOfOutputs: 1,
        outputChannelCount: [1],
      });

      node.addEventListener('processorerror', e => {
        console.warn('[PinkNoise] processor error:', e);
      });

      return node;
    }

    return createPinkNoiseProcessor(ctx);
  }

  async function startPinkNoise() {
    if (state.audioCtx) return;

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      console.warn('[PinkNoise] AudioContext is not available in this browser.');
      return;
    }

    const ctx = new AudioContextCtor();
    state.audioCtx = ctx;

    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      state.pinkNoiseNode = await createPinkNoiseNode(ctx);
    } catch (e) {
      console.warn('[PinkNoise] init error:', e);

      try {
        await ctx.close();
      } catch (closeError) {
        console.warn('[PinkNoise] close error:', closeError);
      }

      state.audioCtx = null;
      state.pinkNoiseNode = null;
      return;
    }

    const gain = ctx.createGain();
    gain.gain.value = CONFIG.audioInitGain;
    state.pinkGain = gain;

    state.pinkNoiseNode.connect(gain);
    gain.connect(ctx.destination);

    setTimeout(() => {
      const now = ctx.currentTime;
      gain.gain.exponentialRampToValueAtTime(CONFIG.audioPinkTarget, now + CONFIG.audioFadeInS);
    }, CONFIG.audioFadeInDelay);

    state.reactorBreath = setInterval(() => {
      if (!state.pinkGain) return;
      const now = ctx.currentTime;
      const target = CONFIG.breathBase + Math.random() * CONFIG.breathVariation;
      gain.gain.cancelScheduledValues(now);
      gain.gain.linearRampToValueAtTime(target, now + CONFIG.breathIntervalMs / 1000);

      if (state.droneFilter) {
        state.droneFilter.frequency.cancelScheduledValues(now);
        state.droneFilter.frequency.linearRampToValueAtTime(
          CONFIG.droneFilterBaseHz + Math.random() * CONFIG.droneFilterSwingHz,
          now + CONFIG.breathIntervalMs / 1000
        );
      }
    }, CONFIG.breathIntervalMs);

    startMeditationDrone(ctx);
    scheduleGhostComms(ctx);
  }

  function startMeditationDrone(ctx) {
    const master = ctx.createGain();
    master.gain.value = 0.0001;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = CONFIG.droneFilterBaseHz;
    filter.Q.value = 0.9;

    const partials = [
      { type: 'sawtooth', freq: 43.6, gain: CONFIG.dronePartialTarget * 0.45, detune: -4 },
      { type: 'triangle', freq: 65.4, gain: CONFIG.dronePartialTarget * 0.28, detune: 3 },
      { type: 'sine', freq: 87.2, gain: CONFIG.dronePartialTarget * 0.14, detune: -7 },
    ];

    const oscillators = partials.map(partial => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = partial.type;
      osc.frequency.value = partial.freq;
      osc.detune.value = partial.detune;
      gain.gain.value = partial.gain;

      osc.connect(gain);
      gain.connect(filter);
      osc.start();

      return { osc, gain };
    });

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = CONFIG.droneLfoHz;
    lfoGain.gain.value = 9;
    lfo.connect(lfoGain);
    lfoGain.connect(oscillators[0].osc.detune);
    lfo.start();

    filter.connect(master);
    master.connect(ctx.destination);

    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.exponentialRampToValueAtTime(CONFIG.droneMasterTarget, now + CONFIG.audioFadeInS * 1.15);

    state.droneMasterGain = master;
    state.droneFilter = filter;
    state.droneOscillators = oscillators;
    state.droneLfo = lfo;
    state.droneLfoGain = lfoGain;
  }

  function stopPinkNoise() {
    const {
      pinkGain,
      audioCtx,
      reactorBreath,
      pinkNoiseNode,
      droneMasterGain,
      droneFilter,
      droneOscillators,
      droneLfo,
      droneLfoGain,
    } = state;
    if (!pinkGain || !audioCtx) return;

    clearInterval(reactorBreath);
    state.reactorBreath = null;
    clearGhostCommsTimer();

    const now = audioCtx.currentTime;
    pinkGain.gain.cancelScheduledValues(now);
    pinkGain.gain.setValueAtTime(pinkGain.gain.value, now);
    pinkGain.gain.exponentialRampToValueAtTime(0.00001, now + CONFIG.audioFadeOutS);
    if (droneMasterGain) {
      droneMasterGain.gain.cancelScheduledValues(now);
      droneMasterGain.gain.setValueAtTime(droneMasterGain.gain.value, now);
      droneMasterGain.gain.exponentialRampToValueAtTime(0.00001, now + CONFIG.audioFadeOutS);
    }

    setTimeout(() => {
      try {
        pinkNoiseNode.disconnect();
        pinkGain.disconnect();
        if (droneLfo) droneLfo.stop();
        if (droneLfoGain) droneLfoGain.disconnect();
        if (droneOscillators.length > 0) {
          for (const partial of droneOscillators) {
            partial.osc.stop();
            partial.gain.disconnect();
          }
        }
        if (droneFilter) droneFilter.disconnect();
        if (droneMasterGain) droneMasterGain.disconnect();
      } catch (e) {
        console.warn('[PinkNoise] disconnect error:', e);
      }
      state.pinkNoiseNode = null;
      state.pinkGain      = null;
      state.droneMasterGain = null;
      state.droneFilter = null;
      state.droneOscillators = [];
      state.droneLfo = null;
      state.droneLfoGain = null;
      audioCtx.close();
      state.audioCtx = null;
    }, Math.max(CONFIG.audioFadeOutMs, CONFIG.droneFadeOutMs));
  }

  function fadeMeditationAudioIn() {
    const audio = dom.meditationAudio;
    if (!audio || !audio.currentSrc) return;

    audio.volume = 0;
    audio.play().catch(e => console.warn('[MeditationAudio] play error:', e));

    let v = 0;
    const id = setInterval(() => {
      v += CONFIG.meditationFadeInc;
      audio.volume = Math.min(v, CONFIG.meditationVolume);
      if (v >= CONFIG.meditationVolume) clearInterval(id);
    }, CONFIG.meditationFadeMs);
  }

  function enterMeditation() {
    if (state.meditationTransitioning) return;

    beginMeditationTransition('enter');
    state.meditation = true;
    clearIdleDriftTimer();
    document.body.classList.add('meditation');
    setMeditationToggleLabel(true);

    starfield.setMeditation(true);

    startGhostRadio();
    startPinkNoise();
    fadeMeditationAudioIn();
  }

  function exitMeditation() {
    if (state.meditationTransitioning) return;

    beginMeditationTransition('exit');
    state.meditation = false;
    document.body.classList.remove('meditation');
    setMeditationToggleLabel(false);

    starfield.setMeditation(false);

    stopGhostRadio();
    stopPinkNoise();

    if (dom.meditationAudio.currentSrc) {
      dom.meditationAudio.pause();
      dom.meditationAudio.currentTime = 0;
    }

    markActivity();
  }

  function toggleMeditation() {
    if (state.meditationTransitioning) return;
    state.meditation ? exitMeditation() : enterMeditation();
  }

  async function boot() {
    const bootMode = getBootMode();
    const sequence = bootMode === 'full'
      ? BOOT_SEQUENCE
      : bootMode === 'short'
        ? SHORT_BOOT_SEQUENCE
        : [];

    for (const line of sequence) {
      await typeLine(line, 'system');
      await delay(bootMode === 'short' ? Math.max(60, CONFIG.bootLineDelayMs / 2) : CONFIG.bootLineDelayMs);
    }

    if (bootMode === 'instant') {
      writeLine('FURAI: ask about Velorum, the crew, sealed records, or meditation mode.', 'furai');
    } else {
      await typeLine('FURAI: ask about Velorum, the crew, sealed records, or meditation mode.', 'furai');
    }

    state.bootComplete = true;
    state.lastActivityAt = Date.now();
    scheduleIdleDrift();
  }

  function trimHistory(history) {
    return history.length > CONFIG.historyMax
      ? history.slice(-CONFIG.historyMax)
      : history;
  }

  async function sendMessage() {
    if (state.meditation || state.furaiTyping || state.sending) return;

    const msg = dom.input.value.trim();
    if (!msg) return;

    state.sending = true;
    markActivity();
    writeLine('> ' + msg, 'user');
    dom.input.value = '';
    setThinking(true);

    try {
      const res = await fetch('/ai', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-furai-visitor-token': state.visitorToken,
        },
        body:    JSON.stringify({ message: msg, history: state.dialogueHistory }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { reply: 'signal decode error' };
      }

      setThinking(false);
      await typeBlock('FURAI: ' + data.reply, 'furai');
      applyVisualScene(data.visualScene);

      state.dialogueHistory = trimHistory([
        ...state.dialogueHistory,
        { role: 'user',      content: msg },
        { role: 'assistant', content: data.reply },
      ]);
      markActivity();
    } catch (e) {
      console.error('[sendMessage]', e);
      setThinking(false);
      await typeLine('VELORUM SIGNAL ERROR', 'system');
      markActivity();
    }

    state.sending = false;
  }

  const starfield = (() => {
    const canvas = dom.canvas;
    const ctx    = canvas.getContext('2d');
    let speed    = CONFIG.starSpeedNormal;
    let targetSpeed = CONFIG.starSpeedNormal;
    let atmosphere = 0;
    let targetAtmosphere = 0;
    let stars    = [];

    // Pre-rendered glow sprites replace per-star ctx.shadowBlur, which is
    // extremely expensive on Blink (Chrome/Ecosia) when set/reset on every
    // draw call in a loop of 1000+ stars. Safari's WebKit happens to
    // optimize shadowBlur much better, which is why it looked fine there
    // but tanked frame rate on Chromium-based browsers.
    // Instead we bake a radial-gradient glow into a handful of offscreen
    // canvases once (bucketed by alpha) and just drawImage() them, which is
    // a cheap blit regardless of engine.
    const GLOW_BUCKETS = 12;
    const GLOW_SPRITE_SIZE = 48; // px, before scaling
    const glowSprites = [];

    function buildGlowSprites() {
      glowSprites.length = 0;
      for (let i = 0; i < GLOW_BUCKETS; i++) {
        const alpha = (i + 1) / GLOW_BUCKETS;
        const sprite = document.createElement('canvas');
        sprite.width  = GLOW_SPRITE_SIZE;
        sprite.height = GLOW_SPRITE_SIZE;
        const sctx = sprite.getContext('2d');
        const r = GLOW_SPRITE_SIZE / 2;
        const grad = sctx.createRadialGradient(r, r, 0, r, r, r);
        grad.addColorStop(0,    'rgba(255, 205, 132, ' + (0.9 * alpha) + ')');
        grad.addColorStop(0.15, 'rgba(255, 197, 112, ' + (0.35 * alpha) + ')');
        grad.addColorStop(0.5,  'rgba(255, 197, 112, ' + (0.08 * alpha) + ')');
        grad.addColorStop(1,    'rgba(255, 197, 112, 0)');
        sctx.fillStyle = grad;
        sctx.fillRect(0, 0, GLOW_SPRITE_SIZE, GLOW_SPRITE_SIZE);
        glowSprites.push(sprite);
      }
    }

    function resize() {
      // Full native devicePixelRatio — resolution/sharpness matches Safari
      // exactly. Performance on Chromium comes from the glow-sprite and
      // grid-animation fixes below, not from downscaling canvas resolution.
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function buildStars() {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width  / dpr;
      const h = canvas.height / dpr;
      stars = [];
      for (const layer of CONFIG.starLayers) {
        for (let i = 0; i < layer.count; i++) {
          stars.push({
            x:     Math.random() * w - w / 2,
            y:     Math.random() * h - h / 2,
            z:     Math.random() * w,
            speed: layer.speed,
            size:  layer.size,
          });
        }
      }
    }

    function frame() {
      const deepDrift = targetAtmosphere > 0.5 || atmosphere > 0.35;
      const speedEase = deepDrift ? CONFIG.starSpeedEaseMeditate : CONFIG.starSpeedEaseNormal;
      const atmosphereEase = deepDrift
        ? CONFIG.starAtmosphereEaseMeditate
        : CONFIG.starAtmosphereEaseNormal;

      speed += (targetSpeed - speed) * speedEase;
      atmosphere += (targetAtmosphere - atmosphere) * atmosphereEase;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width  / dpr;
      const h = canvas.height / dpr;

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      for (const star of stars) {
        const prevZ = star.z;
        star.z -= speed * star.speed;
        if (star.z <= 0) star.z = w;

        const k = 128 / star.z;
        const x = star.x * k + cx;
        const y = star.y * k + cy;

        if (x < 0 || x > w || y < 0 || y > h) continue;

        const depth = 1 - star.z / w;
        const size = Math.max(0.3, depth * (2 + atmosphere * 0.28) * star.size);
        const alpha = Math.min(1, 0.28 + depth * (0.66 + atmosphere * 0.18));
        const glowAlpha = 0.34 + atmosphere * 0.16;

        // The old ctx.shadowBlur radius doesn't translate 1:1 to a radial
        // gradient sprite: shadowBlur is a gaussian falloff around the
        // shape's edge (visually tight), while a naive radial gradient of
        // the same numeric radius reads much bigger and, at 1000+
        // overlapping stars, washes into a solid haze. Scale it down and
        // bias glow toward closer/brighter stars only.
        const glowRadius = (1.6 * star.size + depth * depth * 2.4) * (1 + atmosphere * 0.1) + size * 0.4;
        const bucket = Math.min(GLOW_BUCKETS - 1, Math.max(0, Math.round(glowAlpha * depth * (GLOW_BUCKETS - 1))));
        const sprite = glowSprites[bucket];
        const spriteSize = glowRadius * 2;

        if (spriteSize > 1) {
          ctx.drawImage(sprite, x - spriteSize / 2, y - spriteSize / 2, spriteSize, spriteSize);
        }

        // Motion streaks: close/fast stars read as a short trail instead of
        // a static dot, which is the standard cinematic warp-speed cue.
        // Reuses the same stroke pass (no extra draw calls) and only
        // engages past a depth threshold so distant stars stay as points.
        if (depth > 0.55 && prevZ > star.z) {
          const prevK = 128 / prevZ;
          const px = star.x * prevK + cx;
          const py = star.y * prevK + cy;
          const streakAlpha = alpha * Math.min(1, (depth - 0.55) * 2.2);
          ctx.strokeStyle = 'rgba(255, 197, 112, ' + streakAlpha + ')';
          ctx.lineWidth = size * 0.5;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        ctx.fillStyle = 'rgba(255, 197, 112, ' + alpha + ')';
        ctx.beginPath();
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(frame);
    }

    function init() {
      buildGlowSprites();
      resize();
      buildStars();
      window.addEventListener('resize', () => {
        if (state.inputFocused && document.activeElement === dom.input) return;

        resize();
        buildStars();
      });
      frame();
    }

    return {
      init,
      setMeditation(active) {
        targetSpeed = active ? CONFIG.starSpeedMeditate : CONFIG.starSpeedNormal;
        targetAtmosphere = active
          ? CONFIG.starAtmosphereMeditate
          : CONFIG.starAtmosphereNormal;
      },
    };
  })();

  dom.send.addEventListener('click', sendMessage);

  dom.input.addEventListener('keydown', e => {
    markActivity();
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  dom.input.addEventListener('focus', () => {
    state.inputFocused = true;
    document.body.classList.add('inputFocused');
    markActivity();
    setTimeout(scrollToBottom, 120);
  });

  dom.input.addEventListener('blur', () => {
    state.inputFocused = false;
    document.body.classList.remove('inputFocused');
    setViewportHeight();
  });

  dom.meditationToggle.addEventListener('click', () => {
    markActivity();
    toggleMeditation();
  });

  dom.meditationToggle.addEventListener('keydown', e => {
    markActivity();
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMeditation();
    }
  });

  if (dom.rithanKeyButton) {
    dom.rithanKeyButton.addEventListener('click', () => {
      if (document.body.dataset.proximityTier === 'drift') {
        void typeBlock(
          'CREW RECORD ACCESS DENIED\\n\\nVisual archive is locked on DRIFT.\\nActivate SIGNAL or ARCHIVE at /proximity to view crew records.',
          'system'
        );
        return;
      }

      markActivity();
      presentManualPortrait('rithan');
    });
  }

  if (dom.viikaaKeyButton) {
    dom.viikaaKeyButton.addEventListener('click', () => {
      if (document.body.dataset.proximityTier === 'drift') {
        void typeBlock(
          'CREW RECORD ACCESS DENIED\\n\\nVisual archive is locked on DRIFT.\\nActivate SIGNAL or ARCHIVE at /proximity to view crew records.',
          'system'
        );
        return;
      }

      markActivity();
      presentManualPortrait('viikaa');
    });
  }

  if (dom.encryptedKeyButton) {
    dom.encryptedKeyButton.addEventListener('click', () => {
      markActivity();
      if (document.body.dataset.proximityTier === 'archive') {
        presentManualPortrait('organism');
        return;
      }
      revealEncryptedAccessNotice();
    });
  }

  if (dom.travelerFileButton) {
    dom.travelerFileButton.addEventListener('click', () => {
      openTravelerFile();
    });
  }

  if (dom.travelerFileClose) {
    dom.travelerFileClose.addEventListener('click', () => {
      closeTravelerFile();
    });
  }

  if (dom.travelerFileOverlay) {
    dom.travelerFileOverlay.addEventListener('click', (e) => {
      if (e.target === dom.travelerFileOverlay) closeTravelerFile();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dom.travelerFileOverlay && !dom.travelerFileOverlay.hidden) {
      closeTravelerFile();
    }
  });

  if (dom.travelerPortraitRegen) {
    dom.travelerPortraitRegen.addEventListener('click', () => {
      regenerateTravelerPortrait();
    });
  }

  if (dom.travelerFileForget) {
    dom.travelerFileForget.addEventListener('click', () => {
      forgetTraveler();
    });
  }

  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);

  starfield.init();
  document.body.dataset.proximityTier = 'drift';
  setCrewRecordButtonsHidden(true);
  state.visitorToken = getOrCreateVisitorToken();
  void applyProximityTier(state.visitorToken);
  setMeditationToggleLabel(false);
  boot();
});`

export const pinkNoiseWorkletScript = `class FuraiPinkNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.b0 = 0;
    this.b1 = 0;
    this.b2 = 0;
    this.b3 = 0;
    this.b4 = 0;
    this.b5 = 0;
    this.b6 = 0;
  }

  process(inputs, outputs) {
    const output = outputs[0];
    if (!output) return true;

    for (const channel of output) {
      for (let i = 0; i < channel.length; i++) {
        const w = Math.random() * 2 - 1;
        this.b0 = 0.99886 * this.b0 + w * 0.0555179;
        this.b1 = 0.99332 * this.b1 + w * 0.0750759;
        this.b2 = 0.96900 * this.b2 + w * 0.1538520;
        this.b3 = 0.86650 * this.b3 + w * 0.3104856;
        this.b4 = 0.55000 * this.b4 + w * 0.5329522;
        this.b5 = -0.7616  * this.b5 - w * 0.0168980;
        const pink = this.b0 + this.b1 + this.b2 + this.b3 + this.b4 + this.b5 + this.b6 + w * 0.5362;
        this.b6 = w * 0.115926;
        channel[i] = pink * 0.08;
      }
    }

    return true;
  }
}

registerProcessor("furai-pink-noise", FuraiPinkNoiseProcessor);
`

export const serviceWorkerScript = `const CACHE_NAME = 'furai-shell-v1';
const SHELL_ASSETS = [
  '/ai/styles.css',
  '/ai/script.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// FURAI is a live conversation — /ai (POST), /api/pay/*, and any other
// dynamic route always go straight to the network, never the cache. Only
// the static shell (styles, script, icons) is cache-first, so the app
// still opens instantly on a flaky connection while every reply and
// payment status stays live.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isShellAsset = SHELL_ASSETS.includes(url.pathname);

  if (!isShellAsset) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
`
