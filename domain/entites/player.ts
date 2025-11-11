interface sexType {
  male: "M";
  female: "F";
}

export class Player {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public shortname: string,
    public sex: sexType,
  ) {}
}