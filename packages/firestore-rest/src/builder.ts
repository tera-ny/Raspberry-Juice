import {
  DocumentReference,
  Timestamp,
  WhereFilterOp,
} from "firebase/firestore";
import {
  ArrayValue,
  BooleanValue,
  BytesValue,
  DoubleValue,
  FieldFilterOperator,
  FieldFilterValue,
  Filter,
  GeoPointValue,
  IntegerValue,
  MapValue,
  ReferenceValue,
  StringValue,
  TimestampValue,
  Value,
} from "./type";
import dayjs from "dayjs";
import "dayjs/plugin/utc";

const validNullableValue = (val: FieldFilterValue) =>
  val === null || val === NaN;

const buildNullableValueFilter = (
  key: string,
  operator: WhereFilterOp,
  val: FieldFilterValue,
): Filter => {
  if (!["==", "!="].includes(operator)) {
    throw `This filter cannot be used. (${key} ${operator}, ${val})`;
  }
  switch (val) {
    case null:
      return {
        unaryFilter: {
          op: operator === "==" ? "IS_NULL" : "IS_NOT_NULL",
          field: { fieldPath: key },
        },
      };
    case NaN:
      return {
        unaryFilter: {
          op: operator === "==" ? "IS_NAN" : "IS_NOT_NAN",
          field: { fieldPath: key },
        },
      };
    default:
      throw `This value is not nullable ${val}`;
  }
};

export const fromValue = (
  val: Value,
): (FieldFilterValue | Array<FieldFilterValue>) => {
  const keys = Object.keys(val);
  if (keys.includes("nullValue")) {
    return null;
  } else if (keys.includes("booleanValue")) {
    return (val as BooleanValue).booleanValue;
  } else if (keys.includes("integerValue")) {
    return parseInt((val as IntegerValue).integerValue);
  } else if (keys.includes("doubleValue")) {
    return (val as DoubleValue).doubleValue;
  } else if (keys.includes("timestampValue")) {
    return Timestamp.fromDate(
      dayjs((val as TimestampValue).timestampValue).toDate(),
    );
  } else if (keys.includes("stringValue")) {
    return (val as StringValue).stringValue;
  } else if (keys.includes("bytesValue")) {
    return (val as BytesValue).bytesValue;
  } else if (keys.includes("referenceValue")) {
    return (val as ReferenceValue).referenceValue;
  } else if (keys.includes("geoPointValue")) {
    return (val as GeoPointValue).geoPointValue;
  } else if (keys.includes("arrayValue")) {
    return (val as ArrayValue).arrayValue.values.map(fromValue);
  } else if (keys.includes("mapValue")) {
    return Object.entries((val as MapValue).mapValue.fields).reduce(
      (prev, [key, val]) => ({ ...prev, [key]: fromValue(val) }),
      {},
    );
  } else {
    console.error(val);
    throw "faild: unsupport value type";
  }
};

const convertValue = (
  val: FieldFilterValue | Array<FieldFilterValue>,
): Value => {
  if (typeof val === "number") {
    if (Number.isInteger(val)) {
      return {
        integerValue: Math.trunc(val).toString(),
      };
    } else {
      return {
        doubleValue: val,
      };
    }
  } else if (typeof val === "boolean") {
    return {
      booleanValue: val,
    };
  } else if (typeof val === "string") {
    return {
      stringValue: val,
    };
  } else if (val instanceof DocumentReference) {
    return {
      referenceValue: val.path,
    };
  } else if (val instanceof Timestamp) {
    return {
      timestampValue: dayjs(val.toDate()).utc().format(),
    };
  } else {
    return {
      nullValue: null,
    };
  }
};

const convertOperator = (
  operator: WhereFilterOp,
): FieldFilterOperator => {
  switch (operator) {
    case "==":
      return "EQUAL";
    case "!=":
      return "NOT_EQUAL";
    case "<":
      return "LESS_THAN";
    case "<=":
      return "LESS_THAN_OR_EQUAL";
    case ">":
      return "GREATER_THAN";
    case ">=":
      return "GREATER_THAN_OR_EQUAL";
    case "array-contains":
      return "ARRAY_CONTAINS";
    case "array-contains-any":
      return "ARRAY_CONTAINS_ANY";
    case "in":
      return "IN";
    case "not-in":
      return "NOT_IN";
  }
};

const buildInKeywordFilter = (
  key: string,
  operator: Extract<WhereFilterOp, "in" | "not-in">,
  val: FieldFilterValue[],
): Filter => {
  return {
    fieldFilter: {
      op: convertOperator(operator),
      field: {
        fieldPath: key,
      },
      value: {
        arrayValue: {
          values: val.map(convertValue),
        },
      },
    },
  };
};

export function buildFilter(
  key: string,
  operator: WhereFilterOp,
  val: FieldFilterValue | FieldFilterValue[],
): Filter {
  if (validNullableValue(val)) {
    return buildNullableValueFilter(key, operator, val);
  }
  if (Array.isArray(val) && (operator === "in" || operator === "not-in")) {
    return buildInKeywordFilter(key, operator, val);
  }
  return {
    fieldFilter: {
      op: convertOperator(operator),
      field: {
        fieldPath: key,
      },
      value: convertValue(val),
    },
  };
}
