(function () {
  const star = `<svg viewBox="-100 -100 200 200" aria-hidden="true"><g fill="currentColor" stroke="currentColor" stroke-width="0.5" stroke-linejoin="round">${[0, 90, 180, 270].map((a) => `<polygon points="0,18 13,75 0,99 -13,75" transform="rotate(${a})"></polygon>`).join("")}${[45, 135, 225, 315].map((a) => `<polygon points="0,18 10,60 0,81 -10,60" transform="rotate(${a})"></polygon>`).join("")}${[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((a) => `<polygon points="0,18 6,54 0,68 -6,54" transform="rotate(${a})"></polygon>`).join("")}</g></svg>`;
  document.querySelectorAll("[data-star]").forEach((el) => {
    el.outerHTML = star.replace("<svg ", `<svg class="${el.className || "star"}" `);
  });

  const root = document.body.dataset.root || "";
  const canvas = document.getElementById("plasma");
  const themeBtn = document.querySelectorAll("[data-theme-toggle]");
  const svc = document.querySelector("[data-services]");
  const burger = document.querySelector("[data-burger]");
  const panel = document.querySelector("[data-panel]");

  function applyTheme(light) {
    document.documentElement.toggleAttribute("data-theme", light);
    if (light) document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    themeBtn.forEach((btn) => {
      btn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
      btn.innerHTML = light ? moon() : sun();
    });
    try { localStorage.setItem("zc-theme", light ? "light" : "dark"); } catch (e) {}
  }

  themeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyTheme(!document.documentElement.hasAttribute("data-theme") || document.documentElement.getAttribute("data-theme") !== "light");
    });
  });
  applyTheme((() => { try { return localStorage.getItem("zc-theme") === "light"; } catch (e) { return false; } })());

  if (svc) {
    const button = svc.querySelector("button");
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = svc.classList.toggle("open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  if (burger && panel) {
    burger.addEventListener("click", () => {
      const open = burger.classList.toggle("open");
      panel.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("open");
        panel.classList.remove("open");
      });
    });
  }

  document.addEventListener("click", () => {
    if (svc) {
      svc.classList.remove("open");
      svc.querySelector("button").setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (svc) svc.classList.remove("open");
      if (burger) burger.classList.remove("open");
      if (panel) panel.classList.remove("open");
    }
  });

  document.querySelectorAll("[data-home]").forEach((el) => {
    el.addEventListener("click", (event) => {
      if (location.pathname.endsWith("index.html") || location.pathname.endsWith("/")) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        location.href = root + "index.html";
      }
    });
  });

  if (canvas && !matchMedia("(prefers-reduced-motion: reduce)").matches) startPlasma(canvas);

  function startPlasma(canvas) {
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}");
    gl.compileShader(vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, `
      precision mediump float;
      uniform vec2 r;
      uniform float t;
      uniform float light;
      void main(){
        vec2 uv=gl_FragCoord.xy/r;
        vec2 p=(gl_FragCoord.xy-.5*r)/min(r.x,r.y);
        float time=t*.07;
        vec2 q=p;
        for(int i=0;i<4;i++){
          float f=float(i);
          q+=vec2(sin(q.y*(1.5+f)+time*(1.+f*.25))*.42, cos(q.x*(1.3+f)-time*(.85+f*.2))*.42);
        }
        float v=sin(q.x*1.5+q.y*1.15)*.5+.5;
        float ridge=pow(abs(sin(q.x*2.1-q.y*1.35+time)),2.4);
        vec3 col=mix(vec3(0.,.01,.02), vec3(0.,.045,.07), v);
        col=mix(col, vec3(0.,.2,.28), ridge*.75);
        float vig=smoothstep(1.2,.2,length(uv-.5)*1.4);
        col*=mix(.42,1.,vig);
        if(light>.5){
          vec3 paper=vec3(.94,.96,.97);
          col=mix(paper, vec3(.72,.86,.9), ridge*.5+v*.22);
          col*=mix(.92,1.,vig);
        }
        gl_FragColor=vec4(col,1.);
      }`);
    gl.compileShader(fs);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");
    const uL = gl.getUniformLocation(prog, "light");
    const start = performance.now();
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    addEventListener("resize", resize);
    resize();
    (function frame(now) {
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform1f(uL, document.documentElement.getAttribute("data-theme") === "light" ? 1 : 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(frame);
    })(start);
  }

  function sun() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  }
  function moon() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z"/></svg>';
  }
})();
