import{s as e,t}from"./hooks.module.CLYv91Ax.js";import{t as n}from"./jsxRuntime.module.BzWfOhxj.js";import"./compat.module.Bl0V96WU.js";var r=`#version 300 es
precision highp float;
in vec2 aPoint;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uFrame;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;
uniform float uCount;
uniform float uThickness;
uniform float uSoftness;
uniform float uWaves;
uniform float uSplit;
uniform float uFray;
uniform float uSeed;
uniform vec2 uTurn;
uniform vec4 uPart;
uniform float uTaper;
out float vEdge;
out float vBand;
out float vDraw;
out float vAlpha;
out float vIndex;

float Perlin2D(vec2 P) {
  vec2 Pi = floor(P);
  vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
  vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
  Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
  Pt += vec2(26.0, 161.0).xyxy;
  Pt *= Pt;
  Pt = Pt.xzxz * Pt.yyww;
  vec4 hash_x = fract(Pt * (1.0 / 951.135664));
  vec4 hash_y = fract(Pt * (1.0 / 642.949883));
  vec4 grad_x = hash_x - 0.49999;
  vec4 grad_y = hash_y - 0.49999;
  vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y) * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
  grad_results *= 1.4142135623730950;
  vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
  vec4 blend2 = vec4(blend, vec2(1.0 - blend));
  return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

void main() {
  float perc = float(gl_InstanceID) / uCount;
  float x = aPoint.x;
  float pixel = 1.0 / max(uResolution.x, uResolution.y);
  float splitPoint = uSplit + perc * uFray;
  float amplitudeNormal = smoothstep(splitPoint, max(0.7, splitPoint + 0.2), x);
  float finalAmplitude = amplitudeNormal * 0.5 * uAmplitude * (1.0 + (uMouse.y - 0.5) * 0.2);
  float timeScaled = uTime / 10.0 + (uMouse.x - 0.5);
  float blur = smoothstep(splitPoint, splitPoint + 0.05, x) * perc;
  float xnoise = mix(
    Perlin2D(vec2(timeScaled * 2.5 + uSeed, (x * uWaves + perc) * 2.5)),
    Perlin2D(vec2(timeScaled * 3.5 + uSeed, (x * uWaves + timeScaled) * 3.5)) / 1.5,
    x * 0.3
  );
  float y = 0.5 + (perc - 0.5) * uDistance + xnoise / 2.0 * finalAmplitude;
  vec2 local = vec2((x - 0.5) * uFrame.x, (y - 0.5) * uFrame.y);
  if (uPart.z > 0.0) {
    vec2 delta = local - uPart.xy;
    float reach = uPart.w;
    float pull = exp(-dot(delta, delta) / (reach * reach));
    local.y += delta.y * pull * uPart.z;
  }
  float width = 7.0 * uThickness * pixel * (1.0 - perc);
  float band = (width / 2.0 + 10.0 * uSoftness * pixel * blur) * uFrame.y;
  float draw = max(band, 1.0);
  local.y += aPoint.y * draw;
  vec2 turned = vec2(local.x * uTurn.x - local.y * uTurn.y, local.x * uTurn.y + local.y * uTurn.x);
  gl_Position = vec4(turned / (uResolution * 0.5), 0.0, 1.0);
  vEdge = aPoint.y * draw;
  vBand = band;
  vDraw = draw;
  vAlpha = 1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3)) * uTaper;
  vIndex = perc;
}`,i=`#version 300 es
precision highp float;
in float vEdge;
in float vBand;
in float vDraw;
in float vAlpha;
in float vIndex;
uniform vec3 uColor;
uniform vec3 uAccent;
out vec4 outColor;
void main() {
  float coverage = (1.0 - smoothstep(0.0, vDraw, abs(vEdge))) * (vBand / vDraw) * vAlpha;
  outColor = vec4(mix(uColor, uAccent, vIndex) * coverage, coverage);
}`,a=`#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,o=`#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uLines;
uniform vec2 uResolution;
uniform float uFade;
uniform float uOpacity;
uniform float uCurve;
out vec4 outColor;

