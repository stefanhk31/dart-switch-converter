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
