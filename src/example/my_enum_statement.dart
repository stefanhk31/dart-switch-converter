enum MyEnum {
  first,
  second,
  third,
  fourth,
  fifth,
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
  return switch (enumVal) {
    MyEnum.first || MyEnum.second || MyEnum.third => 'first, second, or third',
    MyEnum.fourth || MyEnum.fifth => 'fourth or fifth',
  };
}
