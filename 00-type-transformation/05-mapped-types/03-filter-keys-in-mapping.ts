{
  // 1. Example interface
  interface Example {
    name: string;
    age: number;
    id: string;
    organizationId: string;
    groupId?: string;
  }

  // 2. Pattern that looks for keys containing "Id" or starting with "id"
  type SearchForId = `${string}Id${string}` | `id${string}`;

  // 3. OnlyIdKeys type helper
  type OnlyIdKeys<T> = {
    [K in keyof T as K extends SearchForId ? K : never]: T[K];
  };

  // 4. Using OnlyIdKeys with the Example type
  type Result = OnlyIdKeys<Example>;
  /*
    Result:
    {
      id: string;
      organizationId: string;
      groupId?: string | undefined;
    }
  */
}
