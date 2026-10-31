import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { ThemeService } from '@core/theme';

interface Hex {
  x: number;
  z: number;
  h: number;
  d: number;
}

/** Grille hexagonale WebGL (three.js, chargé à la demande) qui réagit au pointeur. */
@Component({
  selector: 'app-hex-grid',
  template: '<canvas #canvas aria-hidden="true"></canvas>',
  styleUrl: './hex-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HexGrid {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (typeof WebGLRenderingContext === 'undefined') return;
      void this.start();
    });
  }

  private async start(): Promise<void> {
    const THREE = await import('three');
    let destroyed = false;
    this.destroyRef.onDestroy(() => (destroyed = true));
    if (destroyed) return;

    const canvas = this.canvas().nativeElement;
    const host = canvas.parentElement as HTMLElement;
    let renderer: InstanceType<typeof THREE.WebGLRenderer>;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return; // WebGL indisponible : la grille est décorative, on s'en passe
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    camera.position.set(8, 9, 8);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const light = new THREE.DirectionalLight(0xffffff, 1.6);
    light.position.set(3, 8, 2);
    scene.add(light);

    const R = 0.5;
    const cols = 13;
    const rows = 11;
    const hexes: Hex[] = [];
    for (let q = 0; q < cols; q++) {
      for (let r = 0; r < rows; r++) {
        const x = (q - cols / 2) * R * 1.5;
        const z = (r - rows / 2 + (q % 2) * 0.5) * R * Math.sqrt(3);
        if (Math.hypot(x, z) < 4.2) hexes.push({ x, z, h: 0.2, d: Math.hypot(x, z) });
      }
    }

    const geometry = new THREE.CylinderGeometry(R * 0.94, R * 0.94, 1, 6);
    geometry.translate(0, 0.5, 0);
    const material = new THREE.MeshLambertMaterial();
    const mesh = new THREE.InstancedMesh(geometry, material, hexes.length);
    mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(hexes.length * 3), 3);
    scene.add(mesh);

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const base = new THREE.Color();
    const acc = new THREE.Color();
    const acc2 = new THREE.Color();

    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3(99, 0, 99);
    const target = new THREE.Vector3(99, 0, 99);
    const current = new THREE.Vector3(99, 0, 99);
    const ndc = new THREE.Vector2();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit)) target.copy(hit);
    };
    addEventListener('pointermove', onMove);

    const fit = () => {
      const b = host.getBoundingClientRect();
      const aspect = b.width / Math.max(1, b.height);
      const s = 4.6;
      renderer.setSize(b.width, b.height, false);
      camera.left = -s * aspect;
      camera.right = s * aspect;
      camera.top = s;
      camera.bottom = -s;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(fit);
    observer.observe(host);
    fit();

    let frame = 0;
    const tick = (t: number) => {
      frame = requestAnimationFrame(tick);
      const { hex } = this.theme.theme();
      current.lerp(target, 0.08);
      base.set(hex.top);
      acc.set(hex.acc);
      acc2.set(hex.acc2);
      hexes.forEach((hx, i) => {
        const near = Math.max(0, 1 - Math.hypot(hx.x - current.x, hx.z - current.z) / 2.2);
        const goal = 0.25 + 0.18 * Math.sin(t * 0.0012 - hx.d * 1.1) + near * near * 2.2;
        hx.h += (goal - hx.h) * 0.12;
        dummy.position.set(hx.x, 0, hx.z);
        dummy.scale.set(1, hx.h, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        color
          .copy(base)
          .lerp(acc2, Math.min(1, near * 2.2))
          .lerp(acc, Math.min(1, Math.max(0, near * 2 - 0.6)));
        mesh.setColorAt(i, color);
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      scene.rotation.y = t * 0.00005;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(tick);

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(frame);
      removeEventListener('pointermove', onMove);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    });
  }
}
