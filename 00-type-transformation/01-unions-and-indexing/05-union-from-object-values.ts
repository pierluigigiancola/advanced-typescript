// Original object without 'as const'
const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "one_on_one",
  SELF_DIRECTED: "self_directed",
  PLANNED_ONE_ON_ONE: "planned_one_on_one",
  PLANNED_SELF_DIRECTED: "planned_self_directed",
} as const;

// First approach: Manually specify the keys
type IndividualProgram = (typeof programModeEnumMap)[
  | "ONE_ON_ONE"
  | "SELF_DIRECTED"
  | "PLANNED_ONE_ON_ONE"
  | "PLANNED_SELF_DIRECTED"];

// Second approach: Use Exclude to remove unwanted keys
type ExcludedKeys = "GROUP" | "ANNOUNCEMENT";
type IndividualProgramKeys = Exclude<
  keyof typeof programModeEnumMap,
  ExcludedKeys
>;
type IndividualProgramUsingExclude =
  (typeof programModeEnumMap)[IndividualProgramKeys];
