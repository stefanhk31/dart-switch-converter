enum MyEnum {
  first,
  second,
  third,
  fourth,
  fifth,
  other,
}

String myEnumStatement(MyEnum enumVal) {
  switch (enumVal) {
    case MyEnum.first:
      return 'first';
    case MyEnum.second:
      return 'second';
    case MyEnum.third:
      return 'third';
    default:
      return 'default';
  }
}

String myMultipleReturnEnumStatement(MyEnum enumVal) {
  switch (enumVal) {
    case MyEnum.first:
    case MyEnum.second:
    case MyEnum.third:
      return 'first, second, or third';
    case MyEnum.fourth:
    case MyEnum.fifth:
      return 'fourth or fifth';
    default:
      return 'default';
  }
}

String myVariableAssignmentEnumStatement(MyEnum enumVal) {
  String val;
  switch (enumVal) {
    case MyEnum.first:
    case MyEnum.second:
    case MyEnum.third:
      val = 'first, second, or third';
      break;
    case MyEnum.fourth:
    case MyEnum.fifth:
      val = 'fourth or fifth';
      break;
    default:
      val = 'default';
  }

  return val;
}
