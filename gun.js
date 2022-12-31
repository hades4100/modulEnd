export class gun {
  constructor(model, submodel) {
    this.model = model;
    this.submodel = submodel;
  }
}
export function togunstring(gun) {
  let temp = [gun.model, gun.submodel];
  let resolved = temp.join();
  return resolved;
}
