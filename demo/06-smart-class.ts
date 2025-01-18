type OmitBuilderMethods<K extends keyof Builder> = Omit<Builder<K>, K>;

class Builder<CalledMethod extends keyof Builder = never> {
  public addName(name: string) {
    return this as OmitBuilderMethods<CalledMethod | "addName">;
  }

  public addAge(age: number) {
    return this as OmitBuilderMethods<CalledMethod | "addAge">;
  }

  public addSurname(surname: string) {
    return this as OmitBuilderMethods<CalledMethod | "addSurname">;
  }
}

const builder = new Builder().addName("GG").addName('dasd');
