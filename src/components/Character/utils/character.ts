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
  const faceBlend = { front: 1, right: 0 };
  character.userData.avatarFaceBlend = faceBlend;

  const loader = new THREE.TextureLoader();
  loader.load(
    AVATAR_IMAGE,
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;

      const image = texture.image as HTMLImageElement;
      const aspect = image.width / image.height;
      const height = 2.15;
      const width = height * aspect;
      const geometry = new THREE.PlaneGeometry(width, height);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
        alphaTest: 0.02,
        side: THREE.DoubleSide,
      });
      const mirroredMaterial = material.clone();
      mirroredMaterial.opacity = 0;

      const avatar = new THREE.Mesh(geometry, material);
      avatar.name = "mohd-avatar-front";
      avatar.position.set(0, -0.12, 0);
      const mirroredAvatar = new THREE.Mesh(geometry, mirroredMaterial);
      mirroredAvatar.name = "mohd-avatar-facing-right";
      mirroredAvatar.position.copy(avatar.position);
      mirroredAvatar.scale.x = -1;
      character.userData.applyAvatarFaceBlend = () => {
        material.opacity = faceBlend.front;
        mirroredMaterial.opacity = faceBlend.right;
      };
      character.userData.applyAvatarFaceBlend();

      character.add(avatar);
      character.add(mirroredAvatar);
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
