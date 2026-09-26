"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform vec2 uResolution;
uniform float uTime;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (uv - vec2(0.62, 0.46)) * vec2(aspect, 1.0) * 1.55;
  float t = uTime * 0.28;
  for (int i = 1; i <= 3; i++) {
    float fi = float(i);
    p.x += 0.55 / fi * sin(fi * 0.85 * p.y + t + fi * 1.4);
    p.y += 0.55 / fi * cos(fi * 0.72 * p.x - t * 0.8 + fi);
  }
  float n = sin(p.x + t * 0.4) * 0.5 + cos(p.y - t * 0.25) * 0.5;
  float band = smoothstep(-0.15, 0.85, n);
  float crest = pow(smoothstep(0.15, 1.0, n), 1.6);
  vec3 ink = vec3(0.031, 0.078, 0.055);
  vec3 moss = vec3(0.055, 0.2, 0.12);
  vec3 lime = vec3(0.776, 1.0, 0.239);
  vec3 paper = vec3(0.96, 0.98, 0.93);
  vec3 color = mix(ink, moss, band);
  float right = smoothstep(0.08, 0.82, uv.x);
  color = mix(color, lime, crest * 0.55 * right);
  color = mix(color, paper, crest * crest * 0.28 * right);
  color = mix(ink, color, right);
  gl_FragColor = vec4(color, 1.0);
}
`;

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function LiquidField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    host.appendChild(canvas);
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) {
      canvas.remove();
      return;
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERT);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vertex || !fragment) {
      canvas.remove();
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      canvas.remove();
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.remove();
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    const resolution = gl.getUniformLocation(program, "uResolution");
    const time = gl.getUniformLocation(program, "uTime");

    let frame = 0;
    let stopped = false;
    let visible = true;
    let elapsed = 0;
    let lastDraw = 0;
    const parent = canvas.parentElement ?? canvas;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const frameGap = small ? 1000 / 30 : 1000 / 60;
    const scale = small ? 0.45 : 0.6;

    const resize = () => {
      const width = Math.max(1, parent.clientWidth);
      const height = Math.max(1, parent.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const nextWidth = Math.max(1, Math.round(width * dpr * scale));
      const nextHeight = Math.max(1, Math.round(height * dpr * scale));
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      if (stopped) return;
      frame = window.requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      if (now - lastDraw < frameGap) return;
      const delta = lastDraw === 0 ? 0 : now - lastDraw;
      lastDraw = now;
      elapsed += delta;
      resize();
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, elapsed * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!canvas.dataset.ready) canvas.dataset.ready = "true";
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(parent);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    resize();
    frame = window.requestAnimationFrame(draw);

    return () => {
      stopped = true;
      window.cancelAnimationFrame(frame);
      intersection.disconnect();
      resizeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="hero-field-canvas" />;
}
