import * as THREE from "three";

export interface CharacterRefs {
  character: THREE.Group;
  headGroup?: THREE.Group;
  leftPupil?: THREE.Mesh;
  rightPupil?: THREE.Mesh;
  leftEyelid?: THREE.Mesh;
  rightEyelid?: THREE.Mesh;
  leftBrow?: THREE.Mesh;
  rightBrow?: THREE.Mesh;
  torso?: THREE.Object3D;
}

const AVATAR_IMAGE = "/images/mohd-avatar-cutout.png";

export function createRikinCharacter(
  onProgress?: (pct: number) => void,
  onLoaded?: () => void
): CharacterRefs {
  const character = new THREE.Group();
  character.name = "rikin-character";

  const loader = new THREE.TextureLoader();
  loader.load(
    AVATAR_IMAGE,
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;

      const image = texture.image as HTMLImageElement;
      const aspect = image.width / image.height;
      const height = 1.95;
      const width = height * aspect;
      const geometry = new THREE.PlaneGeometry(width, height);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.02,
        side: THREE.DoubleSide,
      });

      const avatar = new THREE.Mesh(geometry, material);
      avatar.position.set(0, -0.2, 0);
      character.add(avatar);
      onLoaded?.();
    },
    (xhr) => {
      if (xhr.lengthComputable && onProgress) {
        onProgress(Math.round((xhr.loaded / xhr.total) * 100));
      }
    },
    (error) => {
      console.error("Failed to load avatar image", error);
      onLoaded?.();
    }
  );

  const headGroup = character;
  const torso = character;

  return {
    character,
    headGroup,
    torso,
  };
}
