(function ($) {
  // audio.js - Gestión de efectos de sonido
  // Función para reproducir sonido de abrir panel
  function playOpenPanelSound() {
    openPanelSound.currentTime = 0;
    openPanelSound.volume = 0.6;
    openPanelSound
      .play()
      .catch((e) => console.log("Open panel sound failed:", e));
  }

  // Función para reproducir sonido de cerrar panel
  function playClosePanelSound() {
    closePanelSound.currentTime = 0;
    closePanelSound.volume = 0.6;
    closePanelSound
      .play()
      .catch((e) => console.log("Close panel sound failed:", e));
  }

  // Función para reproducir sonido de BSOD
  function playBsodSound() {
    bsodSound.volume = 0.8;
    bsodSound.currentTime = 0;
    bsodSound
      .play()
      .catch((e) => console.log("BSOD sound playback failed:", e));
  }

  // Función para reproducir música de Severance
  function playSeveranceMusic() {
    severanceMusic.volume = 0.2;
    severanceMusic.loop = false;
    severanceMusic
      .play()
      .catch((e) => console.log("Severance music playback failed:", e));
  }

  // Función para reproducir música de Wellness
  function playWellnessMusic() {
    const wellnessMusic = document.getElementById("wellnessMusic");
    wellnessMusic.volume = 0.8;
    wellnessMusic.loop = true;
    wellnessMusic.play().catch((e) => {
      console.log("Wellness music playback failed:", e);
      return false;
    });
    return true;
  }

  // Función para detener música de Wellness
  function stopWellnessMusic() {
    const wellnessMusic = document.getElementById("wellnessMusic");
    wellnessMusic.pause();
    wellnessMusic.currentTime = 0;
  }

  // Función para detener música de Severance
  function stopSeveranceMusic() {
    severanceMusic.pause();
    severanceMusic.currentTime = 0;
  }

  //Líneas de boot
  const bootLines = [
    "[ OK ] Initializing B.P.L. system core...",
    "[ OK ] Loading memory sequences: [████████████████] 100%",
    "[ OK ] Accessing encrypted protocols...",
    "[ WARN ] Low latency mode engaged...",
    "[ OK ] Booting interface modules...",
    "[ OK ] Calibration complete.",
    ">>> Launching system interface...",
  ];

  //Implementación de comandos
  // Función para agregar comando al historial
  function addToHistory(cmd) {
    if (cmd.trim() && commandHistory[commandHistory.length - 1] !== cmd) {
      commandHistory.push(cmd);
      // Mantener solo los últimos 50 comandos
      if (commandHistory.length > 50) {
        commandHistory.shift();
      }
    }
    historyIndex = commandHistory.length;
  }

  // Función para navegar por el historial
  function navigateHistory(direction) {
    if (commandHistory.length === 0) return "";

    if (direction === "up") {
      if (historyIndex > 0) {
        historyIndex--;
      }
    } else if (direction === "down") {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
      } else {
        historyIndex = commandHistory.length;
        return "";
      }
    }

    return commandHistory[historyIndex] || "";
  }

  //Funciòn Mayuscula Comandos
  function MayusCommand(str) {
    return str ? `${str[0].toUpperCase()}${str.slice(1)}` : "";
  }
  
  // Procesar comando
  function processCommand(cmdUpper, cmdParts, originalCommand) {
    let response = "";

    // Comandos especiales
    if (cmdUpper === "LUISFEL") {
      response = activateBSOD();
    } else if (cmdUpper === "REFRESH") {
      response = ">>> Reloading interface...";
      terminal.scrollTop = terminal.scrollHeight;
      setTimeout(() => location.reload(), 800);
    } else if (cmdUpper === "CLEAR") {
      const result = clearTerminal();
      inputSpan = result.newInput;
      terminalContent = result.terminalContent;
      return;
    } else if (cmdUpper === "HELP") {
      $("#command").empty();
      response = toggleHelp();
      categories = [];
      const uniqueCategories = new Set();
      $.ajax({
        url: cubeAPI.rest_url + 'posts',
        method: "GET",
        data: {
          categories: categories[0],
        },
        beforeSend: function () {
          $(".loader-commands").show();
        },
        success: function (posts) {
          posts.forEach((post) => {
            const categoryClass = post.class_list.find((p) =>
              p.startsWith("category-")
            );

            if (categoryClass) {
              const categoryName = categoryClass.replace("category-", "");

              if (!uniqueCategories.has(categoryName)) {
                uniqueCategories.add(categoryName);
              }
            }
          });

          const categoryArray = Array.from(uniqueCategories).sort();

          categoryArray.forEach((cat) => {
            $("#command").append(`<li>${MayusCommand(cat)}</li>`);
          });
        },
        error: function (xhr) {
          console.error("Error de Comandos", xhr.responseText);
        },

        complete: function () {
          $(".loader-commands").hide();
        },
      });
    } else if (cmdUpper === "AUTHOR") {
      response = showAuthorInfo();
    } else if (cmdUpper === "THEME") {
      if (cmdParts.length === 1) response = showThemes();
      else response = changeTheme(cmdParts[1].toLowerCase());
    } else if (cmdUpper === "FONTS") {
      if (cmdParts.length === 1) response = showFonts();
      else response = changeFont(cmdParts[1].toLowerCase());
    } else if (cmdUpper === "WELLNESS") {
      response = toggleWellness();
    } else if (cmdUpper === "SEVERANCE" || cmdUpper === "LUMON") {
      response = severanceActive ? stopSeverance() : activateSeverance();
    } else if (cmdUpper === "TESTGLITCH") {
      response = ">>> Testing glitch effect...";
      triggerSeveranceGlitch();
    } else {
      // Bloque de categorías ALFA → ZULU
      const categoriesList = [
        "ALFA",
        "BRAVO",
        "CHARLIE",
        "DELTA",
        "ECHO",
        "FOXTROT",
        "GOLF",
        "HOTEL",
        "INDIA",
        "JULIETT",
        "KILO",
        "LIMA",
        "MIKE",
        "NOVEMBER",
        "OSCAR",
        "PAPA",
        "QUEBEC",
        "ROMEO",
        "SIERRA",
        "TANGO",
        "UNIFORM",
        "VICTOR",
        "WHISKEY",
        "X-RAY",
        "YANKEE",
        "ZULU",
      ];

      if (categoriesList.includes(cmdUpper)) {
        response = `>>> Rotating to category: ${cmdUpper}...`;

        // 🔹 Agregamos esta línea:
        const containFiles = document.getElementById("containFiles");
        if (containFiles)
          containFiles.setAttribute("data-categories", cmdUpper);

        // Mostrar cube-wrapper solo cuando se ejecuta un comando de categoría
        const cubeWrapper = document.querySelector('.cube-wrapper');
        if (cubeWrapper) {
          cubeWrapper.style.display = 'block';
          
          // Guardar la categoría actual para usar cuando se haga clic
          cubeWrapper.setAttribute('data-current-category', cmdUpper);
        }

        if (window.cubeGalleryAPI) {
          window.cubeGalleryAPI.rotateToCategory(
            cmdUpper,
            1500,
            function ($face) {
              // Solo rotar el cubo, no abrir containFiles automáticamente
              let ids = $face.data("category-ids"); // array de IDs numéricos
              // No llamar a cargarEntradas automáticamente
            }
          );
        }
      } else {
        response = `>>> Unknown command: ${originalCommand}`;
      }
    }

    // Agregar comando al historial
    addToHistory(originalCommand);

    // Mostrar respuesta y crear nueva línea de prompt
    if (response) {
      const resp = document.createElement("div");
      resp.textContent = response;
      terminalContent.appendChild(resp);
    }

    inputSpan = createPromptLine(terminalContent);
    command = "";
  }

  // Comando Wellness - Lumon
  function toggleWellness() {
    if (wellnessActive) {
      return stopWellness();
    } else {
      return startWellness();
    }
  }

  function startWellness() {
    if (wellnessActive) {
      return ">>> Wellness session already in progress";
    }

    wellnessActive = true;

    // Configurar música de wellness
    if (!playWellnessMusic()) {
      wellnessActive = false;
      return ">>> Error: Could not start wellness session - audio blocked";
    }

    return [
      ">>> Initiating Wellness Session...",
      ">>> Please try to enjoy each listening session equally",
      ">>> Breathe deeply and focus on your work",
      ">>> Remember: Your work is mysterious and important",
      ">>> Kier would be proud of your dedication",
      ">>> Wellness session: ACTIVE",
    ].join("\n");
  }

  function stopWellness() {
    if (!wellnessActive) {
      return ">>> No active wellness session found";
    }

    wellnessActive = false;
    stopWellnessMusic();

    return [
      ">>> Terminating wellness session...",
      ">>> Thank you for participating in your wellness",
      ">>> Return to your work with renewed focus",
      ">>> Wellness session: TERMINATED",
    ].join("\n");
  }

  // Comando Severance/Lumon
  function activateSeverance() {
    if (severanceActive) {
      return ">>> SEVERANCE protocol already active";
    }

    severanceActive = true;
    console.log("Severance activado - Glitch programado para 77 segundos");

    // Configurar música
    playSeveranceMusic();

    // Programar glitch a los 77 segundos (1:17)
    glitchTimer = setTimeout(triggerSeveranceGlitch, 77000);

    return [
      ">>> SEVERANCE protocol activated...",
      ">>> Initiating Lumon Industries perceptual reality sequence",
      ">>> WARNING: Non-disclosure agreement in effect",
      ">>> Remember: Kier is always watching",
      '>>> Playing: "Main Titles" - Theodore Shapiro',
    ].join("\n");
  }

  // Detener Severance
  function stopSeverance() {
    if (!severanceActive) return;

    severanceActive = false;
    stopSeveranceMusic();

    if (glitchTimer) {
      clearTimeout(glitchTimer);
      glitchTimer = null;
    }

    return ">>> SEVERANCE protocol terminated";
  }

  // Efectos visuales
  // Función para activar la Blue Screen of Death (BSOD)
  function activateBSOD() {
    // Reproducir sonido de BSOD
    playBsodSound();

    // Crear overlay de BSOD
    const bsodOverlay = document.createElement("div");
    bsodOverlay.id = "bsodOverlay";
    bsodOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0078D7;
    color: white;
    font-family: 'Segoe UI', system-ui, sans-serif;
    z-index: 100000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px;
    cursor: default;
  `;

    // Contenido de la BSOD
    bsodOverlay.innerHTML = `
    <div style="font-size: 120px; font-weight: bold; margin-bottom: 30px;">:-(</div>
    <div style="font-size: 24px; margin-bottom: 20px; max-width: 600px;">
      Your B.P.L. system ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.
    </div>
    <div style="font-size: 16px; margin-bottom: 30px; max-width: 600px;">
      ${Math.floor(Math.random() * 100)}% complete
    </div>
    <div style="font-size: 14px; color: #E6E6E6; max-width: 600px; line-height: 1.5;">
      If you'd like to know more, you can search online later for this error: <strong>LUISFEL_CRITICAL_FAILURE</strong><br><br>
      <div style="margin-top: 20px; font-size: 12px;">
        Stop code: SYSTEM_THREAD_EXCEPTION_NOT_HANDLED<br>
        What failed: BPL_TERMINAL.sys
      </div>
    </div>
    <div style="position: absolute; bottom: 40px; width: 100%; text-align: center;">
      <div style="display: inline-block; background: rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 4px; font-size: 12px;">
        QR code to more information: ██████████
      </div>
    </div>
  `;

    // Agregar al documento
    document.body.appendChild(bsodOverlay);

    // Efecto de progreso
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);

        // Reiniciar después de completar
        setTimeout(() => {
          bsodOverlay.innerHTML = `
          <div style="font-size: 24px; margin-bottom: 20px;">Restarting...</div>
          <div style="font-size: 16px; margin-bottom: 30px;">Please wait while we prepare your system</div>
          <div style="width: 300px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; overflow: hidden;">
            <div style="width: 100%; height: 100%; background: white; animation: restartProgress 2s linear;"></div>
          </div>
          <style>
            @keyframes restartProgress {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(0); }
            }
          </style>
        `;

          setTimeout(() => {
            location.reload();
          }, 2500);
        }, 1500);
      }

      const progressElement = bsodOverlay.querySelector("div:nth-child(3)");
      if (progressElement) {
        progressElement.textContent = `${Math.min(
          Math.floor(progress),
          100
        )}% complete`;
      }
    }, 100);

    // Prevenir cualquier interacción
    document.body.style.overflow = "hidden";

    return ">>> Initiating critical system failure sequence...";
  }

  // Efecto glitch de Severance
  function triggerSeveranceGlitch() {
    if (!severanceActive) {
      console.log("Severance no está activo");
      return;
    }

    console.log("Activando glitch de Severance...");

    // Aplicar al body directamente
    document.body.classList.add("glitch-active-body");

    console.log("Glitch activado en body");

    // Remover después de la animación
    setTimeout(() => {
      document.body.classList.remove("glitch-active-body");
      console.log("Glitch removido");
    }, 2000);
  }

  // Función para abrir containFiles cuando se hace clic en el cube-wrapper
  function openContainFilesOnCubeClick() {
    const cubeWrapper = document.querySelector('.cube-wrapper');
    const containFiles = document.getElementById('containFiles');
    
    if (cubeWrapper && containFiles) {
      cubeWrapper.addEventListener('click', function() {
        const currentCategory = this.getAttribute('data-current-category');
        if (currentCategory) {
          // Actualizar la categoría en containFiles
          containFiles.setAttribute("data-categories", currentCategory);
          
          // Abrir containFiles
          containFiles.classList.add("visible");
          playOpenPanelSound();
          
          // Cargar las entradas de la categoría actual
          if (window.cubeGalleryAPI && window.cargarEntradas) {
            // Obtener la cara actual del cubo para esa categoría
            const $face = window.cubeGalleryAPI.getFaceByCategory(currentCategory);
            if ($face) {
              let ids = $face.data("category-ids");
              window.cargarEntradas(ids, true);
            }
          }
        }
      });
    }
  }

  //Lógica principal de inicialización
  // Variables globales
  let severanceActive = false;
  let wellnessActive = false;
  let glitchTimer = null;
  let commandHistory = [];
  let historyIndex = 0;
  let pendingChime = false;

  // Elementos DOM globales
  const bootContainer = document.getElementById("bootLog");
  const chime = document.getElementById("startupChime");
  const clickSound = document.getElementById("clickSound");
  const backgroundHum = document.getElementById("backgroundHum");
  const randomBeep = document.getElementById("randomBeep");
  const severanceMusic = document.getElementById("severanceMusic");
  const commandNotes = document.getElementById("commandNotes");
  const containFiles = document.getElementById("containFiles");
  const severanceGlitch = document.getElementById("severanceGlitch");
  const openPanelSound = document.getElementById("openPanelSound");
  const closePanelSound = document.getElementById("closePanelSound");
  const bsodSound = document.getElementById("bsodSound");

  // Inicialización al cargar la página
  document.addEventListener("DOMContentLoaded", function () {
    // Ocultar cube-wrapper inicialmente
    const cubeWrapper = document.querySelector('.cube-wrapper');
    if (cubeWrapper) {
      cubeWrapper.style.display = 'none';
    }

    // Configurar el evento de clic para cube-wrapper
    openContainFilesOnCubeClick();

    // Animación de boot
    bootLines.forEach((line, index) => {
      const el = document.createElement("div");
      el.classList.add("boot-line");
      el.textContent = line;
      el.style.animationDelay = `${index * 0.2}s`;
      bootContainer.appendChild(el);
    });

    // Configurar temporizadores de sonido
    setTimeout(tryPlayChime, 4200);
    setTimeout(() => {
      startBackgroundHum();
      playRandomBeep();
    }, 7800);

    // Inicializar terminal cuando se muestre
    setTimeout(() => {
      document.getElementById("intro").style.display = "none";
      document.getElementById("terminal").style.display = "block";
      document.getElementById("terminal").classList.add("crt-text");
      commandNotes.classList.add("crt-text");

      // Inicializar estructura del terminal
      initializeTerminal();
    }, 7800);

    // Evento para cerrar containFiles al hacer clic fuera
    document.addEventListener('click', function(event) {
      const containFiles = document.getElementById('containFiles');
      const cubeWrapper = document.querySelector('.cube-wrapper');
      
      if (containFiles && containFiles.classList.contains('visible')) {
        // Verificar si el clic fue fuera de containFiles y fuera del cube-wrapper
        if (!containFiles.contains(event.target) && !cubeWrapper.contains(event.target)) {
          containFiles.classList.remove("visible");
          playClosePanelSound();
        }
      }
    });
  });

  // Función para reproducir chime de inicio
  function tryPlayChime() {
    chime.volume = 0.9;
    const playPromise = chime.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => (pendingChime = true));
    }
  }

  // Función para iniciar sonido de fondo
  function startBackgroundHum() {
    backgroundHum.volume = 0.2;
    backgroundHum.loop = true;
    const playPromise = backgroundHum.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log(
          "Background hum playback failed, will retry on user interaction"
        );
      });
    }
  }

  // Función para reproducir sonido aleatorio
  function playRandomBeep() {
    const randomTime = Math.random() * 45000 + 75000;
    setTimeout(() => {
      if (randomBeep && randomBeep.readyState >= 2) {
        randomBeep.volume = 0.2;
        randomBeep.currentTime = 0;
        const playPromise = randomBeep.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Random beep playback failed:", error);
          });
        }
      }
      playRandomBeep();
    }, randomTime);
  }

  // Evento de clic global
  document.body.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.volume = 0.4;
    clickSound.play().catch(() => {});

    if (backgroundHum.paused) {
      startBackgroundHum();
    }

    if (pendingChime) {
      pendingChime = false;
      chime.currentTime = 0;
      chime.play().catch(() => {});
    }
  });

  // terminal.js - Funcionalidad del terminal

  const PROMPT = "BPL> ";
  let command = "";
  let helpVisible = false;
  let filesVisible = false;
  let terminalContent;
  let inputSpan;

  // Inicializar terminal
  function initializeTerminal() {
    // Construir estructura completa del terminal
    terminalContent = buildTerminalStructure();
    // Crear primera línea de prompt
    inputSpan = createPromptLine(terminalContent);
  }

  // Construir estructura del terminal
  function buildTerminalStructure() {
    // Limpiar terminal completamente
    terminal.innerHTML = "";

    // Crear contenedor principal
    const terminalContent = document.createElement("div");
    terminalContent.className = "terminal-content";

    // Crear header del terminal
    const header = document.createElement("div");
    header.className = "terminal-header";
    header.innerHTML = `
    <div class="title">B.P.L. Project [Version 1.0.20251020]</div>
    <div class="subtitle">Escribe 'help' para ver la lista de comandos</div>
  `;

    // Agregar header al contenido
    terminalContent.appendChild(header);

    // Agregar contenedor de contenido al terminal
    terminal.appendChild(terminalContent);

    return terminalContent;
  }

  // Crear línea de prompt
  function createPromptLine(terminalContent) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.innerHTML = `<span class="prompt">${PROMPT}</span><span class="input-span"></span><span class="blinker">█</span>`;
    terminalContent.appendChild(line);

    // Scroll al final
    setTimeout(() => {
      terminal.scrollTop = terminal.scrollHeight;
    }, 0);

    return line.querySelector(".input-span");
  }

  // Limpiar terminal
  function clearTerminal() {
    terminal.classList.add("reboot-glow");
    setTimeout(() => terminal.classList.remove("reboot-glow"), 500);

    // Reconstruir toda la estructura desde cero
    const terminalContent = buildTerminalStructure();
    command = "";

    const newInput = createPromptLine(terminalContent);

    return { newInput, terminalContent };
  }

  // Alternar panel de ayuda
  function toggleHelp() {
    helpVisible = !helpVisible;
    if (helpVisible) {
      commandNotes.classList.add("visible");
      playOpenPanelSound();
      return ">>> Command notes panel: ENABLED";
    } else {
      commandNotes.classList.remove("visible");
      playClosePanelSound();
      return ">>> Command notes panel: DISABLED";
    }
  }

  // Alternar gestor de archivos
  function toggleFiles() {
    filesVisible = !filesVisible;
    if (filesVisible) {
      containFiles.classList.add("visible");
      playOpenPanelSound();
      return ">>> File manager: ENABLED";
    } else {
      containFiles.classList.remove("visible");
      playClosePanelSound();
      return ">>> File manager: DISABLED";
    }
  }

  // Mostrar información del autor
  function showAuthorInfo() {
    return [
      ">>> B.P.L. Project - Development Team",
      ">>> ==============================================",
      ">>> ",
      ">>> Equipo: Ratitas de Compu",
      ">>> Miembros:",
      ">>> • Ange Velo",
      ">>> • Tomas Contreras",
      ">>> • Valentina Tapia",
      ">>> • Gustavo Alringo",
      ">>> ",
      ">>> Esperamos que disfrutez de esta experiencia",
      ">>> y que hayas encontrado algún plugin o librería",
      ">>> útil o interesante para tus proyectos.",
      ">>> ",
      ">>> ¡Gracias por usar B.P.L.!",
    ].join("\n");
  }

  // Manejar entrada del teclado
  document.addEventListener("keydown", (e) => {
    if (getComputedStyle(terminal).display === "none") return;

    if (e.key === "Backspace") {
      e.preventDefault();
      command = command.slice(0, -1);
    } else if (e.key === "Enter") {
      e.preventDefault();

      // Si el contenedor de archivos está visible, se cierra
      if ($("#containFiles").hasClass("visible")) {
        $("#containFiles").removeClass("visible");
      }

      const line = inputSpan.parentElement;

      // Si está vacío: borra la línea actual y crea una nueva (sin duplicar)
      if (!command.trim()) {
        line.remove();
        command = "";
        inputSpan = createPromptLine(terminalContent);
        return; // <- importante: no sigue ejecutando
      }

      // Mostrar el comando ejecutado
      line.innerHTML = `<span class="prompt">${PROMPT}</span><span class="cmd">${command}</span>`;

      const cmdParts = command.trim().split(" ");
      const cmdUpper = cmdParts[0].toUpperCase();

      // Procesar comando
      processCommand(cmdUpper, cmdParts, command);

      // IMPORTANTE: no crear otra línea aquí si processCommand ya lo hace
      // Si no la crea, descomenta la siguiente línea:
      // inputSpan = createPromptLine(terminalContent);

      command = "";
      return;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      // Navegar hacia arriba en el historial
      const previousCommand = navigateHistory("up");
      command = previousCommand;
      inputSpan.textContent = command;
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      // Navegar hacia abajo en el historial
      const nextCommand = navigateHistory("down");
      command = nextCommand;
      inputSpan.textContent = command;
    } else if (e.key.length === 1) {
      command += e.key;
      // Resetear el índice del historial cuando se escribe un nuevo comando
      historyIndex = commandHistory.length;
    }

    inputSpan.textContent = command;
    terminal.scrollTop = terminal.scrollHeight;
  });

  // themes.js - Gestión de temas y fuentes

  // Temas disponibles
  const themes = {
    default: {
      "--bg-color": "#08203A",
      "--text-color": "#8EE3F1",
      "--accent-color": "#6BC5D8",
      "--border-color": "#8EE3F1",
      "--panel-bg": "rgba(5, 25, 45, 0.7)",
      "--glow-color": "#8EE3F1",
    },
    matrix: {
      "--bg-color": "#001100",
      "--text-color": "#00FF41",
      "--accent-color": "#008F11",
      "--border-color": "#00FF41",
      "--panel-bg": "rgba(0, 20, 0, 0.7)",
      "--glow-color": "#00FF41",
    },
    amber: {
      "--bg-color": "#1A0F00",
      "--text-color": "#FF8C00",
      "--accent-color": "#CC7000",
      "--border-color": "#FF8C00",
      "--panel-bg": "rgba(30, 15, 0, 0.7)",
      "--glow-color": "#FF8C00",
    },
    purple: {
      "--bg-color": "#1A002B",
      "--text-color": "#BF40BF",
      "--accent-color": "#9C27B0",
      "--border-color": "#BF40BF",
      "--panel-bg": "rgba(25, 0, 40, 0.7)",
      "--glow-color": "#BF40BF",
    },
    red: {
      "--bg-color": "#2A0000",
      "--text-color": "#FF4444",
      "--accent-color": "#CC0000",
      "--border-color": "#FF4444",
      "--panel-bg": "rgba(40, 0, 0, 0.7)",
      "--glow-color": "#FF4444",
    },
    blue: {
      "--bg-color": "#001F3F",
      "--text-color": "#7FDBFF",
      "--accent-color": "#39CCCC",
      "--border-color": "#7FDBFF",
      "--panel-bg": "rgba(0, 25, 50, 0.7)",
      "--glow-color": "#7FDBFF",
    },
    gray: {
      "--bg-color": "#1A1A1A",
      "--text-color": "#CCCCCC",
      "--accent-color": "#999999",
      "--border-color": "#CCCCCC",
      "--panel-bg": "rgba(30, 30, 30, 0.7)",
      "--glow-color": "#CCCCCC",
    },
  };

  // Fuentes disponibles con números y descripciones
  const fonts = [
    {
      id: "share-tech",
      name: "Share Tech Mono",
      desc: "Clásica terminal retro",
    },
    { id: "kode-mono", name: "Kode Mono", desc: "Moderno y legible" },
    { id: "orbitron", name: "Orbitron", desc: "Futurista espacial" },
    { id: "vt323", name: "VT323", desc: "Auténtica terminal vintage" },
    {
      id: "source-code",
      name: "Source Code Pro",
      desc: "Profesional y limpia",
    },
    {
      id: "courier-prime",
      name: "Courier Prime",
      desc: "Clásica tipo máquina de escribir",
    },
    {
      id: "jetbrains-mono",
      name: "JetBrains Mono",
      desc: "Programación moderna",
    },
  ];

  // Cambiar tema
  function changeTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) {
      return `>>> Error: Tema '${themeName}' no encontrado. Temas disponibles: ${Object.keys(
        themes
      ).join(", ")}`;
    }
    const root = document.documentElement;
    for (const [property, value] of Object.entries(theme)) {
      root.style.setProperty(property, value);
    }
    return `>>> Tema cambiado a: ${themeName.toUpperCase()}`;
  }

  // Cambiar fuente
  function changeFont(fontInput) {
    let font;

    // Verificar si es un número
    if (!isNaN(fontInput)) {
      const fontIndex = parseInt(fontInput) - 1;
      if (fontIndex >= 0 && fontIndex < fonts.length) {
        font = fonts[fontIndex];
      } else {
        return `>>> Error: Número de fuente '${fontInput}' no válido. Use FONTS para ver la lista.`;
      }
    } else {
      // Buscar por nombre
      font = fonts.find((f) => f.id === fontInput.toLowerCase());
      if (!font) {
        return `>>> Error: Fuente '${fontInput}' no encontrada. Use FONTS para ver la lista.`;
      }
    }

    // Aplicar la fuente al body
    document.body.style.fontFamily = `${font.name}, monospace`;

    // Aplicar la fuente a la terminal
    const terminal = document.getElementById("terminal");
    terminal.style.fontFamily = `${font.name}, monospace`;

    // Aplicar la fuente al panel de comandos
    const commandNotes = document.getElementById("commandNotes");
    commandNotes.style.fontFamily = `${font.name}, monospace`;

    return `>>> Fuente cambiada a: ${font.name} - ${font.desc}`;
  }

  // Mostrar lista de temas
  function showThemes() {
    return [
      ">>> Temas disponibles:",
      ">>> ===================",
      ">>> ",
      ...Object.keys(themes).map((theme) => `>>> • ${theme.toUpperCase()}`),
      ">>> ",
      ">>> Usa: THEME [nombre_del_tema]",
      ">>> Ejemplo: THEME MATRIX",
    ].join("\n");
  }

  // Mostrar lista de fuentes
  function showFonts() {
    return [
      ">>> Fuentes disponibles:",
      ">>> ====================",
      ">>> ",
      ...fonts.map(
        (font, index) => `>>> ${index + 1}. ${font.name} - ${font.desc}`
      ),
      ">>> ",
      ">>> Usa: FONTS [número_o_nombre]",
      ">>> Ejemplo: FONTS 3  o  FONTS ORBITRON",
    ].join("\n");
  }
})(jQuery);