float smootherstep(float edge, float x) {
  float t = clamp(x / edge, 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void main() {
  vec4 lines = texture(uLines, vUv);
  float alpha = lines.a;
  vec3 color = alpha > 0.0001 ? lines.rgb / alpha : vec3(0.0);
  float mask = uOpacity;
  if (uFade > 0.0) {
    vec2 px = vUv * uResolution;
    float edge = uFade * min(uResolution.x, uResolution.y) * 0.5;
    mask *= smootherstep(edge, px.x) * smootherstep(edge, uResolution.x - px.x);
    mask *= smootherstep(edge, px.y) * smootherstep(edge, uResolution.y - px.y);
  }
  outColor = vec4(color * pow(alpha, uCurve), alpha) * mask;
}`,s=1920,c=(e,t,n)=>Math.min(n,Math.max(t,e)),l=(e,t,n)=>{let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null},u=(e,t,n)=>{let r=l(e,e.VERTEX_SHADER,t),i=l(e,e.FRAGMENT_SHADER,n),a=e.createProgram();return!r||!i||!a?null:(e.attachShader(a,r),e.attachShader(a,i),e.linkProgram(a),e.deleteShader(r),e.deleteShader(i),e.getProgramParameter(a,e.LINK_STATUS)?a:(e.deleteProgram(a),null))},d=(e,t,n)=>{let r={};for(let i of n)r[i]=e.getUniformLocation(t,i);return r},f=({color:l=[1,1,1],accentColor:f,amplitude:p=1.7,distance:m=.4,enableMouseInteraction:h=!1,lineCount:g=90,thickness:_=.6,softness:v=1.3,speed:y=.6,waves:b=1.05,split:x=.04,fray:S=.5,angle:C=25,seed:w=0,parting:T=0,taper:E=.85,brightness:D=1.4,fade:O=0,opacity:k=1,paused:A=!1,...j})=>{let M=t(null),N=t(null),P=t(null),F={color:l,accentColor:f,colorKey:`${Array.isArray(l)?l.join(`,`):String(l)}|${Array.isArray(f)?f.join(`,`):String(f??``)}`,amplitude:p,distance:m,enableMouseInteraction:h,lineCount:c(Math.round(g),1,400),thickness:Math.max(0,_),softness:Math.max(0,v),speed:y,waves:Math.max(0,b),split:c(x,0,1),fray:c(S,0,1),angle:C,seed:w,parting:c(T,0,1),taper:c(E,0,1),brightness:c(D,.25,2),fade:c(O,0,1),opacity:c(k,0,1),paused:A},I=t(F);I.current=F,e(()=>{let e=M.current,t=N.current,n=t?.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!e||!t||!n)return;let l=u(n,r,i),f=u(n,a,o);if(!l||!f)return;let p=d(n,l,[`uTime`,`uResolution`,`uFrame`,`uAmplitude`,`uDistance`,`uMouse`,`uCount`,`uThickness`,`uSoftness`,`uWaves`,`uSplit`,`uFray`,`uSeed`,`uTurn`,`uPart`,`uTaper`,`uColor`,`uAccent`]),m=d(n,f,[`uLines`,`uResolution`,`uFade`,`uOpacity`,`uCurve`]),h=n.createVertexArray(),g=n.createBuffer();n.bindVertexArray(h),n.bindBuffer(n.ARRAY_BUFFER,g);let _=n.getAttribLocation(l,`aPoint`);n.enableVertexAttribArray(_),n.vertexAttribPointer(_,2,n.FLOAT,!1,0,0);let v=n.createVertexArray(),y=n.createBuffer();n.bindVertexArray(v),n.bindBuffer(n.ARRAY_BUFFER,y),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let b=n.getAttribLocation(f,`aPosition`);n.enableVertexAttribArray(b),n.vertexAttribPointer(b,2,n.FLOAT,!1,0,0),n.bindVertexArray(null);let x=n.createTexture(),S=n.createFramebuffer();n.bindTexture(n.TEXTURE_2D,x),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE);let C=document.createElement(`canvas`);C.width=1,C.height=1;let w=C.getContext(`2d`,{willReadFrequently:!0}),T=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1,E={time:0,width:1,height:1,segments:0,colorKey:``,color:[1,1,1],accent:[1,1,1],mouse:[.5,.5],targetMouse:[.5,.5],pointer:[0,0],targetPointer:[0,0],presence:0,inside:!1},D=0,O=0,k=!0,A=!0,j=e=>{if(Array.isArray(e))return[0,1,2].map(t=>c(Number(e[t]??1),0,1));if(!w)return[1,1,1];w.clearRect(0,0,1,1),w.fillStyle=`#ffffff`,w.fillStyle=String(e),w.fillRect(0,0,1,1);let[t,n,r]=w.getImageData(0,0,1,1).data;return[t/255,n/255,r/255]},F=e=>{e.colorKey!==E.colorKey&&(E.colorKey=e.colorKey,E.color=j(e.color),E.accent=e.accentColor===void 0||e.accentColor===null?E.color:j(e.accentColor))},L=e=>{if(e===E.segments)return;E.segments=e;let t=new Float32Array((e+1)*4);for(let n=0;n<=e;n++){let r=n/e;t.set([r,-1,r,1],n*4)}n.bindBuffer(n.ARRAY_BUFFER,g),n.bufferData(n.ARRAY_BUFFER,t,n.STATIC_DRAW)},R=()=>{let r=Math.max(1,e.clientWidth),i=Math.max(1,e.clientHeight),a=Math.min(window.devicePixelRatio||1,2),o=Math.max(r,i)*a,l=o>s?a*s/o:a;t.width=Math.max(1,Math.round(r*l)),t.height=Math.max(1,Math.round(i*l)),E.width=r,E.height=i,n.bindTexture(n.TEXTURE_2D,x),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,t.width,t.height,0,n.RGBA,n.UNSIGNED_BYTE,null),n.bindFramebuffer(n.FRAMEBUFFER,S),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,x,0),n.bindFramebuffer(n.FRAMEBUFFER,null),L(c(Math.round(r/3),96,640)),z()},z=()=>{let e=I.current;F(e);let r=t.width,i=t.height,a=e.angle*Math.PI/180,o=Math.cos(a),s=Math.sin(a),c=Math.abs(r*o)+Math.abs(i*s),u=Math.abs(r*s)+Math.abs(i*o),d=r/E.width,g=e.enableMouseInteraction?E.mouse:[.5,.5],_=e.parting*E.presence*2,y=E.pointer[0]*d,b=E.pointer[1]*d,C=[y*o+b*s,-y*s+b*o];n.bindFramebuffer(n.FRAMEBUFFER,S),n.viewport(0,0,r,i),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.enable(n.BLEND),n.blendFunc(n.ONE,n.ONE_MINUS_SRC_ALPHA),n.useProgram(l),n.uniform1f(p.uTime,E.time),n.uniform2f(p.uResolution,r,i),n.uniform2f(p.uFrame,c,u),n.uniform1f(p.uAmplitude,e.amplitude),n.uniform1f(p.uDistance,e.distance),n.uniform2f(p.uMouse,g[0],g[1]),n.uniform1f(p.uCount,e.lineCount),n.uniform1f(p.uThickness,e.thickness),n.uniform1f(p.uSoftness,e.softness),n.uniform1f(p.uWaves,e.waves),n.uniform1f(p.uSplit,e.split),n.uniform1f(p.uFray,e.fray),n.uniform1f(p.uSeed,e.seed*13.37),n.uniform2f(p.uTurn,o,s),n.uniform4f(p.uPart,C[0],C[1],_,Math.min(r,i)*.16),n.uniform1f(p.uTaper,e.taper),n.uniform3f(p.uColor,E.color[0],E.color[1],E.color[2]),n.uniform3f(p.uAccent,E.accent[0],E.accent[1],E.accent[2]),n.bindVertexArray(h),n.drawArraysInstanced(n.TRIANGLE_STRIP,0,(E.segments+1)*2,e.lineCount),n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,r,i),n.disable(n.BLEND),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(f),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,x),n.uniform1i(m.uLines,0),n.uniform2f(m.uResolution,r,i),n.uniform1f(m.uFade,e.fade),n.uniform1f(m.uOpacity,e.opacity),n.uniform1f(m.uCurve,2/e.brightness),n.bindVertexArray(v),n.drawArrays(n.TRIANGLES,0,3),n.bindVertexArray(null)},B=e=>{if(D=0,!A||!k||document.hidden)return;let t=I.current,n=O?Math.min(.05,(e-O)/1e3):1/60;O=e;let r=!t.paused&&!T;r&&(E.time+=n*t.speed);let i=1-Math.exp(-n*3);E.mouse[0]+=(E.targetMouse[0]-E.mouse[0])*i,E.mouse[1]+=(E.targetMouse[1]-E.mouse[1])*i;let a=1-Math.exp(-n*10);E.pointer[0]+=(E.targetPointer[0]-E.pointer[0])*a,E.pointer[1]+=(E.targetPointer[1]-E.pointer[1])*a,E.presence+=((E.inside&&t.parting>0?1:0)-E.presence)*(1-Math.exp(-n*4)),z();let o=Math.abs(E.targetMouse[0]-E.mouse[0])>5e-4||Math.abs(E.targetMouse[1]-E.mouse[1])>5e-4||Math.abs(E.targetPointer[0]-E.pointer[0])>.05||Math.abs(E.targetPointer[1]-E.pointer[1])>.05||Math.abs((E.inside&&t.parting>0?1:0)-E.presence)>.002;r||o?D=requestAnimationFrame(B):O=0},V=()=>{!D&&A&&k&&!document.hidden&&(D=requestAnimationFrame(B))},H=t=>{let n=e.getBoundingClientRect(),r=(t.clientX-n.left)/Math.max(1,n.width),i=(t.clientY-n.top)/Math.max(1,n.height),a=r>=0&&r<=1&&i>=0&&i<=1;a?(E.targetMouse=[r,1-i],E.targetPointer=[t.clientX-n.left-n.width/2,n.height/2-(t.clientY-n.top)],!E.inside&&E.presence<.01&&(E.pointer=[...E.targetPointer])):E.inside&&(E.targetMouse=[.5,.5]),E.inside=a,V()},U=()=>{E.inside=!1,E.targetMouse=[.5,.5],V()},W=()=>{O=0,V()},G=new ResizeObserver(R);G.observe(e);let K=new IntersectionObserver(e=>{k=e.some(e=>e.isIntersecting),k&&(O=0,V())});return K.observe(e),window.addEventListener(`pointermove`,H,{passive:!0}),document.documentElement.addEventListener(`pointerleave`,U),document.addEventListener(`visibilitychange`,W),R(),P.current=()=>{D||z(),V()},()=>{A=!1,cancelAnimationFrame(D),P.current=null,G.disconnect(),K.disconnect(),window.removeEventListener(`pointermove`,H),document.documentElement.removeEventListener(`pointerleave`,U),document.removeEventListener(`visibilitychange`,W),n.deleteFramebuffer(S),n.deleteTexture(x),n.deleteBuffer(g),n.deleteBuffer(y),n.deleteVertexArray(h),n.deleteVertexArray(v),n.deleteProgram(l),n.deleteProgram(f)}},[]),e(()=>{P.current?.()});let{className:L=``,...R}=j;return n(`div`,{ref:M,className:`threads-container${L?` ${L}`:``}`,...R,children:n(`canvas`,{ref:N,className:`threads-canvas`,"aria-hidden":`true`})})};export{f as default};