import { useEffect, useRef } from 'react';
import { Color, Mesh, Program, Renderer, Triangle } from 'ogl';

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const fragment = `#version 300 es
precision highp float;
uniform float uTime, uAmplitude, uBlend;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
out vec4 fragColor;

vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
float noise(vec2 v){
  const vec4 C=vec4(.2113248654,.3660254038,-.5773502692,.0243902439);
  vec2 i=floor(v+dot(v,C.yy)),x0=v-i+dot(i,C.xx);
  vec2 i1=x0.x>x0.y?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m*=m;m*=m;vec3 x=2.*fract(p*C.www)-1.,h=abs(x)-.5,ox=floor(x+.5),a0=x-ox;
  m*=1.792842914-(.853734721*(a0*a0+h*h));
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}
vec3 ramp(float f){
  vec3 c=mix(uColorStops[0],uColorStops[1],smoothstep(0.,.5,f));
  return mix(c,uColorStops[2],smoothstep(.5,1.,f));
}
void main(){
  vec2 uv=gl_FragCoord.xy/uResolution;
  float height=exp(noise(vec2(uv.x*2.+uTime*.1,uTime*.25))*.5*uAmplitude);
  float intensity=.6*(uv.y*2.-height+.2);
  float alpha=smoothstep(.2-uBlend*.5,.2+uBlend*.5,intensity);
  vec3 color=intensity*ramp(uv.x);
  fragColor=vec4(color*alpha,alpha);
}`;

export default function Aurora({
  colorStops = ['#263b9b', '#d8ff68', '#7288ff'],
  amplitude = 1,
  blend = 0.5,
  speed = 1,
}) {
  const container = useRef(null);
  const props = useRef({ colorStops, amplitude, blend, speed });
  props.current = { colorStops, amplitude, blend, speed };

  useEffect(() => {
    const element = container.current;
    if (!element) return undefined;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uBlend: { value: blend },
        uResolution: { value: [1, 1] },
        uColorStops: { value: colorStops.map((hex) => { const color = new Color(hex); return [color.r, color.g, color.b]; }) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    element.appendChild(gl.canvas);
    const resize = () => {
      renderer.setSize(element.offsetWidth, element.offsetHeight);
      program.uniforms.uResolution.value = [element.offsetWidth, element.offsetHeight];
    };
    let animationFrame;
    const update = (time) => {
      const current = props.current;
      program.uniforms.uTime.value = time * 0.0001 * current.speed;
      program.uniforms.uAmplitude.value = current.amplitude;
      program.uniforms.uBlend.value = current.blend;
      program.uniforms.uColorStops.value = current.colorStops.map((hex) => { const color = new Color(hex); return [color.r, color.g, color.b]; });
      renderer.render({ scene: mesh });
      animationFrame = requestAnimationFrame(update);
    };
    resize();
    window.addEventListener('resize', resize);
    animationFrame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      if (gl.canvas.parentNode === element) element.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [amplitude, blend, colorStops, speed]);

  return <div ref={container} className="aurora-container" aria-hidden="true" />;
}
