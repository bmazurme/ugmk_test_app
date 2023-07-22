const getNumber = (it, unit = 1) => Math.round((Number(it) ? Number(it) * unit : 0));

export { getNumber };
