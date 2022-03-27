type Numeric = string;

const isNumeric = (value: string): value is Numeric => /^\d+$/.test(value);

export default isNumeric;
