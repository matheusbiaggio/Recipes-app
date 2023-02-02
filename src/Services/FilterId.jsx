const FilterId = (param1, param2) => {
  const filter = param1.filter((element) => Number(element.id) === Number(param2));
  return filter;
};

export default FilterId;
